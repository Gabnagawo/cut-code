import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections/section-head";
import { PACKAGES, SERVICES } from "@/data/content";
import { quoteLinkProps } from "@/lib/link-props";

export function Services() {
  const [digitalPkg, eventPkg] = PACKAGES;

  return (
    <section id="servicos" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24">
      <SectionHead
        eyebrow="Serviços"
        title={
          <>
            Tudo o que sua marca precisa para <span className="text-iris">ser vista</span> e escolhida.
          </>
        }
        lead="Contrate cada serviço separadamente ou escolha um dos pacotes."
      />

      <div className="space-y-4 sm:space-y-6">
        {/* Pacote dominante: Digital completo (escuro, destacado) */}
        {digitalPkg && (
          <Reveal>
            <GlowCard
              tilt={2}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#1c1c20] text-paper shadow-[0_28px_64px_-20px_rgb(20_20_25/0.5)]"
            >
              <div className="grid items-center gap-8 p-6 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <span className="inline-block rounded-full bg-white/15 px-3.5 py-1.5 text-[0.7rem] font-medium tracking-[0.18em] text-paper uppercase backdrop-blur-xs">
                    {digitalPkg.badge}
                  </span>
                  <h3 className="font-display mt-6 text-[clamp(2.3rem,3.8vw,3.4rem)] leading-none text-paper">
                    {digitalPkg.title}
                  </h3>
                  <span className="mt-6 block h-px w-24 bg-white/20" />
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/75">{digitalPkg.description}</p>
                  <ul className="mt-6 grid gap-3 text-base text-paper/90 sm:grid-cols-2">
                    {digitalPkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-paper">
                          <Check aria-hidden className="size-3" strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant="cta-inverse"
                    className="group/btn mt-8 w-full sm:w-auto"
                  >
                    <a {...quoteLinkProps(digitalPkg.title, digitalPkg.whatsapp)}>
                      Pedir orçamento do pacote
                      <ArrowRight aria-hidden className="ml-2 size-4 transition-transform duration-150 group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="relative grid size-44 place-items-center rounded-full border border-white/20 bg-gradient-to-br from-white/15 to-white/5 p-4 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-md transition-transform duration-500 ease-glass group-hover/card:scale-105 sm:size-48">
                    <div className="text-paper">
                      <span className="font-display block text-5xl leading-none sm:text-6xl">{digitalPkg.highlight.big}</span>
                      <span className="mt-2 block text-xs font-medium tracking-[0.2em] text-paper/80 uppercase">{digitalPkg.highlight.small}</span>
                    </div>
                  </div>
                  <p className="text-sm tracking-[0.06em] text-paper/60">Sob consulta</p>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        )}

        {/* Pacote secundário: Eventos (compacto) */}
        {eventPkg && (
          <Reveal delay={90}>
            <GlowCard className="glass rounded-[24px] border border-hairline bg-white/60 p-6 sm:p-8">
              <div className="grid items-center gap-6 lg:grid-cols-[1.5fr_auto_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-hairline bg-white/80 px-3 py-1 text-[0.7rem] font-medium tracking-[0.16em] text-mist uppercase">
                      {eventPkg.badge}
                    </span>
                    <h3 className="font-heading text-2xl text-graphite sm:text-[1.75rem]">
                      {eventPkg.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">{eventPkg.description}</p>
                  <ul className="mt-4 grid gap-2.5 text-sm text-graphite sm:grid-cols-2">
                    {eventPkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-graphite/25 text-graphite">
                          <Check aria-hidden className="size-2.5" strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-center justify-center gap-1.5 border-t border-hairline pt-4 sm:border-t-0 sm:pt-0 lg:border-l lg:pl-8">
                  <div className="grid size-28 place-items-center rounded-full border border-hairline bg-white/90 p-2 text-center shadow-xs">
                    <div className="px-2 text-graphite">
                      <span className="font-heading block text-xl leading-tight font-bold whitespace-nowrap">{eventPkg.highlight.big}</span>
                      <span className="mt-0.5 block text-[0.62rem] font-medium tracking-[0.14em] text-mist uppercase">{eventPkg.highlight.small}</span>
                    </div>
                  </div>
                  <p className="text-xs tracking-wider text-mist">Sob consulta</p>
                </div>

                <div className="flex items-center justify-end">
                  <Button
                    asChild
                    variant="cta"
                    className="w-full sm:w-auto"
                  >
                    <a {...quoteLinkProps(eventPkg.title, eventPkg.whatsapp)}>
                      Pedir pacote
                      <ArrowRight aria-hidden className="ml-2 size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 90} className="h-full">
            <GlowCard
              as="a"
              {...quoteLinkProps(s.title, `Olá! Vim pelo site e quero um orçamento de: ${s.title}.`)}
              className="block h-full"
              aria-label={`${s.title}: pedir orçamento`}
            >
              <div className="flex h-full min-h-[320px] flex-col p-6 sm:p-8">
                <div className="mb-8 flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl border border-hairline bg-white/70 text-graphite shadow-[0_1px_0_#fff_inset] transition-all duration-300 ease-glass group-hover/card:-rotate-6 group-hover/card:scale-110 group-hover/card:border-transparent group-hover/card:bg-graphite group-hover/card:text-paper group-hover/card:shadow-[0_14px_30px_-10px_rgb(30_30_30/0.6)]">
                    <s.icon aria-hidden className="size-6" strokeWidth={1.5} />
                  </span>
                  <span aria-hidden className="font-display text-4xl text-graphite/10 transition-colors duration-300 group-hover/card:text-graphite/60">
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
