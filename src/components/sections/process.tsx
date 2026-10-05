import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections/section-head";
import { GlowCard } from "@/components/ui/glow-card";
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

      <ul className="flex flex-col border-t border-hairline">
        {STEPS.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 90} className="border-b border-hairline">
            <GlowCard variant="light" tilt={0} className="-mx-4 p-4 sm:-mx-8 sm:p-8 rounded-2xl sm:rounded-[28px]">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-8 lg:gap-16">
                <h3 className="font-heading shrink-0 text-[1.6rem] leading-tight text-graphite sm:w-1/3">
                  {step.title}
                </h3>
                <p className="text-base text-mist sm:w-2/3">
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
        ))}
      </ul>
    </section>
  );
}
