import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  label: string;
  /** Opens in a new tab with a safe rel — used for the booking system. */
  external?: boolean;
  /** What the next page is about, in a few words. */
  note?: string;
  light?: boolean;
  className?: string;
};

/**
 * End-of-page hand-off. Every inner page closes by pointing at the next one,
 * so the site reads as a sequence of chapters rather than dead ends.
 */
export function NextPage({
  href,
  label,
  note,
  external,
  light,
  className,
}: Props) {
  const classes = cn(
    "group flex items-end justify-between gap-6 py-10 transition-colors duration-500 md:py-14",
    light ? "hairline-light text-paper" : "hairline text-ink",
  );

  const body = (
    <>
      <span>
        <span
          className={cn(
            "t-eyebrow block",
            light ? "text-paper/70" : "text-ink/70",
          )}
        >
          Next
        </span>
        <span
          className={cn(
            "t-section mt-3 block transition-colors duration-500",
            light
              ? "text-paper group-hover:text-orange"
              : "text-indigo group-hover:text-orange",
          )}
        >
          {label}
        </span>
        {note ? (
          <span
            className={cn(
              "t-body-sm mt-3 block max-w-md",
              light ? "text-paper/60" : "text-ink-soft",
            )}
          >
            {note}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden
        className={cn(
          "mb-2 grid h-14 w-14 shrink-0 place-items-center rounded-full border transition-[background-color,color,border-color,transform] duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1",
          light
            ? "border-paper/30 text-paper group-hover:border-orange group-hover:bg-orange group-hover:text-indigo"
            : "border-ink/25 text-ink group-hover:border-orange group-hover:bg-orange group-hover:text-indigo",
        )}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path
            d="M1 8h13M9 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );

  return (
    <div className={cn("wrap", className)}>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          data-cursor="reserve"
        >
          {body}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {body}
        </Link>
      )}
    </div>
  );
}
