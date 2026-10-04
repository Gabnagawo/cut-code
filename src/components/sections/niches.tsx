import * as React from "react";

import { NICHES } from "@/data/content";
import { cn } from "@/lib/utils";

export function Niches() {
  const [paused, setPaused] = React.useState(false);
  const items = [...NICHES, ...NICHES];
  return (
    <section aria-label="Para quem trabalhamos" className="relative overflow-hidden border-y border-hairline py-6 select-none">
      <ul className="sr-only">
        {NICHES.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? "Retomar animação da faixa de nichos" : "Pausar animação da faixa de nichos"}
        onClick={() => setPaused((v) => !v)}
        className="group block w-full border-0 bg-transparent p-0 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-graphite"
      >
        <span aria-hidden="true" className="block [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <span
            className={cn(
              "flex w-max items-center gap-9 animate-marquee [animation-iteration-count:1] [animation-fill-mode:forwards] hover:[animation-play-state:paused] group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused] motion-reduce:animate-none",
              paused && "[animation-play-state:paused]",
            )}
          >
            {items.map((n, i) => (
              <span key={i} aria-hidden={i >= NICHES.length} className="flex items-center gap-9">
                <span className="font-heading text-[clamp(1.5rem,2.6vw,2.2rem)] whitespace-nowrap text-graphite/70 transition-colors duration-300 group-hover:text-graphite">
                  {n}
                </span>
                <span className="size-2 rounded-full bg-gradient-to-br from-iris-aqua via-iris-lilac to-iris-pink" />
              </span>
            ))}
          </span>
        </span>
      </button>
    </section>
  );
}
