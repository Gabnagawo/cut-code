import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#processo", label: "Como funciona" },
];

export function Brand({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("inline-flex items-center gap-2.5 font-serif text-[1.35rem]", className)}>
      <img src="assets/logo-mark.png" alt="" width={20} height={25} className="h-auto w-5" />
      <span>
        Cut <i className="text-pearl">&</i> Code
      </span>
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Principal"
        className={cn(
          "glass mx-auto flex h-[60px] max-w-[920px] items-center justify-between gap-4 rounded-full pr-2.5 pl-5 transition-all duration-500",
          scrolled && "h-[54px] max-w-[860px] bg-ink/60",
        )}
      >
        <Brand />
        <ul className="hidden gap-8 text-sm text-mist md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative transition-colors hover:text-bone after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-pearl after:transition-all after:duration-300 hover:after:w-full">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild size="sm" className="h-10 rounded-full bg-bone px-4 text-ink hover:bg-white">
          <a href="#contato">Fale com a gente</a>
        </Button>
      </nav>
    </header>
  );
}
