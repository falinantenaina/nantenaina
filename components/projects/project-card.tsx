import { ProjectVisual } from "@/components/projects/project-visual";
import { ActionLink } from "@/components/ui/action";
import {
  projectCategories,
  type Project,
  type ProjectCategoryId,
} from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight, Download, Info, Star } from "lucide-react";

function categoryLabel(id: ProjectCategoryId): string {
  return projectCategories.find((category) => category.id === id)?.label ?? id;
}

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const featured = project.featured === true && !compact;
  const hasLinks = project.links.length > 0;

  return (
    <article
      className={cn(
        "surface-card group relative isolate flex h-full min-w-0 flex-col",
        "overflow-hidden rounded-2xl border border-line bg-surface",
        "transition-[transform,box-shadow,border-color] duration-300",
        "hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5",
        "focus-within:border-accent/50",
        "motion-safe:hover:-translate-y-1",
        "motion-reduce:transition-none",
        featured && "md:grid md:grid-cols-[1.05fr_1fr]",
      )}
    >
      {/* Visuel du projet */}
      <div
        className={cn(
          "relative isolate min-w-0 overflow-hidden bg-surface",
          featured && "md:h-full",
        )}
      >
        <ProjectVisual
          project={project}
          className={cn(
            "min-w-0",
            "transition-transform duration-700 ease-out",
            "motion-safe:group-hover:scale-[1.025]",
            "motion-reduce:transition-none",
            featured &&
              "md:aspect-auto md:h-full md:min-h-full md:border-b-0 md:border-r md:border-line",
          )}
        />

        {featured && (
          <span
            className={cn(
              "pointer-events-none absolute left-4 top-4 z-10",
              "inline-flex items-center gap-2 rounded-full",
              "border border-accent/25 bg-surface/95 px-3 py-1.5",
              "text-xs font-medium text-ink shadow-sm backdrop-blur-md",
              "sm:left-5 sm:top-5",
            )}
          >
            <Star
              aria-hidden="true"
              className="size-3.5 shrink-0 fill-accent/20 text-accent"
            />
            Projet à la une
          </span>
        )}
      </div>

      {/* Contenu */}
      <div
        className={cn(
          "relative flex min-w-0 flex-1 flex-col",
          featured ? "p-5 sm:p-8 lg:p-10" : "p-5 sm:p-6",
        )}
      >
        {/* Catégories */}
        {project.categories.length > 0 && (
          <ul
            aria-label="Catégories du projet"
            className="mb-4 flex flex-wrap items-center gap-2"
          >
            {project.categories.map((categoryId) => (
              <li
                key={categoryId}
                className={cn(
                  "max-w-full rounded-full border border-accent/15",
                  "bg-accent/5 px-2.5 py-1",
                  "wrap-break-word text-[10px] font-semibold uppercase",
                  "leading-relaxed tracking-widest text-ink/75",
                )}
              >
                {categoryLabel(categoryId)}
              </li>
            ))}
          </ul>
        )}

        {/* Titre et description */}
        <h3
          className={cn(
            "wrap-break-word font-semibold tracking-[-0.035em] text-ink",
            featured
              ? "text-2xl leading-tight sm:text-3xl"
              : "text-xl leading-tight sm:text-2xl",
          )}
        >
          {project.name}
        </h3>

        <p
          className={cn(
            "mt-3 wrap-break-word text-muted",
            featured ? "max-w-xl text-base leading-7" : "text-[15px] leading-7",
          )}
        >
          {project.description}
        </p>

        {/* Information complémentaire */}
        {project.note && (
          <div
            className={cn(
              "mt-5 flex items-start gap-3 rounded-xl",
              "border border-accent/20 bg-accent/5 p-4",
            )}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center",
                "rounded-lg bg-accent/10 text-accent",
              )}
            >
              <Info aria-hidden="true" className="size-4" />
            </span>

            <p className="min-w-0 wrap-break-word pt-0.5 text-sm leading-6 text-ink/85">
              {project.note}
            </p>
          </div>
        )}

        {project.disclaimer && (
          <p className="mt-3 wrap-break-word text-xs italic leading-5 text-muted">
            {project.disclaimer}
          </p>
        )}

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="mt-6">
            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Technologies
            </p>

            <ul
              aria-label="Technologies utilisées"
              className="flex flex-wrap gap-2"
            >
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className={cn(
                    "max-w-full rounded-lg border border-line",
                    "bg-surface px-2.5 py-1.5",
                    "wrap-break-word font-mono text-[11px] leading-4 text-ink/80",
                  )}
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions alignées en bas de carte */}
        {hasLinks && (
          <div className="mt-auto pt-6">
            <ul
              aria-label={`Liens du projet ${project.name}`}
              className="flex flex-wrap items-center gap-3 border-t border-line pt-5"
            >
              {project.links.map((link, index) => {
                const isExternal = /^(https?:)?\/\//i.test(link.href);
                const isDownload = link.kind === "download";

                const Icon = isDownload
                  ? Download
                  : isExternal
                    ? ArrowUpRight
                    : ArrowRight;

                return (
                  <li
                    key={`${link.href}-${index}`}
                    className="min-w-0 max-w-full"
                  >
                    <ActionLink
                      href={link.href}
                      variant="secondary"
                      size="sm"
                      aria-label={`${link.label} — ${project.name}${
                        isExternal ? " (nouvel onglet)" : ""
                      }`}
                      {...(isExternal
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                    >
                      <Icon aria-hidden="true" className="size-4 shrink-0" />
                      <span className="min-w-0 whitespace-normal wrap-break-word text-left">
                        {link.label}
                      </span>
                    </ActionLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
