"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/data/site";
import { story } from "@/data/story";
import { images } from "@/data/images";
import { useGsap } from "@/lib/motion";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

/**
 * Chapter 05 — our story. The Andamans → France → Bali → Bengaluru passage
 * runs sideways on large screens (pinned) and stacks on small ones, then
 * "Meet Chef Jenny" carries the longer read underneath.
 */
export function Story() {
  const chapter = site.chapters[4];
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsap(pinRef, ({ gsap }, pin) => {
    const track = trackRef.current;
    if (!track) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
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
    });
    return () => mm.revert();
  });

  return (
    <section id="story" data-chapter="story" data-theme="dark" className="bg-midnight text-paper" aria-labelledby="story-title">
      <div className="wrap pt-14 md:pt-20">
        <ChapterMarker chapter={chapter} light />
      </div>

      {/* Headline */}
      <div className="wrap mt-14 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-20">
        <div className="col-span-12 lg:col-span-7">
          <WordReveal as="h2" id="story-title" text={story.title} className="t-section text-orange" />
        </div>
        <Reveal className="col-span-12 flex items-end md:col-span-9 lg:col-span-5 lg:col-start-8">
          <p className="t-lead text-paper/90">{story.lede}</p>
        </Reveal>
      </div>

      {/* The journey — horizontal on desktop */}
      <div ref={pinRef} className="relative mt-16 overflow-hidden md:mt-24 lg:mt-0">
        <div ref={trackRef} className="flex flex-col gap-12 lg:h-svh lg:w-max lg:flex-row lg:items-center lg:gap-0">
          {story.journey.map((step, i) => (
            <article
              key={step.id}
              className="wrap grid grid-cols-12 items-center gap-6 lg:w-[58vw] lg:py-0"
            >
              <div className="col-span-12 lg:col-span-11">
                <p className="t-eyebrow text-orange">
                  0{i + 1}
                  <span className="mx-2 opacity-50">/</span>0{story.journey.length}
                </p>
                <h3 className="t-display mt-5 uppercase text-paper">{step.place}</h3>
                <p className="t-quote mt-4 text-paper/80">{step.line}</p>
                <p className="t-body mt-7 max-w-lg text-paper/65">{step.note}</p>
              </div>
            </article>
          ))}

          {/* Closing card of the passage */}
          <div className="wrap lg:w-[46vw]">
            <div className="relative">
              <ImageReveal
                image={images.entranceBlue}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[3/4] max-h-[64svh] w-full"
                from="right"
              />
              <p className="t-caption mt-4 text-paper/60">The entrance — an island memory, painted in blue.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Chef Jenny */}
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="relative col-span-12 md:col-span-7 lg:col-span-5">
          <Parallax y={70}>
            <ImageReveal
              image={images.chefAtPass}
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 58vw, 100vw"
              className="aspect-[4/5] w-full"
              position="62% 30%"
              parallax={5}
              cursor="view"
            />
          </Parallax>
          <Parallax y={-40} className="pointer-events-none absolute -left-3 -top-10 w-[42%] max-w-[260px] md:-left-8 md:-top-14">
            <Image
              src="/images/brand/our-story-script.svg"
              alt="Our Story — hand-lettered"
              width={300}
              height={232}
              unoptimized
              className="h-auto w-full -rotate-6 drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            />
          </Parallax>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <h3 className="t-section text-paper">{story.chef.title}</h3>
          <Reveal className="mt-8">
            <p className="t-lead max-w-lg text-paper/90">{story.chef.lede}</p>
          </Reveal>
          <Reveal stagger={0.12} className="mt-8 flex flex-col gap-5">
            {story.chef.paragraphs.map((p, i) => (
              <p key={i} className="t-body max-w-prose text-paper/70">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal as="dl" stagger={0.1} className="mt-12 grid" delay={0.15}>
            {story.chef.facts.map((f) => (
              <div key={f.label} className="hairline-light grid grid-cols-[7rem_1fr] gap-4 py-4">
                <dt className="t-eyebrow pt-1 text-paper/45">{f.label}</dt>
                <dd className="font-display text-xl leading-snug text-paper">{f.value}</dd>
              </div>
            ))}
          </Reveal>

          <Reveal className="hairline-light mt-2 pt-8">
            <p className="t-quote text-paper/85">{story.belief}</p>
            <a
              href={site.chef.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="t-eyebrow link-underline mt-8 inline-block text-orange"
            >
              {site.chef.name} · {site.chef.handle}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
