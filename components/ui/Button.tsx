import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { MagneticButton } from "./MagneticButton";

type Variant = "primary" | "indigo" | "paper" | "outline" | "outline-light" | "text" | "text-light";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  magnetic?: boolean;
  cursor?: "reserve" | "view" | "link";
  className?: string;
  size?: "md" | "lg";
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 font-sans font-semibold uppercase tracking-[0.18em] transition-[background-color,color,border-color,transform] duration-500 ease-[var(--ease-expo)] select-none";

const sizes = {
  md: "h-12 px-6 text-[0.6875rem]",
  lg: "h-14 px-8 text-[0.75rem]",
};

const variants: Record<Variant, string> = {
  primary: "bg-orange text-indigo hover:bg-indigo hover:text-paper focus-visible:bg-indigo focus-visible:text-paper",
  indigo: "bg-indigo text-paper hover:bg-orange",
  paper: "bg-paper text-indigo hover:bg-orange hover:text-paper",
  outline: "border border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-indigo",
  text: "h-auto px-0 text-ink link-underline normal-case tracking-[0.02em] font-medium text-[0.9375rem]",
  "text-light": "h-auto px-0 text-paper link-underline normal-case tracking-[0.02em] font-medium text-[0.9375rem]",
};

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-[0.9em] w-[0.9em] transition-transform duration-500 ease-[var(--ease-expo)] group-hover/btn:translate-x-1", className)}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Site-wide link button. Internal hrefs route through next/link (same tab,
 * client navigation); external ones open in a new tab with a safe rel.
 * Text variants render an animated underline instead of a filled pill.
 */
export function Button({
  href,
  children,
  variant = "primary",
  external,
  magnetic = true,
  cursor,
  className,
  size = "md",
  onClick,
  ...rest
}: Props) {
  const isText = variant === "text" || variant === "text-light";
  const isInternal = !external && href.startsWith("/");
  const classes = cn(base, !isText && sizes[size], variants[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );

  const anchor = isInternal ? (
    <Link href={href} onClick={onClick} data-cursor={cursor} aria-label={rest["aria-label"]} className={classes}>
      {inner}
    </Link>
  ) : (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-cursor={cursor}
      aria-label={rest["aria-label"]}
      className={classes}
    >
      {inner}
    </a>
  );

  if (isText || !magnetic) return anchor;
  return <MagneticButton>{anchor}</MagneticButton>;
}
