import { contact, waLink, phoneDisplay, phoneHref, whatsappDisplay, emailHref } from "@/data/contact";
import { cn } from "@/lib/cn";

type Channel = {
  id: string;
  label: string;
  value: string;
  action: string;
  href: string;
  external?: boolean;
  aria: string;
};

/** The three direct enquiry channels, in the order MINIBÉ prefers them. */
export function channels(): Channel[] {
  const wa = waLink(contact.waMessages.general);
  return [
    wa && whatsappDisplay
      ? {
          id: "whatsapp",
          label: "WhatsApp",
          value: whatsappDisplay,
          action: "Chat on WhatsApp",
          href: wa,
          external: true,
          aria: "Chat with MINIBÉ on WhatsApp",
        }
      : null,
    phoneHref && phoneDisplay
      ? { id: "phone", label: "Call", value: phoneDisplay, action: "Call us", href: phoneHref, aria: "Call MINIBÉ" }
      : null,
    emailHref && contact.email
      ? { id: "email", label: "Email", value: contact.email, action: "Email us", href: emailHref, aria: "Email MINIBÉ" }
      : null,
  ].filter(Boolean) as Channel[];
}

/**
 * The three direct channels as an editorial row: a rule, the label, the
 * number or address in serif, and the action. Three columns on desktop,
 * stacked on small screens.
 */
export function ContactChannels({ light, className }: { light?: boolean; className?: string }) {
  const rows = channels();
  if (!rows.length) return null;

  return (
    <ul className={cn("grid gap-0 md:grid-cols-3", className)} aria-label="Ways to reach MINIBÉ">
      {rows.map((c) => (
        <li
          key={c.id}
          className={cn(
            light ? "hairline-light" : "hairline",
            "md:border-r md:pr-8 md:last:border-r-0",
            light ? "md:border-line-light" : "md:border-line",
          )}
        >
          <a
            href={c.href}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noopener noreferrer" : undefined}
            className="group block py-7"
          >
            <span className={cn("t-eyebrow block", light ? "text-orange" : "text-orange-deep")}>{c.label}</span>
            {/* The accessible name is the visible text plus this — so it always
                contains what a sighted user reads. */}
            <span className="sr-only"> — {c.aria}</span>
            <span
              className={cn(
                "mt-3 block font-display text-[1.5rem] leading-none transition-colors duration-500 md:text-[1.75rem]",
                light ? "text-paper group-hover:text-orange" : "text-indigo group-hover:text-orange",
              )}
            >
              {c.value}
            </span>
            <span
              className={cn(
                "t-caption mt-4 flex items-center gap-2",
                light ? "text-paper/70" : "text-ink/70",
              )}
            >
              {c.action}
              <span
                aria-hidden
                className="inline-block h-px w-5 bg-current transition-[width] duration-500 ease-[var(--ease-expo)] group-hover:w-9"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
