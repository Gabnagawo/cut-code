import { Contact, Footer } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Nav } from "@/components/sections/nav";
import { Niches } from "@/components/sections/niches";
import { Portfolio } from "@/components/sections/portfolio";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";

export default function App() {
  return (
    <>
      {/* luz ambiente menta fixa atrás do vidro */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <span className="absolute top-[35vh] -right-[18vmax] size-[46vmax] rounded-full bg-[radial-gradient(circle,#dcecee,transparent_62%)]" />
        <span className="absolute -bottom-[22vmax] -left-[14vmax] size-[44vmax] rounded-full bg-[radial-gradient(circle,#d5ebe8,transparent_62%)]" />
      </div>
      <Nav />
      <main>
        <Hero />
        <Niches />
        <Services />
        <Portfolio />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
