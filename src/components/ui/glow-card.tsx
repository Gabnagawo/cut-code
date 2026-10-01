import * as React from "react";

import { cn } from "@/lib/utils";

type GlowCardProps<T extends React.ElementType> = {
  as?: T;
  /** Inclinação máxima em graus (0 desliga o tilt 3D) */
  tilt?: number;
  /** Cor do spotlight interno */
  glow?: string;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Cartão de vidro com hover "vivo":
 * - spotlight que segue o cursor
 * - borda que acende perto do cursor
 * - tilt 3D sutil
 * - faixa de brilho que atravessa o cartão
 * Em toque / reduced motion, só o lift + brilho de borda (sem tilt).
 */
export function GlowCard<T extends React.ElementType = "div">({
  as,
  tilt = 6,
  glow = "rgb(201 195 255 / 0.16)",
  className,
  children,
  ...props
}: GlowCardProps<T>) {
  const Comp = (as ?? "div") as React.ElementType;
  const ref = React.useRef<HTMLElement>(null);
  const frame = React.useRef(0);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
      if (tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.style.setProperty("--ry", `${((x / r.width) - 0.5) * tilt}deg`);
        el.style.setProperty("--rx", `${(0.5 - y / r.height) * tilt}deg`);
      }
    });
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Comp
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ "--glow": glow } as React.CSSProperties}
      className={cn(
        "glass group/card relative overflow-hidden rounded-[28px]",
        "transition-[transform,box-shadow] duration-500 ease-glass will-change-transform",
        "[transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateY(0)]",
        "hover:[transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateY(-6px)]",
        "hover:shadow-[0_40px_100px_-30px_rgb(91_75_214/0.55),inset_0_1px_0_rgb(255_255_255/0.25)]",
        "focus-visible:-translate-y-1.5",
        className,
      )}
      {...props}
    >
      {/* spotlight interno */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(520px circle at var(--x, 50%) var(--y, 0%), var(--glow), transparent 42%)",
        }}
      />
      {/* borda acesa perto do cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--x, 50%) var(--y, 0%), rgb(255 255 255 / 0.85), rgb(201 195 255 / 0.4) 30%, transparent 60%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* faixa de brilho */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-10 -left-1/2 z-[1] w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-glass group-hover/card:left-[130%] group-hover/card:opacity-100"
      />
      <div className="relative z-[2] h-full">{children}</div>
    </Comp>
  );
}
