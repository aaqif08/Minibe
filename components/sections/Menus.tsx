import { site } from "@/data/site";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { TastingMenu } from "./TastingMenu";
import { ALaCarte } from "./ALaCarte";

/**
 * Chapter 02 — the menus. One chapter, two standing formats: the tasting
 * menu (which changes quarterly and is framed, not listed) and the à la
 * carte (listed in full). Chapter names never appear here, so a new tasting
 * menu never means a new section.
 */
export function Menus() {
  const chapter = site.chapters[1];

  return (
    <section id="menus" data-chapter="menus" className="bg-paper-deep" aria-labelledby="menus-title">
      <div className="wrap py-section-sm md:py-section">
        <ChapterMarker chapter={chapter} />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-24">
          <div className="col-span-12 lg:col-span-5">
            <WordReveal as="h2" id="menus-title" text="Menus" className="t-display text-indigo" />
          </div>
          <Reveal className="col-span-12 flex items-end md:col-span-8 lg:col-span-5 lg:col-start-8">
            <p className="t-quote text-orange">The menu changes. The philosophy remains.</p>
          </Reveal>
        </div>

        <div className="mt-20 md:mt-28">
          <TastingMenu />
        </div>

        <div className="hairline mt-20 pt-16 md:mt-28 md:pt-24">
          <ALaCarte />
        </div>
      </div>
    </section>
  );
}
