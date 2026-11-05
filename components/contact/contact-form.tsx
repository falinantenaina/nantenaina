"use client";

import {
  useCallback,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  MailWarning,
} from "lucide-react";
import { submitContact } from "@/lib/actions/contact";
import {
  hasErrors,
  initialFormState,
  initialValues,
  validate,
  type Errors,
  type FieldId,
  type FormState,
  type Values,
} from "@/lib/contact/validation";
import { contact } from "@/lib/data/site";
import { ActionButton } from "@/components/ui/action";
import { cn } from "@/lib/utils";

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

/* text-base (16 px) : évite le zoom automatique des champs sur iOS. */
const fieldClass =
  "block w-full rounded-xl border bg-surface px-4 py-3 text-base text-ink transition-colors placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20";

/** Lit les champs depuis le `FormData` réellement soumis. */
function readValues(formData: FormData): Values {
  const read = (key: FieldId): string => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  return {
    name: read("name"),
    email: read("email"),
    subject: read("subject"),
    message: read("message"),
  };
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const mountedAt = useRef(0);

  /** Horodatage du rendu : un `Date.now()` dans le rendu serait impur. */
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const focusFirstInvalid = useCallback((list: Errors) => {
    const first = (Object.keys(list) as FieldId[]).find((key) => list[key]);
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, []);

  /**
   * Point de coordination : validation locale avant tout appel réseau, puis
   * application du retour serveur. `useActionState` ne fournit pas de callback,
   * d'où cet enveloppement.
   */
  const handleAction = useCallback(
    async (previous: FormState, formData: FormData): Promise<FormState> => {
      // Horodatage de rendu, calculé ici plutôt que par un effet d'état.
      // Champ absent côté serveur si le rendu n'a pas encore eu lieu : contrôle
      // volontairement défaillant-côté-sûr.
      formData.set(
        "startedAt",
        mountedAt.current > 0
          ? String(Math.max(0, Date.now() - mountedAt.current))
          : "0",
      );

      const submitted = readValues(formData);
      const validation = validate(submitted);

      if (hasErrors(validation)) {
        setErrors(validation);
        focusFirstInvalid(validation);
        return { status: "error", fieldErrors: validation };
      }

      const result = await submitContact(previous, formData);

      if (result.status === "success") {
        setValues(initialValues);
        setErrors({});
      } else if (result.fieldErrors) {
        setErrors(result.fieldErrors);
        focusFirstInvalid(result.fieldErrors);
      }

      return result;
    },
    [focusFirstInvalid],
  );

  const [state, formAction, pending] = useActionState(
    handleAction,
    initialFormState,
  );

  const updateValue = (field: FieldId, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  };

  /**
   * Validation immédiate : si elle échoue, la soumission est annulée et rien
   * n'est envoyé. `handleAction` refait la même vérification, ce qui couvre le
   * cas où React traiterait malgré tout l'événement.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const validation = validate(values);
    if (hasErrors(validation)) {
      event.preventDefault();
      setErrors(validation);
      focusFirstInvalid(validation);
    }
  };

  const status = state.status;
  const fieldError = (field: FieldId) => errors[field];
  const message = state.message;

  return (
    <form
      ref={formRef}
      noValidate
      action={formAction}
      onSubmit={handleSubmit}
      aria-busy={pending || undefined}
      className="surface-card relative min-w-0 rounded-xl p-5 sm:p-8"
    >
      {!contact.email ? (
        <p className="mb-6 flex items-start gap-2.5 rounded-2xl border border-accent/25 bg-accent/5 px-4 py-3 text-[13px] leading-relaxed text-ink">
          <MailWarning
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-accent"
          />
          <span>
            Le destinataire du formulaire n’est pas encore configuré. Renseignez
            l’adresse e-mail dans{" "}
            <code className="font-mono">lib/data/site.ts</code> pour activer
            l’envoi.
          </span>
        </p>
      ) : null}

      {/* Piège à robots : invisible pour les humains, rempli par les automates. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        {textFields.map((field) => {
          const error = fieldError(field.id);
          const errorId = `${field.id}-error`;
          return (
            <div
              key={field.id}
              className={cn(
                "min-w-0",
                field.id === "subject" && "sm:col-span-2",
              )}
            >
              <label
                htmlFor={field.id}
                className="mb-1.5 block text-sm font-medium text-ink"
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
                disabled={pending}
                className={cn(
                  fieldClass,
                  error
                    ? "border-danger/60 focus:ring-danger/20"
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

        <div className="min-w-0 sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-ink"
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
            disabled={pending}
            className={cn(
              fieldClass,
              "resize-y leading-relaxed",
              errors.message
                ? "border-danger/60 focus:ring-danger/20"
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
        <ActionButton
          type="submit"
          size="lg"
          disabled={pending}
          className="w-full sm:w-auto"
        >
          {pending ? (
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <ArrowRight aria-hidden="true" className="size-4" />
          )}
          {pending ? "Envoi en cours…" : "Envoyer le message"}
        </ActionButton>
        <p className="min-w-0 text-xs leading-relaxed text-muted sm:max-w-[16rem] sm:text-right">
          Réponse sous 48 heures ouvrées. Vos coordonnées ne servent qu’à vous
          répondre.
        </p>
      </div>

      <div role="status" aria-live="polite" className="mt-4 min-h-6">
        {status === "error" ? (
          <p className="flex items-start gap-2 text-sm font-medium text-danger">
            <AlertCircle
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0"
            />
            {message}
          </p>
        ) : null}

        {status === "success" ? (
          <p className="flex items-start gap-2 text-sm font-medium text-success">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0"
            />
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
