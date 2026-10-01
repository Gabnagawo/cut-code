import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { Brand } from "@/components/sections/nav";
import { CONTACT } from "@/data/content";

export function Contact() {
  return (
    <section id="contato" className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-28 sm:px-6 sm:pt-36">
      <Reveal>
        <GlowCard tilt={0} className="bg-[radial-gradient(80%_120%_at_50%_0%,rgb(201_195_255/0.2),transparent_60%),linear-gradient(180deg,rgb(255_255_255/0.06),rgb(255_255_255/0.02))]">
          <div className="relative px-6 py-16 text-center sm:py-24">
            <img
              src="assets/logo-mark.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-20 -bottom-36 w-[420px] rotate-[-12deg] opacity-[0.06] transition-transform duration-[1.5s] ease-glass group-hover/card:rotate-[-4deg]"
            />
            <p className="mb-5 text-xs font-medium tracking-[0.32em] text-mist uppercase">Vamos começar?</p>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.03]">
              Conte sobre o seu negócio.
              <br />
              <em className="text-sheen">A gente cuida do resto.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-lg font-light text-mist">Respondemos rápido. Orçamento sem compromisso.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-bone px-7 text-base text-ink shadow-[0_10px_40px_-10px_rgb(201_195_255/0.7)] hover:-translate-y-0.5 hover:bg-white">
                <a href={CONTACT.whatsapp}>
                  <WhatsAppIcon className="mr-2 size-5" />
                  Chamar no WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="glass-pill h-14 rounded-full border-white/15 bg-white/5 px-7 text-base text-bone hover:-translate-y-0.5 hover:bg-white/10 hover:text-bone"
              >
                <a href={CONTACT.instagram}>
                  <InstagramIcon className="mr-2 size-5" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>
        </GlowCard>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 sm:mt-32">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 pt-10 pb-12 text-sm text-mist sm:flex-row sm:items-center sm:px-6">
        <Brand className="text-bone" />
        <p>Sites e vídeos de divulgação para clínicas, restaurantes, lojas e empresas.</p>
        <p>© {new Date().getFullYear()} Cut & Code</p>
      </div>
    </footer>
  );
}
