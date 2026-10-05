import { ArrowUpRight, Check } from "lucide-react";

import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections/section-head";
import { PACKAGES, SERVICES } from "@/data/content";
import { quoteLinkProps } from "@/lib/link-props";
import { cn } from "@/lib/utils";

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
        lead="Cada projeto parte da identidade, do público e dos objetivos da marca para transformar informação em uma experiência digital clara, estratégica e visualmente consistente."
      />

      {/* Bloco dos 2 pacotes */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {PACKAGES.map((pkg, idx) => {
          const isDigital = pkg.id === "digital";
          return (
            <Reveal key={pkg.id} delay={idx * 100} className="h-full">
              <GlowCard
                variant={isDigital ? "dark" : "light"}
                className={cn(
                  "h-full rounded-2xl p-8 sm:p-10",
                  isDigital
                    ? "bg-graphite text-paper border border-transparent"
                    : "bg-paper text-graphite border border-hairline",
                )}
              >
                <div className="flex h-full flex-col sm:flex-row sm:items-stretch sm:gap-8">
                  {/* Coluna esquerda */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3
                        id={`pkg-${pkg.id}`}
                        className={cn(
                          "relative overflow-hidden inline-block rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 group-hover/card:shadow-sm",
                          isDigital ? "bg-white text-graphite" : "bg-graphite text-paper",
                        )}
                      >
                        <span className={cn(
                          "absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 ease-glass group-hover/card:translate-x-[150%] motion-reduce:transition-none",
                          isDigital ? "via-graphite/10" : "via-white/25"
                        )} />
                        <span className="relative">{pkg.title}</span>
                      </h3>
                      <p className={cn("mt-4 text-sm leading-relaxed", isDigital ? "text-paper/80" : "text-mist")}>
                        {pkg.description}
                      </p>
                    </div>

                    <div className="mt-8">
                      <div>
                        <span className={cn("font-heading block whitespace-nowrap text-4xl font-semibold", isDigital ? "text-paper" : "text-graphite")}>
                          Sob consulta
                        </span>
                        <span className={cn("mt-1 block text-xs font-medium", isDigital ? "text-paper/60" : "text-mist")}>
                          {pkg.highlight}
                        </span>
                      </div>

                      <div className="mt-6">
                        <a
                          {...quoteLinkProps(pkg.title, pkg.whatsapp)}
                          aria-describedby={`pkg-${pkg.id}`}
                          className={cn(
                            "group/btn inline-flex items-center justify-between gap-4 rounded-full border py-1.5 pr-1.5 pl-5 text-sm font-medium shadow-xs transition-all duration-300",
                            isDigital
                              ? "border-transparent bg-white text-graphite hover:bg-white/90"
                              : "border-hairline/80 bg-white text-graphite hover:border-graphite/30 hover:shadow-sm",
                          )}
                        >
                          <span>Pedir orçamento</span>
                          <span className={cn("grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-glass group-hover/btn:-translate-x-1.5 group-hover/btn:rotate-45 motion-reduce:transition-none motion-reduce:group-hover/btn:translate-x-0 motion-reduce:group-hover/btn:rotate-0", isDigital ? "bg-graphite text-white" : "bg-graphite text-paper")}>
                            <ArrowUpRight aria-hidden="true" className="size-4" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Separador: horizontal no mobile, vertical no desktop */}
                  <div className={cn("my-8 h-px w-full sm:my-0 sm:h-auto sm:w-px sm:self-stretch", isDigital ? "bg-white/15" : "bg-hairline")} />

                  {/* Coluna direita */}
                  <div className="flex flex-1 flex-col">
                    <p className={cn("font-heading text-sm font-semibold uppercase tracking-wider", isDigital ? "text-paper" : "text-graphite")}>
                      O que inclui
                    </p>
                    <ul className="mt-4 space-y-3">
                      {pkg.items.map((item) => (
                        <li key={item} className={cn("flex items-start gap-2.5 text-sm leading-snug", isDigital ? "text-paper/90" : "text-graphite/90")}>
                          <Check aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", isDigital ? "text-white" : "text-graphite")} strokeWidth={2.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {SERVICES.map((s, i) => {
          const highlightText = "Você grava. A CutCode transforma em conteúdo.";
          const hasHighlight = s.description.includes(highlightText);

          return (
            <Reveal key={s.title} delay={i * 90} className="h-full">
              <GlowCard className="h-full p-6 sm:p-8">
                <div className="flex h-full flex-col">
                <div className="mb-6">
                  <span className="grid size-11 place-items-center rounded-xl border border-hairline bg-white text-graphite">
                    <s.icon aria-hidden className="size-5" strokeWidth={1.5} />
                  </span>
                </div>
                
                <h3 className="font-heading text-2xl leading-tight text-graphite">
                  {s.title}
                </h3>
                
                <p className="mt-4 flex-1 text-sm leading-relaxed text-mist whitespace-pre-line sm:text-base">
                  {hasHighlight ? (
                    <>
                      <span className="font-semibold text-graphite">{highlightText}</span>
                      <br />
                      <br />
                      {s.description.replace(highlightText, "").trim()}
                    </>
                  ) : (
                    s.description
                  )}
                </p>

                <div className="mt-8 flex justify-end">
                  <a
                    {...quoteLinkProps(s.title, s.whatsapp || `Olá! Vim pelo site da CutCode e quero um orçamento de: ${s.title}.`)}
                    className="group/btn inline-flex items-center gap-3 text-sm font-medium text-graphite transition-opacity hover:opacity-80"
                  >
                    Pedir orçamento
                    <span className="grid size-8 place-items-center rounded-full border border-graphite/15 transition-transform duration-300 group-hover/btn:rotate-45">
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </span>
                  </a>
                </div>
                </div>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
