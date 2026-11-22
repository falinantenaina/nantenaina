import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { approach, sectionIds } from "@/lib/data/site";

export function Approach() {
  return (
    <section
      id={sectionIds.approach}
      aria-labelledby={`${sectionIds.approach}-title`}
      className="border-b border-line"
    >
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                {approach.eyebrow}
              </p>
              <h2
                id={`${sectionIds.approach}-title`}
                className="mt-4 text-[2rem]/[1.1] font-semibold tracking-[-0.03em] text-ink sm:text-[2.5rem]/[1.08]"
              >
                {approach.titleLine1}
                <br />
                {approach.titleLine2}{" "}
                <span className="font-serif font-normal italic">
                  {approach.titleLine3}
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ol className="border-t border-line">
              {approach.steps.map((step, index) => (
                <li key={step.title} className="border-b border-line">
                  <Reveal delay={index * 70}>
                    <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 py-7">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-[17px]/[1.3] font-semibold text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-[14px]/[1.6] text-muted">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
