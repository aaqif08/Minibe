import { site } from "@/data/site";
import { chef } from "@/data/chef";
import { images } from "@/data/images";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Chapter 04 — Chef Jenny. The photograph stays pinned while the journey
 * scrolls past it: islands → seasons → philosophy → French technique → Bengaluru.
 */
export function Chef() {
  const chapter = site.chapters[3];
  return (
    <section
      id="chef"
      data-chapter="chef"
      data-theme="dark"
      className="bg-indigo text-paper"
      aria-labelledby="chef-title"
    >
      <div className="wrap pt-14 md:pt-20">
        <ChapterMarker chapter={chapter} light />
      </div>

      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12 pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="col-span-12 lg:col-span-5 lg:self-start lg:sticky lg:top-24">
          <ImageReveal
            image={images.chefAtPass}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="aspect-[4/5] w-full lg:aspect-auto lg:h-[calc(100svh-7rem)]"
            position="62% 30%"
            parallax={4}
            cursor="view"
          />
          <p className="t-caption mt-4 text-paper/55">{images.chefAtPass.alt}</p>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <WordReveal as="h2" id="chef-title" text={chef.title} className="t-section text-orange" />
          <Reveal className="mt-10">
            <p className="t-lead max-w-lg text-paper">{chef.lede}</p>
          </Reveal>

          <ol className="mt-16 grid">
            {chef.journey.map((step, i) => (
              <Reveal as="li" key={step.place} className="hairline-light grid grid-cols-[3.5rem_1fr] gap-4 py-8 md:grid-cols-[5rem_1fr] md:py-10">
                <span className="t-folio text-paper/40">0{i + 1}</span>
                <div>
                  <h3 className="t-title text-paper">{step.place}</h3>
                  <p className="t-body mt-4 max-w-prose text-paper/75">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="hairline-light mt-2 pt-8">
            <p className="t-quote text-paper/85">{chef.closing}</p>
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
      </div>
    </section>
  );
}
