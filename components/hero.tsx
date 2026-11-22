import { ActionLink } from "@/components/ui/action";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { hero, sectionIds } from "@/lib/data/site";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id={sectionIds.hero}
      aria-labelledby={`${sectionIds.hero}-title`}
      className="border-b border-line"
    >
      <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            {hero.eyebrow}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-8">
            <Reveal delay={70}>
              <h1
                id={`${sectionIds.hero}-title`}
                className="text-[2.5rem]/[1.05] font-semibold tracking-[-0.03em] text-ink sm:text-[3.5rem]/[1.03] lg:text-[4.25rem]/[1.02]"
              >
                {hero.titleLine1}
                <br />
                <span className="font-serif font-normal italic">
                  {hero.titleItalic}
                </span>
                <br />
                {hero.titleLine3}
              </h1>
            </Reveal>
          </div>

          <div className="min-w-0 flex flex-col justify-end lg:col-span-4">
            <Reveal delay={140}>
              <p className="max-w-md text-[15px]/[1.65] text-muted">
                {hero.description}
              </p>
              <div className="mt-7">
                <ActionLink
                  href={`#${sectionIds.contact}`}
                  variant="primary"
                  size="md"
                >
                  {hero.cta}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </ActionLink>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={210}>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            <span>{hero.metaLeft}</span>
            <span>{hero.metaRight}</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
