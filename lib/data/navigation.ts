import { sectionIds } from "@/lib/data/site";

export type NavItem = {
  label: string;
  href: string;
};

export const navigation: NavItem[] = [
  { label: "Projets", href: `#${sectionIds.projects}` },
  { label: "À propos", href: `#${sectionIds.about}` },
  { label: "Expérience", href: `#${sectionIds.experience}` },
  { label: "Compétences", href: `#${sectionIds.skills}` },
];
