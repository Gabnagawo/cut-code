import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";

export function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="mb-12 max-w-3xl sm:mb-14">
      <Reveal as="p" className="mb-5 text-xs font-medium tracking-[0.32em] text-mist uppercase">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" delay={80} className="font-serif text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.03] tracking-[-0.01em]">
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" delay={160} className="mt-6 max-w-xl text-lg font-light text-mist">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
