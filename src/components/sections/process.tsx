import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections/section-head";
import { STEPS } from "@/data/content";

export function Process() {
  return (
    <section id="processo" className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-28 sm:px-6 sm:pt-36">
      <SectionHead
        eyebrow="Como funciona"
        title={
          <>
            Simples, rápido e <em className="text-sheen">sem enrolação</em>.
          </>
        }
      />

      <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* linha que conecta os passos */}
        <span aria-hidden className="absolute top-[3.4rem] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block" />
        {STEPS.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 90} className="h-full">
            <GlowCard className="h-full">
              <div className="p-7 sm:p-8">
                <span className="relative grid size-12 place-items-center rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255/0.3),rgb(201_195_255/0.1))] font-serif text-xl shadow-[inset_0_1px_1px_rgb(255_255_255/0.4)] transition-all duration-500 ease-glass group-hover/card:scale-110 group-hover/card:bg-bone group-hover/card:text-ink group-hover/card:shadow-[0_0_40px_-4px_rgb(201_195_255/0.9)]">
                  {i + 1}
                </span>
                <h3 className="mt-10 font-serif text-[1.7rem] leading-tight">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] text-mist">
                  {step.highlight
                    ? step.text.split(step.highlight).flatMap((part, j, arr) =>
                        j < arr.length - 1
                          ? [part, <b key={j} className="font-medium text-bone">{step.highlight}</b>]
                          : [part],
                      )
                    : step.text}
                </p>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
