import { ArrowUp } from "lucide-react";
import { navigation } from "@/lib/data/navigation";
import { contact, sectionIds, site } from "@/lib/data/site";
import { Container } from "@/components/ui/container";
import { GithubIcon } from "@/components/ui/brand-icons";

const externalLinks = [
  { label: "GitHub", href: contact.github },
  { label: "Portfolio", href: contact.portfolio },
  ...(contact.linkedin ? [{ label: "LinkedIn", href: contact.linkedin }] : []),
  ...(contact.email ? [{ label: "E-mail", href: `mailto:${contact.email}` }] : []),
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/25 text-sm font-semibold tracking-tight text-white"
              >
                {site.initials}
              </span>
              <p className="text-[15px] font-semibold tracking-tight text-white">
                {site.fullName}
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              {site.role} — conception et développement de sites web et
              d’applications, du frontend au backend.
            </p>
          </div>

          <nav aria-label="Sections" className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Navigation
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex py-1.5 text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Ailleurs
            </h2>
            <ul className="mt-4 space-y-2.5">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-2 py-1.5 text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label === "GitHub" ? (
                      <GithubIcon className="size-4" />
                    ) : null}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/55">
            {site.fullName} — {site.role}
          </p>
          <a
            href={`#${sectionIds.hero}`}
            className="inline-flex items-center gap-2 self-start rounded-md py-1.5 text-sm text-white/75 transition-colors hover:text-white sm:self-auto"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
            Retour en haut
          </a>
        </div>
      </Container>
    </footer>
  );
}
