import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ActionLink } from "@/components/ui/action";
import { Container } from "@/components/ui/container";
import { sectionIds, site } from "@/lib/data/site";

export function Hero() {
  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="accueil-title"
      className="scroll-mt-24"
    >
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <h1
              id="accueil-title"
              className="text-display mt-5 font-semibold text-ink"
            >
              Je transforme vos idées en applications web{" "}
              <span className="text-accent">modernes et performantes.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Je conçois et développe des sites web et des applications adaptés
              aux besoins des entreprises. Du frontend au backend, je privilégie
              des interfaces intuitives, des fonctionnalités fiables et un code
              maintenable.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ActionLink href={`#${sectionIds.projects}`} size="lg">
                Voir mes projets{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </ActionLink>
              <ActionLink
                href={`#${sectionIds.contact}`}
                variant="ghost"
                size="lg"
              >
                Me contacter
              </ActionLink>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-muted">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-success"
              />
              Disponible pour des missions freelance
            </p>
          </div>
          <figure className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-surface">
              <Image
                src={site.photo.src}
                alt={site.photo.alt}
                fill
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 90vw"
                className="object-cover object-top"
                preload
              />
            </div>
            <figcaption className="mt-4 text-sm text-muted">
              7+ ans d’expérience · Applications web et produits numériques
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
