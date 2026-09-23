import { site } from "@/data/site";
import { contact, submitRoute } from "@/data/contact";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { EnquiryForm } from "@/components/ui/EnquiryForm";

type Channel = { label: string; value: string; href: string; external?: boolean };

/**
 * Chapter 07 — Let's talk dessert. The enquiry form (when a channel is
 * configured), the direct channels MINIBÉ actually publishes, and where to
 * find the room. Everything a visitor might want to do, in one place.
 */
export function Contact() {
  const chapter = site.chapters[6];
  const { address, geo, hours } = site;
  const lat = `${Math.abs(geo.lat).toFixed(4)}° ${geo.lat >= 0 ? "N" : "S"}`;
  const lng = `${Math.abs(geo.lng).toFixed(4)}° ${geo.lng >= 0 ? "E" : "W"}`;
  const hasForm = submitRoute() !== "none";


  // Only channels MINIBÉ has actually published are rendered.
  const channels: Channel[] = [
    contact.whatsapp
      ? { label: "WhatsApp", value: "Message us", href: `https://wa.me/${contact.whatsapp}`, external: true }
      : null,
    contact.phone ? { label: "Call", value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, "")}` } : null,
    contact.email ? { label: "Email", value: contact.email, href: `mailto:${contact.email}` } : null,
    {
      label: "Instagram",
      value: site.links.instagramHandle,
      href: site.links.instagram,
      external: true,
    },
    { label: "Reserve", value: "Book a table online", href: site.links.reserve, external: true },
  ].filter(Boolean) as Channel[];

  return (
    <section
      id="contact"
      data-chapter="contact"
      data-theme="dark"
      className="relative isolate overflow-hidden bg-indigo text-paper"
      aria-labelledby="contact-title"
    >
      {/* Ghosted monogram */}
      <div aria-hidden className="pointer-events-none absolute -right-[10%] top-1/3 -z-10 w-[46vw] opacity-[0.06]">
        <Logo variant="monogram" tone="white" width={900} className="w-full" />
      </div>

      <div className="wrap py-section-sm md:py-section">
        <ChapterMarker chapter={chapter} light />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-24">
          <div className="col-span-12 lg:col-span-7">
            <WordReveal as="h2" id="contact-title" text={contact.heading} className="t-display text-paper" />
          </div>
          <Reveal className="col-span-12 flex items-end md:col-span-9 lg:col-span-5 lg:col-start-8">
            <p className="t-lead text-paper/85">{hasForm ? contact.lede : contact.ledeFallback}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-16 md:mt-24">
          {/* Enquiry */}
          <Reveal className="col-span-12 lg:col-span-6">
            {hasForm ? (
              <>
                <h3 className="t-eyebrow mb-10 text-orange">{contact.formTitle}</h3>
                <EnquiryForm />
              </>
            ) : (
              <>
                <h3 className="t-title max-w-md text-paper">Tell us what you&apos;re after and we&apos;ll take it from there.</h3>
                <p className="t-body mt-5 max-w-md text-paper/70">
                  Tasting menu, à la carte or private dining — message us on Instagram, or book a table online.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button href={site.links.reserve} external variant="primary" size="lg" cursor="reserve">
                    {site.cta.reserve}
                  </Button>
                  <Button href={site.links.instagram} external variant="text-light">
                    Message us on Instagram
                  </Button>
                </div>
              </>
            )}
          </Reveal>

          {/* Direct channels + where to find us */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Reveal>
              <h3 className="t-eyebrow text-paper/50">Or talk to us directly</h3>
              <ul className="mt-6 grid">
                {channels.map((c) => (
                  <li key={c.label} className="hairline-light">
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="group flex items-baseline justify-between gap-6 py-5"
                    >
                      <span className="font-display text-2xl text-paper transition-colors duration-500 group-hover:text-orange">
                        {c.label}
                      </span>
                      <span className="t-body-sm text-right text-paper/60">{c.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-14" delay={0.1}>
              <h3 className="t-eyebrow text-paper/50">Find us</h3>
              <address className="mt-5 font-display text-[1.5rem] font-light not-italic leading-snug text-paper md:text-[1.75rem]">
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </address>

              <dl className="mt-7 grid gap-3 t-body-sm text-paper/70">
                <div className="grid grid-cols-[5.5rem_1fr] gap-4">
                  <dt className="t-eyebrow pt-1 text-paper/45">Hours</dt>
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
                    <p className={hours.schedule?.length ? "mt-1 text-paper/50" : undefined}>{hours.note}</p>
                  </dd>
                </div>
                <div className="grid grid-cols-[5.5rem_1fr] gap-4">
                  <dt className="t-eyebrow pt-1 text-paper/45">Coords</dt>
                  <dd className="tabular-nums">
                    {lat} · {lng}
                  </dd>
                </div>
              </dl>

              <a
                href={site.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.cta.maps} — ${address.line1}, ${address.line2}, ${address.city}`}
                className="group relative mt-8 block aspect-[16/9] w-full overflow-hidden border border-paper/20"
              >
                <svg viewBox="0 0 800 450" className="absolute inset-0 h-full w-full text-paper" aria-hidden>
                  <g fill="none" stroke="currentColor" strokeOpacity="0.18">
                    {[60, 120, 190, 260].map((r) => (
                      <circle key={r} cx="400" cy="225" r={r} />
                    ))}
                    <path d="M0 225H800M400 0V450" />
                    <path d="M0 320 C 200 285, 420 350, 800 300" strokeOpacity="0.3" />
                  </g>
                  <circle cx="400" cy="225" r="6" fill="var(--color-orange)" />
                  <circle cx="400" cy="225" r="14" fill="none" stroke="var(--color-orange)" strokeOpacity="0.5">
                    <animate attributeName="r" values="10;22;10" dur="3.5s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3.5s" repeatCount="indefinite" />
                  </circle>
                  <text x="422" y="218" fontFamily="var(--font-sans)" fontSize="11" letterSpacing="2.5" fill="currentColor" opacity="0.7">
                    80 FEET ROAD
                  </text>
                </svg>
                <span className="t-eyebrow link-underline absolute bottom-4 right-4 text-paper">{site.cta.maps} →</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
