import Link from "next/link";
import { twoWays } from "@/data/experience";
import { images } from "@/data/images";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

const PHOTOS = [images.plating, images.berriesBarley];

/**
 * Homepage teaser only — two photographic panels, both pointing at /menus.
 * The menus themselves live on that page, never here.
 */
export function TwoWaysTeaser() {
  return (
    <section className="wrap py-section-sm" aria-labelledby="two-ways-title">
      <div className="hairline grid grid-cols-12 gap-x-6 gap-y-6 pt-8">
        <div className="col-span-12 lg:col-span-7">
          <WordReveal as="h2" id="two-ways-title" text={twoWays.title} className="t-section text-indigo" />
        </div>
        <Reveal className="col-span-12 flex items-end md:col-span-8 lg:col-span-4 lg:col-start-9">
          <p className="t-lead text-ink-soft">One room, two ways to spend an evening in it. Both begin with dessert.</p>
        </Reveal>
      </div>

      <Reveal as="ul" stagger={0.14} className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-8">
        {twoWays.options.map((opt, i) => (
          <li key={opt.id}>
            <Link href="/menus" className="group block" data-cursor="view">
              <ImageReveal
                image={PHOTOS[i] ?? PHOTOS[0]}
                sizes="(min-width: 768px) 46vw, 100vw"
                className="aspect-[5/4] w-full md:aspect-[16/11]"
                from={i === 0 ? "left" : "right"}
                position={i === 0 ? "50% 40%" : "50% 50%"}
                hover
              />
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="t-title text-indigo transition-colors duration-500 group-hover:text-orange">
                    {opt.name}
                  </h3>
                  <p className="t-eyebrow mt-3 text-orange-deep">{opt.meta}</p>
                </div>
                <span
                  aria-hidden
                  className="mt-2 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/25 text-ink transition-[background-color,color,border-color] duration-500 ease-[var(--ease-expo)] group-hover:border-orange group-hover:bg-orange group-hover:text-indigo"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <span className="t-eyebrow link-underline mt-5 inline-block text-ink/70">{opt.cta} →</span>
            </Link>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
