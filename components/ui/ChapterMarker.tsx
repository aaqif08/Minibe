import { cn } from "@/lib/cn";
import type { Chapter } from "@/data/site";

type Props = {
  chapter: Chapter;
  /** Light variant for dark sections. */
  light?: boolean;
  className?: string;
  /** Optional small note under the chapter name (e.g. "Menu 02"). */
  note?: string;
};

/**
 * Editorial running head lifted from the portfolio: a hairline, a small
 * "CHAPTER 02 — THE ISLANDS" eyebrow on the left and an oversized folio on
 * the right. Every chapter opens with one.
 */
export function ChapterMarker({ chapter, light, className, note }: Props) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-6 pt-4",
        light ? "hairline-light text-paper" : "hairline text-ink",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="t-eyebrow opacity-70">
          Chapter {chapter.number}
          <span className="mx-2">—</span>
          {chapter.title}
        </span>
        {note ? <span className="t-caption opacity-60">{note}</span> : null}
      </div>
      <span className={cn("t-folio", light ? "text-paper/80" : "text-ink/80")} aria-hidden>
        {chapter.number}
      </span>
    </div>
  );
}
