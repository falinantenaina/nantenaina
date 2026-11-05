import { sectionIds } from "@/lib/data/site";
import { Section } from "@/components/ui/section";
import { ProjectCarousel } from "@/components/projects/project-carousel";
import { ActionLink } from "@/components/ui/action";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  return (
    <Section
      id={sectionIds.projects}
      eyebrow="Projets"
      index="03"
      title="Une sélection de mes projets"
      description={
        <>
          Une sélection de projets web menés en équipe ou en freelance, du site
          e&#8209;commerce à l’application complète.
        </>
      }
      headerAside={
        <ActionLink href="/projets" variant="secondary">
          Voir tous les projets <ArrowUpRight aria-hidden="true" className="size-4" />
        </ActionLink>
      }
      className="bg-surface"
    >
      <ProjectCarousel />
    </Section>
  );
}
