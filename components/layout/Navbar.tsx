"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky masthead. Every item is a real route, opened in the same tab via
 * next/link. The bar tightens into a compact hairline once the page scrolls.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // The menu is open only for the route it was opened on, so navigating
  // closes it without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  // Over a dark masthead the unscrolled bar has to invert, or it disappears.
  const onDark = !scrolled && site.darkTopRoutes.includes(pathname);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-700 ease-[var(--ease-expo)]",
          scrolled ? "border-b border-line bg-paper/92 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "wrap grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-700 ease-[var(--ease-expo)]",
            scrolled ? "h-16" : "h-20 md:h-24",
          )}
        >
          <Link href="/" className="justify-self-start" aria-label={`${site.name} — home`}>
            <Logo
              variant="wordmark"
              tone={onDark ? "white" : "indigo"}
              width={scrolled ? 108 : 132}
              className="transition-[width] duration-700 ease-[var(--ease-expo)]"
            />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "t-eyebrow link-underline py-2 transition-colors duration-500",
                    isActive(item.href)
                      ? onDark
                        ? "text-orange"
                        : "text-orange-deep"
                      : onDark
                        ? "text-paper"
                        : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-self-end gap-3">
            <div className="hidden sm:block">
              <Button
                href={site.links.reserve}
                external
                variant="primary"
                cursor="reserve"
                magnetic={false}
                className={scrolled ? "h-10 px-5" : ""}
              >
                {site.cta.reserve}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpenFor(pathname)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn("grid h-11 w-11 place-items-center lg:hidden", onDark ? "text-paper" : "text-ink")}
            >
              <span className="relative block h-3 w-6">
                <span className="absolute inset-x-0 top-0 h-px bg-current" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpenFor(null)} />
    </>
  );
}
