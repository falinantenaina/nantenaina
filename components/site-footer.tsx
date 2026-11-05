import { Container } from "@/components/ui/container";
import { contact, site } from "@/lib/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {site.fullName} · Développeur web Full Stack
        </p>
        <div className="flex gap-6 text-sm text-muted">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            LinkedIn
          </a>
          <a href={`mailto:${contact.email}`} className="hover:text-ink">
            E-mail
          </a>
        </div>
      </Container>
    </footer>
  );
}
