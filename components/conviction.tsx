import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { conviction } from "@/lib/data/site";

export function Conviction() {
  return (
    <section className="bg-dark text-white">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-4">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                {conviction.eyebrow}
              </p>
            </Reveal>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <Reveal delay={70}>
              <h2 className="text-[1.85rem]/[1.18] font-semibold tracking-[-0.02em] sm:text-[2.5rem]/[1.12] lg:text-[2.85rem]/[1.1]">
                {conviction.titleStart}{" "}
                <span className="font-serif font-normal italic text-white/90">
                  {conviction.titleItalic}
                </span>
              </h2>
              <p className="mt-7 max-w-xl text-[15px]/[1.65] text-white/60">
                {conviction.description}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
