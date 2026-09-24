import Link from "next/link";
import { site } from "@/data/site";
import { contact, waLink } from "@/data/contact";
import { Logo } from "@/components/ui/Logo";

/** One compact footer, shared by every page. */
export function Footer() {
  const year = new Date().getFullYear();
  const wa = waLink(contact.waMessages.visit);

  return (
    <footer className="bg-midnight text-paper">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12 py-16 md:py-20">
        <div className="col-span-12 md:col-span-5">
          <Logo variant="wordmark" tone="white" width={160} />
          <p className="mt-5 max-w-xs font-display text-lg font-light leading-snug text-paper/85">
            {site.tagline}
            <br />
            <span className="font-light italic">{site.by}</span>
          </p>
          <p className="t-caption mt-4 text-paper/60">{site.offer}</p>
        </div>

        <nav aria-label="Footer" className="col-span-6 md:col-span-3">
          <p className="t-eyebrow mb-4 text-paper/50">Pages</p>
          <ul className="t-body-sm flex flex-col gap-2 text-paper/85">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 md:col-span-4">
          <p className="t-eyebrow mb-4 text-paper/50">Find us</p>
          <address className="t-body-sm not-italic text-paper/85">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city} {site.address.postalCode}
          </address>
          <ul className="t-body-sm mt-5 flex flex-col gap-2 text-paper/85">
            <li>
              <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">
                Instagram · {site.links.instagramHandle}
              </a>
            </li>
            {wa ? (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline">
                  WhatsApp
                </a>
              </li>
            ) : null}
            <li>
              <a href={site.links.reserve} target="_blank" rel="noopener noreferrer" className="link-underline">
                {site.cta.reserveLong}
              </a>
            </li>
            <li className="text-paper/60">{site.hours.note}</li>
          </ul>
        </div>
      </div>

      <div className="wrap">
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
