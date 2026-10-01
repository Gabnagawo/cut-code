"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Carrossel principal + trilho de miniaturas sincronizado (Embla).
   Uso:
     <Carousel options={{ axis: "y" }}>
       <SliderContainer className="h-[400px]">
         <Slider thumbnailSrc="/a.jpg">…</Slider>
       </SliderContainer>
       <ThumbsSlider />
     </Carousel>
   ------------------------------------------------------------------ */

type CarouselContextValue = {
  mainRef: ReturnType<typeof useEmblaCarousel>[0];
  thumbsRef: ReturnType<typeof useEmblaCarousel>[0];
  mainApi: EmblaCarouselType | undefined;
  selectedIndex: number;
  scrollSnaps: number[];
  thumbnails: string[];
  axis: "x" | "y";
  scrollTo: (index: number) => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

export function useVerticalCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useVerticalCarousel must be used within <Carousel />");
  return ctx;
}

type CarouselProps = {
  options?: EmblaOptionsType;
  className?: string;
  children: React.ReactNode;
  /** Avança sozinho a cada N ms (pausa no hover e com reduced motion). */
  autoplay?: number;
  onSelect?: (index: number) => void;
  /** nome acessível do carrossel (leitores de tela) */
  label?: string;
};

type SliderProps = React.HTMLAttributes<HTMLDivElement> & {
  thumbnailSrc?: string;
  thumbnailAlt?: string;
};

/** Lê os `thumbnailSrc` dos <Slider> dentro do <SliderContainer>. */
function collectThumbnails(children: React.ReactNode): string[] {
  const thumbs: string[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === SliderContainer) {
      React.Children.forEach(
        (child.props as { children?: React.ReactNode }).children,
        (slide) => {
          if (React.isValidElement(slide)) {
            thumbs.push((slide.props as SliderProps).thumbnailSrc ?? "");
          }
        },
      );
    }
  });
  return thumbs;
}

export function Carousel({ options, className, children, autoplay, onSelect, label }: CarouselProps) {
  const axis = options?.axis ?? "x";
  const [mainRef, mainApi] = useEmblaCarousel(options);
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    axis,
    containScroll: "keepSnaps",
    dragFree: true,
    breakpoints: options?.breakpoints,
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [paused, setPaused] = React.useState(false);
  const thumbnails = React.useMemo(() => collectThumbnails(children), [children]);

  const scrollTo = React.useCallback((index: number) => mainApi?.scrollTo(index), [mainApi]);

  const handleSelect = React.useCallback(
    (api: EmblaCarouselType) => {
      const index = api.selectedScrollSnap();
      setSelectedIndex(index);
      thumbsApi?.scrollTo(index);
      onSelect?.(index);
    },
    [thumbsApi, onSelect],
  );

  React.useEffect(() => {
    if (!mainApi) return;
    const init = (api: EmblaCarouselType) => {
      setScrollSnaps(api.scrollSnapList());
      handleSelect(api);
    };
    init(mainApi);
    mainApi.on("select", handleSelect).on("reInit", init);
    return () => {
      mainApi.off("select", handleSelect).off("reInit", init);
    };
  }, [mainApi, handleSelect]);

  // Autoplay leve, sem plugin
  React.useEffect(() => {
    if (!mainApi || !autoplay || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (mainApi.canScrollNext()) mainApi.scrollNext();
      else mainApi.scrollTo(0);
    }, autoplay);
    return () => window.clearInterval(id);
  }, [mainApi, autoplay, paused]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const prev = axis === "y" ? "ArrowUp" : "ArrowLeft";
    const next = axis === "y" ? "ArrowDown" : "ArrowRight";
    if (event.key === prev) {
      event.preventDefault();
      mainApi?.scrollPrev();
    } else if (event.key === next) {
      event.preventDefault();
      mainApi?.scrollNext();
    }
  };

  return (
    <CarouselContext.Provider
      value={{ mainRef, thumbsRef, mainApi, selectedIndex, scrollSnaps, thumbnails, axis, scrollTo }}
    >
      <div
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function SliderContainer({ className, children }: { className?: string; children: React.ReactNode }) {
  const { mainRef, axis } = useVerticalCarousel();
  return (
    <div ref={mainRef} className="min-w-0 flex-1 overflow-hidden rounded-lg">
      <div className={cn("flex", axis === "y" && "flex-col", className)}>{children}</div>
    </div>
  );
}

export function Slider({ className, children, thumbnailSrc: _src, thumbnailAlt: _alt, ...props }: SliderProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-h-0 min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type ThumbsSliderProps = {
  /** Classe da viewport do trilho de miniaturas */
  className?: string;
  /** Classe do container interno (altura/largura do trilho) */
  thumbsClassName?: string;
  /** Classe aplicada à miniatura ativa */
  thumbsSliderClassName?: string;
  /** Classe de cada miniatura */
  thumbClassName?: string;
};

export function ThumbsSlider({ className, thumbsClassName, thumbsSliderClassName, thumbClassName }: ThumbsSliderProps) {
  const { thumbsRef, thumbnails, selectedIndex, scrollTo, axis } = useVerticalCarousel();
  return (
    <div ref={thumbsRef} className={cn("shrink-0 overflow-hidden", className)}>
      <div className={cn("flex gap-2", axis === "y" ? "flex-col" : "flex-row", thumbsClassName)}>
        {thumbnails.map((src, index) => {
          const active = index === selectedIndex;
          return (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Ir para o slide ${index + 1}`}
              aria-current={active}
              className={cn(
                "relative aspect-square w-full shrink-0 overflow-hidden rounded-md border-2 border-transparent bg-gradient-to-br from-white/15 to-white/[0.03] transition-all duration-300",
                active ? cn("opacity-100", thumbsSliderClassName) : "opacity-50 hover:opacity-80",
                thumbClassName,
              )}
            >
              {src && (
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  // se a imagem falhar, some e deixa o fundo do botão aparecer
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                  className="h-full w-full object-cover"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SliderDotButton({ className, activeClassName }: { className?: string; activeClassName?: string }) {
  const { scrollSnaps, selectedIndex, scrollTo, axis } = useVerticalCarousel();
  return (
    <div className={cn("flex gap-2", axis === "y" ? "flex-col" : "flex-row", className)}>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => scrollTo(index)}
          aria-label={`Ir para o slide ${index + 1}`}
          className={cn(
            "h-2 w-2 rounded-full bg-white/30 transition-all duration-300",
            index === selectedIndex && cn("bg-white", axis === "y" ? "h-6" : "w-6", activeClassName),
          )}
        />
      ))}
    </div>
  );
}
