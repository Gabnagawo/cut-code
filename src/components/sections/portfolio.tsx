import { Play } from "lucide-react";

import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/reveal";
import { SafeImage } from "@/components/safe-image";
import { ClientShowcase } from "@/components/sections/client-showcase";
import { SectionHead } from "@/components/sections/section-head";
import { CONTACT, REELS } from "@/data/content";
import { cn } from "@/lib/utils";

export function Portfolio() {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-28 sm:px-6 sm:pt-36">
      <SectionHead
        eyebrow="Portfólio"
        title={
          <>
            Trabalhos que já estão <span className="text-iris">no ar</span>.
          </>
        }
      />

      <ClientShowcase />

      <Reveal className="mt-24 mb-7 flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="font-heading text-[clamp(2rem,3vw,2.8rem)] text-graphite">Reels</h3>
        <a
          href={CONTACT.instagram}
          className="border-b border-graphite/20 pb-0.5 text-sm text-mist transition-colors hover:border-graphite hover:text-graphite"
        >
          Ver mais no Instagram ↗
        </a>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {REELS.map((r, i) => (
          <Reveal key={r.label} delay={i * 80}>
            {/* Troque o conteúdo por <video> ou embed do Instagram */}
            <GlowCard as="figure" tilt={8} className="m-0 rounded-[24px] p-2">
              <div className={cn("relative aspect-[9/16] overflow-hidden rounded-[18px] bg-gradient-to-b", r.tone)}>
                <SafeImage
                  src={r.image}
                  alt=""
                  className="absolute inset-0 transition-transform duration-[1.4s] ease-glass group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-white/30 text-white backdrop-blur-md transition-all duration-500 ease-glass group-hover/card:size-16 group-hover/card:bg-white group-hover/card:text-graphite group-hover/card:shadow-[0_0_0_10px_rgb(255_255_255/0.25)]">
                  <Play className="size-5 translate-x-0.5 fill-current" />
                </span>
                <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between text-xs text-white sm:inset-x-4 sm:bottom-4 sm:text-sm">
                  <span className="font-medium">{r.label}</span>
                  <span className="glass-dark rounded-full px-2 py-0.5 tabular-nums">{r.duration}</span>
                </figcaption>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
