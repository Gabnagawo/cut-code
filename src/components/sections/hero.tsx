import * as React from "react";
import { ArrowDown, ArrowRight, Clock, Gift, Play, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlassBlob } from "@/components/ui/glass-blob";
import {
  Carousel,
  Slider,
  SliderContainer,
  ThumbsSlider,
} from "@/components/ui/vertical-thumbnail-slider-utils/carousel";
import { SafeImage } from "@/components/safe-image";
import { HAS_PORTFOLIO, SHOWCASE, whatsappHref, type Showcase } from "@/data/content";
import { linkProps } from "@/lib/link-props";
import { cn } from "@/lib/utils";

const HEADLINE: { text: string; iris?: boolean; br?: boolean }[] = [
  { text: "Sua" },
  { text: "marca,", br: true },
  { text: "estruturada" },
  { text: "para" },
  { text: "ser" },
  { text: "vista," },
  { text: "compreendida" },
  { text: "e" },
  { text: "escolhida.", iris: true },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-24 sm:pt-36 lg:min-h-svh [@media(max-height:820px)]:sm:pt-28">
      <HeroBackground />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Texto */}
        <div className="relative">
          <a
            href="#contato"
            className="glass-pill group inline-flex min-h-11 items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5 text-[0.8rem] text-graphite animate-blur-in"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-graphite px-2.5 py-0.5 text-paper">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse-ring" />
              Agenda aberta
            </span>
            <ArrowRight aria-hidden className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>

          <h1 className="font-display mt-8 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] text-graphite">
            {HEADLINE.map((w, i) => (
              <React.Fragment key={i}>
                <span
                  className={cn("inline-block animate-blur-in pr-[0.2em]", w.iris && "text-iris")}
                  style={{ animationDelay: `${80 + i * 45}ms` }}
                >
                  {w.text}
                </span>
                {w.br && <br className="hidden sm:inline" />}
              </React.Fragment>
            ))}
          </h1>

          <span className="rule mt-9 animate-blur-in" style={{ animationDelay: "420ms" }} />

          <p
            className="mt-7 max-w-xl text-lg leading-relaxed text-mist animate-blur-in sm:text-xl"
            style={{ animationDelay: "460ms" }}
          >
            Do primeiro clique ao contato com o seu público: a CutCode cria sites, landing pages e conteúdos audiovisuais pensados para comunicar, conectar e converter.
          </p>

          <div className="mt-10 flex flex-col gap-3 animate-blur-in min-[480px]:flex-row min-[480px]:flex-wrap" style={{ animationDelay: "520ms" }}>
            <Button
              asChild
              variant="cta"
              className="group"
            >
              <a {...linkProps(whatsappHref())}>
                Pedir orçamento
                <ArrowRight aria-hidden className="ml-2 size-4 transition-transform duration-150 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              variant="cta-glass"
              className="group pr-7 pl-2"
            >
              <a href={HAS_PORTFOLIO ? "#portfolio" : "#servicos"}>
                <span className="mr-3 grid size-10 place-items-center rounded-full bg-graphite text-paper transition-transform duration-150 group-hover:scale-110">
                  {HAS_PORTFOLIO ? (
                    <Play aria-hidden className="size-4 translate-x-px fill-current" />
                  ) : (
                    <ArrowDown aria-hidden className="size-4" />
                  )}
                </span>
                {HAS_PORTFOLIO ? "Ver portfólio" : "Ver serviços"}
              </a>
            </Button>
          </div>

          <ul
            className="mt-12 grid max-w-xl grid-cols-1 gap-4 text-sm animate-blur-in sm:grid-cols-3"
            style={{ animationDelay: "580ms" }}
          >
            {[
              { icon: Clock, strong: "1 semana", text: "prévia após o briefing" },
              { icon: Zap, strong: "2 dias úteis", text: "vídeos após a captação" },
              { icon: Gift, strong: "+2 vídeos", text: "bônus no pacote" },
            ].map(({ icon: Icon, strong, text }) => (
              <li key={strong} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-hairline bg-white/70 text-graphite">
                  <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                </span>
                <span className="leading-tight">
                  <strong className="font-heading block text-lg text-graphite">{strong}</strong>
                  <span className="text-mist">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vitrine */}
        <HeroShowcase />
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* luz ambiente menta, como nas apresentações */}
      <div className="absolute -top-[20vmax] -left-[18vmax] size-[55vmax] rounded-full bg-[radial-gradient(circle,#d3ebe9_0%,transparent_62%)] animate-drift" />
      <div className="absolute top-[10vh] -right-[20vmax] size-[50vmax] rounded-full bg-[radial-gradient(circle,#e1edf1_0%,transparent_60%)] animate-drift [animation-delay:-8s]" />
      <div className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-multiply" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-canvas" />
    </div>
  );
}

function HeroShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] animate-blur-in" style={{ animationDelay: "200ms" }}>
      {/* objeto de vidro atrás da vitrine, vazando para fora */}
      <GlassBlob className="absolute top-1/2 left-1/2 -z-10 size-[150%] -translate-x-1/2 -translate-y-1/2 sm:size-[165%] lg:-translate-x-[38%]" />

      <div className="glass rounded-[34px] p-2.5 sm:p-3">
        <Carousel
          options={{
            axis: "y",
            loop: false,
            duration: 32,
            // no toque, o arrasto vertical fica com a rolagem da página (navega pelas miniaturas)
            breakpoints: { "(hover: none)": { watchDrag: false } },
          }}
          autoplay={7000}
          label="Vitrine de projetos por nicho"
          className="flex gap-2.5 sm:gap-3"
        >
          <SliderContainer className="h-[440px] gap-3 sm:h-[540px]">
            {SHOWCASE.map((item, i) => (
              <Slider
                key={item.niche}
                thumbnailSrc={item.thumb}
                thumbnailAlt={`Miniatura ${item.niche}`}
                label={`Ver exemplo para ${item.niche}: ${item.title}`}
                className="h-full"
              >
                <ShowcaseSlide item={item} index={i} total={SHOWCASE.length} />
              </Slider>
            ))}
          </SliderContainer>
          <ThumbsSlider
            className="w-14 sm:w-[4.5rem]"
            thumbsClassName="h-[440px] gap-2.5 sm:h-[540px]"
            thumbClassName="rounded-2xl border-white/0 bg-gradient-to-br from-[#d9dcdc] to-[#b9bfc0]"
            thumbsSliderClassName="border-graphite"
          />
        </Carousel>
      </div>
      <p className="mt-2 text-center text-xs text-mist">Imagens ilustrativas de cada nicho</p>
    </div>
  );
}

function ShowcaseSlide({ item, index, total }: { item: Showcase; index: number; total: number }) {
  return (
    <div className={cn("group/slide relative h-full overflow-hidden rounded-[24px] bg-gradient-to-br", item.tone)}>
      <SafeImage
        src={item.image}
        alt={`Imagem ilustrativa: ${item.niche.toLowerCase()}`}
        loading={index === 0 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "auto"}
        className="absolute inset-0 scale-[1.02] transition-transform duration-700 ease-glass group-hover/slide:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5" />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-xs text-white">
        <span className="glass-dark rounded-full px-3 py-1.5 font-medium tracking-[0.16em] uppercase">{item.niche}</span>
        <span className="font-mono text-white/80 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-6 sm:bottom-6">
        <p className="font-heading text-3xl leading-[1.05] sm:text-[2.5rem]">{item.title}</p>
        <p className="mt-2 text-sm text-white/80">{item.meta}</p>
      </div>
    </div>
  );
}
