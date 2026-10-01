import * as React from "react";
import { ArrowRight, CalendarCheck, Clock, Gift, Play, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  Slider,
  SliderContainer,
  ThumbsSlider,
} from "@/components/ui/vertical-thumbnail-slider-utils/carousel";
import { RotatingWords } from "@/components/rotating-words";
import { SafeImage } from "@/components/safe-image";
import { SHOWCASE, type Showcase } from "@/data/content";
import { cn } from "@/lib/utils";

const HEADLINE: { text: string; sheen?: boolean; br?: boolean }[] = [
  { text: "Sua" },
  { text: "marca,", br: true },
  { text: "cortada", sheen: true },
  { text: "e" },
  { text: "codificada", sheen: true, br: true },
  { text: "para" },
  { text: "vender." },
];

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);

  // spotlight que acompanha o cursor no fundo do hero
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:min-h-svh lg:pb-24"
    >
      <HeroBackground />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        {/* Texto */}
        <div className="relative">
          <a
            href="#portfolio"
            className="glass-pill group inline-flex items-center gap-2.5 rounded-full py-1.5 pr-3 pl-2 text-[0.8rem] text-bone/90 transition-colors animate-blur-in hover:bg-white/10"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-0.5 text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse-ring" />
              Agenda aberta
            </span>
            Novos projetos para este mês
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="mt-7 font-serif text-[clamp(3.3rem,8vw,7.4rem)] leading-[0.92] tracking-[-0.02em]">
            {HEADLINE.map((w, i) => (
              <React.Fragment key={i}>
                <span
                  className={cn("inline-block animate-blur-in pr-[0.22em]", w.sheen && "text-sheen")}
                  style={{ animationDelay: `${150 + i * 90}ms` }}
                >
                  {w.text}
                </span>
                {w.br && <br />}
              </React.Fragment>
            ))}
          </h1>

          <p
            className="mt-8 max-w-xl text-lg font-light leading-relaxed text-mist animate-blur-in sm:text-xl"
            style={{ animationDelay: "850ms" }}
          >
            Do primeiro clique ao cliente na porta: sites guiados e vídeos curtos de divulgação para{" "}
            <RotatingWords
              words={["clínicas", "restaurantes", "lojas", "empresas", "eventos"]}
              className="font-serif text-[1.3em] italic text-bone"
            />
          </p>

          <div className="mt-10 flex flex-wrap gap-3 animate-blur-in" style={{ animationDelay: "1000ms" }}>
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-bone px-7 text-base text-ink shadow-[0_10px_40px_-10px_rgb(201_195_255/0.7)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_50px_-10px_rgb(201_195_255/0.95)]"
            >
              <a href="#contato">
                Quero meu orçamento
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="glass-pill group h-14 rounded-full border-white/15 bg-white/5 pr-7 pl-2.5 text-base text-bone hover:-translate-y-0.5 hover:bg-white/10 hover:text-bone"
            >
              <a href="#portfolio">
                <span className="mr-3 grid size-10 place-items-center rounded-full bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-bone group-hover:text-ink">
                  <Play className="size-4 translate-x-px fill-current" />
                </span>
                Ver portfólio
              </a>
            </Button>
          </div>

          <ul
            className="mt-12 grid max-w-xl grid-cols-1 gap-3 border-t border-white/10 pt-7 text-sm animate-blur-in sm:grid-cols-3"
            style={{ animationDelay: "1150ms" }}
          >
            {[
              { icon: Clock, strong: "1 semana", text: "prévia do site" },
              { icon: Zap, strong: "2 dias úteis", text: "entrega dos vídeos" },
              { icon: Gift, strong: "+2 vídeos", text: "grátis no pacote" },
            ].map(({ icon: Icon, strong, text }) => (
              <li key={strong} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5">
                  <Icon className="size-4 text-pearl" />
                </span>
                <span className="leading-tight">
                  <strong className="block font-serif text-xl font-normal text-bone">{strong}</strong>
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
      {/* aurora girando */}
      <div className="absolute top-[30%] left-[62%] size-[110vmax] -translate-x-1/2 -translate-y-1/2 animate-aurora opacity-60 blur-[110px] [background:conic-gradient(from_0deg,#5b4bd6,#2b7fb8_25%,#0b0b10_45%,#b5527b_65%,#0b0b10_80%,#5b4bd6)] [mask-image:radial-gradient(circle,#000_0%,transparent_42%)]" />
      {/* grade */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_25%,transparent_75%)]" />
      {/* spotlight do cursor */}
      <div className="absolute inset-0 [background:radial-gradient(650px_circle_at_var(--sx,70%)_var(--sy,30%),rgb(201_195_255/0.10),transparent_45%)]" />
      {/* marca d'água da logo */}
      <img
        src="assets/logo-mark.png"
        alt=""
        className="absolute top-[6%] right-[-14%] w-[62vw] max-w-[860px] rotate-[-8deg] opacity-[0.035]"
      />
      <div className="bg-grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}

function HeroShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] animate-blur-in" style={{ animationDelay: "500ms" }}>
      {/* halo atrás do vidro */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(91_75_214/0.55),transparent)] blur-2xl"
      />

      <div className="glass rounded-[34px] p-2.5 sm:p-3">
        <Carousel options={{
            axis: "y",
            loop: false,
            duration: 32,
            // no toque, o arrasto vertical fica com a rolagem da página (navega pelas miniaturas)
            breakpoints: { "(hover: none)": { watchDrag: false } },
          }} autoplay={4200} className="flex gap-2.5 sm:gap-3">
          <SliderContainer className="h-[440px] gap-3 sm:h-[560px]">
            {SHOWCASE.map((item, i) => (
              <Slider key={item.niche} thumbnailSrc={item.thumb} className="h-full">
                <ShowcaseSlide item={item} index={i} total={SHOWCASE.length} />
              </Slider>
            ))}
          </SliderContainer>
          <ThumbsSlider
            className="w-14 sm:w-[4.5rem]"
            thumbsClassName="h-[440px] gap-2.5 sm:h-[560px]"
            thumbClassName="rounded-2xl border-white/0"
            thumbsSliderClassName="border-pearl shadow-[0_0_24px_-4px_rgb(201_195_255/0.8)]"
          />
        </Carousel>
      </div>

      {/* cartões flutuantes */}
      <div
        className="glass absolute top-[34%] -left-4 hidden items-center gap-3 rounded-2xl px-4 py-3 text-sm animate-float sm:flex lg:-left-16"
        style={{ animationDelay: "-2s" }}
      >
        <span className="grid size-9 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <CalendarCheck className="size-4" />
        </span>
        <span className="leading-tight">
          <b className="block font-medium">Agendamento confirmado</b>
          <small className="text-xs text-mist">via landing page guiada</small>
        </span>
      </div>

      <div
        className="glass absolute -bottom-7 left-4 hidden items-center gap-3 rounded-2xl px-4 py-3 text-sm animate-float sm:left-10 sm:flex"
        style={{ animationDelay: "-5s" }}
      >
        <span className="grid size-9 place-items-center rounded-full bg-white/15">
          <Play className="size-3.5 translate-x-px fill-current" />
        </span>
        <span className="leading-tight">
          <b className="block font-medium">Reel entregue</b>
          <small className="text-xs text-mist">editado em 48h</small>
        </span>
      </div>
    </div>
  );
}

