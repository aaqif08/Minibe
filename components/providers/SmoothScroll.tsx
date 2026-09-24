"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type ScrollApi = {
  scrollTo: (target: string | HTMLElement | number, opts?: { offset?: number; immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
};

const ScrollContext = createContext<ScrollApi | null>(null);

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScroll must be used inside <SmoothScroll>");
  return ctx;
}

/**
 * Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger and Lenis
 * share one frame. Both libraries load after hydration so they never delay
 * first paint. Native scroll stays in charge on touch devices and for
 * reduced-motion users (Lenis honours prefers-reduced-motion itself).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = prefersReducedMotion();
    document.documentElement.classList.toggle("motion", !reduced);

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import("lenis"), loadGsap()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const lenis = new LenisCtor({
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
        respectReducedMotion: true,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      // Lenis does not intercept native touch scrolling, restored scroll
      // positions or programmatic jumps — without this, scroll-triggered
      // reveals can stay hidden on mobile.
      const onNativeScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Refresh measurements after fonts + first paint settle.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      const t = window.setTimeout(refresh, 600);

      cleanup = () => {
        window.removeEventListener("scroll", onNativeScroll);
        window.clearTimeout(t);
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const scrollTo = useCallback<ScrollApi["scrollTo"]>((target, opts) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: opts?.offset ?? 0,
        immediate: opts?.immediate,
        duration: 1.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (el instanceof HTMLElement) {
      const top = el.getBoundingClientRect().top + window.scrollY + (opts?.offset ?? 0);
      window.scrollTo({ top, behavior: opts?.immediate ? "instant" : "smooth" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  }, []);

  // Every route starts at the top, with fresh ScrollTrigger measurements for
  // the new page's pinned and scrubbed sections.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    let raf = 0;
    loadGsap().then(({ ScrollTrigger }) => {
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return <ScrollContext.Provider value={{ scrollTo, stop, start }}>{children}</ScrollContext.Provider>;
}
