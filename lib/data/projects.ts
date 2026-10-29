export type ProjectCategoryId = "web-apps" | "ecommerce" | "frontend";

export type ProjectCategory = {
  id: ProjectCategoryId;
  label: string;
};

export const projectCategories: ProjectCategory[] = [
  { id: "web-apps", label: "Applications web" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "frontend", label: "Frontend" },
];

export type ProjectVisualVariant =
  | "itad"
  | "housseni"
  | "estatein"
  | "movie"
  | "swrynym"
  | "3legant";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "site" | "download";
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  categories: ProjectCategoryId[];
  technologies: string[];
  links: ProjectLink[];

  image?: string;
  imageAlt?: string;
  visual: ProjectVisualVariant;
  featured?: boolean;
  note?: string;
  disclaimer?: string;
};

export const projects: Project[] = [
  {
    slug: "itad-trano",
    name: "ITAD Trano",
    description:
      "Application immobilière permettant de consulter des annonces de vente et de location, de faciliter les prises de rendez-vous et de proposer des fonctionnalités adaptées aux propriétaires et aux professionnels de l’immobilier.",
    categories: ["web-apps"],
    technologies: [],
    links: [
      { label: "Voir le site", href: "https://groupe-itad.com/", kind: "site" },
      {
        label: "Télécharger l’APK",
        href: "https://groupe-itad.com/download/itad.mg.apk",
        kind: "download",
      },
    ],
    visual: "itad",
    featured: true,
    image: "/images/projects/itad.webp",
    note: "Environ 18 000 téléchargements au cours du premier mois, selon les chiffres communiqués.",
    disclaimer: "Projet réalisé en équipe au sein d’ITAD.mg.",
  },
  {
    slug: "ets-housseni",
    name: "ETS Housseni",
    description:
      "Site e-commerce avec catalogue de produits, catégories et interface responsive.",
    categories: ["ecommerce"],
    technologies: ["React", "Vite", "Tailwind CSS", "MySQL"],
    links: [
      {
        label: "Voir le site",
        href: "https://ets-housseni.com/",
        kind: "site",
      },
    ],
    visual: "housseni",
    featured: true,
    image: "/images/projects/ets-housseni.webp",
    imageAlt:
      "Page d’accueil du site e-commerce ETS Housseni, avec le slogan « Tout le nécessaire pour construire, réparer et rénover » et la recherche de produits en en-tête.",
  },
  {
    slug: "estatein-mg",
    name: "Estatein MG",
    description:
      "Interface web immobilière moderne conçue pour présenter des biens et faciliter la navigation.",
    categories: ["frontend", "web-apps"],
    technologies: [],
    links: [
      {
        label: "Voir le site",
        href: "https://estatein-mg.netlify.app/",
        kind: "site",
      },
    ],
    visual: "estatein",
    image: "/images/projects/estatein-mg.webp",
    imageAlt:
      "Page d’accueil d’Estatein MG : interface immobilière sombre présentant un immeuble et les indicateurs du service.",
  },
  {
    slug: "movie-mg",
    name: "Movie MG",
    description:
      "Application de découverte de films avec une interface interactive et une intégration de l’API TMDB.",
    categories: ["web-apps"],
    technologies: ["React", "TypeScript", "Vite", "API TMDB"],
    links: [
      {
        label: "Voir le site",
        href: "https://movie-mg.vercel.app/",
        kind: "site",
      },
    ],
    visual: "movie",
    image: "/images/projects/movie-mg.webp",
    imageAlt:
      "Accueil de l’application Movie MG : grille d’affiches de films populaires et des dernières sorties.",
  },
  {
    slug: "swrynym",
    name: "SWRYNM",
    description:
      "Application développée avec Next.js, avec composants réutilisables et thèmes clair et sombre.",
    categories: ["web-apps", "frontend"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    links: [
      {
        label: "Voir le site",
        href: "https://swrnym.vercel.app/",
        kind: "site",
      },
    ],
    visual: "swrynym",
    image: "/images/projects/swrynym.webp",
    imageAlt:
      "Page d’accueil de SWRYNM : application de vente de voitures avec un véhicule en avant-première et le catalogue.",
  },
  {
    slug: "3legant",
    name: "3legant",
    description:
      "Projet frontend orienté e-commerce, avec une mise en page soignée et une présentation structurée des produits.",
    categories: ["ecommerce", "frontend"],
    technologies: ["React", "Vite"],
    links: [
      {
        label: "Voir le site",
        href: "https://3legant-roan.vercel.app/",
        kind: "site",
      },
    ],
    visual: "3legant",
    image: "/images/projects/3legant.webp",
    imageAlt:
      "Page d’accueil de 3legant, boutique en ligne d’équipement audio, avec l’appel à la découverte des produits.",
  },
];

export const projectsWithoutScreenshot: string[] = projects
  .filter((project) => !project.image)
  .map((project) => project.name);
