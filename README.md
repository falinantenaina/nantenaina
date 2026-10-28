# Portfolio — Falinantenaina Ranaivojaona

Site vitrine personnel de **Falinantenaina Ranaivojaona**, développeur web Full Stack.
Une page unique, accessible et rapide, conçue pour présenter les compétences, les
projets réalisés et le parcours professionnel.

## Stack technique

| Domaine | Outils |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, `cacheComponents`) |
| Langage | TypeScript strict |
| UI | React 19, Tailwind CSS v4, Lucide React |
| Polices | `next/font/google` (Inter, auto-hébergée) |
| Déploiement | Vercel (prévu), Node.js ≥ 20.9 |

Seules quatre dépendances sont ajoutées au-delà du scaffold Next.js :
`lucide-react`, `clsx`, `tailwind-merge`. Aucune animation externe — les
apparitions au défilement sont réalisées avec `IntersectionObserver` et
désactivées automatiquement si `prefers-reduced-motion: reduce` est actif.

## Démarrage

```bash
npm install
npm run dev      # serveur de développement (http://localhost:3000)
npm run lint     # ESLint
npm run build    # build de production
npm start        # sert le build de production
```

Le typage est vérifié avec `npx tsc --noEmit` (il n'y a pas de script dédié).

## Structure

```
app/
  layout.tsx              polices, métadonnées SEO, en-tête, pied de page
  page.tsx                composition des sections
  globals.css             jetons de design (Tailwind v4 @theme)
  icon.svg                monogramme « FR »
  opengraph-image.tsx     carte de partage générée à la volée
components/
  site-header.tsx         navigation collante + menu mobile
  hero.tsx                présentation et photo
  about.tsx               domaine d'expertise
  skills.tsx              groupes de technologies
  projects/               filtres, grille, aperçus de projets
  experience.tsx          timeline professionnelle
  contact/                liens et formulaire
  site-footer.tsx
  ui/                     conteneur, section, boutons, révélations, icônes de marque
lib/
  data/                   **toutes les données éditables** (site, navigation, compétences, projets, expérience)
  utils.ts                helper `cn()` (clsx + tailwind-merge)
public/
  images/profile.jpg      photo personnelle
```

Tout le contenu éditorial (projets, compétences, expérience, coordonnées) est
centralisé dans `lib/data/`. Aucun texte métier n'est écrit dans les composants.

## Configuration avant publication

### 1. Coordonnées

Dans `lib/data/site.ts` :

```ts
export const contact = {
  email: "",      // ex. "contact@exemple.com" → active l'envoi du formulaire
  linkedin: "",   // ex. "https://www.linkedin.com/in/…" → affiche le lien
  github: "https://github.com/falinantenaina",
  portfolio: "https://nantenaina.is-a.dev/",
};
```

- Tant que `email` est vide, le formulaire valide les champs mais affiche un
  message explicite indiquant que l'envoi n'est pas encore activé (et un rappel
  discret est affiché au-dessus du formulaire).
- Tant que `linkedin` est vide, le lien LinkedIn est simplement masqué.
- Aucune coordonnée n'est inventée : ces deux champs sont volontairement vides.

### 2. URL du site

Dans `app/layout.tsx`, la constante `siteUrl` sert de `metadataBase` et alimente
les métadonnées de partage. À adapter si le domaine change.

### 3. Photo

`public/images/profile.jpg` — recadrée automatiquement en 4/5 (`object-cover`,
ancrage haut). Le texte alternatif est défini dans `lib/data/site.ts`
(`site.photo.alt`) et doit rester descriptif.

### 4. Captures d'écran des projets

Cinq projets utilisent de **vraies captures d'écran** des sites en production,
déposées dans `public/images/projects/` (WebP, 1600 × 1000 px, ~55–120 Ko) et
décrites par un texte alternatif dans `lib/data/projects.ts` (`image` +
`imageAlt`).

| Projet | Visuel |
| --- | --- |
| ETS Housseni | capture réelle |
| Estatein MG | capture réelle |
| Movie MG | capture réelle |
| SWRYNM | capture réelle |
| 3legant | capture réelle |
| ITAD Trano | **aperçu illustratif** |

ITAD Trano conserve un aperçu illustratif : `groupe-itad.com` répond en
`HTTP 429` sur ses bundles JS/CSS dès qu'une navigation automatisée est
détectée, ce qui laisse la page vide. Aucune capture n'a donc été fabriquée.
Un bandeau de mention s'affiche automatiquement dans la section Projets tant
qu'un projet manque de capture.

Pour ajouter ou remplacer une capture :

1. Déposer l'image dans `public/images/projects/` (WebP, 1600 × 1000 px,
   ratio 16:10 pour coller au `aspect-16/10` des cartes).
