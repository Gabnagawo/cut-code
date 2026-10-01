import * as React from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/data/content";
import { linkProps } from "@/lib/link-props";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#processo", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

export function Brand({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("font-heading inline-flex shrink-0 items-center gap-2.5 text-[1.2rem] tracking-[-0.03em]! whitespace-nowrap text-graphite", className)}>
      <img src="assets/logo-mark-dark.png" alt="" width={20} height={25} className="h-auto w-5" />
      Cut & Code
    </a>
  );
}

/** Seção visível no momento (para destacar o link no menu). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState<string | null>(null);
  React.useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      // considera "ativa" a seção que cruza a faixa do meio da tela
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const active = useActiveSection(SECTION_IDS);
  const cta = whatsappHref();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fecha o menu com Esc
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Principal"
        className={cn(
          "glass mx-auto flex h-[60px] max-w-[920px] items-center justify-between gap-1 rounded-full pr-2 pl-4 min-[360px]:gap-2 transition-all duration-300 ease-[var(--ease-standard)] sm:gap-4 sm:pr-2.5 sm:pl-5",
          scrolled && "h-[54px] max-w-[860px]",
        )}
      >
        <Brand />
        <ul className="hidden gap-6 text-sm text-mist md:flex lg:gap-8">
          {NAV_LINKS.slice(0, -1).map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative transition-colors duration-150 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-graphite after:transition-all after:duration-300 hover:text-graphite hover:after:w-full",
                    isActive ? "text-graphite after:w-full" : "after:w-0",
                  )}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-1 min-[360px]:gap-1.5">
          <Button asChild size="sm" className="h-11 rounded-full bg-graphite px-3 text-paper hover:bg-graphite-2 min-[400px]:px-4 md:h-10">
            <a {...linkProps(cta)}>
              <span className="hidden min-[400px]:inline">Pedir orçamento</span>
              <span className="min-[400px]:hidden">Orçamento</span>
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-2.5 text-sm font-medium text-graphite transition-colors duration-150 hover:bg-graphite/5 md:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            {/* rótulo visível ao lado do ícone; em telas muito estreitas fica só para leitor de tela */}
            <span className="max-[359px]:sr-only">{open ? "Fechar" : "Menu"}</span>
          </button>
        </div>
      </nav>

      {/* menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="glass mx-auto mt-2 max-w-[920px] rounded-3xl p-2 md:hidden"
      >
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-heading flex items-center justify-between rounded-2xl px-4 py-3.5 text-xl tracking-[-0.02em]! text-graphite transition-colors hover:bg-white/70",
                  active === l.href.slice(1) && "bg-white/70",
                )}
              >
                {l.label}
                <span aria-hidden className="text-mist">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
