"use client";

import { useRef, type CSSProperties, type ElementType } from "react";
import { useGsap, splitWords } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  /** Text, or an array of lines (each line becomes its own block). */
  text: string | string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /**
   * "rise"  — each word rises out of a mask once when the block enters view.
   * "read"  — words brighten from faint to full as the user scrolls through
   *           (scrubbed), like a line being read aloud.
   */
  mode?: "rise" | "read";
  delay?: number;
  stagger?: number;
  id?: string;
  style?: CSSProperties;
};

/**
 * Splits text into words for typographic reveals. Screen readers get the
 * plain text via aria-label; the visual spans are hidden from the a11y tree.
 */
export function WordReveal({
  text,
  as: Tag = "p",
  className,
  lineClassName,
  mode = "rise",
  delay = 0,
  stagger = 0.045,
  id,
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const lines = Array.isArray(text) ? text : [text];
  const label = lines.join(" ");

  useGsap(ref, ({ gsap }, el) => {
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    if (mode === "read") {
      gsap.set(words, { opacity: 0.16 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: 0.6 },
      });
      return;
    }
    gsap.set(words, { yPercent: 110, opacity: 1 });
    gsap.to(words, {
      yPercent: 0,
      duration: 1.5,
      ease: "expo.out",
      stagger,
      delay,
      scrollTrigger: { trigger: el, start: "top 86%", once: true },
    });
  });

  return (
    <Tag ref={ref} id={id} className={cn(className)} style={style}>
      <span className="sr-only">{label}</span>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className={cn("block", lineClassName)}>
          {splitWords(line).map((w, wi) =>
            /^\s+$/.test(w) ? (
              <span key={wi}> </span>
            ) : (
              <span
                key={wi}
                className={cn("inline-block", mode === "rise" && "overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]")}
              >
                <span data-word className="inline-block will-change-transform">
                  {w}
                </span>
              </span>
            ),
          )}
        </span>
      ))}
    </Tag>
  );
}
