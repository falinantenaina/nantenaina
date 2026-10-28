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
      title="Un développeur orienté solutions"
      className="border-b border-line"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-5 lg:col-span-7">
          {paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 60}>
              <p className="text-base leading-relaxed text-muted sm:text-[17px]">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <ul className="grid gap-4 lg:col-span-5">
          {expertiseDomains.map((domain, index) => {
            const Icon = icons[domain.icon];
            return (
              <Reveal key={domain.id} delay={index * 80}>
                <li className="flex h-full items-start gap-4 rounded-xl border border-line bg-white p-5 transition-colors duration-200 hover:border-accent/35">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-surface text-navy"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy">
                      {domain.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {domain.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
