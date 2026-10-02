import { ClientShowcase } from "@/components/sections/client-showcase";
import { SectionHead } from "@/components/sections/section-head";

export function Portfolio() {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24">
      <SectionHead
        eyebrow="Portfólio"
        title={
          <>
            Trabalhos que já estão <span className="text-iris">no ar</span>.
          </>
        }
      />

      <ClientShowcase />
    </section>
  );
}
