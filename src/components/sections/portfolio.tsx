import { ArrowUpRight, Play } from "lucide-react";

import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/reveal";
import { SafeImage } from "@/components/safe-image";
import { SectionHead } from "@/components/sections/section-head";
import { CASES, CONTACT, REELS } from "@/data/content";
import { cn } from "@/lib/utils";

export function Portfolio() {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-28 sm:px-6 sm:pt-36">
      <SectionHead
        eyebrow="Portfólio"
        title={
          <>
            Trabalhos que já estão <em className="text-sheen">no ar</em>.
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-2">
        {CASES.map((c, i) => (
          <Reveal key={c.name} delay={i * 100}>
            <GlowCard as="a" href={c.url} tilt={4} className="block p-3.5">
              <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[#0e0e12]">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3.5 py-3">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="size-2.5 rounded-full bg-white/20 transition-colors duration-500 group-hover/card:first:bg-[#ff5f57] group-hover/card:[&:nth-child(2)]:bg-[#febc2e] group-hover/card:[&:nth-child(3)]:bg-[#28c840]" />
                  ))}
                  <em className="ml-2.5 rounded-full bg-white/5 px-3 py-0.5 text-xs not-italic text-mist">{c.domain}</em>
                </div>
                <div className={cn("relative aspect-[16/10] overflow-hidden", c.tone)}>
                  <div className="absolute inset-0 flex flex-col justify-end gap-2 p-7 transition-transform duration-[1.2s] ease-glass group-hover/card:scale-[1.04] sm:p-10">
                    <span className="absolute top-7 left-7 h-8 w-28 rounded-full bg-white/85 sm:top-10 sm:left-10" />
                    <b className="font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.05] font-normal">{c.name}</b>
                    <small className="max-w-xs text-bone/75">{c.headline}</small>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 pt-5 pb-2.5">
                <div>
                  <h3 className="font-serif text-[1.7rem]">{c.name}</h3>
                  <p className="text-sm text-mist">{c.kind}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 ease-glass group-hover/card:rotate-45 group-hover/card:bg-bone group-hover/card:text-ink">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20 mb-7 flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="font-serif text-[clamp(2rem,3vw,2.7rem)]">Reels</h3>
        <a href={CONTACT.instagram} className="border-b border-white/10 pb-0.5 text-sm text-mist transition-colors hover:border-bone hover:text-bone">
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
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/20 transition-opacity duration-500 group-hover/card:opacity-70" />
                <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md transition-all duration-500 ease-glass group-hover/card:size-16 group-hover/card:bg-bone group-hover/card:text-ink group-hover/card:shadow-[0_0_50px_rgb(201_195_255/0.7)]">
                  <Play className="size-5 translate-x-0.5 fill-current" />
                </span>
                <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between text-xs sm:inset-x-4 sm:bottom-4 sm:text-sm">
                  <span className="font-medium">{r.label}</span>
                  <span className="rounded-full bg-black/40 px-2 py-0.5 tabular-nums text-bone/80 backdrop-blur">{r.duration}</span>
                </figcaption>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
