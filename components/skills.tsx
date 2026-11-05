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
      title="Les outils avec lesquels je travaille"
      className="bg-surface"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {skillGroups.map((group, index) => {
          const Icon = icons[group.id];
          return (
            <Reveal key={group.id} delay={(index % 3) * 70} className="min-w-0">
              <article className="h-full py-5">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent"
                  >
                    <Icon className="size-4.5" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-base font-semibold text-ink">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-white px-3 py-1.5 text-sm text-muted"
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
