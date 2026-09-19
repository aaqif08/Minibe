"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/data/site";
import { images } from "@/data/images";
import { mosaicMenu, courseComponentSets, type MosaicCourse, type AllergenCode } from "@/data/menus";
import { useGsap } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { AllergenChips, AllergenLegend } from "@/components/ui/AllergenChips";

const ACCENT = {
  teal: { text: "text-mosaic-teal", border: "border-mosaic-teal", bg: "bg-mosaic-teal" },
  blue: { text: "text-mosaic-blue", border: "border-mosaic-blue", bg: "bg-mosaic-blue" },
  green: { text: "text-mosaic-green", border: "border-mosaic-green", bg: "bg-mosaic-green" },
  gold: { text: "text-mosaic-gold", border: "border-mosaic-gold", bg: "bg-mosaic-gold" },
  pink: { text: "text-mosaic-pink", border: "border-mosaic-pink", bg: "bg-mosaic-pink" },
} as const;

/** Different crops of the supplied Mosaic artwork — one tessera per course. */
const TILE_POSITIONS = ["12% 18%", "78% 14%", "30% 52%", "86% 46%", "18% 84%", "58% 72%", "44% 30%", "70% 92%"];

const NUMBER_WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

/**
 * Menu 02 — Mosaic. The site shifts into the saturated world of the Mosaic
 * artwork. Each course is a stage: only the name is on screen at first; the
 * components surface one by one as the reader scrolls into it.
 */
