"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { loadGsap } from "@/lib/gsap";
import { useMotionOK } from "@/lib/motion";

/**
 * Tiny running folio pinned to the bottom-right on large screens: the
 * chapter the reader is currently in, like a page number in a magazine.
 */
export function ChapterProgress() {
  const [current, setCurrent] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const motionOK = useMotionOK();

  useEffect(() => {
    if (!motionOK) return;
    let cancelled = false;
    let triggers: Array<{ kill: () => void } | null> = [];
    const first = site.chapters[0].id;
    const last = site.chapters[site.chapters.length - 1].id;

    loadGsap().then(({ ScrollTrigger }) => {
      if (cancelled) return;
      triggers = site.chapters.map((ch) => {
        const el = document.querySelector<HTMLElement>(`[data-chapter="${ch.id}"]`);
        if (!el) return null;
        const isDark = el.dataset.theme === "dark";
        const set = () => {
          setCurrent(ch.id);
          setDark(isDark);
        };
        return ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: set,
          onEnterBack: set,
          onLeave: (self) => {
            if (self.direction === 1 && ch.id === last) setCurrent(null);
          },
          onLeaveBack: () => {
            if (ch.id === first) setCurrent(null);
          },
        });
      });
    });

    return () => {
      cancelled = true;
      triggers.forEach((t) => t?.kill());
    };
  }, [motionOK]);

  const chapter = site.chapters.find((c) => c.id === current);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed bottom-6 right-[var(--spacing-gutter)] z-40 hidden items-center gap-3 transition-[opacity,color] duration-700 lg:flex",
        chapter ? "opacity-100" : "opacity-0",
        dark ? "text-paper" : "text-ink",
      )}
    >
      <span className="t-eyebrow tabular-nums">Ch. {chapter?.number ?? "01"}</span>
      <span className="h-px w-6 bg-current opacity-50" />
      <span className="t-eyebrow opacity-70">{chapter?.title ?? ""}</span>
    </div>
  );
}
