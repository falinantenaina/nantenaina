import { experiences, type ExperienceItem } from "@/lib/data/experience";
import { sectionIds } from "@/lib/data/site";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function Marker({ muted = false }: { muted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute left-0 top-7 grid h-4 w-4 place-items-center rounded-full ring-4 ring-white sm:left-1",
        muted ? "bg-navy" : "bg-accent",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
    </span>
  );
}

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
        "rounded-xl border bg-white p-6 transition-colors duration-200 sm:p-7",
        current ? "border-accent/30" : "border-line hover:border-accent/35",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
            current ? "bg-accent/10 text-accent" : "bg-surface text-navy",
          )}
        >
          {item.period}
        </span>
        {current ? (
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Poste actuel
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-navy">
        {item.company}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent">{item.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
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
      className="border-b border-line bg-surface/45"
    >
      <ol className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-2 top-3 w-px bg-gradient-to-b from-accent/60 via-line to-transparent sm:left-3"
        />

        {experiences.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "relative pl-9 sm:pl-12",
              index < experiences.length - 1 ? "pb-10 sm:pb-12" : "pb-0",
            )}
          >
            <Marker muted={index > 0} />
            <Reveal delay={index * 70}>
              <ExperienceCard item={item} current={index === 0} />
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}