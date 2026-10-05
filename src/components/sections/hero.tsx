import * as React from "react";
import { ArrowDown, Clock, Gift, Play, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlassBlob } from "@/components/ui/glass-blob";
import {
  Carousel,
  Slider,
  SliderContainer,
  ThumbsSlider,
  useVerticalCarousel,
} from "@/components/ui/vertical-thumbnail-slider-utils/carousel";
import { HAS_PORTFOLIO, SHOWCASE, whatsappHref, type Showcase } from "@/data/content";
import { linkProps } from "@/lib/link-props";
import { cn } from "@/lib/utils";

const HEADLINE: { text: string; iris?: boolean; br?: boolean }[] = [
  { text: "Presença" },
  { text: "digital", br: true },
  { text: "que" },
  { text: "converte.", iris: true },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-36 sm:pb-24 lg:min-h-svh [@media(max-height:820px)]:sm:pt-28">
      <HeroBackground />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Texto */}
        <div className="relative">
          <p className="group/pill relative inline-flex h-8 overflow-hidden items-center gap-2 rounded-full border border-hairline bg-white/70 px-3 text-sm font-medium text-graphite animate-blur-in">
            <span className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-glass group-hover/pill:translate-x-[150%] motion-reduce:transition-none" />
            <span className="relative size-2 rounded-full bg-emerald-500" />
            <span className="relative">Agenda aberta</span>
          </p>

          <h1 className="font-display mt-4 text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.02] text-graphite sm:mt-8 sm:leading-[0.98] [word-spacing:0.1em]">
            {HEADLINE.map((w, i) => (
              <React.Fragment key={i}>
                <span
                  className={cn("inline-block animate-blur-in", w.iris && "text-iris")}
                  style={{ animationDelay: `${80 + i * 50}ms` }}
                >
                  {w.text}
                </span>
                {w.br ? <>{" "}<br /></> : i < HEADLINE.length - 1 && " "}
              </React.Fragment>
            ))}
          </h1>

          <p
            className="mt-4 max-w-xl text-base leading-relaxed text-mist animate-blur-in sm:mt-6 sm:text-xl"
            style={{ animationDelay: "280ms" }}
          >
            Criamos landing pages desenhadas para converter visitantes em contatos reais, somadas a vídeos curtos para manter suas redes ativas e relevantes.
          </p>

          <div className="mt-6 flex flex-col gap-3 animate-blur-in min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-8" style={{ animationDelay: "340ms" }}>
            <Button
              asChild
              variant="cta"
              className="group gap-2.5"
            >
              <a {...linkProps(whatsappHref())}>
                <img src="assets/icons/whatsapp.svg" alt="" aria-hidden="true" className="size-5 shrink-0" />
                Pedir orçamento
              </a>
            </Button>
            <Button
              asChild
              variant="cta-secondary"
            >
              <a href={HAS_PORTFOLIO ? "#portfolio" : "#servicos"} className="inline-flex items-center gap-2">
                <span>{HAS_PORTFOLIO ? "Ver portfólio" : "Ver serviços"}</span>
                {HAS_PORTFOLIO ? (
                  <Play aria-hidden className="size-3.5 fill-current" />
                ) : (
                  <ArrowDown aria-hidden className="size-4" />
                )}
              </a>
            </Button>
          </div>

          <ul
            className="mt-8 grid max-w-xl grid-cols-1 gap-3 text-sm animate-blur-in sm:mt-12 sm:grid-cols-3 sm:gap-4"
            style={{ animationDelay: "400ms" }}
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
    <div id="vitrine" className="relative mx-auto w-full max-w-[540px] animate-blur-in scroll-mt-24" style={{ animationDelay: "200ms" }}>
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
          <SliderContainer className="h-[480px] gap-3 sm:h-[640px]">
            {SHOWCASE.map((item, i) => (
              <Slider
                key={item.niche}
                thumbnailSrc={`assets/videos/${item.videoSlug}-poster.jpg`}
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
            thumbsClassName="h-[480px] gap-2.5 sm:h-[640px]"
            thumbClassName="rounded-2xl border-white/0 bg-gradient-to-br from-[#d9dcdc] to-[#b9bfc0]"
            thumbsSliderClassName="border-graphite"
          />
        </Carousel>
      </div>
    </div>
  );
}

function ShowcaseSlide({ item, index, total }: { item: Showcase; index: number; total: number }) {
  const { selectedIndex } = useVerticalCarousel();
  const isActive = index === selectedIndex;
  const isNext = index === selectedIndex + 1;
  const shouldLoad = isActive || isNext;
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = React.useState(false);
  const [videoSrc, setVideoSrc] = React.useState<string | undefined>();

  // Define a resolução adequada e força o carregamento
  React.useEffect(() => {
    if (shouldLoad && !videoSrc) {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const src = `assets/videos/${item.videoSlug}-${isMobile ? "720" : "1080"}.mp4`;
      setVideoSrc(src);
      
      if (videoRef.current) {
        videoRef.current.src = src;
        videoRef.current.load();
      }
    }
  }, [shouldLoad, videoSrc, item.videoSlug]);

  // Controle de play/pause
  React.useEffect(() => {
    if (isActive && !userPaused && videoSrc) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [isActive, userPaused, videoSrc]);

  return (
    <div 
      className={cn("group/slide relative h-full w-full cursor-pointer overflow-hidden rounded-[24px] bg-gradient-to-br focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris", item.tone)}
      onClick={() => setUserPaused(!userPaused)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setUserPaused(!userPaused);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={userPaused ? "Retomar vídeo" : "Pausar vídeo"}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload={shouldLoad ? "metadata" : "none"}
        poster={`assets/videos/${item.videoSlug}-poster.jpg`}
        className="absolute inset-0 h-full w-full scale-[1.02] object-cover transition-transform duration-700 ease-glass group-hover/slide:scale-110"
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
