import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";

/** Título de seção no estilo das apresentações: grotesca negrito + fio fino. */
export function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="mb-12 max-w-3xl">
      <Reveal as="p" className="mb-5 text-xs font-medium tracking-[0.28em] text-mist uppercase">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" delay={80} className="font-display text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.05] tracking-[-0.035em] text-graphite">
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" delay={140} className="mt-6 max-w-xl text-lg text-mist">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
