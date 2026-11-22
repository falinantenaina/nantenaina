import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { about, sectionIds } from "@/lib/data/site";

export function About() {
  return (
    <section
      id={sectionIds.about}
      aria-labelledby={`${sectionIds.about}-title`}
      className="border-b border-line"
    >
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                {about.eyebrow}
              </p>
              <h2
                id={`${sectionIds.about}-title`}
                className="mt-4 text-[2rem]/[1.1] font-semibold tracking-[-0.03em] text-ink sm:text-[2.5rem]/[1.08]"
              >
                {about.titleLine1}
                <br />
                {about.titleLine2}
              </h2>
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <Reveal delay={70}>
              <div className="space-y-5">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[15px]/[1.7] text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              <blockquote className="mt-10 border-l-2 border-accent pl-6">
                <p className="font-serif text-[1.5rem]/[1.3] italic text-ink sm:text-[1.75rem]/[1.25]">
                  « {about.quote} »
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
