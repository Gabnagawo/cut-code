import { NICHES } from "@/data/content";

export function Niches() {
  const items = [...NICHES, ...NICHES];
  return (
    <section aria-label="Para quem trabalhamos" className="overflow-hidden border-y border-white/10 py-6">
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max items-center gap-9 animate-marquee hover:[animation-play-state:paused]">
          {items.map((n, i) => (
            <span key={i} aria-hidden={i >= NICHES.length} className="flex items-center gap-9">
              <span className="font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] whitespace-nowrap text-bone/80 transition-colors hover:text-bone">
                {n}
              </span>
              <span className="text-sm text-pearl/70">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
