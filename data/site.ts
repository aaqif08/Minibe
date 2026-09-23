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
    menu: "https://bookings.airmenus.in/minibe/order",
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

  /**
   * Opening hours. Only "Closed on Mondays" is confirmed (Instagram bio).
   * Add rows like { days: "Tue – Sun", open: "12:00", close: "22:00" } once confirmed.
   */
  hours: {
    note: "Closed on Mondays",
    schedule: null as null | { days: string; open: string; close: string }[],
  },

  cta: {
    /** Header + sticky CTA. Deliberately not menu-specific, because the menu changes. */
    primary: "Plan your visit",
    secondary: "Get in touch",
    explore: "Explore MINIBÉ",
    reserve: "Reserve a table",
    directions: "Get directions",
    maps: "Open in Google Maps",
    aLaCarte: "View à la carte",
    archive: "View menu archive",
  },

  /** Editorial chapter numbering, carried over from the brand portfolio. */
  chapters: [
    { id: "experience", number: "01", title: "The experience" },
    { id: "menus", number: "02", title: "The menus" },
    { id: "archive", number: "03", title: "The archive" },
    { id: "ingredient", number: "04", title: "The ingredient" },
    { id: "story", number: "05", title: "Our story" },
    { id: "space", number: "06", title: "The space" },
    { id: "contact", number: "07", title: "Let's talk dessert" },
  ],

  nav: [
    { label: "Home", href: "#top" },
    { label: "The Experience", href: "#experience" },
    {
      label: "Menus",
      href: "#menus",
      children: [
        { label: "The Tasting Menu", href: "#tasting-menu" },
        { label: "The À La Carte", href: "#a-la-carte" },
        { label: "The Menu Archive", href: "#archive" },
      ],
    },
    { label: "Our Story", href: "#story" },
    { label: "Space", href: "#space" },
    { label: "Contact", href: "#contact" },
  ],

  closingLine: "Dessert, with a story to tell.",
};

export type Chapter = (typeof site.chapters)[number];
export type NavItem = (typeof site.nav)[number];
