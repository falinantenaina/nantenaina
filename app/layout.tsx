import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contact, site } from "@/lib/data/site";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://nantenaina.com";

const pageTitle = `${site.fullName} | ${site.role}`;
const pageDescription =
  "Portfolio de Nantenaina Ranaivojaona, développeur web Full Stack freelance à Madagascar, développeur web Full Stack : React, Next.js, TypeScript, Node.js, Express, Prisma et bases de données. Conception de sites web et d’applications sur mesure, missions freelance et opportunités professionnelles à distance.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s | ${site.fullName}`,
  },
  description: pageDescription,
  applicationName: site.fullName,
  authors: [{ name: site.fullName, url: contact.portfolio }],
  keywords: [
    "développeur web",
    "développeur full stack",
    "développeur freelance",
    "développeur web Madagascar",
    "développeur web Antananarivo",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Prisma",
    "création site web Madagascar",
    "portfolio",
  ],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: site.fullName,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: `/og-image.jpg`,
        width: 1356,
        height: 751,
        alt: `Portfolio de ${site.fullName}, Développeur Web Full Stack`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#172B4D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex min-h-full flex-col bg-canvas text-ink antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Aller au contenu principal
        </a>

        <SiteHeader />

        <main id="contenu" className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
