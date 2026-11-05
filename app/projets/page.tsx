import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectExplorer } from "@/components/projects/project-explorer";

export const metadata: Metadata = {
  title: "Tous les projets",
  description: "Découvrez mes réalisations web : applications, e-commerce et interfaces frontend.",
  alternates: { canonical: "/projets" },
};

export default function ProjectsPage() {
  return (
    <Container className="py-12 sm:py-20">
      <Link href="/#projets" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
        <ArrowLeft aria-hidden="true" className="size-4" /> Retour à l’accueil
      </Link>
      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Tous les projets</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Mes réalisations en équipe et en freelance. Filtrez les projets par domaine.
      </p>
      <div className="mt-10"><ProjectExplorer /></div>
    </Container>
  );
}
