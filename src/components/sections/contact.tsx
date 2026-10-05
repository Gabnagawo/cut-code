import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";

import { GlassBlob } from "@/components/ui/glass-blob";
import { GlowCard } from "@/components/ui/glow-card";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { NAV_LINKS } from "@/components/sections/nav";
import { CONTACT, emailHref, hasWhatsapp, whatsappHref } from "@/data/content";
import { linkProps } from "@/lib/link-props";

// canais sem link configurado em CONTACT ficam fora do site (nada de botão que não abre nada)
const CHANNELS = [
  { label: "WhatsApp", detail: CONTACT.whatsappFormatted, href: whatsappHref(), icon: WhatsAppIcon, on: hasWhatsapp() },
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
            <p className="mb-5 text-xs font-medium tracking-[0.28em] text-mist uppercase">Contato</p>
            <h2 className="font-display text-[clamp(3.2rem,7vw,6.2rem)] leading-[0.95] text-graphite">
              Vamos{" "}
              <br />
              <span className="text-iris">conversar?</span>
            </h2>
            <div className="mt-6 max-w-md space-y-4 text-mist">
              <p>
                Seu negócio já tem uma história! A CutCode ajuda a transformá-la em experiência digital.
              </p>
              <p>
                Conte sobre sua marca, seus objetivos e o que você precisa construir. A partir dessas informações, estruturamos uma proposta adequada ao seu momento e ao seu negócio.
              </p>
              <p className="text-sm font-medium text-graphite">
                Orçamento sem compromisso.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <h3 className="font-heading text-2xl text-graphite">Contato</h3>
            <ul className="mt-6 max-w-md space-y-3">
              {CHANNELS.map(({ label, detail, href, icon: Icon }) => (
                <li key={label}>
                  <GlowCard
                    as="a"
                    variant="glass"
                    tilt={0}
                    {...linkProps(href)}
                    className="block rounded-2xl p-3 pr-4 hover:-translate-y-1"
                  >
                    <span className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-graphite text-paper transition-transform duration-300 group-hover/card:scale-110">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <b className="block font-medium text-graphite">{label}</b>
                      <small className="block truncate text-mist">{detail}</small>
                    </span>
                    <ArrowUpRight aria-hidden className="size-5 shrink-0 text-graphite transition-transform duration-300 group-hover/card:rotate-45" />
                    </span>
                  </GlowCard>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative self-start">
          <GlassBlob seed={5.1} interactive={false} className="pointer-events-none absolute -inset-[18%] -z-10" />
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
          <a
            href="#top"
            aria-label="Voltar ao topo"
            onClick={(e) => {
              e.preventDefault();
              const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
              const target = matchMedia('(max-width: 1023px)').matches ? document.getElementById('vitrine') : null;
              if (target) {
                target.scrollIntoView({ behavior });
              } else {
                window.scrollTo({ top: 0, behavior });
              }
              history.replaceState(null, '', location.pathname + location.search);
            }}
            className="group inline-flex items-center gap-3 transition-transform duration-200 hover:scale-105 focus-visible:outline-offset-4 motion-reduce:hover:scale-100"
          >
            <div className="rounded-full bg-[conic-gradient(from_210deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#feda75)] p-[3px]">
              <div className="rounded-full bg-paper p-[3px]">
                <img
                  src="assets/logo/cutcode-grafite-texto.svg"
                  alt=""
                  width={88}
                  height={88}
                  loading="lazy"
                  className="size-22 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-sm font-medium text-graphite">@cut_code</span>
          </a>
          <p className="mt-4 max-w-xs text-mist">Sites, landing pages, produção audiovisual e cobertura completa de eventos para marcas que querem comunicação e conexão com o público.</p>
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
          © {new Date().getFullYear()} CutCode ·
          <a href="privacidade" className="inline-flex min-h-11 items-center text-graphite underline-offset-4 hover:underline md:min-h-0">
            Privacidade
          </a>
        </p>
        <a 
          href="#top" 
          className="group inline-flex items-center gap-2 text-graphite"
          onClick={(e) => {
            e.preventDefault();
            const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
            const target = matchMedia('(max-width: 1023px)').matches ? document.getElementById('vitrine') : null;
            if (target) {
              target.scrollIntoView({ behavior });
            } else {
              window.scrollTo({ top: 0, behavior });
            }
            history.replaceState(null, '', location.pathname + location.search);
          }}
        >
          Voltar ao topo
          <span className="grid size-8 place-items-center rounded-full border border-graphite/15 transition-transform duration-300 group-hover:-translate-y-0.5">
            <ArrowUp aria-hidden className="size-3.5" />
          </span>
        </a>
      </div>
    </footer>
  );
}
