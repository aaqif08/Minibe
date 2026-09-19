import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  variant?: "wordmark" | "monogram" | "stacked";
  tone?: "indigo" | "white";
  className?: string;
  priority?: boolean;
  /** Rendered width in px — used for correct srcset sizing. */
  width?: number;
};

const FILES = {
  wordmark: { indigo: "/images/brand/minibe-wordmark-indigo.png", white: "/images/brand/minibe-wordmark-white.png", w: 2390, h: 611 },
  monogram: { indigo: "/images/brand/minibe-monogram-indigo.png", white: "/images/brand/minibe-monogram-white.png", w: 588, h: 611 },
  stacked: { indigo: "/images/brand/minibe-logo-stacked-indigo.png", white: "/images/brand/minibe-logo-stacked-white.png", w: 1306, h: 809 },
};

/** The MINIBÉ mark, taken directly from the brand portfolio. */
export function Logo({ variant = "wordmark", tone = "indigo", className, priority, width = 160 }: Props) {
  const f = FILES[variant];
  const height = Math.round((width * f.h) / f.w);
  return (
    <Image
      src={f[tone]}
      alt="MINIBÉ"
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn("h-auto select-none", className)}
      style={{ width }}
      draggable={false}
    />
  );
}
