"use client";

import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, MailWarning } from "lucide-react";
import { contact, site } from "@/lib/data/site";
import { ActionButton } from "@/components/ui/action";
import { cn } from "@/lib/utils";

type FieldId = "name" | "email" | "subject" | "message";
type Values = Record<FieldId, string>;
type Errors = Partial<Record<FieldId, string>>;
type Status = "idle" | "invalid" | "unconfigured" | "sent";

const initialValues: Values = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const textFields: {
  id: Exclude<FieldId, "message">;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}[] = [
  {
    id: "name",
    label: "Nom",
    type: "text",
    autoComplete: "name",
    placeholder: "Votre nom",
  },
  {
    id: "email",
    label: "E-mail",
    type: "email",
    autoComplete: "email",
    placeholder: "vous@exemple.com",
  },
  {
    id: "subject",
    label: "Objet",
    type: "text",
    autoComplete: "off",
    placeholder: "Refonte de site web",
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) errors.name = "Merci d’indiquer votre nom.";
  if (!emailPattern.test(email)) {
    errors.email = "Merci d’indiquer une adresse e-mail valide.";
  }
  if (subject.length < 2) errors.subject = "Merci d’indiquer un objet.";
  if (message.length < 10) {
    errors.message = "Votre message doit contenir au moins 10 caractères.";
  }

  return errors;
}

const fieldClass =
  "block w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-ink transition-colors placeholder:text-muted/55 focus:outline-none focus:ring-2 focus:ring-accent/20";

export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement | null>(null);

  const updateValue = (field: FieldId, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
    setStatus((current) => (current === "idle" ? current : "idle"));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validate(values);
    if (Object.values(validation).some(Boolean)) {
      setErrors(validation);
      setStatus("invalid");
      const firstInvalid = (Object.keys(validation) as FieldId[]).find(
        (key) => validation[key],
      );
      const element = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstInvalid}"]`,
      );
      element?.focus();
      return;
    }

    if (!contact.email) {
      setStatus("unconfigured");
      return;
    }

    const body = [
      `Bonjour ${site.firstName},`,
      "",
      values.message.trim(),
      "",
      "—",
      `Nom : ${values.name.trim()}`,
      `E-mail : ${values.email.trim()}`,
    ].join("\n");

    const href =
      `mailto:${contact.email}` +
      `?subject=${encodeURIComponent(values.subject.trim())}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setStatus("sent");
  };

  const errorFor = (field: FieldId) => errors[field];

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8"
    >
      {!contact.email ? (
        <p className="mb-6 flex items-start gap-2.5 rounded-lg border border-line bg-surface px-4 py-3 text-[13px] leading-relaxed text-navy">
          <MailWarning
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-accent"
          />
          <span>
            Le destinataire du formulaire n’est pas encore configuré. Renseignez
            l’adresse e-mail dans <code className="font-mono">lib/data/site.ts</code>{" "}
            pour activer l’envoi.
          </span>
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {textFields.map((field) => {
          const error = errorFor(field.id);
          const errorId = `${field.id}-error`;
          return (
            <div
              key={field.id}
              className={field.id === "subject" ? "sm:col-span-2" : undefined}
            >
              <label
                htmlFor={field.id}
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={values[field.id]}
                onChange={(event) => updateValue(field.id, event.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                className={cn(
                  fieldClass,
                  error
                    ? "border-danger/60 focus:ring-danger/15"
                    : "border-line focus:border-accent",
                )}
              />
              {error ? (
                <p
                  id={errorId}
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
                >
                  <AlertCircle aria-hidden="true" className="size-3.5" />
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Décrivez brièvement votre besoin, vos délais et vos contraintes."
            value={values.message}
            onChange={(event) => updateValue("message", event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              fieldClass,
              "resize-y leading-relaxed",
              errors.message
                ? "border-danger/60 focus:ring-danger/15"
                : "border-line focus:border-accent",
            )}
          />
          {errors.message ? (
            <p
              id="message-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
            >
              <AlertCircle aria-hidden="true" className="size-3.5" />
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <ActionButton type="submit" size="lg" className="w-full sm:w-auto">
          Envoyer le message
          <ArrowRight aria-hidden="true" className="size-4" />
        </ActionButton>
        <p className="text-xs leading-relaxed text-muted sm:max-w-[16rem] sm:text-right">
          Votre messagerie s’ouvre avec le message prérempli.
        </p>
      </div>

      <div role="status" aria-live="polite" className="mt-4 min-h-6">
        {status === "invalid" ? (
          <p className="flex items-center gap-2 text-sm font-medium text-danger">
            <AlertCircle aria-hidden="true" className="size-4" />
            Certains champs sont incomplets ou invalides.
          </p>
        ) : null}

        {status === "unconfigured" ? (
          <p className="flex items-center gap-2 text-sm font-medium text-danger">
            <AlertCircle aria-hidden="true" className="size-4" />
            L’envoi n’est pas encore activé sur ce portfolio. Utilisez les liens
            à côté du formulaire pour me contacter.
          </p>
        ) : null}

        {status === "sent" ? (
          <p className="flex items-center gap-2 text-sm font-medium text-success">
            <CheckCircle2 aria-hidden="true" className="size-4" />
            Votre messagerie vient de s’ouvrir : il ne reste qu’à envoyer le
            message.
          </p>
        ) : null}
      </div>
    </form>
  );
}
