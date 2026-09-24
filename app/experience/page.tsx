import type { Metadata } from "next";
import { chapter } from "@/data/site";
import { experience } from "@/data/experience";
import { ingredients, ingredientsCopy } from "@/data/ingredients";
import { images } from "@/data/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextPage } from "@/components/ui/NextPage";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "The Experience",
  description:
    "Dessert takes centre stage at MINIBÉ: plated desserts designed as complete experiences, bringing together technique, texture, temperature and unexpected ingredients.",
  alternates: { canonical: "/experience" },
};

/** /experience — bold typography over plated-dessert photography. */
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
              image={images.berriesBarley}
              sizes="(min-width: 1024px) 48vw, (min-width: 768px) 58vw, 100vw"
              className="aspect-[4/3] w-full"
              parallax={5}
              cursor="view"
            />
            <p className="t-caption mt-4 text-ink/70">{images.berriesBarley.alt}</p>
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

      {/* Seasonality + sourcing, in brief — the full account is on /story */}
      <section className="bg-paper-deep" aria-labelledby="sourcing-title">
        <div className="wrap py-section-sm md:py-section">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow rule className="text-orange-deep">
                Seasonal · Local · Whole ingredient
              </Eyebrow>
              <WordReveal
                as="h2"
                id="sourcing-title"
                text={ingredientsCopy.title}
                className="t-section mt-6 text-indigo"
              />
            </div>
            <Reveal className="col-span-12 flex items-end md:col-span-9 lg:col-span-4 lg:col-start-9">
              <p className="t-lead text-ink">{ingredientsCopy.intro}</p>
            </Reveal>
          </div>

          <Reveal as="ul" stagger={0.08} className="mt-14 grid md:mt-20" aria-label="Ingredients">
            {ingredients.map((ing, i) => (
              <li key={ing.id} className="hairline grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-6 md:grid-cols-[4rem_1fr_auto] md:py-7">
                <span className="t-eyebrow text-ink/55">0{i + 1}</span>
                <span className="font-display text-[1.75rem] leading-none text-indigo md:text-[2.25rem]">{ing.name}</span>
                <span className="t-eyebrow col-start-2 text-ink/70 md:col-start-3 md:text-right">{ing.origin}</span>
                <p className="t-body-sm col-start-2 max-w-prose text-ink-soft md:col-span-2">{ing.note}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4">
            <Button href="/story" variant="outline">
              The whole story
            </Button>
            <Button href="/contact" variant="text">
              Ask us anything
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Photography */}
      <section className="wrap py-section-sm" aria-label="At the pass">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-7">
            <ImageReveal
              image={images.chefAtPass}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="aspect-[4/3] w-full"
              position="62% 30%"
              hover
              cursor="view"
            />
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-16">
            <ImageReveal
              image={images.plating}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/5] w-full"
              position="50% 40%"
              from="right"
              hover
              cursor="view"
            />
            <p className="t-caption mt-4 text-ink/70">{images.plating.alt}</p>
          </div>
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
