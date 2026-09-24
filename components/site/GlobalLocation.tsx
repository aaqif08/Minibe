import { site } from "@/data/site";
import { contact } from "@/data/contact";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { LocationMap } from "./LocationMap";

/**
 * The shared location block that closes every page, just above the footer:
 * a hairline, the address, directions, and a wide map. Kept deliberately
 * short — it is a practical ending, not another section.
 */
export function GlobalLocation() {
  const { address } = contact;

  return (
    <section className="bg-paper" aria-labelledby="global-location-title">
      <div className="wrap pb-10 pt-10 md:pb-14 md:pt-16">
        <div className="hairline grid grid-cols-12 items-end gap-x-6 gap-y-8 pt-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <Eyebrow rule className="text-orange-deep">
              Location
            </Eyebrow>
            <h2 id="global-location-title" className="t-section mt-5 text-indigo">
              Come find us
            </h2>
          </div>

          <div className="col-span-12 flex flex-col gap-6 md:col-span-6 md:items-end lg:col-span-6 lg:col-start-7 lg:flex-row lg:items-end lg:justify-between">
            <address className="font-display text-xl font-light not-italic leading-snug text-ink md:text-right lg:text-left lg:text-[1.5rem]">
              <span className="t-eyebrow mb-2 block text-ink/70">{site.name}</span>
              {address.line1}
              <br />
              {address.line2}
              <br />
              {address.city}, {address.region} {address.postalCode}
            </address>
            <Button href={contact.maps} external variant="outline" className="self-start md:self-end lg:self-end">
              {site.cta.directions}
            </Button>
          </div>
        </div>
      </div>

      <div className="wrap pb-section-sm">
        <LocationMap className="h-[260px] sm:h-[320px] lg:h-[420px]" />
      </div>
    </section>
  );
}
