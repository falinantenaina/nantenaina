"use server";

import { headers } from "next/headers";
import { contact } from "@/lib/data/site";
import {
  MIN_SUBMIT_DELAY_MS,
  hasErrors,
  validate,
  type FormState,
} from "@/lib/contact/validation";
import { sendContactMails, failureMessage } from "@/lib/email/send";
import { confirmationMail, notificationMail } from "@/lib/email/templates";

export type { FormState };

/** Nom du champ piège : les robots le remplissent, les humains ne le voient pas. */
const HONEYPOT_FIELD = "website";

/** Fenêtre glissante en mémoire, par adresse IP. Sans dépendance externe. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const previous = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (previous.length >= MAX_ATTEMPTS) {
    attempts.set(ip, previous);
    return true;
  }

  previous.push(now);
  if (attempts.size > 500) {
    for (const [key, times] of attempts) {
      if (times.every((t) => now - t >= WINDOW_MS)) attempts.delete(key);
    }
  }
  attempts.set(ip, previous);
  return false;
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function clientIp(headersList: Headers): string {
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headersList.get("x-real-ip") ?? "unknown";
}

/**
 * Point d'entrée du formulaire de contact.
 *
 * Accessible par une simple requête POST : toute la validation est donc
 * refaite ici, indépendamment de la saisie navigateur.
 */
export async function submitContact(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Piège à robots : on accepte silencieusement pour ne pas l'avertir.
  if (text(formData, HONEYPOT_FIELD)) {
    return { status: "success" };
  }

  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    subject: text(formData, "subject"),
    message: text(formData, "message"),
  };

  // La validation passe d'abord : mieux vaut signaler un champ oublié qu'un
  // délai incompréhensible. Champ absent (sans JavaScript) : contrôle ignoré.
  const fieldErrors = validate(values);
  if (hasErrors(fieldErrors)) {
    return { status: "error", fieldErrors };
  }

  const startedAt = Number(text(formData, "startedAt"));
  if (
    Number.isFinite(startedAt) &&
    startedAt > 0 &&
    Date.now() - startedAt < MIN_SUBMIT_DELAY_MS
  ) {
    return {
      status: "error",
      message:
        "Envoi trop rapide. Merci de patienter un instant avant de réessayer.",
    };
  }

  if (!contact.email) {
    return {
      status: "error",
      message:
        "L’envoi de messages n’est pas encore activé sur ce portfolio. Utilisez les coordonnées à côté du formulaire.",
    };
  }

  const headersList = await headers();
  const ip = clientIp(headersList);

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message:
        "Trop d’envois en peu de temps. Réessayez dans quelques minutes.",
    };
  }

  const payload = {
    ...values,
    receivedAt: new Date(),
    userAgent: headersList.get("user-agent"),
    ip,
  };

  const result = await sendContactMails(
    notificationMail(payload, contact.email),
    confirmationMail(payload, contact.email),
  );

  if (!result.ok && result.failure) {
    console.error(
      `[contact] échec d'envoi (${result.failure.kind}) : ${result.failure.detail}`,
    );
    return { status: "error", message: failureMessage(result.failure) };
  }

  if (result.confirmationFailed) {
    console.warn(
      `[contact] accusé de réception non envoyé : ${result.confirmationFailed}`,
    );
  }

  return {
    status: "success",
    message:
      "Votre message a bien été envoyé. Je vous réponds sous 48 heures ouvrées.",
  };
}
