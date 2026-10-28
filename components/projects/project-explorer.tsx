"use client";

import { useState } from "react";
import {
  projectCategories,
  projects,
  type ProjectCategoryId,
} from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";

type FilterId = ProjectCategoryId | "all";

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "Tous" },
  ...projectCategories,
];

export function ProjectExplorer() {
  const [active, setActive] = useState<FilterId>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(active));

  /** Projets phares d’abord, ordre d’origine conservé à l’intérieur de chaque groupe. */
  const visibleProjects = [...filtered].sort(
    (a, b) => Number(b.featured === true) - Number(a.featured === true),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filtrer les projets par catégorie"
          className="flex flex-wrap gap-2"
        >
          {filters.map((filter) => {
            const isActive = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(filter.id)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-white text-navy hover:border-navy/40 hover:text-accent",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p
          className="text-sm text-muted"
          role="status"
          aria-live="polite"
        >
          {visibleProjects.length}{" "}
          {visibleProjects.length > 1 ? "projets affichés" : "projet affiché"}
        </p>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <li
            key={project.slug}
            className={cn("h-full", project.featured && "md:col-span-2")}
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {visibleProjects.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-line px-6 py-12 text-center text-sm text-muted">
          Aucun projet dans cette catégorie pour le moment.
        </p>
      ) : null}
    </div>
  );
}
