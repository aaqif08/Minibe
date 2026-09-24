import type { Metadata } from "next";
import Image from "next/image";
import { site, chapter } from "@/data/site";
import { gallery, spaceCopy, type GalleryItem } from "@/data/gallery";
import { social } from "@/data/social";
import { images } from "@/data/images";
import { cn } from "@/lib/cn";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextPage } from "@/components/ui/NextPage";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Space",
  description:
    "An intimate room in Kodihalli, Bengaluru given entirely to dessert — a blue, underwater-inspired entrance opening into coral and amber, a community table and the chef's pass.",
  alternates: { canonical: "/space" },
};

/** Grid placement per role — art-directed, not a uniform gallery grid. */
const ROLE: Record<GalleryItem["role"], { cell: string; aspect: string; position?: string; from?: "bottom" | "left" | "right" | "top" }> = {
  tall: { cell: "lg:col-span-5 lg:row-span-2", aspect: "aspect-[3/4] lg:aspect-auto lg:h-full", from: "bottom" },
  small: { cell: "lg:col-span-4 lg:col-start-7", aspect: "aspect-[4/5]", from: "left" },
  large: { cell: "lg:col-span-7 lg:col-start-6", aspect: "aspect-[4/3]", from: "right" },
  detail: { cell: "lg:col-span-4 lg:col-start-2", aspect: "aspect-square", position: "60% 35%", from: "top" },
  wide: { cell: "lg:col-span-6 lg:col-start-7", aspect: "aspect-[4/3]", position: "50% 55%", from: "bottom" },
};

/** /space — photography-led, with a short note on where to sit. */
export default function SpacePage() {
  const page = chapter("space");

  return (
    <>
      <PageHeader
        chapter={page}
        title={spaceCopy.title}
        lede={spaceCopy.lede}
        titleClassName="text-orange-ink"
      />

      {/* Desktop: art-directed asymmetric composition */}
      <section className="wrap mt-16 hidden py-section-sm lg:block" aria-label="Photographs of the space">
        <ul className="grid grid-cols-12 gap-x-5 gap-y-16">
          {gallery.map((g, i) => {
            const r = ROLE[g.role];
            return (
              <li key={g.id} className={cn("group relative", r.cell)}>
                <ImageReveal
                  image={g.image}
                  sizes="(min-width: 1024px) 45vw, 100vw"
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
      </section>

      {/* Mobile / tablet: a swipeable strip */}
      <section className="mt-12 py-section-sm lg:hidden" aria-label="Photographs of the space">
        <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--spacing-gutter)] pb-2">
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
      </section>

      {/* Where to sit */}
      <section className="bg-indigo text-paper" aria-labelledby="zones-title">
        <div className="wrap py-section-sm md:py-section">
          <h2 id="zones-title" className="t-section max-w-2xl text-paper">
            Where to sit
          </h2>
          <Reveal as="ul" stagger={0.12} className="mt-14 grid gap-0 md:grid-cols-3">
            {spaceCopy.zones.map((z, i) => (
              <li key={z.id} className="hairline-light py-8 md:border-r md:border-line-light md:pr-8 md:last:border-r-0">
                <span className="t-eyebrow text-orange">0{i + 1}</span>
                <h3 className="mt-4 font-display text-[1.75rem] leading-none text-paper">{z.name}</h3>
                <p className="t-body-sm mt-3 max-w-xs text-paper/70">{z.line}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4">
            <Button href={site.links.reserve} external variant="primary" cursor="reserve">
              {site.cta.reserveLong}
            </Button>
            <Button href={site.links.maps} external variant="text-light">
              {site.cta.directions}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* A full-bleed closing photograph */}
      <section className="py-section-sm" aria-label="The community table">
        <div className="wrap">
          <ImageReveal
            image={images.communalTable}
            sizes="100vw"
            className="aspect-[21/9] w-full"
            position="50% 55%"
            parallax={6}
            cursor="view"
          />
          <p className="t-caption mt-4 text-ink/70">{images.communalTable.alt}</p>
        </div>
      </section>

      {/* Instagram — a compact strip, not a feed */}
      <section className="wrap pb-section-sm" aria-labelledby="social-title">
        <div className="hairline flex flex-col gap-6 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow rule className="text-ink/70">
              {social.title}
            </Eyebrow>
            <h2 id="social-title" className="mt-4">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="t-title link-underline inline-block text-indigo transition-colors duration-500 hover:text-orange"
              >
                {social.handle}
              </a>
            </h2>
          </div>
          <Button href={social.url} external variant="text" className="self-start sm:self-auto">
            Open Instagram
          </Button>
        </div>

        <Reveal as="ul" stagger={0.06} className="mt-8 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3" aria-label="Recent posts">
          {social.tiles.map((t, i) => (
            <li key={t.id} className="group relative aspect-square overflow-hidden bg-paper-deep">
              {t.image ? (
                <a href={t.href ?? social.url} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block h-full w-full">
                  <Image
                    src={t.image.src}
                    alt={t.image.alt}
                    fill
                    sizes="(min-width: 768px) 16vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-105"
                  />
                </a>
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between p-3" aria-hidden>
                  <span className="t-eyebrow text-ink/40">0{i + 1}</span>
                  <Logo variant="monogram" tone="indigo" width={28} className="opacity-20" />
                </div>
              )}
            </li>
          ))}
        </Reveal>
      </section>

      <NextPage
        href="/contact"
        label="Come visit us"
        note="Reserve a table, ask what's on the tasting menu, or plan something private."
        className="pb-4"
      />
    </>
  );
}