export function Mosaic() {
  const menu = mosaicMenu;
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const count = menu.courses.length;
  const countWord = NUMBER_WORDS[count - 1] ?? String(count);

  useGsap(sectionRef, ({ gsap }, el) => {
    gsap.fromTo(
      bgRef.current,
      { yPercent: -8 },
      { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });

  const legendCodes = (["D", "N", "G", "E", "S"] as AllergenCode[]).filter((c) =>
    menu.courses.some((course) => course.allergens.includes(c)),
  );

  return (
    <section
      ref={sectionRef}
      id="mosaic"
      className="relative isolate scroll-mt-16 overflow-hidden bg-mosaic-night text-paper"
      aria-labelledby="mosaic-title"
    >
      {/* Supplied Mosaic artwork as the world behind the menu */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div ref={bgRef} className="absolute -inset-y-[10%] inset-x-0 will-change-transform">
          <Image
            src={images.mosaicArt.src}
            alt=""
            fill
            sizes="100vw"
            quality={70}
            style={{ objectFit: "cover", objectPosition: "50% 40%" }}
            className="opacity-90 saturate-[1.2]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-mosaic-night via-mosaic-night/40 to-mosaic-night" />
      </div>

      <div className="wrap py-section-sm md:py-section">
        <header className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow rule className="text-mosaic-teal">
              Menu 02 — A tasting journey
            </Eyebrow>
            <Reveal className="mt-6">
              <h2
                id="mosaic-title"
                className="t-display bg-cover bg-center bg-clip-text text-transparent"
                style={{ backgroundImage: "url(/images/photos/mosaic-artwork-text.jpg)", backgroundPosition: "50% 50%" }}
              >
                {menu.title}
              </h2>
            </Reveal>
          </div>
          <Reveal className="col-span-12 flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="t-quote text-paper/90">{menu.subtitle}</p>
            <p className="t-body-sm max-w-sm text-paper/65">
              <span className="capitalize">{countWord}</span> courses. Scroll, and each one reveals itself — the way it
              would arrive at the table.
            </p>
          </Reveal>
        </header>

        <ol className="mt-20 md:mt-28">
          {menu.courses.map((course, i) => (
            <CourseStage key={course.number} course={course} index={i} total={count} />
          ))}
        </ol>

        <Reveal className="hairline-light mt-8 flex flex-col gap-8 pt-10 md:flex-row md:items-center md:justify-between">
          <AllergenLegend codes={legendCodes} light />
          <Button href={site.links.reserve} external variant="paper" cursor="reserve">
            {site.cta.primary}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function CourseStage({ course, index, total }: { course: MosaicCourse; index: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const accent = ACCENT[course.accent];
  const sets = courseComponentSets(course);
  const num = String(course.number).padStart(2, "0");

  useGsap(ref, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    gsap.set(q("[data-number]"), { x: -40, opacity: 0 });
    gsap.set(q("[data-title]"), { yPercent: 30, opacity: 0 });
    gsap.set(q("[data-tile]"), { scale: 0.6, rotate: -8, opacity: 0 });
    gsap.set(q("[data-comp]"), { y: 22, opacity: 0 });
    gsap.set(q("[data-meta]"), { opacity: 0 });

    gsap
      .timeline({
        scrollTrigger: { trigger: el, start: "top 72%", end: "center 42%", scrub: 0.6 },
        defaults: { ease: "power2.out" },
      })
      .to(q("[data-number]"), { x: 0, opacity: 1, duration: 0.6 }, 0)
      .to(q("[data-title]"), { yPercent: 0, opacity: 1, duration: 0.7 }, 0.05)
      .to(q("[data-tile]"), { scale: 1, rotate: 0, opacity: 1, duration: 0.8 }, 0.1)
      .to(q("[data-comp]"), { y: 0, opacity: 1, duration: 0.5, stagger: 0.14 }, 0.45)
      .to(q("[data-meta]"), { opacity: 1, duration: 0.4 }, ">-0.1");
  });

  return (
    <li
      ref={ref}
      className="group grid min-h-[70svh] grid-cols-12 items-center gap-x-6 gap-y-10 border-t border-paper/15 py-16 md:py-20 lg:min-h-svh"
      aria-labelledby={`mosaic-course-${course.number}`}
    >
      <div className="col-span-12 lg:col-span-6">
        <p className={cn("t-eyebrow", accent.text)}>
          Course {num} <span className="mx-2 opacity-50">/</span> {String(total).padStart(2, "0")}
        </p>
        <div className="mt-4 flex items-end gap-6 md:gap-10">
          <span data-number aria-hidden className={cn("t-display text-outline tabular-nums", accent.text)}>
            {num}
          </span>
        </div>
        <h3 id={`mosaic-course-${course.number}`} data-title className="t-hero mt-2 uppercase text-paper">
          {course.name}
        </h3>
      </div>

      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <div
          data-tile
          className={cn(
            "relative mb-8 h-28 w-28 overflow-hidden border-2 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105 md:h-40 md:w-40",
            accent.border,
          )}
          aria-hidden
        >
          <Image
            src={images.mosaicArt.src}
            alt=""
            fill
            sizes="160px"
            quality={60}
            style={{ objectFit: "cover", objectPosition: TILE_POSITIONS[index % TILE_POSITIONS.length], transform: "scale(2.2)" }}
          />
        </div>

        {sets.map((set, si) => (
          <div key={si} className={cn(si > 0 && "mt-6")}>
            {set.label ? (
              <p data-comp className={cn("t-eyebrow mb-2 opacity-80", accent.text)}>
                {set.label}
              </p>
            ) : null}
            <ul className="grid gap-2">
              {set.components.map((c) => (
                <li key={c} data-comp className="flex items-center gap-4 font-display text-2xl leading-tight text-paper md:text-[1.75rem]">
                  <span aria-hidden className={cn("inline-block h-2.5 w-2.5 shrink-0", accent.bg)} />
                  {c}
                </li>
              ))}
            </ul>
            {si === 0 && sets.length > 1 ? (
              <p data-comp className="t-caption mt-6 italic text-paper/50">
                or
              </p>
            ) : null}
          </div>
        ))}

        <div data-meta className="mt-8 flex items-center gap-4">
          <AllergenChips codes={course.allergens} light />
        </div>
      </div>
    </li>
  );
}
