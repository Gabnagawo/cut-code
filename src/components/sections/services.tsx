import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections/section-head";
import { SERVICES } from "@/data/content";

export function Services() {
  return (
    <section id="servicos" className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-28 sm:px-6 sm:pt-36">
      <SectionHead
        eyebrow="Serviços"
        title={
          <>
            Tudo o que sua marca precisa para <em className="text-sheen">ser vista</em> e escolhida.
          </>
        }
        lead="Contrate cada serviço separadamente ou leve o pacote completo com bônus."
      />

      <Reveal>
        <PackageCard />
      </Reveal>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 90} className="h-full">
            <GlowCard as="a" href="#contato" className="block h-full" aria-label={`${s.title}: pedir orçamento`}>
              <div className="flex h-full min-h-[320px] flex-col p-7 sm:p-8">
                <div className="mb-10 flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/[0.07] shadow-[inset_0_1px_0_rgb(255_255_255/0.2)] transition-all duration-500 ease-glass group-hover/card:-rotate-6 group-hover/card:scale-110 group-hover/card:border-transparent group-hover/card:bg-bone group-hover/card:text-ink group-hover/card:shadow-[0_12px_40px_-8px_rgb(201_195_255/0.8)]">
                    <s.icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="font-serif text-4xl text-white/10 transition-colors duration-500 group-hover/card:text-pearl/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-serif text-[1.85rem] leading-[1.1] transition-transform duration-500 ease-glass group-hover/card:translate-x-1">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-mist transition-colors duration-500 group-hover/card:text-bone/80">
                  {s.description}
                </p>

                <div className="mt-7 flex items-center justify-between">
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.7rem] tracking-[0.16em] text-mist uppercase transition-colors duration-500 group-hover/card:border-pearl/40 group-hover/card:text-pearl">
                    {s.tag}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-bone">
                    <span className="translate-x-3 opacity-0 transition-all duration-500 ease-glass group-hover/card:translate-x-0 group-hover/card:opacity-100">
                      Pedir orçamento
                    </span>
                    <span className="grid size-10 place-items-center rounded-full border border-white/15 transition-all duration-500 ease-glass group-hover/card:rotate-45 group-hover/card:border-transparent group-hover/card:bg-bone group-hover/card:text-ink">
                      <ArrowUpRight className="size-4" />
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
    <GlowCard tilt={3} glow="rgb(159 216 255 / 0.16)" className="bg-[linear-gradient(140deg,rgb(201_195_255/0.16),rgb(255_255_255/0.03)_50%,rgb(159_216_255/0.12))]">
      <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="inline-block rounded-full border border-pearl/30 bg-pearl/15 px-3.5 py-1.5 text-[0.7rem] tracking-[0.2em] text-pearl uppercase">
            Mais escolhido
          </span>
          <h3 className="mt-6 font-serif text-[clamp(2.2rem,3.6vw,3.2rem)] leading-none">Pacote completo</h3>
          <p className="mt-4 max-w-lg text-mist">
            Site + 4 vídeos curtos de divulgação. Sua presença digital inteira, pronta em poucos dias, com o mesmo
            cuidado estético do começo ao fim.
          </p>
          <ul className="mt-7 grid gap-3 text-[0.95rem] sm:grid-cols-2">
            {["Landing page guiada ou site completo", "4 vídeos curtos editados", "Prévia do site em até 1 semana", "Vídeos em até 2 dias úteis"].map(
              (item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-pearl to-ice text-ink">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
          <Button
            asChild
            size="lg"
            className="group/btn mt-9 h-13 rounded-full bg-bone px-7 text-ink shadow-[0_10px_30px_-10px_rgb(201_195_255/0.6)] hover:bg-white"
          >
            <a href="#contato">
              Quero o pacote
              <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
            </a>
          </Button>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="relative grid aspect-square w-[min(250px,70vw)] place-items-center rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255/0.3),rgb(201_195_255/0.12)_45%,rgb(159_216_255/0.08))] shadow-[0_40px_80px_-30px_rgb(91_75_214/0.75),inset_0_2px_2px_rgb(255_255_255/0.4),inset_0_-18px_40px_rgb(159_216_255/0.12)] transition-transform duration-700 ease-glass animate-float group-hover/card:scale-105">
            <span className="absolute inset-3 rounded-full border border-dashed border-white/15 transition-transform duration-[2s] ease-glass group-hover/card:rotate-180" />
            <div className="text-center">
              <span className="block font-serif text-[5.5rem] leading-none">+2</span>
              <span className="text-[0.75rem] tracking-[0.26em] uppercase">vídeos grátis</span>
            </div>
          </div>
          <p className="text-sm tracking-[0.08em] text-mist">Sob consulta</p>
        </div>
      </div>
    </GlowCard>
  );
}
