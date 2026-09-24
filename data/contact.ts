/**
 * Contact channels and the "Register your interest" enquiry form.
 *
 * Every channel below is null until MINIBÉ supplies it — nothing is invented.
 * Fill in whichever you have and that channel appears on the site:
 *
 *   whatsapp: "919876543210"          → WhatsApp button (digits only, with country code)
 *   phone:    "+91 98765 43210"       → Call button
 *   email:    "hello@minibe.in"       → Email button
 *
 * The enquiry form submits through the first available route, in this order:
 *   1. `formEndpoint` — POST as JSON (Formspree, Getform, your own handler…)
 *   2. `whatsapp`     — opens WhatsApp with the enquiry pre-written
 *   3. `email`        — opens the guest's mail client with the enquiry pre-written
 * With none of the three set, the form is hidden and the section shows the
 * booking link and Instagram instead, so nothing on the live site is a dead end.
 */

export type EnquiryInterest = { id: string; label: string };

export const contact = {
  heading: "Let's talk dessert",
  lede: "Our tasting menu changes every three months. Want to know what's currently on the table? Leave us your details and we'll get in touch.",
  /** Shown instead of `lede` while no enquiry channel is configured. */
  ledeFallback:
    "Our tasting menu changes every three months. Want to know what's currently on the table? Message us and we'll tell you.",
  formTitle: "Register your interest",

  /** Direct channels. Null = not published yet; the button simply doesn't render. */
  whatsapp: null as string | null,
  phone: null as string | null,
  email: null as string | null,

  /** Optional POST endpoint for the enquiry form. */
  formEndpoint: (process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? null) as string | null,

  interests: [
    { id: "tasting", label: "Tasting Menu" },
    { id: "a-la-carte", label: "À La Carte" },
    { id: "private", label: "Private Dining / Events" },
    { id: "catering", label: "Catering" },
  ] as EnquiryInterest[],

  /** Pre-written WhatsApp openers. Used only once `whatsapp` is filled in. */
  waMessages: {
    visit: "Hi MINIBÉ, I'd like to enquire about a visit.",
    catering: "Hi MINIBÉ, I'd like to enquire about catering / a private event.",
    current: "Hi MINIBÉ, I'd like to know what's currently on the tasting menu.",
  },

  successMessage: "Thank you — we'll be in touch about what's currently on the table.",
  errorMessage: "That didn't send. Please try again, or reach us on Instagram.",
};

/** Which submit route the form will take, given what is configured. */
export type SubmitRoute = "endpoint" | "whatsapp" | "email" | "none";

/** Build a wa.me link with a pre-written message. Null when no number is set. */
export function waLink(message: string): string | null {
  if (!contact.whatsapp) return null;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function submitRoute(): SubmitRoute {
  if (contact.formEndpoint) return "endpoint";
  if (contact.whatsapp) return "whatsapp";
  if (contact.email) return "email";
  return "none";
}
