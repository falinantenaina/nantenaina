export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
};

export const experiences: ExperienceItem[] = [
  {
    id: "itad-mg",
    company: "ITAD.mg",
    role: "Développeur Full Stack",
    period: "2026 — aujourd’hui",
    description:
      "Participation au développement et à l’évolution d’une application immobilière, avec des fonctionnalités frontend et backend adaptées aux besoins des utilisateurs.",
  },
  {
    id: "freelance",
    company: "Freelance",
    role: "Développeur Web",
    period: "2022 — aujourd’hui",
    description:
      "Conception et développement de projets web : interfaces responsives, applications web, intégration frontend et fonctionnalités backend.",
  },
  {
    id: "smartone",
    company: "Smartone",
    role: "Développeur Web",
    period: "2019 — 2022",
    description:
      "Expérience de développement web dans un environnement d’entreprise BPO, avec une participation à la réalisation et à l’évolution de solutions web.",
  },
];
