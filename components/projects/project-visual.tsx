import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  Building2,
  Film,
  Home,
  Package,
  Palette,
  ShoppingBag,
} from "lucide-react";
import type { Project, ProjectVisualVariant } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const icons: Record<ProjectVisualVariant, LucideIcon> = {
  itad: Building2,
  housseni: Package,
  estatein: Home,
  movie: Film,
  swrynym: Palette,
  "3legant": ShoppingBag,
};

/**
 * Visuel d’une carte projet.
 * - `project.image` présent → capture réelle (next/image, ratio conservé).
 * - sinon → aperçu illustratif, composition graphique volontairement distincte
 *   d’une capture d’écran authentique.
 * Renseigner `image` dans `lib/data/projects.ts` suffit à basculer sur une
 * vraie capture déposée dans `public/images/projects/`.
 */
export function ProjectVisual({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  if (project.image) {
    return (
      <div
        className={cn(
          "relative aspect-16/10 w-full overflow-hidden border-b border-line bg-surface",
          className,
        )}
      >
        <Image
          src={project.image}
          alt={project.imageAlt ?? `Capture de l’interface du projet ${project.name}`}
          fill
          sizes="(min-width: 1024px) 720px, (min-width: 768px) 50vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    );
  }

  const Icon = icons[project.visual];
  const monogram = project.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 1);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-16/10 w-full overflow-hidden border-b border-line bg-surface",
        className,
      )}
    >
      <div className="preview-grid absolute inset-0 opacity-70" />
      <span className="absolute -right-8 -top-12 h-44 w-44 rounded-full bg-accent/10" />
      <span className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-navy/5" />

      <span className="pointer-events-none absolute -bottom-6 right-3 text-[7.5rem] font-semibold leading-none tracking-tighter text-navy/[0.07]">
        {monogram}
      </span>

      <div className="absolute inset-x-6 bottom-6 top-7 overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-2 h-2.5 flex-1 rounded-full bg-surface" />
        </div>

        <div className="flex h-[calc(100%-2.25rem)] flex-col gap-3 p-4">
          <div className="flex flex-1 items-center justify-center rounded-lg border border-line bg-surface/80">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-accent shadow-card">
              <Icon className="size-8" strokeWidth={1.5} />
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <span className="h-8 rounded-md border border-line bg-white" />
            <span className="h-8 rounded-md border border-line bg-white" />
            <span className="h-8 rounded-md border border-line bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
