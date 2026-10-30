"use client";

import { ActionLink } from "@/components/ui/action";
import { Container } from "@/components/ui/container";
import { navigation } from "@/lib/data/navigation";
import { sectionIds, site } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(sectionIds.hero);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  /* Suivi de la section courante pour la navigation. */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const current = navigation
          .map((item) => item.href.slice(1))
          .find((id) => visible.get(id));
        if (current) setActiveSection(current);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const item of navigation) {
      const element = document.getElementById(item.href.slice(1));
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  /* Ouverture / fermeture du menu mobile. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <nav aria-label="Navigation principale">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-18">
            <a
              href={`#${sectionIds.hero}`}
              className="group flex items-center gap-3 rounded-md"
              aria-label={`${site.fullName} — retour à l’accueil`}
            >
              <span
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy text-sm font-semibold tracking-tight text-white transition-colors duration-200 group-hover:bg-accent"
              >
                {site.initials}
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-navy">
                {site.firstName}
              </span>
            </a>

            <ul className="hidden items-center gap-7 lg:flex">
              {navigation.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "link-underline rounded-sm py-1.5 text-sm font-medium transition-colors duration-200",
                        isActive ? "text-accent" : "text-muted hover:text-navy",
                      )}
                      data-active={isActive}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <ActionLink
                href="#contact"
                variant="primary"
                size="sm"
                className="hidden lg:inline-flex"
              >
                Parlons de votre projet
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </ActionLink>

              <button
                ref={toggleRef}
                type="button"
                className="grid h-11 w-11 place-items-center rounded-lg border border-line text-navy transition-colors hover:border-navy/40 hover:text-accent lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? (
                  <X aria-hidden="true" className="size-5" />
                ) : (
                  <Menu aria-hidden="true" className="size-5" />
                )}
              </button>
            </div>
          </div>
        </Container>

        <div
          id="mobile-menu"
          hidden={!open}
          className="lg:hidden"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="border-b border-line bg-white px-5 pb-8 pt-2 shadow-card sm:px-8">
            <ul className="flex flex-col divide-y divide-line">
              {navigation.map((item, index) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-4 text-base font-medium transition-colors",
                        isActive
                          ? "text-accent"
                          : "text-navy hover:text-accent",
                      )}
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-xs text-muted">
                        0{index + 1}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <ActionLink
              href="#contact"
              variant="primary"
              size="md"
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Parlons de votre projet
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </ActionLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
