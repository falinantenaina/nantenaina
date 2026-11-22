export type Expertise = {
  id: string;
  index: string;
  title: string;
  description: string;
};

export const expertises: Expertise[] = [
  {
    id: "sites-web",
    index: "01",
    title: "Sites & interfaces web",
    description:
      "Des interfaces responsives et soignées pour présenter votre activité, valoriser votre savoir-faire et faciliter le contact avec vos clients.",
  },
  {
    id: "api-backend",
    index: "02",
    title: "API & logique serveur",
    description:
      "Des backends Node.js et Express solides : authentification, règles métier, intégrations. La mécanique invisible qui fait tourner votre outil.",
  },
  {
    id: "databases",
    index: "03",
    title: "Bases de données",
    description:
      "Conception et intégration de bases SQL et NoSQL pour stocker vos informations proprement et les retrouver rapidement.",
  },
  {
    id: "accompagnement",
    index: "04",
    title: "De l’idée à la mise en ligne",
    description:
      "Je vous accompagne du premier échange jusqu’au déploiement, puis au fil des évolutions de votre outil.",
  },
];
