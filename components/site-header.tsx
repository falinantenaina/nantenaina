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
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>(sectionIds.hero);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  /* Ombre au défilement + progression de lecture. */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 8);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Suivi de la section courante. */
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

  /* Tiroir mobile : scroll bloqué, Échap pour fermer, fermeture en grand écran. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Barre principale (le flou est ici, pas sur le <header>,
          pour que le tiroir « fixed » reste ancré à la fenêtre). */}
      <div
        className={cn(
          "relative border-b backdrop-blur-xl transition-colors duration-300",
          scrolled || open
            ? "border-line bg-canvas/85"
            : "border-transparent bg-canvas/40",
        )}
      >
        <Container>
          <nav
            aria-label="Navigation principale"
            className="flex h-16 items-center justify-between gap-4 lg:h-18"
          >
            <a
              href={`/#${sectionIds.hero}`}
              className="flex min-w-0 items-center gap-3"
              aria-label={`${site.fullName} — retour à l’accueil`}
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent font-display text-sm font-bold tracking-tight text-white"
              >
                {site.initials}
              </span>
              <span className="hidden min-w-0 flex-col leading-tight sm:flex">
                <span className="truncate font-display text-[15px] font-semibold tracking-tight text-ink">
                  {site.fullName}
                </span>
                <span className="truncate text-xs text-muted">{site.role}</span>
              </span>
              <span className="truncate font-display text-[15px] font-semibold tracking-tight text-ink sm:hidden">
                {site.firstName}
              </span>
            </a>

            <ul className="hidden items-center gap-2 lg:flex">
              {navigation.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={`/${item.href}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative inline-flex h-10 items-center px-3 text-sm font-medium transition-colors duration-200",
                        isActive ? "text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 bottom-1 h-0.5 origin-center rounded-full bg-accent transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-2">
              <ActionLink
                href="/#contact"
                size="sm"
                className="hidden lg:inline-flex"
              >
                Me contacter
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </ActionLink>

              <button
                ref={toggleRef}
                type="button"
                className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink transition-colors hover:border-accent/50 hover:text-accent lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="Ouvrir le menu"
                onClick={() => setOpen(true)}
              >
                <Menu aria-hidden="true" className="size-5" />
              </button>
            </div>
          </nav>
        </Container>

        {/* Barre de progression de lecture. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Fond assombri derrière le tiroir. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Tiroir mobile. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-70 flex w-[min(88vw,22rem)] flex-col border-l border-line bg-canvas shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <span className="font-display text-[15px] font-semibold text-ink">
            Menu
          </span>
          <button
            ref={closeRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink transition-colors hover:border-accent/50 hover:text-accent"
            aria-label="Fermer le menu"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-3 py-4">
          {navigation.map((item, index) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={`/${item.href}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-medium transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-ink hover:bg-accent/5",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-muted"
                  >
                    0{index + 1}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="shrink-0 border-t border-line p-5">
          <ActionLink
            href="/#contact"
            size="lg"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Me contacter
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </ActionLink>
        </div>
      </div>
    </header>
  );
}
