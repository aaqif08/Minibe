/**
 * Global brand + business data.
 * Anything marked `null` is not yet verified from MINIBÉ's own materials.
 * Fill it in here and the site will render it — nothing is hard-coded in JSX.
 */
export const site = {
  name: "MINIBÉ",
  tagline: "An Experiential Dessert Dining",
  by: "by Chef Jenny",
  /** The one line that says what MINIBÉ is. */
  offer: "Plated desserts. Tasting menus. À la carte.",
  chef: {
    name: "Chef Jenny",
    instagram: "https://www.instagram.com/jennyclinta/",
    handle: "@jennyclinta",
  },
  city: "Bengaluru",
  origin: "Andaman & Nicobar Islands",

  /** Homepage introduction — what MINIBÉ is, in one breath. */
  intro:
    "A dessert focused dining experience by Chef Jenny, bringing together pastry, savoury techniques, Indian ingredients and stories from her journey from the Andamans to France.",

  seo: {
    title: "MINIBÉ — An Experiential Dessert Dining in Bengaluru",
    description:
      "MINIBÉ is a dessert focused dining experience in Bengaluru by Chef Jenny — plated desserts, a seasonal tasting menu and à la carte, bringing together pastry, savoury technique and Indian ingredients.",
    /** Replace with the production domain when it goes live. */
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://minibe.in",
  },

  links: {
    reserve: "https://bookings.airmenus.in/minibe/order",
    instagram: "https://www.instagram.com/minibe_blr/",
    instagramHandle: "@minibe_blr",
    maps: "https://maps.app.goo.gl/287gM7KsKEreRh2b7",
  },

  address: {
    line1: "2212, 80 Feet Road",
    line2: "HAL 3rd Stage, Kodihalli",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560008",
    country: "IN",
  },
  geo: { lat: 12.967932, lng: 77.6481761 },

  cta: {
    /** Header + sticky CTA. Deliberately not menu-specific, because the menu changes. */
    primary: "Get in touch",
    explore: "Explore MINIBÉ",
    reserve: "Reserve",
    reserveLong: "Reserve a table",
    directions: "Get directions",
    maps: "Open in Google Maps",
  },

  /**
   * Editorial numbering, carried over from the brand portfolio. Each page
   * opens with its own folio, so the numbering reads across the site.
   */
  chapters: [
    { id: "experience", number: "01", title: "The experience", href: "/experience" },
    { id: "story", number: "02", title: "Our story", href: "/story" },
    { id: "space", number: "03", title: "The space", href: "/space" },
    { id: "contact", number: "04", title: "Let's talk dessert", href: "/contact" },
  ],

  /**
   * Routes whose masthead sits on a dark ground — the header renders in
   * paper until the page scrolls and the bar picks up its own background.
   */
  darkTopRoutes: ["/story", "/contact"],

  /** Real routes — every header item is its own page. */
  nav: [
    { label: "The Experience", href: "/experience" },
    { label: "Our Story", href: "/story" },
    { label: "Space", href: "/space" },
    { label: "Contact", href: "/contact" },
  ],

  closingLine: "Dessert, with a story to tell.",
};

export type Chapter = (typeof site.chapters)[number];

/** Look a page's folio up by id, so reordering the chapters can't break a page. */
export function chapter(id: Chapter["id"]): Chapter {
  const found = site.chapters.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown chapter: ${id}`);
  return found;
}
export type NavItem = (typeof site.nav)[number];
