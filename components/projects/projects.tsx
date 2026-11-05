import { sectionIds } from "@/lib/data/site";
import { Section } from "@/components/ui/section";
import { ProjectExplorer } from "@/components/projects/project-explorer";

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
      className="bg-surface"
    >
      <ProjectExplorer />
    </Section>
  );
}
