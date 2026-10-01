import * as React from "react";

import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  delay?: number;
};

/** Aparece com fade + blur quando entra na tela. */
export function Reveal({ as: Comp = "div", delay = 0, className, style, ...props }: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Comp
      ref={ref}
      className={cn("reveal", visible && "in", className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...props}
    />
  );
}
