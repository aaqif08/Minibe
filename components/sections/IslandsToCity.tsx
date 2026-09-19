"use client";

import { useRef } from "react";
import { site } from "@/data/site";
import { islands } from "@/data/islands";
import { images } from "@/data/images";
import { useGsap } from "@/lib/motion";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Chapter 02 — a horizontal passage from the Andamans to Bengaluru.
 * On large screens the track pins and scrolls sideways; on smaller screens
 * it flows vertically as three editorial spreads.
 */
export function IslandsToCity() {
  const chapter = site.chapters[1];
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsap(pinRef, ({ gsap }, pin) => {
    const track = trackRef.current;
    if (!track) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      // Slow drift on the two photographs while travelling sideways
      track.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: el, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  });

  return (
    <section
      id="islands"
      data-chapter="islands"
      data-theme="dark"
      className="relative bg-midnight text-paper"
      aria-labelledby="islands-title"
    >
      <div className="wrap pt-14 md:pt-20">
        <ChapterMarker chapter={chapter} light />
      </div>

      <div ref={pinRef} className="relative overflow-hidden">
        <div ref={trackRef} className="flex flex-col lg:h-svh lg:w-max lg:flex-row">
          {/* Spread 1 — the islands */}
          <div className="wrap grid grid-cols-12 items-center gap-6 py-16 lg:w-screen lg:py-0">
            <div className="col-span-12 lg:col-span-6">
              <h2 id="islands-title" className="sr-only">
                From the islands to the city
              </h2>
              <WordReveal
                as="p"
                text={islands.from}
                className="t-display text-paper"
                lineClassName="[&:nth-child(2)]:text-outline [&:nth-child(2)]:text-paper/70"
              />
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div data-drift>
                <ImageReveal
                  image={images.entranceBlue}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[3/4] max-h-[70svh] w-full"
                  from="left"
                />
              </div>
              <p className="t-caption mt-4 text-paper/60">The entrance — an island memory, painted in blue.</p>
            </div>
          </div>

          {/* Spread 2 — the rhythm */}
          <div className="wrap flex items-center py-12 lg:w-[70vw] lg:py-0">
            <Reveal as="ol" stagger={0.15} className="grid gap-10 lg:max-w-xl">
              {islands.lines.map((line, i) => (
                <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line-light pt-5">
                  <span className="t-eyebrow text-orange">0{i + 1}</span>
                  <p className="t-lead text-paper/90">{line}</p>
                </li>
              ))}
            </Reveal>
          </div>

          {/* Spread 3 — the city */}
          <div className="wrap grid grid-cols-12 items-center gap-6 py-16 lg:w-screen lg:py-0">
            <div className="col-span-12 order-2 lg:order-1 lg:col-span-5">
              <div data-drift>
                <ImageReveal
                  image={images.interiorCoral}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[3/4] max-h-[70svh] w-full"
                  from="right"
                />
              </div>
              <p className="t-caption mt-4 text-paper/60">Coral and amber, cane stools at the counter — Bengaluru.</p>
            </div>
            <div className="col-span-12 order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
              <WordReveal
                as="p"
                text={islands.to}
                className="t-display text-orange"
                lineClassName="[&:nth-child(2)]:text-outline [&:nth-child(2)]:text-orange/80"
              />
              <Reveal delay={0.3} className="mt-10">
                <p className="t-lead max-w-md text-paper/85">{islands.tagline}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
