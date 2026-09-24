"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { images } from "@/data/images";
import { useGsap } from "@/lib/motion";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The cover. Paper on the left, Chef Jenny bleeding off the right and bottom.
 * The headline runs across the photo edge and switches from indigo to paper
 * exactly where the photograph begins (two clipped copies of the same text).
 * One viewport, nothing more — the rest of the site lives on its own pages.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);

  // Keep the duotone split aligned to the photo's left edge.
  useEffect(() => {
    const head = headRef.current;
    const photo = photoRef.current;
    if (!head || !photo) return;
    const update = () => {
      const lg = window.matchMedia("(min-width: 1024px)").matches;
      if (!lg) {
        head.style.setProperty("--split", "100%");
        return;
      }
      const h = head.getBoundingClientRect();
      const p = photo.getBoundingClientRect();
      head.style.setProperty("--split", `${Math.max(0, p.left - h.left)}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  useGsap(ref, ({ gsap }, el) => {
    const photoInner = photoRef.current?.firstElementChild as HTMLElement | null;
    if (!photoInner) return;
    gsap.to(photoInner, {
      yPercent: 10,
      scale: 1.06,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(textRef.current, {
      yPercent: -14,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: { trigger: el, start: "40% top", end: "bottom top", scrub: true },
    });
  });

  return (
    <section ref={ref} id="top" className="relative isolate min-h-svh overflow-hidden bg-paper" aria-labelledby="hero-title">
      <div
        ref={photoRef}
        className="absolute inset-x-0 bottom-0 top-20 md:top-24 lg:left-auto lg:right-0 lg:w-[52%] xl:w-[54%]"
      >
        <ImageReveal
          image={images.chefPortrait}
          sizes="(min-width: 1024px) 54vw, 100vw"
          priority
          quality={82}
          instant
          position="50% 22%"
          className="h-full w-full"
        />
        {/* Scrim for overlaid type on small screens only */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/25 to-transparent lg:hidden"
        />
      </div>

      <p aria-hidden className="vertical-text t-eyebrow absolute bottom-10 left-6 hidden rotate-180 text-ink/50 xl:block">
        {site.offer}
      </p>

      <div className="wrap relative flex min-h-svh flex-col pt-20 md:pt-24">
        <div
          ref={textRef}
          className="relative z-10 flex flex-1 flex-col justify-end pb-10 text-paper lg:justify-between lg:pb-16 lg:pt-14 lg:text-ink"
        >
          <div className="hidden lg:block">
            <Eyebrow rule className="text-ink/70">
              Dessert, as the main event
            </Eyebrow>
          </div>

          <div className="lg:mt-8">
            <div className="mb-6 lg:mb-9">
              <span className="block lg:hidden">
                <Logo variant="wordmark" tone="white" width={200} priority />
              </span>
              <span className="hidden lg:block">
                <Logo variant="wordmark" tone="indigo" width={290} priority />
              </span>
            </div>

            <h1 id="hero-title" className="relative">
              <span className="sr-only">
                {site.name} — {site.tagline} {site.by}. {site.offer}
              </span>
              <span
                ref={headRef}
                className="relative block lg:w-[135%]"
                style={{ ["--split" as string]: "100%" }}
                aria-hidden
              >
                <WordReveal
                  as="span"
                  text={["An experiential", "dessert dining"]}
                  className="t-hero block pb-[0.2em] text-paper lg:text-indigo"
                  lineClassName="first:font-light first:italic"
                  delay={0.25}
                  style={{ clipPath: "inset(0 calc(100% - var(--split)) 0 0)" }}
                />
                {/* Paper copy of the same words, clipped to the photo side */}
                <WordReveal
                  as="span"
                  text={["An experiential", "dessert dining"]}
                  className="t-hero pointer-events-none absolute inset-0 hidden pb-[0.2em] text-paper lg:block"
                  lineClassName="first:font-light first:italic"
                  delay={0.25}
                  style={{ clipPath: "inset(0 0 0 var(--split))" }}
                />
              </span>
            </h1>

            <p className="mt-4 t-eyebrow text-paper/80 lg:mt-6 lg:text-ink/70">{site.by}</p>
            <p className="mt-4 font-display text-xl font-light text-paper lg:mt-5 lg:text-[1.6rem] lg:text-indigo">
              {site.offer}
            </p>
          </div>

          {/* Kept inside the paper column on desktop so nothing sits on the photograph */}
          <div className="mt-9 flex flex-col gap-6 lg:mt-0 lg:w-[46%] lg:max-w-xl">
            <p className="t-body-sm text-paper/90 lg:text-ink-soft">{site.intro}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/experience" variant="primary" size="lg">
                {site.cta.explore}
              </Button>
              <Link href="/contact" className="t-eyebrow link-underline text-paper/80 lg:text-ink/70">
                {site.cta.primary} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
