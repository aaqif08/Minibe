import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * Visit. No embedded map (keeps the page fast); a drawn coordinate plate
 * stands in for it and the CTA opens Google Maps.
 */
export function Location() {
  const { address, geo, hours } = site;
  const lat = `${Math.abs(geo.lat).toFixed(4)}° ${geo.lat >= 0 ? "N" : "S"}`;
  const lng = `${Math.abs(geo.lng).toFixed(4)}° ${geo.lng >= 0 ? "E" : "W"}`;

  return (
    <section id="visit" className="wrap scroll-mt-16 py-section-sm md:py-section" aria-labelledby="visit-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <Reveal className="col-span-12 lg:col-span-5">
          <Eyebrow rule className="text-ink/60">
            Visit
          </Eyebrow>
          <h2 id="visit-title" className="t-title mt-6 text-indigo">
            {site.name}
          </h2>
          <address className="mt-6 font-display text-[1.6rem] font-light leading-snug not-italic text-ink md:text-[2rem]">
            {address.line1}
            <br />
            {address.line2}
            <br />
            {address.city}, {address.region} {address.postalCode}
          </address>

          <dl className="hairline mt-10 grid gap-4 pt-6 t-body-sm text-ink-soft">
            <div className="grid grid-cols-[6rem_1fr] gap-4">
              <dt className="t-eyebrow pt-1 text-ink/50">Hours</dt>
              <dd>
                {hours.schedule?.length ? (
                  <ul className="grid gap-1">
                    {hours.schedule.map((h) => (
                      <li key={h.days} className="flex justify-between gap-6">
                        <span>{h.days}</span>
                        <span className="tabular-nums">
                          {h.open} – {h.close}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className={hours.schedule?.length ? "mt-1 text-ink/55" : undefined}>{hours.note}</p>
              </dd>
            </div>
            {site.phone ? (
              <div className="grid grid-cols-[6rem_1fr] gap-4">
                <dt className="t-eyebrow pt-1 text-ink/50">Phone</dt>
                <dd>
                  <a href={`tel:${site.phone}`} className="link-underline">
                    {site.phone}
                  </a>
                </dd>
              </div>
            ) : null}
            {site.email ? (
              <div className="grid grid-cols-[6rem_1fr] gap-4">
                <dt className="t-eyebrow pt-1 text-ink/50">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="link-underline">
                    {site.email}
                  </a>
                </dd>
              </div>
            ) : null}
            <div className="grid grid-cols-[6rem_1fr] gap-4">
              <dt className="t-eyebrow pt-1 text-ink/50">Book</dt>
              <dd>Tasting menus are served primarily through advance reservations.</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <Button href={site.links.maps} external variant="indigo">
              {site.cta.maps}
            </Button>
            <Button href={site.links.reserve} external variant="text" cursor="reserve">
              {site.cta.secondary}
            </Button>
          </div>
        </Reveal>

        {/* Coordinate plate */}
        <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7" delay={0.15}>
          <a
            href={site.links.maps}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.cta.maps} — ${address.line1}, ${address.line2}, ${address.city}`}
            className="group relative block aspect-[4/3] w-full overflow-hidden border border-line bg-paper-deep"
          >
            <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full text-indigo" aria-hidden>
              <g fill="none" stroke="currentColor" strokeOpacity="0.16">
                {[80, 160, 240, 320].map((r) => (
                  <circle key={r} cx="400" cy="300" r={r} />
                ))}
                <path d="M0 300H800M400 0V600" />
                <path d="M0 420 C 200 380, 400 460, 800 400" strokeOpacity="0.28" />
                <path d="M120 0 C 260 200, 300 400, 220 600" strokeOpacity="0.28" />
              </g>
              <g className="transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1.5">
                <circle cx="400" cy="300" r="6" fill="var(--color-orange)" />
                <circle cx="400" cy="300" r="14" fill="none" stroke="var(--color-orange)" strokeOpacity="0.5">
                  <animate attributeName="r" values="10;22;10" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3.5s" repeatCount="indefinite" />
                </circle>
              </g>
              <text x="420" y="292" fontFamily="var(--font-sans)" fontSize="11" letterSpacing="2.5" fill="currentColor" opacity="0.7">
                80 FEET ROAD
              </text>
              <text x="132" y="560" fontFamily="var(--font-sans)" fontSize="11" letterSpacing="2.5" fill="currentColor" opacity="0.5">
                KODIHALLI · HAL 3RD STAGE
              </text>
            </svg>
            <div className="absolute left-5 top-5 flex flex-col gap-1">
              <span className="t-eyebrow text-ink/60">{site.name}</span>
              <span className="font-display text-lg tabular-nums text-indigo">
                {lat} · {lng}
              </span>
            </div>
            <span className="t-eyebrow link-underline absolute bottom-5 right-5 text-indigo">View on map →</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
