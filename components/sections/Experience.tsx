"use client";

import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { images } from "@/data/images";
import { useScroll } from "@/components/providers/SmoothScroll";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/** Chapter 05 — the table. Introduces the two menus that follow. */
export function Experience() {
  const chapter = site.chapters[4];
  const { scrollTo } = useScroll();

  return (
    <section
      id="experience"
      data-chapter="experience"
      className="wrap py-section-sm md:py-section"
      aria-labelledby="experience-title"
    >
      <ChapterMarker chapter={chapter} />

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-20">
        <div className="col-span-12 order-2 md:col-span-5 lg:order-1 lg:col-span-4">
          <ImageReveal
            image={images.plating}
            sizes="(min-width: 1024px) 32vw, (min-width: 768px) 40vw, 100vw"
            className="aspect-[3/4] w-full"
            position="50% 40%"
            parallax={6}
            cursor="view"
          />
          <p className="t-caption mt-4 text-ink/55">{images.plating.alt}</p>
        </div>

        <div className="col-span-12 order-1 md:col-span-7 lg:order-2 lg:col-span-7 lg:col-start-6">
          <WordReveal as="h2" id="experience-title" text={experience.title} className="t-section text-indigo" />
          <Reveal className="mt-10">
            <p className="t-lead max-w-xl text-ink">{experience.lede}</p>
          </Reveal>
          <Reveal stagger={0.12} className="mt-10 grid gap-6 md:grid-cols-2">
            {experience.lines.map((l, i) => (
              <p key={i} className="t-body-sm text-ink-soft">
                {l}
              </p>
            ))}
          </Reveal>

          {/* Two doors into the evening */}
          <Reveal as="ul" stagger={0.15} className="mt-16 grid">
            {experience.formats.map((f) => (
              <li key={f.id} className="hairline">
                <a
                  href={f.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(f.href, { offset: -64 });
                  }}
                  className="group grid grid-cols-[1fr_auto] items-center gap-6 py-8 transition-colors duration-500 md:grid-cols-[7rem_1fr_auto] md:py-10"
                >
                  <span className="t-eyebrow text-orange-deep md:pt-2 md:self-start">{f.number}</span>
                  <span className="col-span-2 md:col-span-1">
                    <span className="t-title block text-indigo transition-colors duration-500 group-hover:text-orange">
                      {f.name}
                    </span>
                    <span className="t-lead mt-2 block text-ink-soft">{f.line}</span>
                    <span className="t-caption mt-2 block text-ink/50">{f.detail}</span>
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-12 w-12 items-center justify-center rounded-full border border-ink/25 text-ink transition-[transform,background-color,color,border-color] duration-500 ease-[var(--ease-expo)] group-hover:border-orange group-hover:bg-orange group-hover:text-paper md:flex"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal className="hairline mt-2 flex flex-wrap items-center gap-x-10 gap-y-4 pt-8" delay={0.2}>
            <Button href={site.links.menu} external variant="text">
              {site.cta.menu}
            </Button>
            <Button href={site.links.reserve} external variant="text" cursor="reserve">
              {site.cta.secondary}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
