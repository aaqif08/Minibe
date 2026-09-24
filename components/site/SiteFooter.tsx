import Link from "next/link";
import { site } from "@/data/site";
import { contact } from "@/data/contact";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { FooterContact } from "./FooterContact";
import { FooterServices } from "./FooterServices";
import { FooterSocial } from "./FooterSocial";
import { FooterLinks } from "./FooterLinks";

/**
 * The dark ending every page shares: the mark, three practical columns, one
 * reservation CTA and a thin legal bar. Practical, not another homepage —
 * keep it compact.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-midnight text-paper">
      <div className="wrap py-12 md:py-16">
        {/* Mark */}
        <div className="flex flex-col items-center text-center">
          <Logo variant="wordmark" tone="white" width={180} />
          <p className="mt-4 font-display text-lg font-light leading-snug text-paper/85">
            {site.tagline}
            <br />
            <span className="font-light italic">{site.by}</span>
          </p>
          <p className="t-caption mt-2 text-paper/60">{site.offer}</p>
        </div>

        {/* Columns */}
        <div className="hairline-light mt-10 grid grid-cols-1 gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:mt-12">
          <FooterContact />
          <FooterServices />
          <FooterLinks />
          <FooterSocial />
        </div>

        {/* Reservation */}
        <div className="hairline-light mt-10 flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-lead max-w-xs text-paper/85">An evening where dessert takes centre stage.</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={contact.booking} external variant="primary" cursor="reserve">
              Reserve your experience
            </Button>
            <a
              href={contact.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="t-eyebrow link-underline inline-flex min-h-11 items-center text-paper/80"
            >
              {site.cta.directions} →
            </a>
            <Link
              href="/contact"
              className="t-eyebrow link-underline inline-flex min-h-11 items-center text-paper/80"
            >
              {site.cta.primary} →
            </Link>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="wrap">
        <div className="hairline-light flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-caption text-paper/60">
            © {year} {site.name}
          </p>
          <p className="t-caption text-paper/60">Made with care in {site.city}</p>
        </div>
      </div>
    </footer>
  );
}
