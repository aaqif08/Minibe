"use client";

/**
 * Route transition. App Router remounts a template on every navigation, so a
 * plain CSS animation gives each page a short fade + rise as it enters.
 * Reduced-motion users get the page immediately (handled in globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
