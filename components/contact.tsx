import { ArrowUpRight, Globe, Mail } from "lucide-react";
import { contact, sectionIds } from "@/lib/data/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

type LinkItem = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "link";
};

const links: LinkItem[] = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com/falinantenaina",
    href: contact.github,
    icon: "github",
  },
  {
    id: "portfolio",
    label: "Portfolio actuel",
    value: "nantenaina.is-a.dev",
    href: contact.portfolio,
    icon: "link",
  },
  ...(contact.email
    ? [
        {
          id: "email",
          label: "E-mail",
          value: contact.email,
          href: `mailto:${contact.email}`,
          icon: "mail" as const,
        },
      ]
    : []),
  ...(contact.linkedin
    ? [
        {
          id: "linkedin",
          label: "LinkedIn",
          value: contact.linkedin,
          href: contact.linkedin,
          icon: "linkedin" as const,
        },
      ]
    : []),
];

function LinkIcon({ icon }: { icon: LinkItem["icon"] }) {
  const className = "size-4 shrink-0";
  if (icon === "github") return <GithubIcon className={className} />;
  if (icon === "linkedin") return <LinkedinIcon className={className} />;
  if (icon === "mail") return <Mail aria-hidden="true" className={className} />;
  return <Globe aria-hidden="true" className={className} />;
}

export function Contact() {
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby={`${sectionIds.contact}-title`}
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                <span aria-hidden="true" className="tabular-nums text-muted">
                  05
                </span>
                <span aria-hidden="true" className="text-muted/70">
                  —
                </span>
                <span className="text-accent">Contact</span>
              </p>
              <h2
                id={`${sectionIds.contact}-title`}
                className="mt-3 text-[1.75rem]/[1.16] font-semibold tracking-[-0.02em] text-navy sm:text-[2.125rem]/[1.14]"
              >
                Parlons de votre prochain projet.
              </h2>
              <p className="mt-5 max-w-md text-[16px]/[1.65] text-muted">
                Vous avez besoin d’un site web, d’une application ou d’une solution
                adaptée à votre activité ? Contactez-moi pour discuter de votre
                besoin.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <ul className="mt-9 divide-y divide-line border-y border-line">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center gap-4 py-4 transition-colors hover:text-accent"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-surface text-navy transition-colors group-hover:border-accent/40 group-hover:text-accent">
                        <LinkIcon icon={link.icon} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-navy transition-colors group-hover:text-accent">
                          {link.label}
                        </span>
                        <span className="block truncate text-sm text-muted">
                          {link.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                Envoyer un message
              </h3>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
