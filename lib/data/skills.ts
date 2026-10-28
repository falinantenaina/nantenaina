export type SkillGroupId =
  | "frontend"
  | "state"
  | "backend"
  | "databases"
  | "tooling";

export type SkillGroup = {
  id: SkillGroupId;
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    id: "state",
    title: "État et données frontend",
    items: ["Zustand", "TanStack Query", "Axios", "Fetch API"],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "API REST",
      "JWT",
      "Cookies",
      "Prisma",
    ],
  },
  {
    id: "databases",
    title: "Bases de données",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    id: "tooling",
    title: "Outils",
    items: ["Git", "GitHub", "Vercel", "Railway", "cPanel", "Cloudinary"],
  },
];

export const expertiseDomains = [
  {
    id: "expertise-frontend",
    icon: "layout",
    title: "Frontend",
    description: "Interfaces modernes et responsives.",
  },
  {
    id: "expertise-backend",
    icon: "server",
    title: "Backend",
    description: "API et logique métier.",
  },
  {
    id: "expertise-databases",
    icon: "database",
    title: "Bases de données",
    description: "Intégration et gestion de données SQL et NoSQL.",
  },
] as const;
