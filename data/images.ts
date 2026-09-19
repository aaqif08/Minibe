/**
 * Image registry. Every photograph on the site is referenced from here so
 * files can be swapped in one place. All photos are MINIBÉ's own, taken
 * from the brand portfolio. Dimensions are the intrinsic pixel sizes of the
 * files in /public/images/photos.
 */
export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const images = {
  chefPortrait: {
    src: "/images/photos/chef-jenny-portrait.jpg",
    alt: "Chef Jenny in her chef whites, laughing against a stone wall in the MINIBÉ dining room",
    width: 1920,
    height: 2400,
  },
  chefAtPass: {
    src: "/images/photos/chef-jenny-at-the-pass.jpg",
    alt: "Chef Jenny at the pass, plating a dessert in front of a brick wall while a guest watches",
    width: 1921,
    height: 2400,
  },
  entranceBlue: {
    src: "/images/photos/entrance-underwater-blue.jpg",
    alt: "The MINIBÉ entrance: deep blue walls painted with coral, seaweed and fish, blue pendant lamps overhead",
    width: 1200,
    height: 1600,
  },
  interiorCoral: {
    src: "/images/photos/interior-coral-counter.jpg",
    alt: "Coral-toned MINIBÉ interior with cane bar stools at a counter and black pendant lamps",
    width: 1080,
    height: 1440,
  },
  communalTable: {
    src: "/images/photos/communal-table-guests.jpg",
    alt: "Guests sharing a long communal table at MINIBÉ, plates of dessert and fresh flowers between them",
    width: 2400,
    height: 1920,
  },
  berriesBarley: {
    src: "/images/photos/berries-and-barley.jpg",
    alt: "Berries & Barley, MINIBÉ's signature dessert: barley mousse and tuile in a pool of vivid berry",
    width: 960,
    height: 1280,
  },
  plating: {
    src: "/images/photos/plating-hands.jpg",
    alt: "A hand piping the final detail onto a plated dessert, a row of sea-green plates waiting behind",
    width: 1516,
    height: 2278,
  },
  mosaicArt: {
    src: "/images/photos/mosaic-artwork.jpg",
    alt: "",
    width: 949,
    height: 1343,
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
