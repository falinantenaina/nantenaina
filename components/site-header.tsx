"use client";

import { Container } from "@/components/ui/container";
import { navigation } from "@/lib/data/navigation";
import { sectionIds, site } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(sectionIds.hero);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

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
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur-md">
      <nav aria-label="Navigation principale">
        <Container>
          <div className="flex h-14 items-center justify-between gap-4 lg:h-16">
            <a
              href={`#${sectionIds.hero}`}
              className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent"
              aria-label={`${site.fullName} — retour à l’accueil`}
            >
              {site.firstName} <span className="text-accent">/</span>
            </a>

            <ul className="hidden items-center gap-7 md:flex">
              {navigation.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors",
                        isActive ? "text-accent" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <button
              ref={toggleRef}
              type="button"
              className="grid h-10 w-10 place-items-center text-ink md:hidden"
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
        </Container>

        <div
          id="mobile-menu"
          hidden={!open}
          className="md:hidden"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="border-b border-line bg-canvas px-5 pb-8 pt-2 sm:px-8">
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
                        isActive ? "text-accent" : "text-ink hover:text-accent",
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
          </div>
        </div>
      </nav>
    </header>
  );
}
