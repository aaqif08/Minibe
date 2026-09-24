import Link from "next/link";
import { site } from "@/data/site";
import { contact } from "@/data/contact";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Footer social + visit column. Instagram is the only platform MINIBÉ
 * publishes, so it is the only one here.
 */
export function FooterSocial() {
  return (
    <div>
      <h3 className="t-eyebrow text-paper/60">Follow</h3>

      <ul className="mt-5 flex flex-col gap-3">
        <li>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`MINIBÉ on Instagram, ${contact.instagramHandle}`}
            className="group inline-flex items-center gap-3 text-paper/85 transition-colors duration-500 hover:text-orange"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-paper/25 transition-[border-color,transform] duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:border-orange">
              <InstagramIcon />
            </span>
            <span className="t-body-sm">{contact.instagramHandle}</span>
          </a>
        </li>
        <li>
          <a
            href={site.chef.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chef Jenny on Instagram, ${site.chef.handle}`}
            className="t-body-sm link-underline inline-flex min-h-10 items-center text-paper/85"
          >
            {site.chef.handle}
          </a>
        </li>
      </ul>

      <h3 className="t-eyebrow mt-8 text-paper/60">Visit</h3>
      <ul className="t-body-sm mt-3 flex flex-col text-paper/85">
        <li>
          <a
            href={contact.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex min-h-10 items-center"
          >
            {site.cta.directions}
          </a>
        </li>
        <li>
          <Link href="/contact" className="link-underline inline-flex min-h-10 items-center">
            Private dining &amp; events
          </Link>
        </li>
      </ul>
    </div>
  );
}
