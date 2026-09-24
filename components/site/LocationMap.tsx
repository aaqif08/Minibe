"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import { site } from "@/data/site";
import { contact } from "@/data/contact";
import { cn } from "@/lib/cn";

type Props = { className?: string };

/**
 * The map.
 *
 * By default this is MINIBÉ's own drawn plate — on-brand, weightless, and the
 * whole thing is a link to Google Maps. Set `mapEmbed: true` in data/contact.ts
 * to lay a live Google map over it; the embed is only requested once the foot
 * of the page is within reach, so a component that appears on every route
 * still costs nothing on load, and the plate stays underneath if it fails.
 */
export function LocationMap({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const { lat, lng } = site.geo;
  const label = `${site.name} location in ${site.address.city}`;
  const embed = contact.mapEmbed;

  useEffect(() => {
    if (!embed || load) return;
    // A passive listener rather than IntersectionObserver: an instant jump to
    // the bottom of the page (restored scroll, in-page anchor) can skip an
    // observer callback entirely.
    const near = () => {
      const el = ref.current;
      return !!el && el.getBoundingClientRect().top < window.innerHeight + 400;
    };
    if (near()) {
      setLoad(true);
      return;
    }
    const check = () => {
      if (!near()) return;
      setLoad(true);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [embed, load]);

  const plate = (
    <>
      <svg
        viewBox="0 0 1600 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-indigo"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeOpacity="0.14">
          {[70, 140, 220, 310, 410].map((r) => (
            <circle key={r} cx="800" cy="250" r={r} />
          ))}
          <path d="M0 250H1600M800 0V500" />
          <path d="M0 340 C 300 300, 700 400, 1600 320" strokeOpacity="0.24" />
          <path d="M420 0 C 520 160, 560 340, 470 500" strokeOpacity="0.24" />
        </g>
        <circle cx="800" cy="250" r="7" fill="var(--color-orange)" />
        <circle cx="800" cy="250" r="16" fill="none" stroke="var(--color-orange)" strokeOpacity="0.5">
          <animate attributeName="r" values="12;26;12" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <text x="826" y="243" fontFamily="var(--font-sans)" fontSize="13" letterSpacing="3" fill="currentColor" opacity="0.75">
          80 FEET ROAD
        </text>
        <text x="60" y="456" fontFamily="var(--font-sans)" fontSize="13" letterSpacing="3" fill="currentColor" opacity="0.5">
          KODIHALLI · HAL 3RD STAGE
        </text>
      </svg>

      <span aria-hidden className="absolute left-6 top-6 flex flex-col gap-1">
        <span className="t-eyebrow text-ink/70">{site.name}</span>
        <span className="font-display text-lg tabular-nums text-indigo">
          {Math.abs(lat).toFixed(4)}° N · {Math.abs(lng).toFixed(4)}° E
        </span>
      </span>
    </>
  );

  // The accessible name is built from the link's own content (visible label
  // plus a screen-reader-only description), so it always contains what a
  // sighted user reads. The arrow is drawn, not typed, for the same reason.
  const cta = (
    <span className="t-eyebrow link-underline inline-flex items-center gap-2 text-indigo">
      {site.cta.maps}
      <span className="sr-only"> — {label}</span>
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
        <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const base = cn("relative block w-full overflow-hidden border border-line bg-paper-deep", className);

  // Without the embed the whole plate is the link — simplest and most reliable.
  if (!embed) {
    return (
      <a
        ref={ref as unknown as Ref<HTMLAnchorElement>}
        href={contact.maps}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, "group")}
        data-cursor="view"
      >
        {plate}
        <span className="absolute bottom-6 right-6 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5">
          {cta}
        </span>
      </a>
    );
  }

  // With the embed the map itself is interactive, so the link becomes a chip.
  return (
    <div ref={ref} className={base}>
      {plate}
      {load ? (
        <iframe
          title={label}
          src={`https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 opacity-0 transition-opacity duration-1000 ease-[var(--ease-expo)] data-[ready=true]:opacity-100"
          onLoad={(e) => e.currentTarget.setAttribute("data-ready", "true")}
        />
      ) : null}
      <a
        href={contact.maps}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 right-6 z-10 bg-paper px-5 py-3 shadow-[0_10px_30px_-12px_rgba(36,3,115,0.45)] transition-colors duration-500 hover:bg-orange"
      >
        {cta}
      </a>
    </div>
  );
}
