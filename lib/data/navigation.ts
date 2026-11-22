import { sectionIds } from "@/lib/data/site";

export type NavItem = {
  label: string;
  href: string;
};

export const navigation: NavItem[] = [
  { label: "Expertises", href: `#${sectionIds.expertises}` },
  { label: "Projets", href: `#${sectionIds.projects}` },
  { label: "Approche", href: `#${sectionIds.approach}` },
  { label: "Contact", href: `#${sectionIds.contact}` },
];
