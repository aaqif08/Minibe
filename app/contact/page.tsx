import type { Metadata } from "next";
import { site } from "@/data/site";
import { contact, submitRoute, waLink } from "@/data/contact";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { EnquiryForm } from "@/components/ui/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reserve a table at MINIBÉ, ask what's currently on the tasting menu, or enquire about private dining, events and catering in Bengaluru.",
  alternates: { canonical: "/contact" },
};

type Channel = { label: string; value: string; href: string; external?: boolean };

/** /contact — a practical enquiry page: form, direct channels, and the address. */
export default function ContactPage() {
  const chapter = site.chapters[4];
  const { address, geo, hours } = site;
  const lat = `${Math.abs(geo.lat).toFixed(4)}° ${geo.lat >= 0 ? "N" : "S"}`;
  const lng = `${Math.abs(geo.lng).toFixed(4)}° ${geo.lng >= 0 ? "E" : "W"}`;
  const hasForm = submitRoute() !== "none";
  const waVisit = waLink(contact.waMessages.visit);
  const waCatering = waLink(contact.waMessages.catering);

  // Only channels MINIBÉ has actually published are rendered.
  const channels: Channel[] = [
    waVisit ? { label: "WhatsApp", value: "Message us", href: waVisit, external: true } : null,
    contact.phone ? { label: "Call", value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, "")}` } : null,
    contact.email ? { label: "Email", value: contact.email, href: `mailto:${contact.email}` } : null,
    { label: "Instagram", value: site.links.instagramHandle, href: site.links.instagram, external: true },
    { label: "Reserve", value: "Book a table online", href: site.links.reserve, external: true },
    { label: "Directions", value: "Kodihalli, Bengaluru", href: site.links.maps, external: true },
  ].filter(Boolean) as Channel[];

  return (
    <div className="bg-indigo text-paper">
      <PageHeader
        chapter={chapter}
        title={contact.heading}
        lede={hasForm ? contact.lede : contact.ledeFallback}
        light
        titleClassName="text-paper"
      >
        <ul className="t-body-sm grid gap-1.5 text-paper/70">
          <li>Want to visit?</li>
          <li>Want to know what&apos;s currently on the table?</li>
          <li>Planning a celebration, private dining or catering?</li>
        </ul>
      </PageHeader>

      <div className="relative isolate overflow-hidden">
        {/* Ghosted monogram */}
        <div aria-hidden className="pointer-events-none absolute -right-[10%] top-1/4 -z-10 w-[46vw] opacity-[0.06]">
          <Logo variant="monogram" tone="white" width={900} className="w-full" />
        </div>

        <div className="wrap grid grid-cols-12 gap-x-6 gap-y-16 py-section-sm md:py-section">
          {/* Enquiry */}
          <Reveal className="col-span-12 lg:col-span-6">
            {hasForm ? (
              <>
                <h2 className="t-eyebrow mb-10 text-orange">{contact.formTitle}</h2>
                <EnquiryForm />
              </>
            ) : (
              /* No enquiry channel configured yet — see data/contact.ts. */
              <>
                <h2 className="t-title max-w-md text-paper">Tell us what you&apos;re after and we&apos;ll take it from there.</h2>
                <p className="t-body mt-5 max-w-md text-paper/75">
                  Tasting menu, à la carte, private dining or catering — message us on Instagram, or book a table online.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button href={site.links.reserve} external variant="primary" size="lg" cursor="reserve">
                    {site.cta.reserveLong}
                  </Button>
                  <Button href={site.links.instagram} external variant="text-light">
                    Message us on Instagram
                  </Button>
                </div>
              </>
            )}

            {/* Private dining + catering */}
            <div className="hairline-light mt-16 pt-8">
              <h2 className="t-eyebrow text-paper/60">Private dining, events & catering</h2>
              <p className="t-lead mt-4 max-w-md text-paper/90">
                MINIBÉ also takes catering, party orders and private events.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                {waCatering ? (
                  <Button href={waCatering} external variant="outline-light">
                    Enquire on WhatsApp
                  </Button>
                ) : (
                  <Button href={site.links.instagram} external variant="outline-light">
                    Enquire on Instagram
                  </Button>
                )}
              </div>
            </div>
          </Reveal>

          {/* Direct channels + where to find us */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Reveal>
              <h2 className="t-eyebrow text-paper/60">Or talk to us directly</h2>
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
                      <span className="t-body-sm text-right text-paper/70">{c.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-14" delay={0.1}>
              <h2 className="t-eyebrow text-paper/60">Find us</h2>
              <address className="mt-5 font-display text-[1.5rem] font-light not-italic leading-snug text-paper md:text-[1.75rem]">
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </address>

              <dl className="mt-7 grid gap-3 t-body-sm text-paper/75">
                <div className="grid grid-cols-[5.5rem_1fr] gap-4">
                  <dt className="t-eyebrow pt-1 text-paper/50">Hours</dt>
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
                    <p className={hours.schedule?.length ? "mt-1 text-paper/55" : undefined}>{hours.note}</p>
                  </dd>
                </div>
                <div className="grid grid-cols-[5.5rem_1fr] gap-4">
                  <dt className="t-eyebrow pt-1 text-paper/50">Coords</dt>
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
                  <text x="422" y="218" fontFamily="var(--font-sans)" fontSize="11" letterSpacing="2.5" fill="currentColor" opacity="0.75">
                    80 FEET ROAD
                  </text>
                </svg>
                <span className="t-eyebrow link-underline absolute bottom-4 right-4 text-paper">{site.cta.maps} →</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
