import { LayoutTemplate, Server, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { expertiseDomains } from "@/lib/data/skills";
import { sectionIds } from "@/lib/data/site";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<string, LucideIcon> = {
  layout: LayoutTemplate,
  server: Server,
  database: Database,
};

const paragraphs = [
  "Je suis développeur web Full Stack et je travaille sur la conception et le développement d’applications web, depuis les interfaces utilisateur jusqu’aux fonctionnalités backend.",
  "J’utilise principalement React, TypeScript, Next.js, Node.js et Express.js. Je porte une attention particulière à la qualité du code, à l’expérience utilisateur, à la structure des données et aux besoins métier.",
  "À travers mes projets professionnels et personnels, je cherche à construire des solutions utiles, maintenables et adaptées aux contraintes réelles des entreprises.",
];

export function About() {
  return (
    <Section
      id={sectionIds.about}
      eyebrow="À propos"
      index="01"
      title="Un développeur orienté solutions"
    >
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Reveal className="min-w-0 lg:col-span-7">
          <div className="h-full space-y-5 lg:pr-10">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "text-[18px]/[1.6] text-ink sm:text-[21px]/[1.6]"
                    : "text-[15px]/[1.75] text-muted sm:text-[17px]/[1.75]"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <ul className="grid min-w-0 gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
          {expertiseDomains.map((domain, index) => {
            const Icon = icons[domain.icon];
            return (
              <li key={domain.id} className="min-w-0">
                <Reveal delay={index * 80} className="h-full">
                  <div className="flex h-full flex-col gap-4 py-4 lg:flex-row lg:items-start">
                    <span
                      aria-hidden="true"
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-accent/20 bg-accent/10 text-accent"
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-ink">
                        {domain.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {domain.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
