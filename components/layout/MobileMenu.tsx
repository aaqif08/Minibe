"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { contact, waLink } from "@/data/contact";
import { cn } from "@/lib/cn";
import { useScroll } from "@/components/providers/SmoothScroll";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

type Props = { open: boolean; onClose: () => void; onNavigate: () => void };

/** Full-screen indigo menu for small screens. Locks scrolling while open. */
export function MobileMenu({ open, onClose, onNavigate }: Props) {
  const { stop, start } = useScroll();
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    stop();
    document.body.style.overflow = "hidden";
    // The dialog switches from `invisible` in this same commit; wait a frame
    // so it is focusable before moving focus into it.
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, stop, start]);

  const links = [{ label: "Home", href: "/" }, ...site.nav];

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-indigo text-paper lg:hidden",
        // Visibility flips instantly on open (so focus can move in at once) and
        // only after the fade on close (so the exit animation is still seen).
        open
          ? "visible opacity-100 [clip-path:inset(0_0_0_0)] [transition:opacity_.7s_var(--ease-expo),clip-path_.7s_var(--ease-expo),visibility_0s]"
          : "invisible opacity-0 [clip-path:inset(0_0_100%_0)] [transition:opacity_.7s_var(--ease-expo),clip-path_.7s_var(--ease-expo),visibility_0s_.7s]",
      )}
    >
      <div className="wrap flex h-20 items-center justify-between">
        <Logo variant="wordmark" tone="white" width={120} />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-11 w-11 place-items-center"
        >
          <span className="relative block h-5 w-5">
            <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav aria-label="Mobile" className="wrap flex flex-1 flex-col justify-center gap-1 py-6">
        {links.map((item, i) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              tabIndex={open ? 0 : -1}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-baseline gap-4 py-1.5 font-display text-[2.5rem] leading-none transition-transform duration-700 ease-[var(--ease-expo)]",
                active ? "text-orange" : "text-paper",
                open ? "translate-y-0" : "translate-y-6",
              )}
              style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
            >
              <span className="t-eyebrow w-7 text-orange">0{i + 1}</span>
              <span className={active ? "underline decoration-1 underline-offset-[0.18em]" : undefined}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="wrap flex flex-col gap-3 pb-10">
        <Button href={site.links.reserve} external variant="primary" size="lg" magnetic={false} className="w-full">
          {site.cta.reserveLong}
        </Button>
        {/* Get in touch goes straight to WhatsApp — MINIBÉ's preferred channel */}
        <Button
          href={waLink(contact.waMessages.general) ?? "/contact"}
          external={Boolean(contact.whatsapp)}
          variant="outline-light"
          size="lg"
          magnetic={false}
          className="w-full"
        >
          {site.cta.primary}
        </Button>
        <div className="t-eyebrow mt-3 flex items-center justify-between text-paper/70">
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex min-h-11 items-center"
          >
            Instagram
          </a>
          <a
            href={site.links.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex min-h-11 items-center"
          >
            Directions
          </a>
          <span>{site.city}</span>
        </div>
      </div>
    </div>
  );
}
