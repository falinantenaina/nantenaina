import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { contact, site } from "@/lib/data/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://nantenaina.is-a.dev";

const pageTitle = `${site.fullName} | ${site.role}`;
const pageDescription =
  "Portfolio de Falinantenaina Ranaivojaona, développeur web Full Stack : React, Next.js, TypeScript, Node.js, Express, Prisma et bases de données. Conception de sites web et d’applications sur mesure, missions freelance et opportunités professionnelles à distance.";

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
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Prisma",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.fullName,
    title: pageTitle,
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
  robots: {
    index: true,
    follow: true,
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
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
