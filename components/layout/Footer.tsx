"use client";

import { site } from "@/data/site";
import { useScroll } from "@/components/providers/SmoothScroll";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

/** Closing composition + minimal footer. */
export function Footer() {
  const year = new Date().getFullYear();
  const { scrollTo } = useScroll();

  return (
    <footer className="relative bg-midnight text-paper">
      {/* Final statement */}
      <div className="wrap grid grid-cols-12 gap-x-6 pb-20 pt-24 md:pb-28 md:pt-36">
        <div className="col-span-12 md:col-span-2">
          <Reveal>
            <Logo variant="monogram" tone="white" width={56} />
          </Reveal>
        </div>
        <div className="col-span-12 mt-10 md:col-span-9 md:col-start-4 md:mt-0">
          <WordReveal as="p" text={["An evening where", "dessert takes", "centre stage."]} className="t-hero text-paper" />
          <Reveal className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10" delay={0.2}>
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              cursor="reserve"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact", { offset: -64 });
              }}
            >
              {site.cta.secondary}
            </Button>
            <div className="t-eyebrow flex flex-wrap gap-x-8 gap-y-3 text-paper/70">
              <span>{site.city}</span>
              <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">
                Instagram
              </a>
              <a href={site.links.maps} target="_blank" rel="noopener noreferrer" className="link-underline">
                Directions
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Footer proper */}
      <div className="wrap hairline-light">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 py-12 md:py-16">
          <div className="col-span-12 md:col-span-4">
            <Logo variant="wordmark" tone="white" width={150} />
            <p className="mt-5 max-w-xs font-display text-lg font-light leading-snug text-paper/80">
              {site.tagline}
              <br />
              <span className="font-light italic">{site.by}</span>
            </p>
            <p className="t-caption mt-4 text-paper/55">{site.offer}</p>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-6">
            <p className="t-eyebrow mb-4 text-paper/50">Find us</p>
            <address className="t-body-sm not-italic text-paper/80">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city} {site.address.postalCode}
            </address>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="t-eyebrow mb-4 text-paper/50">Follow</p>
            <ul className="t-body-sm flex flex-col gap-2 text-paper/80">
              <li>
                <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {site.links.instagramHandle}
                </a>
              </li>
              <li>
                <a href={site.chef.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {site.chef.handle}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <p className="t-eyebrow mb-4 text-paper/50">Visit</p>
            <ul className="t-body-sm flex flex-col gap-2 text-paper/80">
              <li>
                <a href={site.links.reserve} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {site.cta.reserve}
                </a>
              </li>
              <li>
                <a href={site.links.maps} target="_blank" rel="noopener noreferrer" className="link-underline">
                  Directions
                </a>
              </li>
              <li className="text-paper/55">{site.hours.note}</li>
            </ul>
          </div>
        </div>

        <div className="hairline-light flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-base font-light italic text-paper/70">{site.closingLine}</p>
          <p className="t-caption text-paper/60">
            © {year} {site.name}. {site.city}.
          </p>
        </div>
      </div>
    </footer>
  );
}
