"use client";

import { useEffect, useLayoutEffect, useRef, useState, type DependencyList, type RefObject } from "react";
import { loadGsap, type GsapApi } from "./gsap";

export const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const REDUCED = "(prefers-reduced-motion: reduce)";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED).matches;
}

export function hasFinePointer() {
  return typeof window !== "undefined" && window.matchMedia(FINE_POINTER).matches;
}

/**
 * True once mounted when motion is allowed. Components use this to decide
 * whether to build GSAP timelines. Reduced-motion users get static layouts.
 */
export function useMotionOK() {
  // Computed synchronously on the client so effects can run before first
  // paint; render output never depends on this value.
  const [ok, setOk] = useState(() => typeof window !== "undefined" && !prefersReducedMotion());
  useEffect(() => {
    const mq = window.matchMedia(REDUCED);
    const update = () => setOk(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok;
}

type Setup = (api: GsapApi, el: HTMLElement) => void | (() => void);

/**
 * Runs a GSAP setup function scoped to `scope` once GSAP has loaded, and
 * reverts everything on cleanup. Skips entirely when motion is not allowed.
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: Setup, deps: DependencyList = []) {
  const motionOK = useMotionOK();
  const setupRef = useRef(setup);

  useIsoLayoutEffect(() => {
    setupRef.current = setup;
  });

  useIsoLayoutEffect(() => {
    if (!motionOK || !scope.current) return;
    const el = scope.current;
    let ctx: gsap.Context | undefined;
    let teardown: void | (() => void);
    let cancelled = false;

    loadGsap().then((api) => {
      if (cancelled) return;
      ctx = api.gsap.context(() => {
        teardown = setupRef.current(api, el);
      }, el);
    });

    return () => {
      cancelled = true;
      teardown?.();
      ctx?.revert();
    };
  }, [motionOK, ...deps]);
}

/** Split a string into word spans wrapped in overflow-hidden masks. */
export function splitWords(text: string) {
  return text.split(/(\s+)/).filter((w) => w.length > 0);
}
