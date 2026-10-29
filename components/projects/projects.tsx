import { sectionIds } from "@/lib/data/site";
import { projects, projectsWithoutScreenshot } from "@/lib/data/projects";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectExplorer } from "@/components/projects/project-explorer";

export function Projects() {
  return (
    <Section
      id={sectionIds.projects}
      eyebrow="Projets"
      index="03"
      title="Des réalisations concrètes"
      description={
        <>
          Une sélection de projets web menés en équipe ou en freelance, du site
          e&#8209;commerce à l’application complète.
        </>
      }
      headerAside={
        projectsWithoutScreenshot.length > 0 ? (
          <Reveal>
            <p className="max-w-xs rounded-xl border border-line bg-surface px-4 py-3 text-xs leading-relaxed text-muted lg:text-right">
              {projectsWithoutScreenshot.length === projects.length
                ? "Les visuels ci-dessous sont des aperçus illustratifs. De véritables captures d’écran pourront y être ajoutées ultérieurement."
                : `Aperçu illustratif pour ${projectsWithoutScreenshot.join(", ")} : le site bloque toute capture automatisée. Les autres visuels sont de véritables captures d’écran.`}
            </p>
          </Reveal>
        ) : null
      }
      className="border-b border-line"
    >
      <ProjectExplorer />
    </Section>
  );
}
