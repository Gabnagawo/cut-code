import * as React from "react";
import { ArrowUpRight, Check, Play } from "lucide-react";

import {
  Carousel,
  Slider,
  SliderContainer,
  ThumbsSlider,
  useVerticalCarousel,
} from "@/components/ui/vertical-thumbnail-slider-utils/carousel";
import { Reveal } from "@/components/reveal";
import { SafeImage } from "@/components/safe-image";
import { CLIENTS, type Client, type ClientMaterial } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Material de clientes: escolha o cliente nas abas e navegue pelo que foi
 * entregue (telas do site, reels, stories) no slider vertical com miniaturas.
 */
export function ClientShowcase() {
  const [active, setActive] = React.useState(0);
  const client = CLIENTS[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      <Reveal>
        {/* abas de cliente */}
        <div role="tablist" aria-label="Clientes" className="glass-pill inline-flex flex-wrap gap-1 rounded-full p-1">
          {CLIENTS.map((c, i) => (
            <button
              key={c.slug}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`material-${c.slug}`}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                i === active ? "bg-graphite text-paper shadow-[0_8px_20px_-10px_rgb(30_30_30/0.7)]" : "text-mist hover:text-graphite",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <ClientInfo key={client.slug} client={client} />
      </Reveal>

      <Reveal delay={120} className="relative">
        <div
          aria-hidden
          className="absolute -inset-y-10 -inset-x-2 -z-10 rounded-full bg-[radial-gradient(closest-side,#d3ebe9,transparent)] blur-2xl sm:-inset-x-10"
        />
        <div id={`material-${client.slug}`} role="tabpanel" className="glass rounded-[34px] p-2.5 sm:p-3">
          {/* key: remonta o carrossel ao trocar de cliente (volta ao 1º slide) */}
          <Carousel
            key={client.slug}
            options={{
              axis: "y",
              loop: false,
              duration: 30,
              breakpoints: { "(hover: none)": { watchDrag: false } },
            }}
            className="flex gap-2.5 sm:gap-3"
          >
            <SliderContainer className="h-[460px] gap-3 sm:h-[560px]">
              {client.materials.map((m, i) => (
                <Slider key={m.title} thumbnailSrc={m.thumb} className="h-full">
                  <MaterialSlide item={m} index={i} total={client.materials.length} />
                </Slider>
              ))}
            </SliderContainer>
            <ThumbsSlider
              className="w-14 sm:w-[4.5rem]"
              thumbsClassName="h-[460px] gap-2.5 sm:h-[560px]"
              thumbClassName="rounded-2xl border-white/0 bg-gradient-to-br from-[#d9dcdc] to-[#b9bfc0]"
              thumbsSliderClassName="border-graphite"
            />
          </Carousel>
        </div>
      </Reveal>
    </div>
  );
}

function ClientInfo({ client }: { client: Client }) {
  return (
    <div className="animate-blur-in">
      <p className="mt-9 text-xs font-medium tracking-[0.28em] text-mist uppercase">{client.niche}</p>
      <h3 className="font-heading mt-3 text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.98] text-graphite">{client.name}</h3>
      <span className="rule mt-6" />
      <p className="mt-6 max-w-md text-mist">{client.summary}</p>

      <ul className="mt-7 flex flex-wrap gap-2">
        {client.delivered.map((d) => (
          <li key={d} className="glass-pill flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-graphite">
            <Check className="size-3.5" strokeWidth={2.5} />
            {d}
          </li>
        ))}
      </ul>

      <a
        href={client.url}
        className="group mt-9 inline-flex items-center gap-3 text-sm font-medium text-graphite"
      >
        <span className="grid size-11 place-items-center rounded-full bg-graphite text-paper transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="size-5" />
        </span>
        Ver site no ar
      </a>
    </div>
  );
}

function MaterialSlide({ item, index, total }: { item: ClientMaterial; index: number; total: number }) {
  const { selectedIndex } = useVerticalCarousel();
  const isActive = selectedIndex === index;
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // vídeo só toca quando o slide está ativo
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive]);

  return (
    <div className={cn("group/slide relative h-full overflow-hidden rounded-[24px] bg-gradient-to-br", item.tone)}>
      {item.video ? (
        <video
          ref={videoRef}
          src={item.video}
          poster={item.image}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <SafeImage
          src={item.image}
          alt={`${item.kind}: ${item.title}`}
          className="absolute inset-0 scale-[1.02] transition-transform duration-[1.6s] ease-glass group-hover/slide:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5" />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-xs text-white">
        <span className="glass-dark rounded-full px-3 py-1.5 font-medium tracking-[0.16em] uppercase">{item.kind}</span>
        <span className="font-mono text-white/80 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-6 sm:bottom-6">
        <p className="font-heading text-3xl leading-[1.02] sm:text-[2.4rem]">{item.title}</p>
        {item.kind !== "Site" && !item.video && (
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-graphite transition-transform duration-500 group-hover/slide:scale-110">
            <Play className="size-4 translate-x-px fill-current" />
          </span>
        )}
      </div>
    </div>
  );
}
