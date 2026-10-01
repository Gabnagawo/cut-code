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
      {/* luz ambiente fixa atrás do vidro */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <span className="absolute -top-[16vmax] -left-[12vmax] size-[48vmax] rounded-full bg-[radial-gradient(circle_at_30%_30%,#5b4bd6,transparent_65%)] opacity-35 blur-[90px]" />
        <span className="absolute top-[40vh] -right-[14vmax] size-[42vmax] rounded-full bg-[radial-gradient(circle,#2b7fb8,transparent_65%)] opacity-25 blur-[90px]" />
        <span className="absolute -bottom-[20vmax] left-[25vw] size-[36vmax] rounded-full bg-[radial-gradient(circle,#b5527b,transparent_65%)] opacity-20 blur-[90px]" />
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
