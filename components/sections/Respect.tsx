import { respect } from "@/data/respect";
import { images } from "@/data/images";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Chapter 06, continued — respecting every ingredient. Follows the
 * portfolio's page 04: indigo title + text left, photograph right; then a
 * mirrored spread with a right-aligned title for "Thoughtful Dining".
 */
export function Respect() {
  return (
    <section id="respect" className="bg-paper-deep" aria-labelledby="respect-title">
      <div className="wrap py-section-sm md:py-section">
        {/* Spread 1 — Berries & Barley */}
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

        {/* Principles */}
        <Reveal as="ul" stagger={0.06} className="hairline mt-20 flex flex-wrap gap-x-10 gap-y-4 pt-8 md:mt-28" aria-label="Principles">
          {respect.principles.map((p) => (
            <li key={p} className="font-display text-xl text-indigo md:text-2xl">
              {p}
            </li>
          ))}
        </Reveal>

        {/* Spread 2 — Thoughtful dining (mirrored) */}
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
            <WordReveal as="h3" text={respect.thoughtful.title} className="t-section text-indigo" />
            <Reveal stagger={0.12} className="mt-10 grid gap-5 lg:ml-auto lg:max-w-xl">
              {respect.thoughtful.lines.map((l, i) => (
                <p key={i} className={i === 0 ? "t-lead text-ink" : "t-body text-ink-soft"}>
                  {l}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Craft */}
        <Reveal className="hairline mt-20 grid grid-cols-12 gap-x-6 gap-y-8 pt-10 md:mt-28">
          <p className="t-eyebrow col-span-12 text-ink/50 md:col-span-3">{respect.craft.title}</p>
          <div className="col-span-12 grid gap-6 md:col-span-8 md:col-start-5">
            <p className="t-quote text-orange">{respect.craft.lines[0]}</p>
            {respect.craft.lines.slice(1).map((l, i) => (
              <p key={i} className="t-body max-w-prose text-ink-soft">
                {l}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
