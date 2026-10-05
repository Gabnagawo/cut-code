import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";

/** Título de seção no estilo das apresentações: grotesca negrito + fio fino. */
export function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="mb-10 w-full sm:mb-12">
      <Reveal as="p" className="mb-4 text-xs font-medium tracking-[0.28em] text-mist uppercase sm:mb-5">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" delay={80} className="font-display max-w-5xl text-[clamp(2.15rem,5.2vw,4.5rem)] leading-[1.08] tracking-[-0.035em] text-graphite">
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" delay={140} className="mt-5 w-full max-w-3xl text-base text-mist sm:mt-6 sm:text-lg">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
