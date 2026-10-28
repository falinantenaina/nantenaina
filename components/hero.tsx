import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { sectionIds, site } from "@/lib/data/site";
import { ActionLink } from "@/components/ui/action";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section
      id={sectionIds.hero}
      aria-labelledby={`${sectionIds.hero}-title`}
      className="scroll-mt-24 border-b border-line bg-canvas"
    >
      <Container className="py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                Développeur web Full Stack
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1
                id={`${sectionIds.hero}-title`}
                className="mt-7 text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem] lg:leading-[1.06]"
              >
                Je transforme vos idées en applications web{" "}
                <span className="text-accent">modernes et performantes.</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Je conçois et développe des sites web et des applications adaptés aux
                besoins des entreprises. Du frontend au backend, je privilégie des
                interfaces intuitives, des fonctionnalités fiables et un code
                maintenable.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ActionLink href={`#${sectionIds.projects}`} size="lg" className="sm:w-auto">
                  Découvrir mes projets
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ActionLink>
                <ActionLink
                  href={`#${sectionIds.contact}`}
                  variant="secondary"
                  size="lg"
                  className="sm:w-auto"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  Me contacter
                </ActionLink>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <p className="mt-8 flex items-start gap-2.5 text-sm text-muted">
                <span
                  aria-hidden="true"
                  className="ticker-dot mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                />
                Ouvert aux missions freelance et aux opportunités professionnelles.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120} className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <span
                aria-hidden="true"
                className="absolute -right-3 -top-3 bottom-8 left-8 hidden rounded-3xl bg-surface sm:block"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-6 -left-6 h-28 w-28 rounded-3xl border border-accent/25"
              />
              <div className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
                <div className="relative aspect-4/5 w-full">
                  <Image
                    src={site.photo.src}
                    alt={site.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 440px, calc(100vw - 40px)"
                    className="object-cover object-top"
                    preload
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-line bg-white px-4 py-3">
                  <span className="text-xs font-medium text-navy">
                    {site.fullName}
                  </span>
                  <span className="text-xs text-muted">Full Stack</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
