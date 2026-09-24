/**
 * Contact channels, services and the enquiry form — one source of truth.
 * Every phone number, address and link on the site comes from here.
 *
 * All three channels below are MINIBÉ's confirmed business details.
 * `whatsapp` is digits only, with the country code, because wa.me needs it
 * that way; `phone` is stored the same way and formatted for display.
 *
 * The enquiry form submits through the first available route, in this order:
 *   1. `formEndpoint` — POST as JSON (Formspree, Getform, your own handler…)
 *   2. `whatsapp`     — opens WhatsApp with the enquiry pre-written
 *   3. `email`        — opens the guest's mail client with the enquiry pre-written
 */

import { site } from "./site";

export type EnquiryInterest = { id: string; label: string };

/** A service MINIBÉ offers beyond the table. Names are the client's own. */
export type Service = {
  id: string;
  name: string;
  /** Pre-written WhatsApp opener for this service. */
  enquiry: string;
};

export const contact = {
  /**
   * Address, map, booking and Instagram are defined once in data/site.ts and
   * re-exported here so contact components need a single import. Edit them
   * there; everything on the site follows.
   */
  address: site.address,
  geo: site.geo,
  maps: site.links.maps,
  /**
   * Live Google map in the location block. Off by default: the drawn MINIBÉ
   * plate is on brand, weighs nothing and always links out. Switch to true
   * once the embed has been checked on the production domain.
   */
  mapEmbed: false,
  booking: site.links.reserve,
  instagram: site.links.instagram,
  instagramHandle: site.links.instagramHandle,

  /* ------------------------------ channels ------------------------------ */

  /** Business WhatsApp — digits with country code, for wa.me. */
  whatsapp: "917676347995",
  /** Enquiry line — digits with country code, for tel:. */
  phone: "919840236400",
  email: "Minibeblr@gmail.com",

  /**
   * Opening hours. Only "Closed on Mondays" is confirmed (Instagram bio), so
   * `weekday` and `weekend` stay null and the timings block stays hidden.
   * Fill them in — e.g. weekday: "Tue – Fri · 12:00 – 22:00" — and it appears.
   */
  timings: {
    weekday: null as string | null,
    weekend: null as string | null,
    note: "Closed on Mondays",
    /** Machine-readable rows for schema.org, once confirmed. */
    schedule: null as null | { days: string; open: string; close: string }[],
  },

  /* ------------------------------- copy --------------------------------- */

  heading: "Let's talk dessert",
  lede: "Our tasting menu changes every three months. Want to know what's currently on the table? Leave us your details and we'll get in touch.",
  /** Shown instead of `lede` while no enquiry channel is configured. */
  ledeFallback:
    "Our tasting menu changes every three months. Want to know what's currently on the table? Message us and we'll tell you.",
  formTitle: "Send an enquiry",

  /* ------------------------------ services ------------------------------ */

  servicesHeading: "Services",
  servicesLede: "Looking for MINIBÉ beyond the table?",

  /**
   * Client-confirmed services. Names are used exactly as supplied and no
   * descriptions, prices or capacities are invented — each one links straight
   * to a WhatsApp enquiry.
   */
  services: [
    { id: "corporate", name: "Corporate Orders", enquiry: "Hi MINIBÉ, I'd like to enquire about Corporate Orders." },
    { id: "private-catering", name: "Private Catering", enquiry: "Hi MINIBÉ, I'd like to enquire about Private Catering." },
    { id: "grazing-table", name: "Grazing Table", enquiry: "Hi MINIBÉ, I'd like to enquire about a Grazing Table." },
    { id: "wedding-cakes", name: "Wedding Cakes", enquiry: "Hi MINIBÉ, I'd like to enquire about Wedding Cakes." },
    { id: "workshop", name: "Workshop", enquiry: "Hi MINIBÉ, I'd like to enquire about a Workshop." },
  ] as Service[],

  /* -------------------------------- form -------------------------------- */

  /** Optional POST endpoint for the enquiry form. */
  formEndpoint: (process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? null) as string | null,

  interests: [
    { id: "tasting", label: "Tasting Menu" },
    { id: "a-la-carte", label: "À La Carte" },
    { id: "corporate", label: "Corporate Orders" },
    { id: "private-catering", label: "Private Catering" },
    { id: "grazing-table", label: "Grazing Table" },
    { id: "wedding-cakes", label: "Wedding Cakes" },
    { id: "workshop", label: "Workshop" },
    { id: "private-dining", label: "Private Dining / Events" },
  ] as EnquiryInterest[],

  /** Pre-written WhatsApp openers. */
  waMessages: {
    general: "Hi MINIBÉ, I'd like to make an enquiry.",
    visit: "Hi MINIBÉ, I'd like to enquire about a visit.",
    catering: "Hi MINIBÉ, I'd like to enquire about your catering / events services.",
    current: "Hi MINIBÉ, I'd like to know what's currently on the tasting menu.",
  },

  successMessage: "Thank you — we'll be in touch.",
  errorMessage: "That didn't send. Please try WhatsApp, or email us directly.",
};

/* ------------------------------- helpers -------------------------------- */

/** "919840236400" → "+91 98402 36400" */
function formatIndian(digits: string) {
  const local = digits.startsWith("91") ? digits.slice(2) : digits;
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
}

/** The phone number as a visitor should read it. */
export const phoneDisplay = contact.phone ? formatIndian(contact.phone) : null;
/** The phone number as a dialler needs it. */
export const phoneHref = contact.phone ? `tel:+${contact.phone}` : null;
/** The WhatsApp number as a visitor should read it. */
export const whatsappDisplay = contact.whatsapp ? formatIndian(contact.whatsapp) : null;
/** The email as a mail client needs it. */
export const emailHref = contact.email ? `mailto:${contact.email}` : null;

/** Build a wa.me link with a pre-written message. Null when no number is set. */
export function waLink(message: string): string | null {
  if (!contact.whatsapp) return null;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Which submit route the form will take, given what is configured. */
export type SubmitRoute = "endpoint" | "whatsapp" | "email" | "none";

export function submitRoute(): SubmitRoute {
  if (contact.formEndpoint) return "endpoint";
  if (contact.whatsapp) return "whatsapp";
  if (contact.email) return "email";
  return "none";
}
