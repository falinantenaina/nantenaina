import { ArrowUpRight, Download, Star } from "lucide-react";
import {
  projectCategories,
  type Project,
  type ProjectCategoryId,
} from "@/lib/data/projects";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ActionLink } from "@/components/ui/action";
import { cn } from "@/lib/utils";

function categoryLabel(id: ProjectCategoryId): string {
  return projectCategories.find((category) => category.id === id)?.label ?? id;
}

export function ProjectCard({ project }: { project: Project }) {
  const featured = project.featured === true;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 hover:shadow-card",
        featured
          ? "border-accent/35 hover:border-accent/60 md:grid md:grid-cols-[1.05fr_1fr]"
          : "border-line hover:border-accent/40",
      )}
    >
      <ProjectVisual
        project={project}
        className={cn(
          featured && "md:aspect-auto md:h-full md:min-h-full md:border-b-0 md:border-r md:border-line",
        )}
      />

      <div
        className={cn(
          "flex flex-1 flex-col",
          featured ? "justify-center p-6 sm:p-8 lg:p-10" : "p-6",
        )}
      >
        <ul className="flex flex-wrap items-center gap-2">
          {featured ? (
            <li className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
              <Star aria-hidden="true" className="size-3" fill="currentColor" />
              Projet phare
            </li>
          ) : null}
          {project.categories.map((categoryId) => (
            <li
              key={categoryId}
              className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy"
            >
              {categoryLabel(categoryId)}
            </li>
          ))}
        </ul>

        <h3
          className={cn(
            "mt-4 font-semibold tracking-[-0.015em] text-navy",
            featured ? "text-2xl/[1.2] sm:text-[1.75rem]/[1.18]" : "text-xl/[1.25]",
          )}
        >
          {project.name}
        </h3>

        <p
          className={cn(
            "mt-3 text-muted",
            !featured && "flex-1",
            featured ? "max-w-[36rem] text-[16px]/[1.62]" : "text-[15px]/[1.6]",
          )}
        >
          {project.description}
        </p>

        {project.note ? (
          <p className="mt-5 max-w-[36rem] rounded-lg border border-line bg-surface px-4 py-3 text-[14px]/[1.55] text-navy">
            {project.note}
          </p>
        ) : null}

        {project.disclaimer ? (
          <p className="mt-2 text-[13px]/[1.55] text-muted italic">
            {project.disclaimer}
          </p>
        ) : null}

        {project.technologies.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded border border-line px-2 py-1 text-xs font-medium text-navy"
              >
                {technology}
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
          {project.links.map((link) => (
            <li key={link.href}>
              <ActionLink
                href={link.href}
                variant="secondary"
                size="sm"
                aria-label={`${link.label} — ${project.name} (nouvel onglet)`}
                className="transition-colors group-hover:border-accent/45"
              >
                {link.kind === "download" ? (
                  <Download aria-hidden="true" className="size-3.5" />
                ) : (
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                )}
                {link.label}
              </ActionLink>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
