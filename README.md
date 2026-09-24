# MINIBÉ — An Experiential Dessert Dining

Production website for MINIBÉ, Bengaluru. A real multi-page site: every header
item is its own route, and the homepage is a cover, not the whole book.

```
/            Home        cinematic cover, two formats, two doors out
/experience  The Experience   what makes MINIBÉ different
/menus       Menus            tasting menu · à la carte · the menu archive
/story       Our Story        Andamans → France → Bali → Bengaluru, Jenny & Steffi
/space       Space            the room, photography-led
/contact     Contact          enquiry, WhatsApp, reserve, directions, catering
```

The header carries **RESERVE** (the AirMenus booking system) at all times.
The homepage teases each page and never reproduces it — keep it that way.

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
| `data/site.ts` | Name, offer line, intro, links, address, coordinates, **hours**, nav routes, page folios, CTA labels, which routes open on a dark ground |
| `data/menus.ts` | **À la carte** items, the **tasting menu** framing, the **menu archive** |
| `data/contact.ts` | WhatsApp / phone / email / form endpoint, enquiry options, WhatsApp message templates |
| `data/experience.ts` | "Two ways to experience MINIBÉ", "Dessert takes centre stage", the four pillars |
| `data/story.ts` | The journey waypoints and "Meet Chef Jenny" |
| `data/ingredients.ts` · `data/respect.ts` | Sourcing and sustainability copy |
| `data/gallery.ts` · `data/social.ts` | The Space grid, the three seating zones, Instagram tiles |
| `data/images.ts` | Registry of every photograph with alt text and intrinsic size |

Things MINIBÉ has not supplied are `null` and render nothing: opening hours
beyond "Closed on Mondays", phone, WhatsApp, email, dish and ingredient
photography, Instagram tiles.

### Changing the tasting menu each quarter

`/menus` carries no current-menu content, so a new chapter is one object at the
top of `menuArchive` in `data/menus.ts`:

```ts
{ id: "next", name: "…", dates: "Dec 2026 – Feb 2027", status: "current",
  note: null, courses: null, image: null }
```

…and set the previous entry to `status: "past"`. The tasting-menu section names
the current chapter from this list; add a `courses` array (and an `image`) and
its archive panel fills out. No layout changes, ever.

**Swiss Roll:** the two supplied Mosaic PDFs print different components for
course 03. Both are stored unmerged under `variants`; while `activeVariant` is
`null` the site shows both, separated by "or". Set it to `"a"` or `"b"` once
MINIBÉ confirms.

### Turning the enquiry form on

`data/contact.ts` starts with no channel, so `/contact` shows the booking link
and Instagram instead of a form that goes nowhere. Fill in any one and the
"Register your interest" form appears and routes to it:

```ts
whatsapp: "919876543210",    // digits + country code → wa.me, message pre-written
email:    "hello@minibe.in", // → mailto, message pre-written
formEndpoint: "https://…",   // → POST JSON (Formspree, Getform, your own)
```

`phone` adds a Call row. Priority is endpoint → WhatsApp → email. The same
number powers the WhatsApp buttons on `/menus` and the catering block on
`/contact`, using the templates in `contact.waMessages`.

### Adding a page

Add a route folder under `app/`, export `metadata`, open with `<PageHeader>`
and close with `<NextPage>`, then add the route to `site.nav`. A catering page,
for example, would need nothing else.

### Photography

All photographs are MINIBÉ's own, extracted from the brand portfolio and the
Mosaic menu. Replace files in `public/images/photos/` and update
`data/images.ts` (src, alt, width, height).

## Structure

```
app/
  layout.tsx       fonts, metadata, JSON-LD, Navbar + Footer + sticky CTA
  template.tsx     route transition
  page.tsx         Home — keep it short
  experience|menus|story|space|contact/page.tsx
components/
  layout/          Navbar, MobileMenu, MobileCta, Footer
  home/            Hero, TwoWaysTeaser, BrandTeaser, VisitTeaser (homepage only)
  sections/        TastingMenu, ALaCarte, MenuArchive, Journey
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

## Motion & accessibility

- `prefers-reduced-motion` disables every animation, the route transition and
  Lenis smoothing; content renders fully visible.
- Custom cursor and magnetic buttons run only on fine-pointer devices.
- Semantic landmarks, skip link, focus styles, `aria-current` on the active nav
  item, `aria-expanded` on every disclosure, alt text on every photograph.
- Lighthouse **accessibility 100 on all six routes** (desktop), performance 99.
