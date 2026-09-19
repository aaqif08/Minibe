/**
 * Instagram tiles. No API integration — add image objects here to fill the
 * grid. Empty slots render as tonal tiles so the section never looks broken.
 *
 * Example:
 * { id: "t1", image: { src: "/images/social/post-1.jpg", alt: "…", width: 1080, height: 1350 }, href: "https://www.instagram.com/p/…" }
 */
import type { SiteImage } from "./images";

export type SocialTile = { id: string; image: SiteImage | null; href?: string };

export const social = {
  title: "Follow the journey",
  handle: "@minibe_blr",
  url: "https://www.instagram.com/minibe_blr/",
  tiles: [
    { id: "t1", image: null },
    { id: "t2", image: null },
    { id: "t3", image: null },
    { id: "t4", image: null },
    { id: "t5", image: null },
    { id: "t6", image: null },
  ] as SocialTile[],
};
