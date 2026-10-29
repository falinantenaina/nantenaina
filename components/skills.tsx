import type { LucideIcon } from "lucide-react";
import { Braces, Database, Layout, Server, Wrench } from "lucide-react";
import { skillGroups, type SkillGroupId } from "@/lib/data/skills";
import { sectionIds } from "@/lib/data/site";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<SkillGroupId, LucideIcon> = {
  frontend: Layout,
  state: Braces,
  backend: Server,
  databases: Database,
  tooling: Wrench,
};

export function Skills() {
  return (
    <Section
      id={sectionIds.skills}
      eyebrow="Compétences"
      index="02"
      title="Un socle technique complet"
      description="Les technologies que j’utilise au quotidien, réparties par domaine d’intervention. Aucun pourcentage artificiel : seuls des outils réellement utilisés sur des projets."
      className="border-b border-line bg-surface/45"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = icons[group.id];
          const isLastRowWide = index === skillGroups.length - 1;
          return (
            <Reveal
              key={group.id}
              delay={(index % 3) * 70}
              className={isLastRowWide ? "sm:col-span-2" : undefined}
            >
              <article className="h-full rounded-xl border border-line bg-white p-6 transition-colors duration-200 hover:border-accent/35">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface text-navy"
                  >
                    <Icon className="size-4.5" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-[15px] font-semibold text-navy">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-surface/70 px-3 py-1.5 text-[13px] font-medium text-navy"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
