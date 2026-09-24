import Link from "next/link";
import { site } from "@/data/site";

/** Footer page navigation. Internal routes, same tab, via next/link. */
export function FooterLinks() {
  return (
    <nav aria-label="Footer">
      <h3 className="t-eyebrow text-paper/60">Pages</h3>
      <ul className="t-body-sm mt-3 flex flex-col text-paper/85">
        <li>
          <Link href="/" className="link-underline inline-flex min-h-10 items-center">
            Home
          </Link>
        </li>
        {site.nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="link-underline inline-flex min-h-10 items-center">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
