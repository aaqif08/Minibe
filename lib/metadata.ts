import type { Metadata } from "next";
import { site } from "@/data/site";

const shareImage = { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` };

/**
 * Metadata for an inner page. Next.js replaces (rather than merges) the
 * openGraph/twitter objects a page defines, so the share image and card type
 * are restated here — otherwise inner pages lose them when shared.
 */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const full = `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title: full,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [shareImage.url] },
  };
}
