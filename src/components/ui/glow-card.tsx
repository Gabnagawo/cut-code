import * as React from "react";

import { cn } from "@/lib/utils";

type GlowCardProps<T extends React.ElementType> = {
  as?: T;
  /** Inclinação máxima em graus (0 desliga o tilt 3D) */
  tilt?: number;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Cartão de vidro fosco com hover "vivo":
 * - luz iridescente (menta/lilás/rosa) que segue o cursor
 * - borda que acende em película iridescente perto do cursor
 * - tilt 3D sutil + elevação com sombra mais longa
 * - reflexo que atravessa o cartão
 * Em toque / reduced motion, só elevação + borda (sem tilt).
 */
export function GlowCard<T extends React.ElementType = "div">({
  as,
  tilt = 6,
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
        el.style.setProperty("--ry", `${(x / r.width - 0.5) * tilt}deg`);
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
      className={cn(
        "glass group/card relative overflow-hidden rounded-[28px]",
        "transition-[transform,box-shadow] duration-300 ease-glass will-change-transform",
        "[transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateY(0)]",
        "hover:[transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateY(-6px)]",
        "hover:shadow-[0_1px_0_rgb(255_255_255/0.95)_inset,0_40px_80px_-30px_rgb(30_34_40/0.38),0_4px_12px_-4px_rgb(30_34_40/0.08)]",
        className,
      )}
      {...props}
    >
      {/* luz iridescente interna */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), rgb(159 227 218 / 0.38), rgb(201 184 255 / 0.22) 35%, rgb(244 184 216 / 0.12) 55%, transparent 70%)",
        }}
      />
      {/* borda acesa perto do cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] p-[1.5px] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--x, 50%) var(--y, 0%), #9fe3da, #c9b8ff 35%, #f4b8d8 55%, transparent 75%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* reflexo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-10 -left-1/2 z-[1] w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 ease-glass group-hover/card:left-[130%] group-hover/card:opacity-100"
      />
      <div className="relative z-[2] h-full">{children}</div>
    </Comp>
  );
}
