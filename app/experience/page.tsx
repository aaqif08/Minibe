import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { chapter } from "@/data/site";
import { experience } from "@/data/experience";
import { images } from "@/data/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextPage } from "@/components/ui/NextPage";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata(
  "The Experience",
  "Dessert takes centre stage at MINIBÉ: plated desserts designed as complete experiences, bringing together technique, texture, temperature and unexpected ingredients.",
  "/experience",
);

/**
 * /experience — the plate: the philosophy, pastry to plate, the four pillars.
 * Sourcing, craft and sustainability are told once, on /story — not here.
 */
export default function ExperiencePage() {
  const page = chapter("experience");

  return (
    <>
      <PageHeader
        chapter={page}
        title={experience.title}
        lede={experience.lede}
        titleClassName="text-indigo"
      >
        <p className="t-body-sm max-w-md text-ink-soft">{experience.body}</p>
      </PageHeader>

      {/* From pastry to plate */}
      <section className="wrap py-section-sm md:py-section" aria-labelledby="pastry-title">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <ImageReveal
              image={images.plating}
              sizes="(min-width: 1024px) 48vw, (min-width: 768px) 58vw, 100vw"
              className="aspect-[4/3] w-full"
              position="50% 45%"
              parallax={5}
              cursor="view"
            />
            <p className="t-caption mt-4 text-ink/70">{images.plating.alt}</p>
          </div>

          <div className="col-span-12 flex flex-col justify-center md:col-span-5 lg:col-span-5 lg:col-start-8">
            <WordReveal as="h2" id="pastry-title" text={experience.pastryToPlate.title} className="t-section text-orange-ink" />
            <Reveal className="mt-8">
              <p className="t-lead max-w-md text-ink">{experience.pastryToPlate.line}</p>
            </Reveal>
          </div>
        </div>

        {/* The four pillars */}
        <Reveal as="ul" stagger={0.1} className="mt-20 grid gap-0 md:mt-28 md:grid-cols-2 lg:grid-cols-4" aria-label="What defines MINIBÉ">
          {experience.pillars.map((p, i) => (
            <li key={p.id} className="hairline py-7 lg:border-r lg:border-line lg:pr-6 lg:last:border-r-0">
              <span className="t-eyebrow text-ink/55">0{i + 1}</span>
              <h3 className="mt-3 font-display text-[1.75rem] leading-none text-indigo">{p.name}</h3>
              <p className="t-body-sm mt-3 max-w-xs text-ink-soft">{p.note}</p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* At the table — the last step of pastry to plate */}
      <section className="wrap pb-section-sm" aria-labelledby="table-title">
        <ImageReveal
          image={images.communalTable}
          sizes="100vw"
          className="aspect-[4/3] w-full md:aspect-[21/9]"
          position="50% 55%"
          parallax={5}
          cursor="view"
        />
        <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-6">
          <h2 id="table-title" className="t-title col-span-12 text-indigo md:col-span-6">
            Designed to be experienced at the table.
          </h2>
          <Reveal className="col-span-12 flex flex-col items-start gap-4 md:col-span-5 md:col-start-8">
            <p className="t-body-sm text-ink-soft">
              The growers, the islands and the choices behind every plate are told in our story.
            </p>
            <Button href="/story" variant="text">
              Where our ingredients come from
            </Button>
          </Reveal>
        </div>
      </section>

      <NextPage
        href="/contact"
        label="Get in touch"
        note="Plan a visit, or ask what's currently on the table."
        className="pb-4"
      />
    </>
  );
}
