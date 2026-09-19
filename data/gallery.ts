/** "The Space" — MINIBÉ's own interior photography. Layout roles drive the asymmetric grid. */
import { images, type SiteImage } from "./images";

export type GalleryItem = {
  id: string;
  image: SiteImage;
  caption: string;
  /** Grid role: controls span and aspect in the editorial grid. */
  role: "large" | "small" | "tall" | "detail" | "wide";
};

export const gallery: GalleryItem[] = [
  {
    id: "entrance",
    image: images.entranceBlue,
    caption: "The entrance — blue, underwater, an island memory painted on the walls.",
    role: "tall",
  },
  {
    id: "counter",
    image: images.interiorCoral,
    caption: "Coral and amber inside; cane stools at the counter.",
    role: "small",
  },
  {
    id: "table",
    image: images.communalTable,
    caption: "The communal table — dessert, shared.",
    role: "large",
  },
  {
    id: "pass",
    image: images.chefAtPass,
    caption: "At the chef's pass.",
    role: "detail",
  },
  {
    id: "plating",
    image: images.plating,
    caption: "Final touches, plate by plate.",
    role: "wide",
  },
];

export const spaceCopy = {
  title: ["The", "space"],
  lines: [
    "An intimate room built for dessert dining — a blue, underwater-inspired entrance that opens into coral and amber.",
    "Guests share a communal table. The chef's pass sits close enough to watch every plate come together.",
  ],
};
