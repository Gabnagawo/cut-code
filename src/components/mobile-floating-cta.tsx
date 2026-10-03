import * as React from "react";

import { WhatsAppIcon } from "@/components/brand-icons";
import { hasWhatsapp, whatsappHref } from "@/data/content";
import { linkProps } from "@/lib/link-props";
import { cn } from "@/lib/utils";

/**
 * CTA móvel flutuante discreto:
 * - Aparece após a rolagem ultrapassar o hero.
 * - Oculta-se ao entrar na seção de contato para não cobrir o formulário ou botões.
 * - Respeita a safe-area inferior em dispositivos móveis (ex.: iPhones).
 * - Cumpre WCAG AA (alvo >= 44px, foco visível, contraste 12:1).
 */
export function MobileFloatingCta() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contato");

    if (!hero) {
      const onScroll = () => {
        const scrolledPastHero = window.scrollY > 400;
        const nearBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 600;
        setVisible(scrolledPastHero && !nearBottom);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    let heroPassed = false;
    let inContact = false;

    const update = () => {
      setVisible(heroPassed && !inContact);
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0.1 }
    );
    heroObserver.observe(hero);

    let contactObserver: IntersectionObserver | null = null;
    if (contact) {
      contactObserver = new IntersectionObserver(
        ([entry]) => {
          inContact = entry.isIntersecting;
          update();
        },
        { threshold: 0.1 }
      );
      contactObserver.observe(contact);
    }

    return () => {
      heroObserver.disconnect();
      contactObserver?.disconnect();
    };
  }, []);

  const href = whatsappHref();
  const label = hasWhatsapp() ? "Pedir orçamento no WhatsApp" : "Pedir orçamento";

  return (
    <aside
      aria-label="Ação rápida de contato"
      className={cn(
        "fixed right-4 z-40 md:hidden transition-all duration-300 ease-[var(--ease-standard)] motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      )}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <a
        {...linkProps(href)}
        aria-label={label}
        className="group flex min-h-11 items-center gap-2.5 rounded-full border border-white/20 bg-graphite/95 px-4 py-2.5 text-sm font-medium text-paper shadow-[0_12px_32px_-8px_rgb(30_30_30/0.6)] backdrop-blur-md transition-transform duration-200 active:scale-95"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <WhatsAppIcon aria-hidden className="size-4 shrink-0 text-emerald-400" />
        <span>Pedir orçamento</span>
      </a>
    </aside>
  );
}
