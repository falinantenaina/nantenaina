import { escapeHtml, singleLine } from "@/lib/contact/validation";
import { contact, site } from "@/lib/data/site";

export type Mail = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
  tag: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: Date;
  userAgent: string | null;
  ip: string | null;
};

const shell = (title: string, body: string): string => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#f3f7fc;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#172033">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f7fc;padding:32px 16px">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden">
            <tr>
              <td style="background:#172b4d;padding:20px 28px">
                <span style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase">${escapeHtml(site.fullName)}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px">${body}</td>
            </tr>
            <tr>
              <td style="border-top:1px solid #e2e8f0;padding:16px 28px">
                <span style="color:#64748b;font-size:12px;line-height:1.6">Message transmis automatiquement depuis ${escapeHtml(contact.portfolio)}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const row = (label: string, value: string): string => `
  <tr>
    <td style="padding:8px 0;color:#64748b;font-size:13px;width:110px;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:8px 0;color:#172033;font-size:14px;line-height:1.6;word-break:break-word">${value}</td>
  </tr>`;

const paragraph = (text: string, style = ""): string =>
  `<p style="margin:0 0 16px;color:#172033;font-size:15px;line-height:1.65;${style}">${escapeHtml(text)}</p>`;

const heading = (text: string): string =>
  `<h1 style="margin:0 0 20px;color:#172b4d;font-size:21px;line-height:1.3;letter-spacing:-0.01em">${escapeHtml(text)}</h1>`;

const timestamp = (date: Date): string =>
  new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(date);

/** Message reçu par le propriétaire du portfolio. */
export function notificationMail(
  payload: ContactPayload,
  to: string,
): Mail {
  const subject = `[Portfolio] ${singleLine(payload.subject, 150)}`;

  const body = `
    ${heading("Nouveau message reçu")}
    ${paragraph("Un visiteur vient de vous écrire via le formulaire du portfolio.")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;margin:8px 0 4px">
      ${row("Nom", escapeHtml(singleLine(payload.name)))}
      ${row("E-mail", escapeHtml(singleLine(payload.email)))}
      ${row("Objet", escapeHtml(singleLine(payload.subject)))}
      ${row("Reçu le", escapeHtml(timestamp(payload.receivedAt)))}
      ${payload.ip ? row("Adresse IP", escapeHtml(payload.ip)) : ""}
      ${payload.userAgent ? row("Navigateur", escapeHtml(singleLine(payload.userAgent, 160))) : ""}
    </table>
    <div style="background:#f3f7fc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 18px;margin-top:16px">
      <p style="margin:0;color:#172033;font-size:15px;line-height:1.65;white-space:pre-wrap;word-break:break-word">${escapeHtml(payload.message.trim())}</p>
    </div>`;

  return {
    to,
    replyTo: payload.email,
    subject,
    html: shell(subject, body),
    text: [
      "Nouveau message reçu depuis le portfolio",
      "",
      `Nom     : ${payload.name.trim()}`,
      `E-mail  : ${payload.email.trim()}`,
      `Objet   : ${payload.subject.trim()}`,
      `Reçu le : ${timestamp(payload.receivedAt)}`,
      payload.ip ? `IP      : ${payload.ip}` : "",
      "",
      "Message :",
      payload.message.trim(),
    ]
      .filter(Boolean)
      .join("\n"),
    tag: "contact-notification",
  };
}

/** Accusé de réception envoyé au visiteur. */
export function confirmationMail(payload: ContactPayload, replyTo: string): Mail {
  const subject = `Votre message a bien été envoyé`;

  const body = `
    ${heading("Merci pour votre message")}
    ${paragraph(`Bonjour ${payload.name.trim()},`)}
    ${paragraph(
      `Votre message « ${singleLine(payload.subject, 150)} » a bien été transmis. Je reviens vers vous sous 48 heures ouvrées.`,
    )}
    ${paragraph(
      "Si votre demande est urgente, vous pouvez répondre directement à cet e-mail.",
      "color:#64748b",
    )}
    <p style="margin:24px 0 0;color:#172b4d;font-size:15px;line-height:1.6">${escapeHtml(site.fullName)}<br /><span style="color:#64748b;font-size:14px">${escapeHtml(site.role)}</span></p>`;

  return {
    to: payload.email,
    replyTo,
    subject,
    html: shell(subject, body),
    text: [
      `Bonjour ${payload.name.trim()},`,
      "",
      `Votre message « ${payload.subject.trim()} » a bien été transmis. Je reviens vers vous sous 48 heures ouvrées.`,
      "",
      "Si votre demande est urgente, vous pouvez répondre directement à cet e-mail.",
      "",
      site.fullName,
      site.role,
    ].join("\n"),
    tag: "contact-confirmation",
  };
}
