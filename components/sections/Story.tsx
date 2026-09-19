import Image from "next/image";
import { site } from "@/data/site";
import { story } from "@/data/story";
import { images } from "@/data/images";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

/**
 * Chapter 03 — the sisters' story, laid out like the portfolio's first
 * spread: oversized orange title, hairline, text column, photograph. The
 * hand-lettered "Our Story" from the portfolio cover overlaps the image.
 */
export function Story() {
  const chapter = site.chapters[2];
  return (
    <section id="story" data-chapter="story" className="wrap py-section-sm md:py-section" aria-labelledby="story-title">
      <ChapterMarker chapter={chapter} />

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-20">
        <div className="col-span-12 lg:col-span-7">
          <WordReveal as="h2" id="story-title" text={story.title} className="t-section text-orange" />
        </div>
        <Reveal className="col-span-12 flex items-end md:col-span-8 lg:col-span-4 lg:col-start-9">
          <p className="t-lead text-ink">{story.intro}</p>
        </Reveal>
      </div>

      <div className="hairline mt-14 md:mt-20" />

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-16">
        <div className="col-span-12 order-2 lg:order-1 lg:col-span-5">
          <Reveal stagger={0.12} className="flex flex-col gap-6">
            {story.paragraphs.map((p, i) => (
              <p key={i} className="t-body max-w-prose text-ink-soft">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal as="dl" stagger={0.1} className="mt-12 grid gap-0" delay={0.2}>
            {story.facts.map((f) => (
              <div key={f.label} className="hairline grid grid-cols-[7rem_1fr] gap-4 py-4">
                <dt className="t-eyebrow pt-1 text-ink/50">{f.label}</dt>
                <dd className="font-display text-xl leading-snug text-indigo">{f.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative col-span-12 order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <Parallax y={90}>
            <ImageReveal
              image={images.communalTable}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full"
              parallax={6}
              cursor="view"
            />
          </Parallax>
          <Parallax y={-50} className="pointer-events-none absolute -left-4 -top-10 w-[46%] max-w-[300px] text-orange md:-left-10 md:-top-14">
            <Image
              src="/images/brand/our-story-script.svg"
              alt="Our Story — hand-lettered"
              width={300}
              height={232}
              unoptimized
              className="h-auto w-full -rotate-6 drop-shadow-[0_6px_18px_rgba(36,3,115,0.18)]"
            />
          </Parallax>
          <p className="t-caption mt-4 text-ink/55">{images.communalTable.alt}</p>
        </div>
      </div>
    </section>
  );
}