function ShowcaseSlide({ item, index, total }: { item: Showcase; index: number; total: number }) {
  return (
    <div className={cn("group/slide relative h-full overflow-hidden rounded-[24px] bg-gradient-to-br", item.tone)}>
      <SafeImage
        src={item.image}
        alt={`Projeto para ${item.niche.toLowerCase()}`}
        loading={index === 0 ? "eager" : "lazy"}
        className="absolute inset-0 scale-[1.02] transition-transform duration-[1.6s] ease-glass group-hover/slide:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,rgb(201_195_255/0.25),transparent)] mix-blend-screen" />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-xs">
        <span className="glass-pill rounded-full px-3 py-1.5 tracking-[0.18em] uppercase">{item.niche}</span>
        <span className="font-mono text-bone/70 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6">
        <div>
          <p className="font-serif text-3xl leading-[1.05] sm:text-[2.6rem]">{item.title}</p>
          <p className="mt-2 text-sm text-bone/70">{item.meta}</p>
        </div>
        <span className="glass-pill grid size-12 shrink-0 place-items-center rounded-full transition-all duration-500 group-hover/slide:scale-110 group-hover/slide:bg-bone group-hover/slide:text-ink">
          <Play className="size-4 translate-x-px fill-current" />
        </span>
      </div>
    </div>
  );
}
