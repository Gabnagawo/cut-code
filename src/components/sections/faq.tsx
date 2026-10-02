import { ArrowRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections/section-head";
import { FAQ, hasWhatsapp, whatsappHref } from "@/data/content";
import { linkProps } from "@/lib/link-props";
import { cn } from "@/lib/utils";

/** Objeções respondidas antes do contato; <details> nativo funciona no teclado e no leitor de tela. */
export function Faq() {
  return (
    <section id="duvidas" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHead
            eyebrow="Dúvidas"
            title={
              <>
                Antes de <span className="text-iris">pedir</span> o orçamento.
              </>
            }
          />
          <Reveal delay={200} className="hidden lg:block">
            <p className="max-w-sm text-mist">{HELP_TEXT}</p>
            <FaqCta className="mt-6" />
          </Reveal>
        </div>

        <Reveal as="ul" delay={120} className="glass divide-y divide-hairline self-start rounded-[28px] px-4 sm:px-6">
          {FAQ.map(({ q, a }) => (
            <li key={q}>
              <details className="group/faq">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
                  <span className="font-heading text-xl leading-snug text-graphite sm:text-[1.375rem]">{q}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-graphite/15 text-graphite transition-transform duration-300 ease-[var(--ease-standard)] group-open/faq:rotate-45">
                    <Plus aria-hidden className="size-4" />
                  </span>
                </summary>
                <p className="max-w-[66ch] pb-6 text-mist">{a}</p>
              </details>
            </li>
          ))}
        </Reveal>

        <div className="lg:hidden">
          <p className="text-mist">{HELP_TEXT}</p>
          <FaqCta className="mt-4 w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}

const HELP_TEXT = hasWhatsapp()
  ? "Não achou sua pergunta? Mande no WhatsApp e a gente responde rápido."
  : "Não achou sua pergunta? Mande pelo formulário de contato e a gente responde rápido.";

function FaqCta({ className }: { className?: string }) {
  return (
    <Button
      asChild
      variant="cta"
      className={cn("group/btn", className)}
    >
      <a {...linkProps(whatsappHref("Olá! Vim pelo site da Cut Code e tenho uma dúvida."))}>
        {hasWhatsapp() ? "Tirar dúvida no WhatsApp" : "Enviar minha dúvida"}
        <ArrowRight aria-hidden className="ml-2 size-4 transition-transform duration-150 group-hover/btn:translate-x-1" />
      </a>
    </Button>
  );
}
