import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { experiences, type ExperienceItem } from "@/lib/data/experience";
import { sectionIds } from "@/lib/data/site";
import { cn } from "@/lib/utils";

function ExperienceCard({
  item,
  current = false,
}: {
  item: ExperienceItem;
  current?: boolean;
}) {
  return (
    <div
      className={cn(
        "surface-card card-hover rounded-xl p-5 sm:p-7",
        current && "border-accent/40",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-medium",
            current
              ? "bg-accent text-white"
              : "border border-line bg-surface text-ink",
          )}
        >
          {item.period}
        </span>
        {current ? (
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Poste actuel
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {item.company}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent">{item.role}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        {item.description}
      </p>
    </div>
  );
}

export function Experience() {
  return (
    <Section
      id={sectionIds.experience}
      eyebrow="Expérience"
      index="04"
      title="Un parcours en continu"
      description="Trois environnements complémentaires : l’entreprise, l’indépendance et le développement produit."
      className="border-y border-line bg-surface"
    >
      <ol className="relative ml-1.5 space-y-6 border-l border-line pl-6 sm:ml-2 sm:space-y-8 sm:pl-10">
        {experiences.map((item, index) => (
          <li key={item.id} className="relative">
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-[-30.5px] top-7 h-3 w-3 rounded-full ring-4 ring-surface sm:left-[-46.5px]",
                index === 0
                  ? "bg-accent shadow-[0_0_0_4px_rgb(37_99_235/0.15)]"
                  : "bg-navy/30",
              )}
            />
            <Reveal delay={index * 70}>
              <ExperienceCard item={item} current={index === 0} />
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
