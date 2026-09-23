/** "The Space" — MINIBÉ's own interior photography, and how the room works. */
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
    caption: "The community table — dessert, shared.",
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
  title: ["Come as you are.", "Stay for dessert."],
  lede: "An intimate room given entirely to dessert — a blue, underwater-inspired entrance that opens into coral and amber.",

  /** How the room works, without a wall of text. */
  zones: [
    { id: "community", name: "The Community Table", line: "For people who want the tasting experience." },
    { id: "pass", name: "The Chef's Pass", line: "For guests who want to be closer to the kitchen." },
    { id: "table", name: "The Table", line: "For à la carte dining." },
  ],
};
