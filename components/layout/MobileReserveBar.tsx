"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useScroll } from "@/components/providers/SmoothScroll";

/**
 * Sticky "Plan your visit" bar for small screens. Appears once the cover has
 * scrolled away and hides while the contact chapter is on screen so there is
 * never a duplicate CTA.
 */
export function MobileReserveBar() {
  const [show, setShow] = useState(false);
  const { scrollTo } = useScroll();

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contact");
    const footer = document.querySelector("footer");
    let heroVisible = true;
    let contactVisible = false;
    let footerVisible = false;
    const update = () => setShow(!heroVisible && !contactVisible && !footerVisible);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) heroVisible = e.isIntersecting;
          if (e.target === contact) contactVisible = e.isIntersecting;
          if (e.target === footer) footerVisible = e.isIntersecting;
        }
        update();
      },
      { threshold: 0.15 },
    );
    if (hero) io.observe(hero);
    if (contact) io.observe(contact);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-700 ease-[var(--ease-expo)] sm:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!show}
    >
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#contact", { offset: -64 });
        }}
        tabIndex={show ? 0 : -1}
        className="flex h-14 items-center justify-between bg-orange px-5 text-indigo shadow-[0_12px_40px_-12px_rgba(36,3,115,0.45)]"
      >
        <span className="t-eyebrow">{site.cta.primary}</span>
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
          <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
