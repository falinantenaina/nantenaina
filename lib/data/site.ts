export const site = {
  initials: "FR",
  firstName: "Falinantenaina",
  fullName: "Falinantenaina Ranaivojaona",
  role: "Développeur Web Full Stack",
  photo: {
    src: "/images/profile.jpg",
    alt: "Portrait de Falinantenaina Ranaivojaona, développeur web full stack, portant une veste bleu marine.",
  },
} as const;

/**
 * Coordonnées à configurer avant publication.
 * Laisser une chaîne vide masque le lien correspondant côté interface.
 */
export const contact = {
  /** Ex. "contact@exemple.com" */
  email: "",
  /** Ex. "https://www.linkedin.com/in/…" */
  linkedin: "",
  github: "https://github.com/falinantenaina",
  portfolio: "https://nantenaina.is-a.dev/",
} as const;

export const sectionIds = {
  hero: "accueil",
  about: "a-propos",
  skills: "competences",
  projects: "projets",
  experience: "experience",
  contact: "contact",
} as const;
