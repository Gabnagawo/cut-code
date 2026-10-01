import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlassBlob } from "@/components/ui/glass-blob";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections/section-head";
import { SERVICES, whatsappHref } from "@/data/content";
import { linkProps } from "@/lib/link-props";

export function Services() {
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24">
      <SectionHead
        eyebrow="Serviços"
        title={
          <>
            Tudo o que sua marca precisa para <span className="text-iris">ser vista</span> e escolhida.
          </>
        }
        lead="Contrate cada serviço separadamente ou leve o pacote completo com bônus."
      />

      <Reveal>
        <PackageCard />
      </Reveal>

      <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 90} className="h-full">
            <GlowCard
              as="a"
              {...linkProps(whatsappHref(`Olá! Vim pelo site e quero um orçamento de: ${s.title}.`))}
              className="block h-full"
              aria-label={`${s.title}: pedir orçamento`}
            >
              <div className="flex h-full min-h-[320px] flex-col p-6 sm:p-8">
                <div className="mb-8 flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl border border-hairline bg-white/70 text-graphite shadow-[0_1px_0_#fff_inset] transition-all duration-300 ease-glass group-hover/card:-rotate-6 group-hover/card:scale-110 group-hover/card:border-transparent group-hover/card:bg-graphite group-hover/card:text-paper group-hover/card:shadow-[0_14px_30px_-10px_rgb(30_30_30/0.6)]">
                    <s.icon aria-hidden className="size-6" strokeWidth={1.5} />
                  </span>
                  <span aria-hidden className="font-heading text-4xl text-graphite/10 transition-colors duration-300 group-hover/card:text-graphite/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-heading text-[1.75rem] leading-[1.1] text-graphite transition-transform duration-300 ease-glass group-hover/card:translate-x-1">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-mist transition-colors duration-300 group-hover/card:text-graphite/80">
                  {s.description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="rounded-full border border-hairline px-3 py-1 text-[0.7rem] font-medium tracking-[0.14em] text-mist uppercase transition-colors duration-300 group-hover/card:border-graphite/30 group-hover/card:text-graphite">
                    {s.tag}
                  </span>
                  <span className="flex items-center gap-2 text-sm font-medium text-graphite">
                    Pedir orçamento
                    <span className="grid size-10 place-items-center rounded-full border border-graphite/15 transition-all duration-300 ease-glass group-hover/card:rotate-45 group-hover/card:border-transparent group-hover/card:bg-graphite group-hover/card:text-paper">
                      <ArrowUpRight aria-hidden className="size-4" />
                    </span>
                  </span>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PackageCard() {
  return (
    <GlowCard tilt={3} className="bg-[radial-gradient(70%_120%_at_100%_50%,rgb(217_238_237/0.9),transparent_60%),linear-gradient(160deg,rgb(255_255_255/0.85),rgb(255_255_255/0.5))]">
      <div className="grid items-center gap-8 p-6 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="inline-block rounded-full bg-graphite px-3.5 py-1.5 text-[0.7rem] font-medium tracking-[0.18em] text-paper uppercase">
            Mais escolhido
          </span>
          <h3 className="font-heading mt-6 text-[clamp(2.3rem,3.8vw,3.4rem)] leading-none text-graphite">Pacote completo</h3>
          <span className="rule mt-6" />
          <p className="mt-6 max-w-lg text-mist">
            Site + 4 vídeos curtos de divulgação. Sua presença digital inteira, pronta em poucos dias, com o mesmo
            cuidado estético do começo ao fim.
          </p>
          <ul className="mt-6 grid gap-3 text-base text-graphite sm:grid-cols-2">
            {["Landing page guiada ou site completo", "4 vídeos curtos editados", "Prévia do site em até 1 semana", "Vídeos em até 2 dias úteis"].map(
              (item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-graphite/25 text-graphite">
                    <Check aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
          <Button
            asChild
            size="lg"
            className="group/btn mt-8 h-13 w-full rounded-full bg-graphite px-7 text-base text-paper sm:w-auto shadow-[0_14px_34px_-14px_rgb(30_30_30/0.7)] hover:bg-graphite-2"
          >
            <a {...linkProps(whatsappHref("Olá! Vim pelo site e quero um orçamento do pacote completo (site + vídeos)."))}>
              Pedir orçamento do pacote
              <ArrowRight aria-hidden className="ml-2 size-4 transition-transform duration-150 group-hover/btn:translate-x-1" />
            </a>
          </Button>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="relative grid aspect-square w-[min(260px,70vw)] place-items-center">
            <GlassBlob shape="ring" seed={2.3} interactive={false} className="absolute -inset-[48%]" />
            <div className="glass relative grid size-[62%] place-items-center rounded-full transition-transform duration-700 ease-glass group-hover/card:scale-110">
              <div className="text-center text-graphite">
                <span className="font-heading block text-[4.2rem] leading-none">+2</span>
                <span className="text-[0.68rem] font-medium tracking-[0.22em] uppercase">vídeos grátis</span>
              </div>
            </div>
          </div>
          <p className="text-sm tracking-[0.06em] text-mist">Sob consulta</p>
        </div>
      </div>
    </GlowCard>
  );
}
