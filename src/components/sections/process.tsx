import { Rocket } from "lucide-react";

import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections/section-head";
import { STEPS } from "@/data/content";

export function Process() {
  return (
    <section id="processo" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24">
      <SectionHead
        eyebrow="Como funciona"
        title={
          <>
            Simples, rápido e <span className="text-iris">sem enrolação</span>.
          </>
        }
      />

      <ol className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon ?? Rocket;
          return (
            <Reveal as="li" key={step.title} delay={i * 90} className="h-full">
              <GlowCard className="h-full">
                <div className="p-6 sm:p-8">
                  <span className="grid size-12 place-items-center rounded-full border border-hairline bg-white/70 text-graphite transition-all duration-300 ease-glass group-hover/card:scale-110 group-hover/card:bg-graphite group-hover/card:text-paper">
                    <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-heading mt-8 text-[1.6rem] leading-tight text-graphite">{step.title}</h3>
                  <p className="mt-2 text-base text-mist">
                    {step.highlight
                      ? step.text.split(step.highlight).flatMap((part, j, arr) =>
                          j < arr.length - 1
                            ? [part, <b key={j} className="font-semibold text-graphite">{step.highlight}</b>]
                            : [part],
                        )
                      : step.text}
                  </p>
                </div>
              </GlowCard>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
