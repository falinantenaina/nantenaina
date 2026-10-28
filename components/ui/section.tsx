import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

type SectionProps = {
  id: string;
  eyebrow?: string;
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </p>
            ) : null}
            <h2
              id={`${id}-title`}
              className="mt-3 text-3xl font-semibold tracking-tight text-navy sm:text-4xl"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
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
