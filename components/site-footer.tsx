import { Container } from "@/components/ui/container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { contact, site } from "@/lib/data/site";

const socialLinks = [
  {
    label: "LinkedIn",
    href: contact.linkedin,
    icon: "linkedin" as const,
  },
  {
    label: "GitHub",
    href: contact.github,
    icon: "github" as const,
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-accent text-white">
      <Container className="py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
            © 2026 {site.fullName}
          </p>

          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-white/80 transition-colors hover:text-white"
              >
                {link.icon === "linkedin" ? (
                  <LinkedinIcon className="size-4" />
                ) : (
                  <GithubIcon className="size-4" />
                )}
              </a>
            ))}
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
            {site.role}
          </p>
        </div>
      </Container>
    </footer>
  );
}
