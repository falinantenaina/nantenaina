export const site = {
  initials: "NR",
  firstName: "Nantenaina",
  fullName: "Nantenaina Ranaivojaona",
  role: "Développeur Web Full Stack",
} as const;

export const contact = {
  email: "contact@nantenaina.com",
  linkedin: "https://www.linkedin.com/in/falinantenaina-ranaivojaona-42ba8133b",
  github: "https://github.com/falinantenaina",
  portfolio: "https://nantenaina.com",
} as const;

export const sectionIds = {
  hero: "accueil",
  expertises: "expertises",
  projects: "projets",
  approach: "approche",
  about: "a-propos",
  contact: "contact",
} as const;

export const hero = {
  eyebrow: "Développeur web Full Stack",
  titleLine1: "Je transforme vos idées",
  titleItalic: "en applications web",
  titleLine3: "modernes et performantes.",
  description:
    "Je conçois et développe des sites web et des applications adaptés aux besoins des entreprises. Du frontend au backend, je privilégie des interfaces intuitives, des fonctionnalités fiables et un code maintenable.",
  cta: "Démarrer un projet",
  metaLeft: "React · Node.js · Full Stack",
  metaRight: "Madagascar · Freelance",
} as const;

export const conviction = {
  eyebrow: "Ce en quoi je crois",
  titleStart:
    "Je ne livre pas des démos techniques. Je livre des outils qui tiennent la route, parce que tout part de votre",
  titleItalic: "réalité.",
  description:
    "Votre métier, vos contraintes, vos habitudes de travail : c’est le point de départ. Mon rôle est de traduire tout cela en un outil clair et durable — un outil que votre équipe comprendra encore dans six mois.",
} as const;

export const about = {
  eyebrow: "Derrière le code",
  titleLine1: "Un développeur",
  titleLine2: "orienté solutions.",
  paragraphs: [
    "Je m’appelle Nantenaina Ranaivojaona. J’écris du code depuis 2019, d’abord en entreprise, puis en indépendant. Cette expérience m’a appris qu’un bon outil se juge à ce qu’il change dans le quotidien de ceux qui l’utilisent — pas au nombre de bibliothèques qu’il contient.",
    "Basé à Madagascar, je collabore à distance avec des entreprises et des indépendants. Vous échangez directement avec moi : j’explique mes choix, je montre l’avancement au fil des étapes, et je reste joignable après la mise en ligne.",
  ],
  quote:
    "Mieux vaut un outil simple qui tourne, qu’une architecture impressionnante qu’on n’ose plus toucher.",
} as const;

export const approach = {
  eyebrow: "Comment ça se passe",
  titleLine1: "Un cadre clair,",
  titleLine2: "des étapes",
  titleLine3: "concises.",
  steps: [
    {
      title: "Cadrer le besoin",
      description:
        "On échange sur votre activité, vos contraintes et vos délais. Objectif : un périmètre clair, sans surprise en cours de route.",
    },
    {
      title: "Montrer une première version",
      description:
        "Je livre un prototype rapidement pour valider la direction avant d’investir du temps et du budget.",
    },
    {
      title: "Développer par étapes",
      description:
        "Vous voyez l’avancement régulièrement et on ajuste ensemble au fil de l’eau, plutôt qu’en fin de course.",
    },
    {
      title: "Livrer et accompagner",
      description:
        "Mise en ligne, prise en main, et je reste disponible pour les évolutions de votre outil.",
    },
  ],
} as const;
