import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Troca as palavras sem mudar a largura (reserva o espaço da maior palavra).
 * Dá uma volta completa e para na primeira palavra: animação que não para
 * sozinha exigiria um botão de pausa (WCAG 2.2.2).
 */
export function RotatingWords({
  words,
  interval = 2200,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const longest = React.useMemo(() => words.reduce((a, b) => (b.length > a.length ? b : a), ""), [words]);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let steps = 0;
    const id = window.setInterval(() => {
      steps += 1;
      setIndex(steps % words.length);
      if (steps >= words.length) window.clearInterval(id);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={cn("relative inline-block h-[1.2em] overflow-hidden align-[-0.3em] leading-[1.2]", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="invisible">
        {longest}
      </span>
      {words.map((word, i) => {
        const prev = (index - 1 + words.length) % words.length;
        return (
          <span
            key={word}
            aria-hidden
            className={cn(
              "absolute top-0 left-0 whitespace-nowrap transition-all duration-[400ms] ease-glass",
              i === index
                ? "translate-y-0 opacity-100 blur-none"
                : i === prev
                  ? "-translate-y-full opacity-0 blur-sm"
                  : "translate-y-full opacity-0 blur-sm",
            )}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
