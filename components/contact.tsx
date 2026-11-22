import { ContactForm } from "@/components/contact/contact-form";
import { ActionLink } from "@/components/ui/action";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { contact, sectionIds } from "@/lib/data/site";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <>
      <section
        id={sectionIds.contact}
        aria-labelledby={`${sectionIds.contact}-title`}
        className="bg-accent text-white"
      >
        <Container className="py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-8">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Un projet en tête ?
                </p>
                <h2
                  id={`${sectionIds.contact}-title`}
                  className="mt-4 text-[2rem]/[1.08] font-semibold tracking-[-0.03em] sm:text-[2.75rem]/[1.05] lg:text-[3.25rem]/[1.04]"
                >
                  Écrivez-moi.
                  <br />
                  Je réponds sous 48 h.
                </h2>
              </Reveal>
            </div>

            <div className="min-w-0 flex flex-col justify-end lg:col-span-4">
              <Reveal delay={70}>
                <p className="text-[15px]/[1.65] text-white/75">
                  Un premier échange pour cadrer votre besoin, sans engagement.
                  C’est moi qui lis et qui répond.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ActionLink
                    href={`mailto:${contact.email}`}
                    variant="onDark"
                    size="md"
                  >
                    Me contacter
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </ActionLink>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Formulaire de contact" className="border-b border-line">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-4">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Ou par formulaire
                </p>
                <h3 className="mt-4 text-[1.5rem]/[1.2] font-semibold tracking-[-0.02em] text-ink sm:text-[1.75rem]/[1.15]">
                  Envoyez-moi un message
                </h3>
                <p className="mt-4 text-[14px]/[1.65] text-muted">
                  Remplissez les champs ci-contre : le message part directement
                  dans ma boîte, sans passer par votre messagerie.
                </p>
              </Reveal>
            </div>
            <div className="min-w-0 lg:col-span-8">
              <Reveal delay={60}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
