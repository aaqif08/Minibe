import type { Metadata } from "next";
import { site, chapter } from "@/data/site";
import { contact, submitRoute } from "@/data/contact";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextPage } from "@/components/ui/NextPage";
import { Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Logo";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { ContactChannels } from "@/components/site/ContactChannels";
import { Services } from "@/components/site/Services";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reserve a table at MINIBÉ, ask what's currently on the tasting menu, or enquire about corporate orders, private catering, grazing tables, wedding cakes and workshops in Bengaluru.",
  alternates: { canonical: "/contact" },
};

/** /contact — the practical page: three channels, services, enquiry, address. */
export default function ContactPage() {
  const page = chapter("contact");
  const { address, timings } = contact;
  const lat = `${Math.abs(site.geo.lat).toFixed(4)}° N`;
  const lng = `${Math.abs(site.geo.lng).toFixed(4)}° E`;
  const hasForm = submitRoute() !== "none";

  return (
    <div className="bg-indigo text-paper">
      <PageHeader
        chapter={page}
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
        <div aria-hidden className="pointer-events-none absolute -right-[10%] top-[18%] -z-10 w-[46vw] opacity-[0.06]">
          <Logo variant="monogram" tone="white" width={900} className="w-full" />
        </div>

        {/* The three direct channels, first */}
        <section className="wrap pt-section-sm" aria-labelledby="channels-title">
          <h2 id="channels-title" className="t-eyebrow text-paper/60">
            Talk to us directly
          </h2>
          <Reveal className="mt-8">
            <ContactChannels light />
          </Reveal>
        </section>

        {/* Services */}
        <div className="wrap pt-section-sm">
          <Services light />
        </div>

        {/* Enquiry form + where to find us */}
        <div className="wrap grid grid-cols-12 gap-x-6 gap-y-16 py-section-sm md:py-section">
          <Reveal className="col-span-12 lg:col-span-6">
            <h2 className="t-eyebrow mb-10 text-orange">{contact.formTitle}</h2>
            <EnquiryForm />
          </Reveal>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Reveal>
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
                  <dt className="t-eyebrow pt-1 text-paper/60">Hours</dt>
                  <dd>
                    {timings.schedule?.length ? (
                      <ul className="grid gap-1">
                        {timings.schedule.map((h) => (
                          <li key={h.days} className="flex justify-between gap-6">
                            <span>{h.days}</span>
                            <span className="tabular-nums">
                              {h.open} – {h.close}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <p className={timings.schedule?.length ? "mt-1 text-paper/60" : undefined}>{timings.note}</p>
                  </dd>
                </div>
                <div className="grid grid-cols-[5.5rem_1fr] gap-4">
                  <dt className="t-eyebrow pt-1 text-paper/60">Coords</dt>
                  <dd className="tabular-nums">
                    {lat} · {lng}
                  </dd>
                </div>
                <div className="grid grid-cols-[5.5rem_1fr] gap-4">
                  <dt className="t-eyebrow pt-1 text-paper/60">Follow</dt>
                  <dd>
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`MINIBÉ on Instagram, ${contact.instagramHandle}`}
                      className="link-underline"
                    >
                      {contact.instagramHandle}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        <NextPage
          href={contact.booking}
          label="Reserve your experience"
          note="Book a table through our booking system."
          external
          light
          className="pb-section-sm"
        />
      </div>
    </div>
  );
}
