import { experience } from "@/data/experience";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Homepage teaser only — the thesis in one line, then a door into
 * /experience, where the philosophy is actually set out.
 */
export function BrandTeaser() {
  return (
    <section className="bg-indigo text-paper" aria-labelledby="brand-teaser-title">
      <div className="wrap py-section-sm md:py-section">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <WordReveal
              as="h2"
              id="brand-teaser-title"
              text={experience.title}
              className="t-display text-paper"
              lineClassName="last:text-orange"
            />
          </div>
          <Reveal className="col-span-12 flex flex-col justify-end gap-8 md:col-span-9 lg:col-span-4 lg:col-start-9">
            <p className="t-lead text-paper/85">{experience.lede}</p>
            <Button href="/experience" variant="primary" size="lg" className="self-start">
              Discover the experience
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
