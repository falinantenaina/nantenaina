import { Resend } from "resend";
import { contact, site } from "@/lib/data/site";
import type { Mail } from "@/lib/email/templates";

/** Catégorie d'échec, déterminée à partir des codes renvoyés par Resend. */
export type FailureKind =
  | "config"
  | "from"
  | "rate"
  | "quota"
  | "network"
  | "unknown";

export type SendFailure = {
  kind: FailureKind;
  /** Détail technique, journalisé côté serveur uniquement. */
  detail: string;
};

export type SendOutcome = { ok: true } | { ok: false; failure: SendFailure };

const userMessages: Record<FailureKind, string> = {
  config:
    "L’envoi de messages n’est pas encore activé sur ce portfolio. Utilisez les coordonnées à côté du formulaire.",
  from: "L’adresse d’envoi n’est pas encore autorisée pour ce domaine. Réessayez plus tard ou utilisez les coordonnées à côté du formulaire.",
  rate: "Trop d’envois en peu de temps. Réessayez dans quelques secondes.",
  quota:
    "La capacité d’envoi du portfolio est atteinte pour le moment. Réessayez plus tard.",
  network:
    "Impossible de joindre le service d’envoi. Réessayez dans un instant.",
  unknown:
    "L’envoi a échoué. Réessayez dans un instant ou utilisez les coordonnées à côté du formulaire.",
};

export function failureMessage(failure: SendFailure): string {
  return userMessages[failure.kind];
}

function classify(name: string): FailureKind {
  switch (name) {
    case "invalid_from_address":
      return "from";
    case "rate_limit_exceeded":
      return "rate";
    case "daily_quota_exceeded":
    case "monthly_quota_exceeded":
      return "quota";
    case "missing_api_key":
    case "invalid_api_key":
    case "restricted_api_key":
      return "config";
    default:
      return "unknown";
  }
}

function configuredFrom(): string {
  const override = process.env.RESEND_FROM?.trim();
  if (override) return override;
  return `${site.fullName} <${contact.email}>`;
}

let client: Resend | null = null;

function resend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  client ??= new Resend(apiKey);
  return client;
}

/**
 * Envoie un message. Le SDK renvoie `{ data, error }` sans jamais lever :
 * le `catch` ci-dessous ne couvre donc que les pannes réseau.
 */
async function deliver(mail: Mail): Promise<SendOutcome> {
  const instance = resend();
  if (!instance) {
    return {
      ok: false,
      failure: {
        kind: "config",
        detail: "RESEND_API_KEY absente de l’environnement.",
      },
    };
  }

  try {
    const { error } = await instance.emails.send({
      from: configuredFrom(),
      to: [mail.to],
      replyTo: mail.replyTo,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      tags: [{ name: "type", value: mail.tag }],
    });

    if (error) {
      return {
        ok: false,
        failure: {
          kind: classify(error.name),
          detail: `[${error.name}] ${error.message} (HTTP ${error.statusCode ?? "?"})`,
        },
      };
    }

    return { ok: true };
  } catch (cause) {
    return {
      ok: false,
      failure: {
        kind: "network",
        detail: cause instanceof Error ? cause.message : String(cause),
      },
    };
  }
}

export type SendResult = {
  ok: boolean;
  failure?: SendFailure;
  confirmationFailed?: string;
};

/**
 * Envoie d'abord la notification au propriétaire : si elle échoue, l'envoi
 * échoue — on n'annonce jamais un message qui n'est pas arrivé.
 *
 * L'accusé de réception envoyé au visiteur est de la courtoisie : son échec
 * est journalisé mais ne fait pas échouer la demande.
 */
export async function sendContactMails(
  notification: Mail,
  confirmation: Mail,
): Promise<SendResult> {
  const primary = await deliver(notification);
  if (!primary.ok) return { ok: false, failure: primary.failure };

  const secondary = await deliver(confirmation);
  if (!secondary.ok) {
    return {
      ok: true,
      confirmationFailed: secondary.failure.detail,
    };
  }

  return { ok: true };
}
