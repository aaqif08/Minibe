"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const menuButton = useRef<HTMLButtonElement>(null);

  // Closing with the button or Escape hands focus back to the hamburger.
  // (Navigating away doesn't — the new page takes focus instead.)
  const closeMenu = useCallback(() => {
    setOpenFor(null);
    requestAnimationFrame(() => menuButton.current?.focus());
  }, []);
  const navigateFromMenu = useCallback(() => setOpenFor(null), []);

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
            "wrap flex items-center justify-between gap-3 transition-[height] duration-700 ease-[var(--ease-expo)]",
            "lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-0",
            scrolled ? "h-16" : "h-[4.5rem] md:h-24",
          )}
        >
          <Link
            href="/"
            className="flex h-11 shrink-0 items-center lg:justify-self-start"
            aria-label={`${site.name} — home`}
          >
            {/* The narrowest phones (under 360px) carry the monogram, so the
                wordmark never crowds Get in touch, Reserve and the menu. */}
            <span className="min-[360px]:hidden">
              <Logo variant="monogram" tone={onDark ? "white" : "indigo"} width={30} />
            </span>
            <span className="hidden min-[360px]:block">
              <Logo
                variant="wordmark"
                tone={onDark ? "white" : "indigo"}
                width={scrolled ? 96 : 104}
                className="transition-[width] duration-700 ease-[var(--ease-expo)]"
              />
            </span>
          </Link>

          <ul className="hidden items-center gap-9 lg:flex lg:justify-self-center">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "t-eyebrow link-underline inline-flex min-h-11 items-center transition-colors duration-500",
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

          <div className="flex items-center gap-1.5 lg:justify-self-end lg:gap-5">
            {/* Get in touch — the action that matters most, on every screen size */}
            <Link
              href="/contact"
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center px-1.5 font-sans lg:hidden xl:inline-flex text-[0.625rem] font-bold uppercase tracking-[0.12em] transition-colors duration-500 sm:px-2 sm:text-[0.6875rem] sm:tracking-[0.18em]",
                "link-underline",
                onDark ? "text-paper" : "text-indigo",
              )}
            >
              {site.cta.primary}
            </Link>
            {/* Reserve — a compact bold button on phones, the full button from sm up */}
            <a
              href={site.links.reserve}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="reserve"
              className="inline-flex h-9 shrink-0 items-center bg-orange px-2.5 font-sans text-[0.625rem] font-bold uppercase tracking-[0.12em] text-indigo transition-colors duration-500 hover:bg-indigo hover:text-paper sm:hidden"
            >
              {site.cta.reserve}
            </a>
            <div className="hidden sm:block">
              <Button
                href={site.links.reserve}
                external
                variant="primary"
                cursor="reserve"
                magnetic={false}
                className={cn("!font-bold", scrolled ? "h-10 px-5" : "")}
              >
                {site.cta.reserve}
              </Button>
            </div>
            <button
              type="button"
              ref={menuButton}
              onClick={() => setOpenFor(pathname)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn("-mr-3 grid h-11 w-11 shrink-0 place-items-center lg:hidden", onDark ? "text-paper" : "text-ink")}
            >
              <span className="relative block h-3 w-6">
                <span className="absolute inset-x-0 top-0 h-px bg-current" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={closeMenu} onNavigate={navigateFromMenu} />
    </>
  );
}
