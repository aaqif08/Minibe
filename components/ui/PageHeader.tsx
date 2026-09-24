import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Chapter } from "@/data/site";
import { WordReveal } from "./WordReveal";
import { Reveal } from "./Reveal";

type Props = {
  chapter: Chapter;
  /** The page's editorial headline — one string, or one string per line. */
  title: string | string[];
  /** Short standfirst on the right. */
  lede?: string;
  /** Anything extra under the lede (buttons, meta). */
  children?: ReactNode;
  light?: boolean;
  /** Headline colour. Each page gets its own so the site doesn't feel uniform. */
  titleClassName?: string;
  className?: string;
};

/**
 * The masthead every inner page opens with: hairline, running head with the
 * page's folio, then an oversized headline and a short standfirst.
 */
export function PageHeader({ chapter, title, lede, children, light, titleClassName, className }: Props) {
  return (
    <header className={cn("wrap pt-28 md:pt-36", className)}>
      <div
        className={cn(
          "flex items-end justify-between gap-6 pt-4",
          light ? "hairline-light text-paper" : "hairline text-ink",
        )}
      >
        <span className="t-eyebrow opacity-70">
          {chapter.number}
          <span className="mx-2">—</span>
          {chapter.title}
        </span>
        <span className={cn("t-folio", light ? "text-paper/80" : "text-ink/80")} aria-hidden>
          {chapter.number}
        </span>
      </div>

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-20">
        <div className="col-span-12 lg:col-span-8">
          <WordReveal as="h1" text={title} className={cn("t-display", titleClassName ?? "text-indigo")} />
        </div>
        {lede || children ? (
          <Reveal className="col-span-12 flex flex-col justify-end gap-6 md:col-span-9 lg:col-span-4 lg:col-start-9">
            {lede ? <p className={cn("t-lead", light ? "text-paper/85" : "text-ink")}>{lede}</p> : null}
            {children}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
