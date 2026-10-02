import * as React from "react";
import { Pause, Play } from "lucide-react";

import { NICHES } from "@/data/content";
import { cn } from "@/lib/utils";

export function Niches() {
  const items = [...NICHES, ...NICHES];
  // WCAG 2.2.2: a faixa rola sem parar, então precisa de pausa
  const [paused, setPaused] = React.useState(false);
  return (
    <section aria-label="Para quem trabalhamos" className="relative overflow-hidden border-y border-hairline py-6">
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div
          className={cn(
            "flex w-max items-center gap-9 animate-marquee hover:[animation-play-state:paused]",
            paused && "[animation-play-state:paused]",
          )}
        >
          {items.map((n, i) => (
            <span key={i} aria-hidden={i >= NICHES.length} className="flex items-center gap-9">
              <span className="font-heading text-[clamp(1.5rem,2.6vw,2.2rem)] whitespace-nowrap text-graphite/70 transition-colors duration-300 hover:text-graphite">
                {n}
              </span>
              <span className="size-2 rounded-full bg-gradient-to-br from-iris-aqua via-iris-lilac to-iris-pink" />
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-label={paused ? "Continuar a faixa de nichos" : "Pausar a faixa de nichos"}
        className="glass-pill absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full text-graphite motion-reduce:hidden sm:right-6"
      >
        {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
      </button>
    </section>
  );
}
