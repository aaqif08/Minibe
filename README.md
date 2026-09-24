# MINIBÉ — An Experiential Dessert Dining

Production website for MINIBÉ, Bengaluru. A real multi-page site: every header
item is its own route, and the homepage is a cover, not the whole book.

```
/            Home             cinematic cover, two formats, two doors out
/experience  The Experience   what makes MINIBÉ different
/story       Our Story        Andamans → France → Bali → Bengaluru, Jenny & Steffi
/space       Space            the room, photography-led
/contact     Contact          channels, services, enquiry, directions
```

There is deliberately **no menu route**. MINIBÉ will not maintain menu content
after handover, so the site never shows dishes, prices or a current menu —
"tasting menu" and "à la carte" appear only as descriptions of how MINIBÉ
works. Do not reintroduce one.

The header carries **RESERVE** (the AirMenus booking system) at all times.
The homepage teases each page and never reproduces it — keep it that way.

Every route ends the same way, from the shared layout:

```
[ page content ]  →  [ one closing CTA ]  →  LOCATION + MAP  →  dark footer  →  legal bar
```

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

Environment (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production domain — canonical, Open Graph and JSON-LD |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Optional POST endpoint for the enquiry form |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP +
ScrollTrigger · Lenis. GSAP and Lenis load after hydration so they never sit in
the first-paint path. No other runtime dependencies.

Navigation is `next/link` throughout: same tab, client-side, with a short
fade-and-rise transition (`app/template.tsx`). Each route change resets scroll
and refreshes ScrollTrigger for the incoming page's pinned sections.

## Where content lives

Nothing brand-facing is hard-coded in JSX. Edit the files in `data/`:

| File | What it holds |
| --- | --- |
| `data/site.ts` | Name, offer line, intro, links, address, coordinates, nav routes, page folios, CTA labels, which routes open on a dark ground |
| `data/contact.ts` | Email, WhatsApp, phone, **services**, enquiry options and WhatsApp message templates, timings, form endpoint, map embed flag; re-exports address, maps, booking and Instagram from `site.ts` so contact components need one import |
| `data/experience.ts` | "Two ways to experience MINIBÉ", "Dessert takes centre stage", the four pillars |
| `data/story.ts` | The journey waypoints and "Meet Chef Jenny" |
| `data/ingredients.ts` · `data/respect.ts` | Sourcing and sustainability copy |
| `data/gallery.ts` · `data/social.ts` | The Space grid, the three seating zones, Instagram tiles |
| `data/images.ts` | Registry of every photograph with alt text and intrinsic size |

Things MINIBÉ has not supplied are `null` and render nothing: opening hours
beyond "Closed on Mondays", phone, WhatsApp, email, dish and ingredient
photography, Instagram tiles. The footer's Timings block only appears once
`contact.timings.weekday` / `weekend` are filled in.

### The shared page ending

`<GlobalLocation />` and `<SiteFooter />` are rendered once, in
`app/layout.tsx` — never add them to a page. Each page supplies its own single
closing CTA above them with `<NextPage>` (the homepage uses its visit teaser).

The map is MINIBÉ's own drawn plate by default: on brand, weighs nothing, and
the whole plate links to Google Maps. To put a live Google map over it, set
`mapEmbed: true` in `data/contact.ts` — the embed is then requested only when
the foot of the page is within reach, and the plate stays underneath if it
fails to load. Check it renders on the production domain before switching it on.

Privacy and Terms links are deliberately absent: those pages do not exist, and
the footer never carries a dead link.

### Contact details and services

Everything lives in `data/contact.ts` and nothing is hard-coded in a component:

```ts
email:    "Minibeblr@gmail.com",   // → mailto
whatsapp: "917676347995",          // digits + country code → wa.me
phone:    "919840236400",          // digits + country code → tel:
```

`phoneDisplay`, `whatsappDisplay`, `phoneHref`, `emailHref` and `waLink()`
derive every rendered form from those three values, so the display format and
the dial format can never drift apart.

The five services (Corporate Orders, Private Catering, Grazing Table, Wedding
Cakes, Workshop) are listed in `contact.services`, each with its own pre-written
WhatsApp enquiry. They appear on `/contact#services` and in the footer — they
are not routes, and no descriptions, prices or capacities are invented.

### Turning the enquiry form on

`data/contact.ts` starts with no channel, so `/contact` shows the booking link
and Instagram instead of a form that goes nowhere. Fill in any one and the
"Register your interest" form appears and routes to it:

```ts
whatsapp: "919876543210",    // digits + country code → wa.me, message pre-written
email:    "hello@minibe.in", // → mailto, message pre-written
formEndpoint: "https://…",   // → POST JSON (Formspree, Getform, your own)
```

Priority is endpoint → WhatsApp → email. With WhatsApp configured (it is), the
form opens WhatsApp with the enquiry pre-written; add `formEndpoint` to POST it
to a service instead. Nothing ever claims to send that does not.

### Adding a page

Add a route folder under `app/`, export `metadata`, add a chapter to
`site.chapters` and the route to `site.nav`, then open the page with
`<PageHeader chapter={chapter("id")}>` and close it with `<NextPage>`.
Pages look their folio up by id, so chapter order can change safely.

### Photography

All photographs are MINIBÉ's own, extracted from the brand portfolio and the
Mosaic menu. Replace files in `public/images/photos/` and update
`data/images.ts` (src, alt, width, height).

## Structure

```
app/
  layout.tsx       fonts, metadata, JSON-LD, Navbar + shared ending + sticky CTA
  template.tsx     route transition
  page.tsx         Home — keep it short
  experience|story|space|contact/page.tsx
components/
  layout/          Navbar, MobileMenu, MobileCta
  site/            GlobalLocation, LocationMap, SiteFooter, FooterContact,
                   FooterServices, FooterSocial, FooterLinks, ContactChannels,
                   Services — the ending shared by every page, plus contact
  home/            Hero, TwoWaysTeaser, BrandTeaser, VisitTeaser (homepage only)
  sections/        Journey (the Andaman → Bengaluru passage)
  ui/              PageHeader, NextPage, Button, MagneticButton, ImageReveal,
                   WordReveal, Reveal, Parallax, ChapterMarker, Eyebrow, Logo,
                   Cursor, AllergenChips, EnquiryForm
  providers/       SmoothScroll (Lenis + GSAP ticker, route scroll reset)
data/              all content (see above)
lib/               gsap loader, motion hooks, cn
public/images/     brand marks, photographs
docs/source/       the client-supplied PDFs and feedback document
```

## Design system

Tokens live in `app/globals.css` (`@theme`): paper, indigo, orange, coral, sea,
sand, wood, the Mosaic palette, type utilities (`t-display`, `t-hero`,
`t-section`, `t-title`, `t-lead`, `t-quote`, `t-body`, `t-caption`,
`t-eyebrow`, `t-folio`), spacing, hairlines and easings.

Three oranges, by use: `orange` on dark grounds and for fills, `orange-ink` for
display type on paper (3.2:1), `orange-deep` for small text (5.5:1).

Each page has its own rhythm — Home cinematic, Experience typographic, Menus a
catalogue, Story a midnight magazine, Space photography-led, Contact practical
— built from the same components and tokens.

## Responsive

Mobile is a design target, not a fallback. Checked at 320 · 360 · 375 · 390 ·
414 · 430 · 768 · 1024 · 1280 · 1440 · 1920: no horizontal overflow, no clipped
headings, tap targets at least 40px in the header, footer, services and form.

Layouts change rather than shrink: the Andaman → Bengaluru passage is a pinned
horizontal track on large screens and a vertical timeline on phones; the Space
gallery is an art-directed grid on desktop and a swipeable strip on mobile;
service rows put a full-width "Enquire on WhatsApp" target under each name on
narrow screens. Nothing depends on hover — the custom cursor and magnetic
buttons are fine-pointer only.

## Motion & accessibility

- `prefers-reduced-motion` disables every animation, the route transition and
  Lenis smoothing; content renders fully visible.
- Custom cursor and magnetic buttons run only on fine-pointer devices.
- Semantic landmarks, skip link, focus styles, `aria-current` on the active nav
  item, `aria-expanded` on every disclosure, alt text on every photograph.
- Lighthouse **accessibility 100 on all six routes** (desktop), performance 99.
