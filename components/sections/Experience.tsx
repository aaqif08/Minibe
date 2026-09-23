import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { images } from "@/data/images";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Chapter 01 — the brand statement. "Dessert takes centre stage", then how
 * that gets to the table, then the four things MINIBÉ is built on.
 */
export function Experience() {
  const chapter = site.chapters[0];

  return (
    <section
      id="experience"
      data-chapter="experience"
      className="wrap py-section-sm md:py-section"
      aria-labelledby="experience-title"
    >
      <ChapterMarker chapter={chapter} />

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-24">
        <div className="col-span-12 lg:col-span-9">
          <WordReveal
            as="h2"
            id="experience-title"
            mode="read"
            text={experience.title}
            className="t-display text-indigo"
          />
        </div>

        <Reveal className="col-span-12 md:col-span-8 lg:col-span-5 lg:col-start-8">
          <p className="t-lead text-ink">{experience.lede}</p>
          <p className="t-body mt-6 max-w-prose text-ink-soft">{experience.body}</p>
        </Reveal>
      </div>

      {/* From pastry to plate */}
      <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-28">
        <div className="col-span-12 md:col-span-7 lg:col-span-6">
          <ImageReveal
            image={images.berriesBarley}
            sizes="(min-width: 1024px) 48vw, (min-width: 768px) 58vw, 100vw"
            className="aspect-[4/3] w-full"
            parallax={5}
            cursor="view"
          />
          <p className="t-caption mt-4 text-ink/70">{images.berriesBarley.alt}</p>
        </div>

        <div className="col-span-12 flex flex-col justify-center md:col-span-5 lg:col-span-5 lg:col-start-8">
          <WordReveal as="h3" text={experience.pastryToPlate.title} className="t-section text-orange" />
          <Reveal className="mt-8">
            <p className="t-lead max-w-md text-ink">{experience.pastryToPlate.line}</p>
          </Reveal>
        </div>
      </div>

      {/* The four pillars */}
      <Reveal as="ul" stagger={0.1} className="mt-20 grid gap-0 md:mt-28 md:grid-cols-2 lg:grid-cols-4" aria-label="What defines MINIBÉ">
        {experience.pillars.map((p, i) => (
          <li key={p.id} className="hairline py-7 lg:border-r lg:border-line lg:pr-6 lg:last:border-r-0">
            <span className="t-eyebrow text-ink/40">0{i + 1}</span>
            <h3 className="mt-3 font-display text-[1.75rem] leading-none text-indigo">{p.name}</h3>
            <p className="t-body-sm mt-3 max-w-xs text-ink-soft">{p.note}</p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
