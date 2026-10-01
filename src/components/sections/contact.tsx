import { ArrowUpRight } from "lucide-react";

import { GlassBlob } from "@/components/ui/glass-blob";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { Brand } from "@/components/sections/nav";
import { CONTACT } from "@/data/content";

const CHANNELS = [
  { label: "WhatsApp", detail: "Resposta rápida", href: CONTACT.whatsapp, icon: WhatsAppIcon },
  { label: "Instagram", detail: "Reels e bastidores", href: CONTACT.instagram, icon: InstagramIcon },
];

/** Encerramento no estilo do slide final: título grande, objeto de vidro e contatos. */
export function Contact() {
  return (
    <section id="contato" className="relative scroll-mt-24 overflow-x-clip pt-28 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-40 -z-10 size-[40rem] rounded-full bg-[radial-gradient(circle,#d3ebe9,transparent_62%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1fr_0.9fr]">
        <Reveal>
          <p className="mb-5 text-xs font-medium tracking-[0.28em] text-mist uppercase">Vamos começar?</p>
          <h2 className="font-heading text-[clamp(3.2rem,7vw,6.2rem)] leading-[0.9] text-graphite">
            Vamos
            <br />
            <span className="text-iris">conversar!</span>
          </h2>
          <p className="mt-8 max-w-sm text-mist">
            Conte sobre o seu negócio e a gente cuida do resto. Respondemos rápido e o orçamento é sem compromisso.
          </p>
        </Reveal>

        <Reveal delay={120} className="relative mx-auto aspect-square w-full max-w-[420px]">
          <GlassBlob seed={5.1} className="absolute -inset-[22%]" />
        </Reveal>

        <Reveal delay={200}>
          <h3 className="font-heading text-2xl text-graphite">Contato</h3>
          <span className="rule mt-4 w-24" />
          <ul className="mt-6 space-y-3">
            {CHANNELS.map(({ label, detail, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="glass group flex items-center gap-4 rounded-2xl p-3 pr-4 transition-all duration-500 ease-glass hover:-translate-y-1 hover:shadow-[0_1px_0_#fff_inset,0_30px_60px_-28px_rgb(30_34_40/0.4)]"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-graphite text-paper transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex-1 leading-tight">
                    <b className="block font-medium text-graphite">{label}</b>
                    <small className="text-mist">{detail}</small>
                  </span>
                  <ArrowUpRight className="size-5 text-graphite transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline sm:mt-32">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 pt-10 pb-12 text-sm text-mist sm:flex-row sm:items-center sm:px-6">
        <Brand />
        <p>Sites e vídeos de divulgação para clínicas, restaurantes, lojas e empresas.</p>
        <p>© {new Date().getFullYear()} Cut & Code</p>
      </div>
    </footer>
  );
}
