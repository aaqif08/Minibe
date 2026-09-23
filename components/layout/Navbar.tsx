"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useScroll } from "@/components/providers/SmoothScroll";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky masthead. Sits on the paper band above the hero; once the page
 * scrolls it tightens into a compact bar with a hairline. Anchor links
 * scroll smoothly through Lenis.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollTo } = useScroll();

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

  const go = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const run = () => scrollTo(href, { offset: -72 });
    // When the mobile menu is open, scrolling is locked until it closes —
    // let the unlock happen first, then travel.
    if (open) {
      setOpen(false);
      window.setTimeout(run, 120);
    } else {
      run();
    }
    history.replaceState(null, "", href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-700 ease-[var(--ease-expo)]",
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
          <a
            href="#top"
            onClick={go("#top")}
            className="justify-self-start"
            aria-label="MINIBÉ — back to top"
          >
            <Logo
              variant="wordmark"
              tone="indigo"
              width={scrolled ? 108 : 132}
              className="transition-[width] duration-700 ease-[var(--ease-expo)]"
            />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {site.nav.map((item) =>
              item.children ? (
                <li key={item.label} className="group relative">
                  <a
                    href={item.href}
                    onClick={go(item.href)}
                    className="t-eyebrow link-underline inline-flex items-center gap-1.5 py-2 text-ink"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-60">
                      <path d="M2 4l3 3 3-3" stroke="currentColor" fill="none" strokeWidth="1.2" />
                    </svg>
                  </a>
                  <ul
                    className={cn(
                      "invisible absolute left-1/2 top-full min-w-44 -translate-x-1/2 translate-y-2 border border-line bg-paper p-2 opacity-0",
                      "transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-expo)]",
                      "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                    )}
                  >
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          onClick={go(child.href)}
                          className="block px-4 py-2.5 font-display text-lg leading-none text-ink transition-colors hover:bg-paper-deep hover:text-orange"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <a href={item.href} onClick={go(item.href)} className="t-eyebrow link-underline py-2 text-ink">
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center justify-self-end gap-3">
            <div className="hidden sm:block">
              <Button
                href="#contact"
                variant="primary"
                cursor="reserve"
                magnetic={false}
                onClick={go("#contact")}
                className={scrolled ? "h-10 px-5" : ""}
              >
                {site.cta.primary}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center text-ink lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span className="absolute inset-x-0 top-0 h-px bg-current" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} onNavigate={go} />
    </>
  );
}
