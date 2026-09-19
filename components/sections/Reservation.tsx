import { site } from "@/data/site";
import { respect } from "@/data/respect";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

/** Chapter 08 — the last bite. The reservation moment, as large as it gets. */
export function Reservation() {
  const chapter = site.chapters[7];
  return (
    <section
      id="reserve"
      data-chapter="reserve"
      data-theme="dark"
      className="relative isolate overflow-hidden bg-indigo text-paper"
      aria-labelledby="reserve-title"
    >
      {/* Ghosted monogram */}
      <div aria-hidden className="pointer-events-none absolute -right-[8%] top-1/2 -z-10 w-[46vw] -translate-y-1/2 opacity-[0.06]">
        <Logo variant="monogram" tone="white" width={900} className="w-full" />
      </div>

      <div className="wrap py-section-sm md:py-section">
        <ChapterMarker chapter={chapter} light />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-24">
          <div className="col-span-12 lg:col-span-9">
            <WordReveal
              as="h2"
              id="reserve-title"
              text={["Your table", "awaits."]}
              className="t-display text-paper"
              lineClassName="last:text-orange"
            />
            <Reveal className="mt-10 md:mt-14">
              <p className="t-quote text-paper/85">Make an evening of it.</p>
            </Reveal>
          </div>

          <Reveal className="col-span-12 flex flex-col gap-4 lg:col-span-3 lg:col-start-10 lg:justify-end">
            <p className="t-body-sm text-paper/70">{respect.thoughtful.lines[0]}</p>
            <p className="t-eyebrow text-paper/50">{site.hours.note}</p>
          </Reveal>
        </div>

        <Reveal className="hairline-light mt-16 flex flex-col gap-6 pt-10 sm:flex-row sm:items-center sm:gap-10 md:mt-20" delay={0.1}>
          <Button href={site.links.reserve} external variant="primary" size="lg" cursor="reserve">
            {site.cta.primary}
          </Button>
          <Button href={site.links.maps} external variant="outline-light" size="lg">
            {site.cta.directions}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
