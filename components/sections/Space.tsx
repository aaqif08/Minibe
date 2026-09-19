import { site } from "@/data/site";
import { gallery, spaceCopy, type GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/cn";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

/** Grid placement per role — an asymmetric editorial layout, not a 3-column gallery. */
const ROLE: Record<GalleryItem["role"], { cell: string; aspect: string; position?: string; from?: "bottom" | "left" | "right" | "top" }> = {
  tall: { cell: "lg:col-span-4 lg:row-span-2", aspect: "lg:aspect-auto lg:h-full aspect-[3/4]", from: "bottom" },
  small: { cell: "lg:col-span-3", aspect: "aspect-[4/5]", from: "left" },
  large: { cell: "lg:col-span-5", aspect: "aspect-[4/3]", from: "right" },
  detail: { cell: "lg:col-span-3 lg:col-start-5", aspect: "aspect-square", position: "60% 35%", from: "top" },
  wide: { cell: "lg:col-span-5", aspect: "aspect-[4/3] lg:aspect-auto lg:h-full", position: "50% 55%", from: "bottom" },
};

/** Chapter 07 — the room. Desktop: asymmetric grid. Mobile: a swipeable strip. */
export function Space() {
  const chapter = site.chapters[6];
  return (
    <section id="space" data-chapter="space" className="py-section-sm md:py-section" aria-labelledby="space-title">
      <div className="wrap">
        <ChapterMarker chapter={chapter} />
        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-20">
          <div className="col-span-12 lg:col-span-5">
            <WordReveal as="h2" id="space-title" text={spaceCopy.title} className="t-section text-orange" />
          </div>
          <Reveal stagger={0.12} className="col-span-12 grid gap-5 self-end md:col-span-8 lg:col-span-5 lg:col-start-8">
            {spaceCopy.lines.map((l, i) => (
              <p key={i} className={i === 0 ? "t-lead text-ink" : "t-body text-ink-soft"}>
                {l}
              </p>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Desktop grid */}
      <div className="wrap mt-16 hidden lg:block md:mt-24">
        <ul className="grid grid-cols-12 grid-rows-[auto_auto] gap-5">
          {gallery.map((g, i) => {
            const r = ROLE[g.role];
            return (
              <li key={g.id} className={cn("group relative", r.cell)}>
                <ImageReveal
                  image={g.image}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={cn("w-full", r.aspect)}
                  position={r.position}
                  from={r.from}
                  hover
                  cursor="view"
                />
                <p className="t-caption mt-3 flex gap-3 text-ink/55">
                  <span className="tabular-nums text-ink/35">0{i + 1}</span>
                  {g.caption}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile / tablet strip */}
      <div className="mt-12 lg:hidden">
        <ul
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--spacing-gutter)] pb-2"
          aria-label="Photographs of the space"
        >
          {gallery.map((g, i) => (
            <li key={g.id} className="w-[78vw] shrink-0 snap-center sm:w-[56vw]">
              <ImageReveal image={g.image} sizes="80vw" className="aspect-[4/5] w-full" position={ROLE[g.role].position} />
              <p className="t-caption mt-3 flex gap-3 text-ink/55">
                <span className="tabular-nums text-ink/35">0{i + 1}</span>
                {g.caption}
              </p>
            </li>
          ))}
        </ul>
        <p className="wrap t-eyebrow mt-4 text-ink/60">Swipe →</p>
      </div>
    </section>
  );
}
