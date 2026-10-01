import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";

/** Título de seção no estilo das apresentações: grotesca negrito + fio fino. */
export function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="mb-12 max-w-3xl sm:mb-14">
      <Reveal as="p" className="mb-5 text-xs font-medium tracking-[0.28em] text-mist uppercase">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" delay={80} className="font-heading text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[0.98] text-graphite">
        {title}
      </Reveal>
      <Reveal delay={140}>
        <span className="rule mt-8" />
      </Reveal>
      {lead && (
        <Reveal as="p" delay={180} className="mt-6 max-w-xl text-lg text-mist">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
