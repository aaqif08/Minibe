"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGsap } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in seconds after entering view. */
  delay?: number;
  /** Rise distance in px. */
  y?: number;
  /** Stagger direct children instead of animating the wrapper. */
  stagger?: number;
  id?: string;
};

/**
 * Soft rise + fade when the element enters the viewport. With `stagger`,
 * direct children reveal one after another.
 */
export function Reveal({ children, as: Tag = "div", className, delay = 0, y = 28, stagger, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ gsap }, el) => {
    const targets = stagger ? Array.from(el.children) : el;
    gsap.set(targets, { opacity: 0, y });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: "expo.out",
      delay,
      stagger: stagger ?? 0,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  return (
    <Tag ref={ref} id={id} className={cn(className)} data-reveal={stagger ? undefined : ""}>
      {children}
    </Tag>
  );
}
