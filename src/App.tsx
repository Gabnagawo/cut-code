import { Contact, Footer } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Nav } from "@/components/sections/nav";
import { Niches } from "@/components/sections/niches";
import { Portfolio } from "@/components/sections/portfolio";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { HAS_PORTFOLIO } from "@/data/content";

export default function App() {
  return (
    <>
      {/* luz ambiente menta fixa atrás do vidro */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <span className="absolute top-[35vh] -right-[18vmax] size-[46vmax] rounded-full bg-[radial-gradient(circle,#dcecee,transparent_62%)]" />
        <span className="absolute -bottom-[22vmax] -left-[14vmax] size-[44vmax] rounded-full bg-[radial-gradient(circle,#d5ebe8,transparent_62%)]" />
      </div>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Niches />
        <Services />
        {/* só com material real de cliente (ver CLIENTS em content.ts) */}
        {HAS_PORTFOLIO && <Portfolio />}
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
