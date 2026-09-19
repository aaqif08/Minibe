/**
 * Global brand + business data.
 * Anything marked `null` is not yet verified from MINIBÉ's own materials.
 * Fill it in here and the site will render it — nothing is hard-coded in JSX.
 */
export const site = {
  name: "MINIBÉ",
  tagline: "An Experiential Dessert Dining",
  by: "by Chef Jenny",
  chef: {
    name: "Chef Jenny",
    instagram: "https://www.instagram.com/jennyclinta/",
    handle: "@jennyclinta",
  },
  city: "Bengaluru",
  origin: "Andaman & Nicobar Islands",

  /** Core positioning statement (approved copy). */
  positioning:
    "Indulge in a thoughtfully curated multi-course dessert dining experience. Expect seasonal ingredients, local inspirations, Andaman charm, and an evening where dessert is the spotlight.",

  /** Line from MINIBÉ's Instagram bio. */
  bioLine: "Andaman to France on the plates",

  seo: {
    title: "MINIBÉ — An Experiential Dessert Dining in Bengaluru",
    description:
      "MINIBÉ is an experiential dessert dining concept in Bengaluru by Chef Jenny, rooted in the Andaman Islands, seasonal ingredients, local produce and thoughtful culinary storytelling.",
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
  phone: null as string | null,
  email: null as string | null,

  cta: {
    primary: "Reserve your experience",
    secondary: "Book your table",
    directions: "Get directions",
    maps: "Open in Google Maps",
    menu: "View current menu",
  },

  /** Editorial chapter system — website art direction, not official MINIBÉ naming. */
  chapters: [
    { id: "begins", number: "01", title: "Where it begins" },
    { id: "islands", number: "02", title: "The islands" },
    { id: "story", number: "03", title: "Our story" },
    { id: "chef", number: "04", title: "The chef" },
    { id: "experience", number: "05", title: "The table" },
    { id: "ingredient", number: "06", title: "The ingredient" },
    { id: "space", number: "07", title: "The space" },
    { id: "reserve", number: "08", title: "The last bite" },
  ],

  nav: [
    { label: "Story", href: "#story" },
    { label: "Experience", href: "#experience" },
    {
      label: "Menu",
      href: "#opening-act",
      children: [
        { label: "Opening Act", href: "#opening-act" },
        { label: "Mosaic", href: "#mosaic" },
      ],
    },
    { label: "Space", href: "#space" },
    { label: "Visit", href: "#visit" },
  ],

  closingLine: "Dessert, with a story to tell.",
};

export type Chapter = (typeof site.chapters)[number];
export type NavItem = (typeof site.nav)[number];
