"use client";

import { useRef, type ReactNode } from "react";
import { useGsap } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px (positive = moves up as you scroll down). */
  y?: number;
  /** Horizontal travel in px. */
  x?: number;
};

/** Moves its children at a different speed to the page while in view. */
export function Parallax({ children, className, y = 80, x = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(ref, ({ gsap }, el) => {
    gsap.fromTo(
      el,
      { y: y / 2, x: x / 2 },
      {
        y: -y / 2,
        x: -x / 2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
