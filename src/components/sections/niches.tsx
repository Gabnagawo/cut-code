import { NICHES } from "@/data/content";

export function Niches() {
  const items = [...NICHES, ...NICHES];
  return (
    <section aria-label="Para quem trabalhamos" className="overflow-hidden border-y border-hairline py-6">
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max items-center gap-9 animate-marquee hover:[animation-play-state:paused]">
          {items.map((n, i) => (
            <span key={i} aria-hidden={i >= NICHES.length} className="flex items-center gap-9">
              <span className="font-heading text-[clamp(1.5rem,2.6vw,2.2rem)] whitespace-nowrap text-graphite/35 transition-colors duration-300 hover:text-graphite">
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
