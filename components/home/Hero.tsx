"use client";

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
 * The cover — two deliberate compositions, one set of markup.
 *
 * Phones: the photograph sits above the fold as its own band, cropped to keep
 * Chef Jenny's face clear of the type, which then reads on paper underneath.
 * Nothing is laid over her face and the long introduction stays on /experience.
 *
 * Large screens: paper on the left, the photograph bleeding off the right and
 * bottom, with the headline crossing the edge and switching from indigo to
 * paper exactly where the photograph begins (two clipped copies of the text).
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);

  // Keep the duotone split aligned to the photo's left edge (large screens only).
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
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const photoInner = photoRef.current?.firstElementChild as HTMLElement | null;
      if (photoInner) {
        gsap.to(photoInner, {
          yPercent: 10,
          scale: 1.06,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      }
      gsap.to(textRef.current, {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "40% top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  });

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex flex-col overflow-hidden bg-paper pt-[4.5rem] md:pt-24 lg:block lg:min-h-svh lg:pt-0"
      aria-labelledby="hero-title"
    >
      {/* Photograph — its own band on phones, a bleed on large screens */}
      <div
        ref={photoRef}
        className="relative h-[32svh] min-h-[11rem] w-full shrink-0 [@media(max-height:640px)]:h-[24svh] [@media(max-height:640px)]:min-h-[8.5rem] sm:h-[44svh] lg:absolute lg:inset-y-0 lg:left-auto lg:right-0 lg:top-24 lg:h-auto lg:w-[52%] xl:w-[54%]"
      >
        <ImageReveal
          image={images.chefPortrait}
          sizes="(min-width: 1024px) 54vw, 100vw"
          priority
          quality={82}
          instant
          /* Phones crop to her face; large screens keep the full standing figure. */
          position="52% 16%"
          className="h-full w-full lg:[&_img]:object-[50%_22%]"
        />
        {/* Melts the photograph into the paper the type sits on */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper via-paper/70 to-transparent lg:hidden"
        />
      </div>

      <p aria-hidden className="vertical-text t-eyebrow absolute bottom-10 left-6 hidden rotate-180 text-ink/50 xl:block">
        {site.offer}
      </p>

      <div className="wrap relative flex flex-1 flex-col lg:min-h-svh lg:pt-24">
        <div
          ref={textRef}
          className="relative z-10 flex flex-1 flex-col pb-8 pt-3 text-ink lg:justify-between lg:pb-16 lg:pt-14"
        >
          <div className="hidden lg:block">
            <Eyebrow rule className="text-ink/70">
              Dessert, as the main event
            </Eyebrow>
          </div>

          <div className="lg:mt-8">
            <div className="mb-9 hidden sm:block">
              <Logo variant="wordmark" tone="indigo" width={290} priority />
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
                  className="t-hero block pb-[0.2em] text-indigo"
                  lineClassName="first:font-light first:italic"
                  delay={0.2}
                  style={{ clipPath: "inset(0 calc(100% - var(--split)) 0 0)" }}
                />
                {/* Paper copy of the same words, clipped to the photo side */}
                <WordReveal
                  as="span"
                  text={["An experiential", "dessert dining"]}
                  className="t-hero pointer-events-none absolute inset-0 hidden pb-[0.2em] text-paper lg:block"
                  lineClassName="first:font-light first:italic"
                  delay={0.2}
                  style={{ clipPath: "inset(0 0 0 var(--split))" }}
                />
              </span>
            </h1>

            <p className="t-eyebrow mt-3 text-ink/70 lg:mt-6">{site.by}</p>
            {/* One phrase per line on phones; one line on large screens */}
            <p className="mt-4 font-display text-[1.125rem] font-light leading-snug text-indigo lg:mt-5 lg:text-[1.6rem]">
              {site.offerLines.map((line, i) => (
                <span key={line} className="block lg:inline">
                  {line}
                  {i < site.offerLines.length - 1 ? <span className="hidden lg:inline"> </span> : null}
                </span>
              ))}
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-6 lg:mt-8 lg:w-[46%] lg:max-w-xl">
            {/* The long introduction lives on /experience, not on the cover */}
            <p className="hidden t-body-sm text-ink-soft lg:block">{site.intro}</p>
            {/* Get in touch is the action that matters most — it leads; Explore follows.
                Phones: two full-width, equal-height buttons. Larger screens: side by side. */}
            <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
              <Button href="/contact" variant="primary" size="lg" cursor="reserve" className="w-full sm:w-auto">
                {site.cta.primary}
              </Button>
              <Button href="/experience" variant="outline" size="lg" className="w-full sm:w-auto">
                {site.cta.explore}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
