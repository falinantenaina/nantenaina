import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { expertises } from "@/lib/data/expertises";
import { sectionIds } from "@/lib/data/site";

export function Expertises() {
  return (
    <section
      id={sectionIds.expertises}
      aria-labelledby={`${sectionIds.expertises}-title`}
      className="border-b border-line"
    >
      <Container className="py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="min-w-0 lg:col-span-8">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Mes domaines
              </p>
              <h2
                id={`${sectionIds.expertises}-title`}
                className="mt-4 text-[1.85rem]/[1.15] font-semibold tracking-[-0.02em] text-ink sm:text-[2.35rem]/[1.12]"
              >
                Du frontend au backend.
              </h2>
            </Reveal>
          </div>
          <div className="min-w-0 lg:col-span-4">
            <Reveal delay={70}>
              <p className="text-[14px]/[1.6] text-muted lg:text-right">
                Un besoin précis, une idée à explorer ou un outil qui ne suit
                plus ? On part de votre réalité, pas d’un catalogue figé de
                prestations.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {expertises.map((expertise, index) => (
            <Reveal
              key={expertise.id}
              delay={index * 70}
              className="min-w-0 bg-canvas"
            >
              <article className="flex h-full flex-col px-0 pt-8 pb-2 sm:px-6 sm:first:pl-0 lg:px-7 lg:first:pl-0">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  {expertise.index}
                </span>
                <h3 className="mt-5 text-[17px]/[1.3] font-semibold tracking-[-0.01em] text-ink">
                  {expertise.title}
                </h3>
                <p className="mt-3 text-[14px]/[1.6] text-muted">
                  {expertise.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
