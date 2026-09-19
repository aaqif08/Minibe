import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Draws a short rule before the text. */
  rule?: boolean;
  as?: "span" | "p" | "h3";
};

/** Small tracked uppercase label used above headings and in captions. */
export function Eyebrow({ children, className, rule, as: Tag = "span" }: Props) {
  return (
    <Tag className={cn("t-eyebrow inline-flex items-center gap-3", className)}>
      {rule ? <span aria-hidden className="inline-block h-px w-8 bg-current opacity-60" /> : null}
      {children}
    </Tag>
  );
}
