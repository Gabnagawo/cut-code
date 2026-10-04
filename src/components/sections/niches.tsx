import * as React from "react";

import { NICHES } from "@/data/content";
import { cn } from "@/lib/utils";

export function Niches() {
  const [paused, setPaused] = React.useState(false);
  const items = [...NICHES, ...NICHES];
  return (
    <section
      aria-label="Para quem trabalhamos"
      tabIndex={0}
      onClick={() => setPaused((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setPaused((v) => !v);
        }
      }}
      className="relative overflow-hidden border-y border-hairline py-6 select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-graphite/20"
    >
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div
          className={cn(
            "flex w-max items-center gap-9 animate-marquee [animation-iteration-count:1] [animation-fill-mode:forwards] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none",
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
    </section>
  );
}
