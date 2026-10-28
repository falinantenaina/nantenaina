"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Délai d’apparition en millisecondes. */
  delay?: number;
  /** Une seule fois : l’élément reste visible après le premier passage. */
  once?: boolean;
};

/**
 * Apparition discrète au défilement.
 * Le contenu est visible par défaut : seul un navigateur avec JavaScript ajoute
 * l’état « en attente », ce qui garantit que rien n’est jamais masqué sans script.
 */
export function Reveal({ children, className, delay = 0, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<"idle" | "ready" | "visible">("idle");

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setState("ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("visible");
            if (once) observer.disconnect();
          } else if (!once) {
            setState("ready");
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={state === "visible" && delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "reveal",
        state === "ready" && "reveal-pending",
        state === "visible" && "reveal-in",
        className,
      )}
    >
      {children}
    </div>
  );
}
