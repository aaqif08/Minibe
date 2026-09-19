/**
 * GSAP is loaded on demand so it never sits in the hydration bundle. Every
 * animation hook awaits `loadGsap()`; the first call fetches the chunk, later
 * calls reuse the same promise.
 */
export type GsapApi = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let pending: Promise<GsapApi> | null = null;

export function loadGsap(): Promise<GsapApi> {
  if (!pending) {
    pending = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
      g.gsap.registerPlugin(s.ScrollTrigger);
      g.gsap.defaults({ ease: "expo.out", duration: 1.2 });
      return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
    });
  }
  return pending;
}

/** Shared easings so every animation on the site feels related. */
export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
  soft: "power2.out",
} as const;
