import Link from "next/link";
import { contact } from "@/data/contact";

/**
 * Footer services column. These are not separate routes — each one links to
 * the services section on /contact, where the WhatsApp enquiry lives.
 */
export function FooterServices() {
  return (
    <div>
      <h3 className="t-eyebrow text-paper/60">Services</h3>
      <ul className="t-body-sm mt-3 flex flex-col text-paper/85">
        {contact.services.map((s) => (
          <li key={s.id}>
            <Link href="/contact#services" className="link-underline inline-flex min-h-10 items-center">
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
