"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** How far the element follows the pointer, in px. */
  strength?: number;
  className?: string;
};

/**
 * Wraps a control so it is gently pulled towards the pointer while hovered,
 * then eases back. Desktop only; no-op on touch or reduced-motion.
 */
export function MagneticButton({ children, strength = 18, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const xTo = gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3.out" });

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        xTo((dx / r.width) * strength * 2);
        yTo((dy / r.height) * strength * 2);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanup = () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ display: "inline-block", padding: 10, margin: -10 }}>
      {children}
    </div>
  );
}
