import { site } from "@/data/site";
import { story } from "@/data/story";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

/** Chapter 01 — the thesis. One oversized statement, read word by word as you scroll. */
export function Manifesto() {
  const chapter = site.chapters[0];
  return (
    <section id="begins" data-chapter="begins" className="wrap py-section-sm md:py-section" aria-labelledby="begins-title">
      <ChapterMarker chapter={chapter} />

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-24">
        <div className="col-span-12 lg:col-span-10">
          <WordReveal
            as="h2"
            id="begins-title"
            mode="read"
            text="Dessert was never meant to be an afterthought."
            className="t-display text-indigo"
          />
          <WordReveal
            as="p"
            text="At MINIBÉ, it becomes the story."
            className="t-quote mt-8 text-orange md:mt-12"
            delay={0.1}
          />
        </div>

        <Reveal className="col-span-12 md:col-span-7 lg:col-span-4 lg:col-start-9 lg:mt-10">
          <p className="t-lead text-ink">{site.positioning}</p>
          <p className="t-body-sm mt-8 text-ink-soft">{story.intro}</p>
        </Reveal>
      </div>
    </section>
  );
}
