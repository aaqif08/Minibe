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

/**
 * Chapter 06 — the room, and how it works. Desktop: asymmetric grid.
 * Mobile: a swipeable strip. The three zones explain the seating without
 * turning into a wall of text.
 */
export function Space() {
  const chapter = site.chapters[5];

  return (
    <section id="space" data-chapter="space" className="py-section-sm md:py-section" aria-labelledby="space-title">
      <div className="wrap">
        <ChapterMarker chapter={chapter} />
        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-20">
          <div className="col-span-12 lg:col-span-7">
            <WordReveal as="h2" id="space-title" text={spaceCopy.title} className="t-section text-orange" />
          </div>
          <Reveal className="col-span-12 flex items-end md:col-span-8 lg:col-span-4 lg:col-start-9">
            <p className="t-lead text-ink">{spaceCopy.lede}</p>
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
                <p className="t-caption mt-3 flex gap-3 text-ink/70">
                  <span className="tabular-nums text-ink/70">0{i + 1}</span>
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
              <p className="t-caption mt-3 flex gap-3 text-ink/70">
                <span className="tabular-nums text-ink/70">0{i + 1}</span>
                {g.caption}
              </p>
            </li>
          ))}
        </ul>
        <p className="wrap t-eyebrow mt-4 text-ink/75">Swipe →</p>
      </div>

      {/* How the room works */}
      <div className="wrap">
        <Reveal as="ul" stagger={0.12} className="mt-16 grid gap-0 md:mt-24 md:grid-cols-3" aria-label="Where to sit">
          {spaceCopy.zones.map((z, i) => (
            <li key={z.id} className="hairline py-7 md:border-r md:border-line md:pr-8 md:last:border-r-0">
              <span className="t-eyebrow text-ink/40">0{i + 1}</span>
              <h3 className="mt-3 font-display text-[1.75rem] leading-none text-indigo">{z.name}</h3>
              <p className="t-body-sm mt-3 max-w-xs text-ink-soft">{z.line}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
