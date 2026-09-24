import { contact, waLink } from "@/data/contact";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The services MINIBÉ offers beyond the table. Names only — no descriptions,
 * prices or capacities have been supplied, so none are invented. Each row is
 * a WhatsApp enquiry pre-written for that service, falling back to email.
 */
export function Services({ light, className }: { light?: boolean; className?: string }) {
  return (
    <section id="services" className={cn("scroll-mt-28", className)} aria-labelledby="services-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-6">
        <div className="col-span-12 lg:col-span-6">
          <h2 id="services-title" className={cn("t-section", light ? "text-paper" : "text-indigo")}>
            {contact.servicesHeading}
          </h2>
        </div>
        <div className="col-span-12 flex items-end md:col-span-9 lg:col-span-5 lg:col-start-8">
          <p className={cn("t-lead", light ? "text-paper/85" : "text-ink")}>{contact.servicesLede}</p>
        </div>
      </div>

      <Reveal as="ul" stagger={0.08} className="mt-12 grid md:mt-16">
        {contact.services.map((s, i) => {
          const wa = waLink(s.enquiry);
          const href = wa ?? (contact.email ? `mailto:${contact.email}?subject=${encodeURIComponent(s.name)}` : null);
          const row = (
            <>
              <span className={cn("t-eyebrow", light ? "text-paper/50" : "text-ink/55")}>0{i + 1}</span>
              <span
                className={cn(
                  "font-display text-[2rem] leading-none tracking-tight transition-[color,transform] duration-500 ease-[var(--ease-expo)] md:text-[2.75rem]",
                  light
                    ? "text-paper group-hover:translate-x-2 group-hover:text-orange"
                    : "text-indigo group-hover:translate-x-2 group-hover:text-orange",
                )}
              >
                {s.name}
              </span>
              <span
                className={cn(
                  "t-eyebrow col-start-2 flex min-h-10 items-center gap-2 sm:col-start-auto sm:min-h-0 sm:justify-self-end",
                  light ? "text-paper/70" : "text-ink/70",
                )}
              >
                <span className="sm:hidden">Enquire on WhatsApp</span>
                <span className="hidden sm:inline">Enquire</span>
                <span
                  aria-hidden
                  className="inline-block h-px w-5 bg-current transition-[width] duration-500 ease-[var(--ease-expo)] group-hover:w-9"
                />
              </span>
            </>
          );

          return (
            <li key={s.id} className={light ? "hairline-light" : "hairline"}>
              {href ? (
                <a
                  href={href}
                  target={wa ? "_blank" : undefined}
                  rel={wa ? "noopener noreferrer" : undefined}
                  aria-label={`Enquire about ${s.name}${wa ? " on WhatsApp" : " by email"}`}
                  className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-3 py-6 sm:grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] md:py-7"
                >
                  {row}
                </a>
              ) : (
                <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-3 py-6 sm:grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] md:py-7">
                  {row}
                </div>
              )}
            </li>
          );
        })}
      </Reveal>
    </section>
  );
}
