import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/data/projects";
import { sectionIds } from "@/lib/data/site";
import { ArrowUpRight } from "lucide-react";

function categoryLabel(id: string): string {
  const labels: Record<string, string> = {
    "web-apps": "Applications web",
    ecommerce: "E-commerce",
    frontend: "Frontend",
  };
  return labels[id] ?? id;
}

export function Projects() {
  return (
    <section
      id={sectionIds.projects}
      aria-labelledby={`${sectionIds.projects}-title`}
      className="border-b border-line"
    >
      <Container className="py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Réalisations
              </p>
              <h2
                id={`${sectionIds.projects}-title`}
                className="mt-4 text-[1.85rem]/[1.15] font-semibold tracking-[-0.02em] text-ink sm:text-[2.35rem]/[1.12]"
              >
                Mes projets en un coup d’œil.
              </h2>
            </Reveal>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <Reveal delay={70}>
              <p className="text-[14px]/[1.6] text-muted lg:text-right">
                Applications, sites e-commerce, interfaces : chaque projet
                répond à un besoin concret, identifié puis résolu.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-14 border-t border-line">
          {projects.map((project, index) => {
            const primaryLink =
              project.links.find((link) => link.kind === "site") ??
              project.links[0];
            return (
              <li key={project.slug} className="border-b border-line">
                <Reveal delay={index * 60}>
                  <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-6 md:py-10">
                    <div className="flex items-baseline gap-5 md:col-span-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                        0{index + 1}
                      </span>
                      <h3 className="text-[1.35rem]/[1.2] font-semibold tracking-[-0.02em] text-ink sm:text-[1.5rem]/[1.15]">
                        {primaryLink ? (
                          <a
                            href={primaryLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-1.5 transition-colors hover:text-accent"
                          >
                            {project.name}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="mt-1 size-4 shrink-0"
                            />
                          </a>
                        ) : (
                          project.name
                        )}
                      </h3>
                    </div>

                    <div className="min-w-0 md:col-span-5">
                      <p className="text-[14px]/[1.65] text-muted">
                        {project.description}
                      </p>
                      {primaryLink ? (
                        <a
                          href={primaryLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-[13px]/[1.5] font-medium text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
                        >
                          Découvrir le projet
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5"
                          />
                        </a>
                      ) : null}
                    </div>

                    <div className="md:col-span-3 md:text-right">
                      <span className="inline-flex rounded-full border border-line px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                        {categoryLabel(project.categories[0])}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
