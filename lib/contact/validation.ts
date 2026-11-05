export type FieldId = "name" | "email" | "subject" | "message";

export type Values = Record<FieldId, string>;

export type Errors = Partial<Record<FieldId, string>>;

/**
 * Limites appliquées côté client pour le confort, et côté serveur pour la
 * sécurité : les Server Actions sont atteignables par une requête POST directe.
 */
export const limits = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000,
} as const;

/**
 * Délai minimal entre l'affichage du formulaire et sa soumission.
 *
 * Un automate pilotant l'interface réelle soumet en quelques dizaines de
 * millisecondes ; un humain, même rapide, lit et saisit bien plus lentement.
 */
export const MIN_SUBMIT_DELAY_MS = 1500;

export const initialValues: Values = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/** Retour de la Server Action, lu par `useActionState`. */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Errors;
};

export const initialFormState: FormState = { status: "idle" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(values: Values): Errors {
  const errors: Errors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = "Merci d’indiquer votre nom.";
  } else if (name.length > limits.name) {
    errors.name = `Votre nom est trop long (${limits.name} caractères maximum).`;
  }

  if (!emailPattern.test(email)) {
    errors.email = "Merci d’indiquer une adresse e-mail valide.";
  } else if (email.length > limits.email) {
    errors.email = "Cette adresse e-mail est trop longue.";
  }

  if (subject.length < 2) {
    errors.subject = "Merci d’indiquer un objet.";
  } else if (subject.length > limits.subject) {
    errors.subject = `Votre objet est trop long (${limits.subject} caractères maximum).`;
  }

  if (message.length < 10) {
    errors.message = "Votre message doit contenir au moins 10 caractères.";
  } else if (message.length > limits.message) {
    errors.message = `Votre message est trop long (${limits.message} caractères maximum).`;
  }

  return errors;
}

export function hasErrors(errors: Errors): boolean {
  return Object.values(errors).some(Boolean);
}

/** Échappe les caractères réservés HTML de saisies non fiables. */
export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Texte sur une seule ligne, pour les champs affichés dans un tableau. */
export function singleLine(value: string, max = 200): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > max
    ? `${normalized.slice(0, max - 1)}…`
    : normalized;
}
