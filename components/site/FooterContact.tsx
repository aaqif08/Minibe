import { contact, waLink, phoneDisplay, phoneHref, whatsappDisplay, emailHref } from "@/data/contact";

/**
 * Footer contact column. Only channels MINIBÉ has actually published render —
 * each one stays hidden until it exists in data/contact.ts.
 */
export function FooterContact() {
  const { address, timings } = contact;
  const wa = waLink(contact.waMessages.general);
  const hasTimings = Boolean(timings.weekday || timings.weekend);

  return (
    <div>
      <h3 className="t-eyebrow text-paper/60">Contact</h3>

      <ul className="t-body-sm mt-3 flex flex-col text-paper/85">
        {emailHref && contact.email ? (
          <li>
            <a href={emailHref} className="link-underline inline-flex min-h-10 items-center break-all">
              {contact.email}
              <span className="sr-only"> — Email MINIBÉ</span>
            </a>
          </li>
        ) : null}
        {wa && whatsappDisplay ? (
          <li>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex min-h-10 items-center"
            >
              WhatsApp · {whatsappDisplay}
              <span className="sr-only"> — Chat with MINIBÉ on WhatsApp</span>
            </a>
          </li>
        ) : null}
        {phoneHref && phoneDisplay ? (
          <li>
            <a href={phoneHref} className="link-underline inline-flex min-h-10 items-center">
              {phoneDisplay}
              <span className="sr-only"> — Call MINIBÉ</span>
            </a>
          </li>
        ) : null}
      </ul>

      <address className="t-body-sm mt-5 not-italic text-paper/70">
        {address.line1}
        <br />
        {address.line2}
        <br />
        {address.city} {address.postalCode}
      </address>

      {/* Timings render only once real hours are configured */}
      {hasTimings || timings.note ? (
        <div className="mt-5">
          {hasTimings ? <h3 className="t-eyebrow text-paper/60">Timings</h3> : null}
          <ul className="t-body-sm mt-3 flex flex-col gap-1 text-paper/85">
            {timings.weekday ? <li>{timings.weekday}</li> : null}
            {timings.weekend ? <li>{timings.weekend}</li> : null}
            {timings.note ? <li className="text-paper/70">{timings.note}</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
