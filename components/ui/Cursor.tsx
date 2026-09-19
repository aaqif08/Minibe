"use client";

import { useEffect, useRef, useState } from "react";
import { loadGsap } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

type Mode = "default" | "link" | "view" | "reserve" | "drag";

const LABELS: Partial<Record<Mode, string>> = {
  view: "View",
  reserve: "Reserve",
  drag: "Drag",
};

const INTERACTIVE = "[data-cursor], a, button, [role='button'], input, select, textarea";

/**
 * Custom cursor — desktop, fine-pointer devices only. A small dot follows the
 * pointer tightly; a ring follows with lag and grows into a labelled disc
 * over images (`data-cursor="view"`), reservation CTAs (`data-cursor="reserve"`)
 * and draggable galleries (`data-cursor="drag"`).
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      setEnabled(true);
      document.documentElement.classList.add("has-cursor");

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
      const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
      const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
      const rx = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
      const ry = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

      let shown = false;
      const move = (e: PointerEvent) => {
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
        if (!shown) {
          shown = true;
          gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
        }
      };
      const over = (e: PointerEvent) => {
        const target = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE);
        const explicit = target?.dataset.cursor as Mode | undefined;
        setMode(explicit ?? (target ? "link" : "default"));
      };
      const leave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      const enter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });

      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerover", over, { passive: true });
      document.documentElement.addEventListener("mouseleave", leave);
      document.documentElement.addEventListener("mouseenter", enter);

      cleanup = () => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        document.documentElement.removeEventListener("mouseleave", leave);
        document.documentElement.removeEventListener("mouseenter", enter);
        document.documentElement.classList.remove("has-cursor");
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" data-mode={enabled ? mode : undefined} aria-hidden />
      <div ref={ringRef} className="cursor-ring" data-mode={enabled ? mode : undefined} aria-hidden>
        {enabled ? <span className="cursor-label">{LABELS[mode] ?? ""}</span> : null}
      </div>
    </>
  );
}
