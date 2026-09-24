import Link from "next/link";
import { site } from "@/data/site";
import { story } from "@/data/story";
import { images } from "@/data/images";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const CARDS = [
  {
    href: "/story",
    eyebrow: "Our story",
    title: "From the Andamans to Bengaluru",
    line: story.journey.map((j) => j.place).join(" · "),
    image: images.chefAtPass,
    position: "62% 30%",
  },
  {
    href: "/space",
    eyebrow: "The space",
    title: "Step into MINIBÉ",
    line: "The community table · The chef's pass · The table",
    image: images.entranceBlue,
    position: "50% 50%",
  },
];

/**
 * Homepage teaser only — two doors, into the story and the room. The full
 * narrative and the gallery live on /story and /space.
 */
export function VisitTeaser() {
  return (
    <section className="wrap py-section-sm" aria-labelledby="visit-teaser-title">
      <h2 id="visit-teaser-title" className="sr-only">
        More of MINIBÉ
      </h2>
      <Reveal as="ul" stagger={0.14} className="grid gap-10 md:grid-cols-2 md:gap-8">
        {CARDS.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="group block" data-cursor="view">
              <ImageReveal
                image={c.image}
                sizes="(min-width: 768px) 46vw, 100vw"
                className="aspect-[16/10] w-full"
                position={c.position}
                hover
              />
              <Eyebrow rule className="mt-6 text-orange-deep">
                {c.eyebrow}
              </Eyebrow>
              <h3 className="t-title mt-4 max-w-sm text-indigo transition-colors duration-500 group-hover:text-orange">
                {c.title}
              </h3>
              <p className="t-caption mt-3 text-ink/70">{c.line}</p>
            </Link>
          </li>
        ))}
      </Reveal>

      <Reveal className="hairline mt-16 flex flex-col gap-5 pt-10 sm:flex-row sm:items-end sm:justify-between">
        <p className="t-quote max-w-md text-ink-soft">Let&apos;s talk dessert.</p>
        <Link href="/contact" className="t-eyebrow link-underline text-ink">
          {site.cta.primary} →
        </Link>
      </Reveal>
    </section>
  );
}
