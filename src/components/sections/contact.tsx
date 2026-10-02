import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";

import { GlassBlob } from "@/components/ui/glass-blob";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { Brand, NAV_LINKS } from "@/components/sections/nav";
import { CONTACT, emailHref, hasWhatsapp, whatsappHref } from "@/data/content";
import { linkProps } from "@/lib/link-props";

// canais sem link configurado em CONTACT ficam fora do site (nada de botão que não abre nada)
const CHANNELS = [
  { label: "WhatsApp", detail: "Resposta rápida", href: whatsappHref(), icon: WhatsAppIcon, on: hasWhatsapp() },
  { label: "Instagram", detail: "Reels e bastidores", href: CONTACT.instagram, icon: InstagramIcon, on: !!CONTACT.instagram },
  { label: "E-mail", detail: CONTACT.email, href: emailHref(), icon: Mail, on: true },
].filter((c) => c.on);

/** Encerramento no estilo do slide final: título grande, canais de contato e formulário sobre o objeto de vidro. */
export function Contact() {
  return (
    <section id="contato" className="relative overflow-x-clip pt-16 sm:pt-24">
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-40 -z-10 size-[40rem] rounded-full bg-[radial-gradient(circle,#d3ebe9,transparent_62%)]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-5 text-xs font-medium tracking-[0.28em] text-mist uppercase">Vamos começar?</p>
            <h2 className="font-heading text-[clamp(3.2rem,7vw,6.2rem)] leading-[0.9] text-graphite">
              Vamos
              <br />
              <span className="text-iris">conversar!</span>
            </h2>
            <p className="mt-6 max-w-sm text-mist">
              Conte sobre o seu negócio e a gente cuida do resto. Respondemos rápido e o orçamento é sem compromisso.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <h3 className="font-heading text-2xl tracking-[-0.03em]! text-graphite">Contato</h3>
            <span className="rule mt-4 w-24" />
            <ul className="mt-6 max-w-md space-y-3">
              {CHANNELS.map(({ label, detail, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    {...linkProps(href)}
                    className="glass group flex items-center gap-4 rounded-2xl p-3 pr-4 transition-all duration-300 ease-glass hover:-translate-y-1 hover:shadow-[0_1px_0_#fff_inset,0_30px_60px_-28px_rgb(30_34_40/0.4)]"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-graphite text-paper transition-transform duration-300 group-hover:scale-110">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <b className="block font-medium text-graphite">{label}</b>
                      <small className="block truncate text-mist">{detail}</small>
                    </span>
                    <ArrowUpRight aria-hidden className="size-5 shrink-0 text-graphite transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative self-start">
          <GlassBlob seed={5.1} interactive={false} className="absolute -inset-[18%] -z-10" />
          <div id="orcamento">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-hairline sm:mt-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-12 pb-10 text-sm sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-mist">Sites, vídeos de divulgação e convites interativos para clínicas, restaurantes, lojas, empresas e eventos.</p>
        </div>
        <nav aria-label="Rodapé">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-mist uppercase">Site</p>
          <ul className="md:space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center text-graphite underline-offset-4 hover:underline md:min-h-0">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-mist uppercase">Contato</p>
          <ul className="md:space-y-2">
            {CHANNELS.map(({ label, href }) => (
              <li key={label}>
                <a {...linkProps(href)} className="inline-flex min-h-11 items-center text-graphite underline-offset-4 hover:underline md:min-h-0">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-t border-hairline px-4 py-6 text-sm text-mist sm:px-6">
        <p className="flex flex-wrap items-center gap-x-2">
          © {new Date().getFullYear()} Cut Code ·
          <a href="privacidade" className="inline-flex min-h-11 items-center text-graphite underline-offset-4 hover:underline md:min-h-0">
            Privacidade
          </a>
        </p>
        <a href="#top" className="group inline-flex items-center gap-2 text-graphite">
          Voltar ao topo
          <span className="grid size-8 place-items-center rounded-full border border-graphite/15 transition-transform duration-300 group-hover:-translate-y-0.5">
            <ArrowUp aria-hidden className="size-3.5" />
          </span>
        </a>
      </div>
    </footer>
  );
}