2. Renseigner `image` et `imageAlt` du projet correspondant dans
   `lib/data/projects.ts` :

```ts
{
  slug: "ets-housseni",
  // ...
  image: "/images/projects/ets-housseni.webp",
  imageAlt:
    "Page d’accueil du site e-commerce ETS Housseni, avec le slogan « Tout le nécessaire pour construire, réparer et rénover » et la recherche de produits en en-tête.",
}
```

Le repli sur l'aperçu illustratif est automatique : dès que `image` est absent,
`components/projects/project-visual.tsx` génère la composition graphique.

### 5. Favicon

`app/icon.svg` — monogramme « FR » sur fond bleu marine. Remplaçable par
`app/favicon.ico` ou `app/icon.png` si nécessaire.

## Envoi du formulaire de contact

Aucune dépendance tierce, aucun backend, aucune clé API. Le formulaire valide
les quatre champs côté client puis compose une URL `mailto:` avec l'objet et le
message préremplis, que la messagerie de l'utilisateur ouvre ensuite.

C'est un choix délibéré : pas de simulation d'envoi, pas de service payant à
configurer, pas de risque de perdre un message silencieusement.

Pour un envoi réel côté serveur, deux pistes :

- **Formspree / Resend / Brevo** — déposer un `app/api/contact/route.ts` qui
  reçoit le `POST` et relaie vers le fournisseur, puis remplacer le
  `window.location.href = mailto…` par un `fetch`.
- **Server Action** — marquer une fonction `"use server"` dans le composant de
  formulaire et l'appeler via `useActionState`.

Dans les deux cas, prévoir une protection anti-spam (honeypot ou clé secrète
Vercel) et une limite de débit.

## Accessibilité et performance

- Lien d'évitement vers le contenu principal, repères ARIA (`nav`, `aria-current`,
  `aria-pressed`, `aria-expanded`, `aria-live`).
- Menu mobile : fermeture par Échap, restitution du focus au bouton, verrouillage
  du scroll, cibles tactiles ≥ 44 px.
- Hiérarchie des titres respectée (un seul `h1`), labels explicites sur tous les
  champs de formulaire, messages d'erreur annoncés aux lecteurs d'écran.
- Contraste du texte secondaire vérifié à 4.76:1 et 5.17:1 sur fond blanc.
- Animations entièrement neutralisées sous `prefers-reduced-motion`.
- Page entièrement statique (prerender) : aucune donnée dynamique au rendu.

## Vérifications effectuées

- `npx tsc --noEmit` — 0 erreur
- `npx eslint .` — 0 erreur
- `npm run build` — build statique sans erreur
- Suite Playwright (Chrome réel, 41 tests) sur la build de production :
  navigation par ancres, filtres de projets, menu mobile, formulaire,
  absence d'erreur console, liens externes sécurisés, absence de débordement
  horizontal (390 px, 820 px, 1440 px), contraste, hiérarchie des titres.

Les tests navigateur ne sont pas versionnés (exécutés depuis un dossier temporaire)
pour ne pas ajouter de dépendance au projet.
