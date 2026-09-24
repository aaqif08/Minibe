import Link from "next/link";
import { contact } from "@/data/contact";
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
      <Reveal as="ul" stagger={0.14} className="grid gap-8 md:grid-cols-2">
        {CARDS.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="group block" data-cursor="view">
              <ImageReveal
                image={c.image}
                sizes="(min-width: 768px) 46vw, 100vw"
                className="aspect-[3/2] w-full md:aspect-[16/9]"
                position={c.position}
                hover
              />
              <Eyebrow rule className="mt-5 text-orange-deep">
                {c.eyebrow}
              </Eyebrow>
              <h3 className="t-title mt-3 max-w-sm text-indigo transition-colors duration-500 group-hover:text-orange">
                {c.title}
              </h3>
              <p className="t-caption mt-3 text-ink/70">{c.line}</p>
            </Link>
          </li>
        ))}
      </Reveal>

      {/* One line for everything MINIBÉ does beyond the table — the full list
          and its enquiry links live on /contact, never here. */}
      <Reveal className="hairline mt-12 flex flex-col gap-6 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="t-quote max-w-md text-ink-soft">Let&apos;s talk dessert.</p>
          <p className="t-eyebrow mt-4 text-ink/70">
            {contact.services.map((s) => s.name).join(" · ")}
          </p>
        </div>
        <Link href="/contact" className="t-eyebrow link-underline shrink-0 text-ink">
          Enquire with MINIBÉ →
        </Link>
      </Reveal>
    </section>
  );
}
