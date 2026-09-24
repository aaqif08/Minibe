import type { Metadata } from "next";
import Image from "next/image";
import { site, chapter } from "@/data/site";
import { story } from "@/data/story";
import { respect } from "@/data/respect";
import { ingredients, ingredientsCopy } from "@/data/ingredients";
import { images } from "@/data/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextPage } from "@/components/ui/NextPage";
import { Journey } from "@/components/sections/Journey";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "MINIBÉ began with Chef Jenny's childhood in the Andaman Islands and the two sisters who built it — seasonality, local producers, French technique and dessert at the centre.",
  alternates: { canonical: "/story" },
};

/** /story — magazine-style storytelling on a midnight ground. */
export default function StoryPage() {
  const page = chapter("story");

  return (
    <>
      <div className="bg-midnight text-paper">
        <PageHeader
          chapter={page}
          title={story.title}
          lede={story.lede}
          light
          titleClassName="text-orange"
          className="pb-16 md:pb-24"
        />

        <Journey />

        {/* Meet Chef Jenny */}
        <section className="wrap grid grid-cols-12 gap-x-6 gap-y-12 py-section-sm md:py-section" aria-labelledby="chef-title">
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
            <h2 id="chef-title" className="t-section text-paper">
              {story.chef.title}
            </h2>
            <Reveal className="mt-8">
              <p className="t-lead max-w-lg text-paper/90">{story.chef.lede}</p>
            </Reveal>
            <Reveal stagger={0.12} className="mt-8 flex flex-col gap-5">
              {story.chef.paragraphs.map((p, i) => (
                <p key={i} className="t-body max-w-prose text-paper/75">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal as="dl" stagger={0.1} className="mt-12 grid" delay={0.15}>
              {story.chef.facts.map((f) => (
                <div key={f.label} className="hairline-light grid grid-cols-[7rem_1fr] gap-4 py-4">
                  <dt className="t-eyebrow pt-1 text-paper/50">{f.label}</dt>
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
        </section>
      </div>

      {/* Celebrating local */}
      <section className="wrap py-section-sm md:py-section" aria-labelledby="local-title">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow rule className="text-orange-deep">
              Celebrating local
            </Eyebrow>
            <WordReveal as="h2" id="local-title" text={ingredientsCopy.title} className="t-section mt-6 text-indigo" />
          </div>
          <Reveal className="col-span-12 flex items-end md:col-span-9 lg:col-span-4 lg:col-start-9">
            <p className="t-lead text-ink">{ingredientsCopy.intro}</p>
          </Reveal>
        </div>

        <Reveal as="ul" stagger={0.08} className="mt-14 grid md:mt-20" aria-label="Where our ingredients come from">
          {ingredients.map((ing, i) => (
            <li key={ing.id} className="hairline grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-6 md:grid-cols-[4rem_1fr_auto] md:py-8">
              <span className="t-eyebrow text-ink/55">0{i + 1}</span>
              <span className="font-display text-[2rem] leading-none text-indigo md:text-[2.75rem]">{ing.name}</span>
              <span className="t-eyebrow col-start-2 text-ink/70 md:col-start-3 md:text-right">{ing.origin}</span>
              <div className="col-start-2 md:col-span-2">
                <p className="t-eyebrow text-orange-deep">{ing.source}</p>
                <p className="t-body-sm mt-2 max-w-prose text-ink-soft">{ing.note}</p>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal className="hairline mt-14 grid grid-cols-12 gap-6 pt-8">
          <p className="t-body-sm col-span-12 text-ink-soft md:col-span-5">{ingredientsCopy.aside}</p>
          <p className="t-body-sm col-span-12 text-ink-soft md:col-span-5 md:col-start-8">{ingredientsCopy.closing}</p>
        </Reveal>
      </section>

      {/* Respecting every ingredient */}
      <section className="bg-paper-deep" aria-labelledby="respect-title">
        <div className="wrap py-section-sm md:py-section">
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-6">
              <WordReveal as="h2" id="respect-title" text={respect.title} className="t-section text-indigo" />
              <Reveal className="mt-10 max-w-lg">
                <p className="t-lead text-ink">{respect.lede}</p>
                <p className="t-body mt-6 text-ink-soft">{respect.body}</p>
              </Reveal>

              <Reveal className="hairline mt-12 pt-8" delay={0.15}>
                <Eyebrow rule className="text-orange-deep">
                  {respect.signature.label}
                </Eyebrow>
                <h3 className="t-title mt-4 text-indigo">{respect.signature.name}</h3>
                <p className="t-body mt-5 max-w-prose text-ink-soft">{respect.signature.text}</p>
                <p className="mt-5 font-display text-lg font-light italic text-ink">{respect.signature.outcome}</p>
              </Reveal>
            </div>

            <div className="col-span-12 md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-8">
              <ImageReveal
                image={images.berriesBarley}
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 66vw, 100vw"
                className="aspect-[3/4] w-full"
                parallax={5}
                cursor="view"
              />
              <p className="t-caption mt-4 text-ink/70">{images.berriesBarley.alt}</p>
            </div>
          </div>

          <Reveal as="ul" stagger={0.06} className="hairline mt-20 flex flex-wrap gap-x-10 gap-y-4 pt-8 md:mt-28" aria-label="Principles">
            {respect.principles.map((p) => (
              <li key={p} className="font-display text-xl text-indigo md:text-2xl">
                {p}
              </li>
            ))}
          </Reveal>

          {/* Thoughtful dining */}
          <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-28">
            <div className="col-span-12 order-2 md:col-span-5 lg:order-1 lg:col-span-4">
              <ImageReveal
                image={images.interiorCoral}
                sizes="(min-width: 1024px) 32vw, (min-width: 768px) 40vw, 100vw"
                className="aspect-[3/4] w-full"
                from="left"
                cursor="view"
              />
            </div>
            <div className="col-span-12 order-1 md:col-span-7 lg:order-2 lg:col-span-7 lg:col-start-6 lg:text-right">
              <WordReveal as="h2" text={respect.thoughtful.title} className="t-section text-indigo" />
              <Reveal stagger={0.12} className="mt-10 grid gap-5 lg:ml-auto lg:max-w-xl">
                {respect.thoughtful.lines.map((l, i) => (
                  <p key={i} className={i === 0 ? "t-lead text-ink" : "t-body text-ink-soft"}>
                    {l}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>

          {/* Sustainability through craft */}
          <Reveal className="hairline mt-20 grid grid-cols-12 gap-x-6 gap-y-8 pt-10 md:mt-28">
            <h2 className="t-eyebrow col-span-12 text-ink/55 md:col-span-3">{respect.craft.title}</h2>
            <div className="col-span-12 grid gap-6 md:col-span-8 md:col-start-5">
              <p className="t-quote text-orange-ink">{respect.craft.lines[0]}</p>
              {respect.craft.lines.slice(1).map((l, i) => (
                <p key={i} className="t-body max-w-prose text-ink-soft">
                  {l}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <NextPage
        href="/space"
        label="Step into MINIBÉ"
        note="The room the story happens in — blue at the door, coral and amber inside."
        className="pt-section-sm"
      />
    </>
  );
}
