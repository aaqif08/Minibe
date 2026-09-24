import { site } from "@/data/site";
import { tastingMenu, menuArchive } from "@/data/menus";
import { images } from "@/data/images";
import { contact, waLink } from "@/data/contact";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The tasting menu — framed, not listed, so the page never depends on which
 * chapter is running. The current chapter is named from `menuArchive`, and
 * its courses sit in the archive below.
 */
export function TastingMenu() {
  const current = menuArchive.find((e) => e.status === "current");
  const wa = waLink(contact.waMessages.current);

  return (
    <section id="tasting-menu" className="wrap scroll-mt-24 py-section-sm md:py-section" aria-labelledby="tasting-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-6">
          <Eyebrow rule className="text-orange-deep">
            {tastingMenu.meta}
          </Eyebrow>
          <WordReveal as="h2" id="tasting-title" text={tastingMenu.title} className="t-section mt-6 text-indigo" />
          <Reveal className="mt-8">
            <p className="t-quote text-ink-soft">{tastingMenu.subtitle}</p>
          </Reveal>
          <Reveal stagger={0.12} className="mt-10 grid gap-5">
            {tastingMenu.lines.map((l, i) => (
              <p key={i} className={i === 0 ? "t-lead max-w-lg text-ink" : "t-body max-w-prose text-ink-soft"}>
                {l}
              </p>
            ))}
          </Reveal>

          {/* The chapter currently running — a name and a season, nothing that goes stale */}
          {current ? (
            <Reveal className="hairline mt-12 pt-7">
              <p className="t-eyebrow text-ink/55">Current chapter</p>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <p className="t-title uppercase text-orange">{current.name}</p>
                <p className="t-eyebrow text-ink/70">{current.dates}</p>
              </div>
              {current.courses?.length ? (
                <Button href="#archive" variant="text" className="mt-5">
                  See the courses in the archive
                </Button>
              ) : null}
            </Reveal>
          ) : null}
        </div>

        <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-5 lg:col-start-8">
          <ImageReveal
            image={images.communalTable}
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 58vw, 100vw"
            className="aspect-[4/3] w-full"
            from="right"
            parallax={5}
            cursor="view"
          />

          <Reveal className="mt-10 border border-line bg-paper-deep p-7 md:p-9">
            <p className="t-caption text-ink/70">{tastingMenu.currentPrompt.line}</p>
            <p className="t-title mt-3 text-indigo">{tastingMenu.currentPrompt.heading}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/contact" variant="primary" cursor="reserve">
                Register your interest
              </Button>
              {wa ? (
                <Button href={wa} external variant="text">
                  WhatsApp us
                </Button>
              ) : (
                <Button href={site.links.instagram} external variant="text">
                  Message us on Instagram
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
