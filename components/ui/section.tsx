import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

type SectionProps = {
  id: string;
  eyebrow?: string;
  /** Index éditorial de la section, affiché devant le surtitre (« 03 — Projets »). */
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Contenu placé à droite du titre sur grand écran. */
  headerAside?: ReactNode;
};

export function Section({
  id,
  eyebrow,
  index,
  title,
  description,
  children,
  className,
  headerAside,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-24 py-20 sm:py-24", className)}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {eyebrow ? (
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                {index ? (
                  <span aria-hidden="true" className="tabular-nums text-muted">
                    {index}
                  </span>
                ) : null}
                {index ? (
                  <span aria-hidden="true" className="text-muted/70">
                    —
                  </span>
                ) : null}
                <span className="text-accent">{eyebrow}</span>
              </p>
            ) : null}
            <h2
              id={`${id}-title`}
              className="mt-3 text-[1.75rem]/[1.16] font-semibold tracking-[-0.02em] text-navy sm:text-[2.125rem]/[1.14]"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-4 max-w-[38rem] text-[16px]/[1.65] text-muted sm:text-[17px]/[1.65]">
                {description}
              </p>
            ) : null}
          </div>
          {headerAside ? (
            <div className="lg:col-span-5 lg:justify-self-end">{headerAside}</div>
          ) : null}
        </div>
        <div className="mt-12">{children}</div>
      </Container>
    </section>
  );
}
