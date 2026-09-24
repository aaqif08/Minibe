"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Sticky CTA for small screens. Appears once the page has scrolled past its
 * masthead, and stays out of the way on /contact, where the enquiry lives.
 */
export function MobileCta() {
  const [scrolledIn, setScrolledIn] = useState(false);
  const pathname = usePathname();
  const onContact = pathname === "/contact";
  const show = scrolledIn && !onContact;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 260;
        setScrolledIn(window.scrollY > window.innerHeight * 0.6 && !nearBottom);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-700 ease-[var(--ease-expo)] sm:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!show}
    >
      <a
        href={site.links.reserve}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className="flex h-14 flex-1 items-center justify-between bg-orange px-5 text-indigo shadow-[0_12px_40px_-12px_rgba(36,3,115,0.45)]"
      >
        <span className="t-eyebrow">{site.cta.reserve}</span>
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
          <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <Link
        href="/contact"
        tabIndex={show ? 0 : -1}
        className="grid h-14 shrink-0 place-items-center bg-indigo px-5 text-paper shadow-[0_12px_40px_-12px_rgba(20,2,63,0.5)]"
      >
        <span className="t-eyebrow">{site.cta.primary}</span>
      </Link>
    </div>
  );
}
