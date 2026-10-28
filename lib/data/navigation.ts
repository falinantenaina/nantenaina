import { sectionIds } from "@/lib/data/site";

export type NavItem = {
  label: string;
  href: string;
};

export const navigation: NavItem[] = [
  { label: "Accueil", href: `#${sectionIds.hero}` },
  { label: "À propos", href: `#${sectionIds.about}` },
  { label: "Compétences", href: `#${sectionIds.skills}` },
  { label: "Projets", href: `#${sectionIds.projects}` },
  { label: "Expérience", href: `#${sectionIds.experience}` },
  { label: "Contact", href: `#${sectionIds.contact}` },
];
