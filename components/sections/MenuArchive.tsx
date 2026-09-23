"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { site } from "@/data/site";
import { menuArchive, courseComponentSets, type ArchiveEntry, type MosaicCourse } from "@/data/menus";
import { useGsap } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { AllergenChips } from "@/components/ui/AllergenChips";

const ACCENT = {
  teal: "text-mosaic-teal",
  blue: "text-mosaic-blue",
  green: "text-mosaic-green",
  gold: "text-mosaic-gold",
  pink: "text-mosaic-pink",
} as const;

const DOT = {
  teal: "bg-mosaic-teal",
  blue: "bg-mosaic-blue",
  green: "bg-mosaic-green",
  gold: "bg-mosaic-gold",
  pink: "bg-mosaic-pink",
} as const;

/**
 * Chapter 03 — the archive. Every three months MINIBÉ begins a new chapter;
 * each one keeps its name, its season and, where it has been transcribed, its
 * courses. The current chapter opens by default. Adding next quarter's menu
 * is one object in data/menus.ts — the page needs no other change.
 */
export function MenuArchive() {
  const chapter = site.chapters[2];
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const current = menuArchive.find((e) => e.status === "current");
  const [openId, setOpenId] = useState<string | null>(current?.id ?? null);
  const art = menuArchive.find((e) => e.image)?.image ?? null;

  useGsap(sectionRef, ({ gsap }, el) => {
    if (!bgRef.current) return;
    gsap.fromTo(
      bgRef.current,
      { yPercent: -6 },
      { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });

  return (
    <section
      ref={sectionRef}
      id="archive"
      data-chapter="archive"
      data-theme="dark"
      className="relative isolate scroll-mt-16 overflow-hidden bg-mosaic-night text-paper"
      aria-labelledby="archive-title"
    >
      {/* The current chapter's artwork, as the world behind the archive */}
      {art ? (
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div ref={bgRef} className="absolute -inset-y-[8%] inset-x-0 will-change-transform">
            <Image
              src={art.src}
              alt=""
              fill
              sizes="100vw"
              quality={70}
              style={{ objectFit: "cover", objectPosition: "50% 40%" }}
              className="opacity-80 saturate-[1.15]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-mosaic-night via-mosaic-night/55 to-mosaic-night" />
        </div>
      ) : null}

      <div className="wrap py-section-sm md:py-section">
        <ChapterMarker chapter={chapter} light />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-24">
          <div className="col-span-12 lg:col-span-7">
            <WordReveal as="h2" id="archive-title" text={["The menu", "archive"]} className="t-display text-paper" />
          </div>
          <Reveal className="col-span-12 flex flex-col justify-end gap-5 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <p className="t-quote text-mosaic-gold">Every three months, MINIBÉ begins a new chapter.</p>
            <p className="t-body-sm max-w-sm text-paper/65">
              The menu evolves; the philosophy stays. Each chapter keeps its name and its season here.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 md:mt-24">
          {menuArchive.map((entry) => (
            <ArchiveRow
              key={entry.id}
              entry={entry}
              open={openId === entry.id}
              onToggle={() => setOpenId((cur) => (cur === entry.id ? null : entry.id))}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ArchiveRow({ entry, open, onToggle }: { entry: ArchiveEntry; open: boolean; onToggle: () => void }) {
  const hasCourses = !!entry.courses?.length;
  const panelId = `archive-${entry.id}`;

  return (
    <li className="border-t border-paper/20 last:border-b">
      <button
        type="button"
        onClick={hasCourses ? onToggle : undefined}
        aria-expanded={hasCourses ? open : undefined}
        aria-controls={hasCourses ? panelId : undefined}
        className={cn(
          "group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-8 text-left md:py-10",
          !hasCourses && "cursor-default",
        )}
      >
        <span className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h3
            className={cn(
              "t-hero uppercase transition-colors duration-500",
              entry.status === "current" ? "text-paper" : "text-paper/55 group-hover:text-paper/80",
            )}
          >
            {entry.name}
          </h3>
          {entry.status === "current" ? <span className="t-eyebrow text-mosaic-gold">Now on the table</span> : null}
        </span>
        <span className="t-eyebrow whitespace-nowrap text-paper/70">{entry.dates}</span>
        {entry.note ? <span className="t-body-sm col-span-2 max-w-lg text-paper/60">{entry.note}</span> : null}
        {hasCourses ? (
          <span className="t-caption col-span-2 flex items-center gap-2 text-paper/50">
            <span
              aria-hidden
              className={cn(
                "inline-block h-px bg-current transition-[width] duration-500 ease-[var(--ease-expo)]",
                open ? "w-8" : "w-5 group-hover:w-8",
              )}
            />
            {open ? "Hide the courses" : "See the courses"}
          </span>
        ) : (
          <span className="t-caption col-span-2 text-paper/40">Menu not published</span>
        )}
      </button>

      {hasCourses ? (
        <div
          id={panelId}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-expo)]",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
          aria-hidden={!open}
        >
          <div className="overflow-hidden">
            <ol className="grid gap-x-8 gap-y-10 pb-14 md:grid-cols-2 lg:grid-cols-4">
              {entry.courses!.map((course) => (
                <Course key={course.number} course={course} />
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </li>
  );
}

function Course({ course }: { course: MosaicCourse }) {
  const sets = courseComponentSets(course);
  const num = String(course.number).padStart(2, "0");

  return (
    <li className="border-t border-paper/15 pt-5">
      <p className={cn("t-eyebrow tabular-nums", ACCENT[course.accent])}>{num}</p>
      <h4 className="mt-3 font-display text-2xl uppercase leading-none text-paper">{course.name}</h4>
      {sets.map((set, si) => (
        <div key={si} className={si > 0 ? "mt-4" : "mt-4"}>
          {si > 0 ? <p className="t-caption mb-2 italic text-paper/45">or</p> : null}
          {set.label ? <p className={cn("t-eyebrow mb-2", ACCENT[course.accent])}>{set.label}</p> : null}
          <ul className="grid gap-1.5">
            {set.components.map((c) => (
              <li key={c} className="flex items-center gap-3 font-display text-lg leading-tight text-paper/90">
                <span aria-hidden className={cn("inline-block h-1.5 w-1.5 shrink-0", DOT[course.accent])} />
                {c}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <AllergenChips codes={course.allergens} light className="mt-4" />
    </li>
  );
}
