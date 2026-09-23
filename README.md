# MINIBÉ — An Experiential Dessert Dining

Production website for MINIBÉ, Bengaluru.

Structure follows the client's website feedback (`docs/source/websitefeedback.docx`):
five sections plus contact, with the tasting menu framed rather than listed so
the site never depends on which menu is currently running.

```
Home  ·  The Experience  ·  Menus  ·  Our Story  ·  Space  ·  Contact
```

Homepage flow: cover → two ways to experience MINIBÉ → 01 the experience →
02 the menus (tasting menu · à la carte) → 03 the menu archive →
04 the ingredient → 05 our story → 06 the space → 07 let's talk dessert.

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

## Where content lives

Nothing brand-facing is hard-coded in JSX. Edit the files in `data/`:

| File | What it holds |
| --- | --- |
| `data/site.ts` | Name, offer line, intro, links, address, coordinates, **hours**, nav, chapters, CTA labels |
| `data/menus.ts` | **À la carte** items (name, price, badge, ingredients, allergens, add-ons, `available`), the **tasting menu** framing, and the **menu archive** |
| `data/contact.ts` | WhatsApp / phone / email / form endpoint, enquiry options, contact copy |
| `data/experience.ts` | "Two ways to experience MINIBÉ", "Dessert takes centre stage", the four pillars |
| `data/story.ts` | Andaman → France → Bali → Bengaluru waypoints and "Meet Chef Jenny" |
| `data/ingredients.ts` · `data/respect.ts` | Sourcing (cinnamon, honey, cane sugar, chocolate, produce) and sustainability copy |
| `data/gallery.ts` · `data/social.ts` | The Space grid, the three seating zones, Instagram tiles |
| `data/images.ts` | Registry of every photograph with alt text and intrinsic size |

Things MINIBÉ has not supplied are `null` and render nothing: opening hours
beyond "Closed on Mondays", phone, WhatsApp, email, dish and ingredient
photography, Instagram tiles.

### Changing the tasting menu each quarter

The tasting menu section carries no menu content, so a new chapter is one
object at the top of `menuArchive` in `data/menus.ts`:

```ts
{ id: "next", name: "…", dates: "Dec 2026 – Feb 2027", status: "current",
  note: null, courses: null, image: null }
```

…and set the previous entry to `status: "past"`. Add a `courses` array (and an
`image`) whenever the menu has been transcribed and its panel fills out.

**Swiss Roll:** the two supplied Mosaic PDFs print different components for
course 03. Both are stored unmerged under `variants`; while `activeVariant` is
`null` the site shows both, separated by "or". Set it to `"a"` or `"b"` once
MINIBÉ confirms.

### Turning the enquiry form on

`data/contact.ts` starts with no channel, so the contact section shows the
booking link and Instagram instead of a form that goes nowhere. Fill in any one
and the "Register your interest" form appears and routes to it:

```ts
whatsapp: "919876543210",   // digits + country code → wa.me, message pre-written
email:    "hello@minibe.in", // → mailto, message pre-written
formEndpoint: "https://…",   // → POST JSON (Formspree, Getform, your own)
```

`phone` adds a Call row. Priority is endpoint → WhatsApp → email.

### Photography

All photographs are MINIBÉ's own, extracted from the brand portfolio and the
Mosaic menu. Replace files in `public/images/photos/` and update
`data/images.ts` (src, alt, width, height). `next/image` handles AVIF/WebP,
responsive sizes and lazy loading.

## Structure

```
app/            layout (fonts, metadata, JSON-LD), page, icons, OG image
components/
  layout/       Navbar, MobileMenu, MobileReserveBar, ChapterProgress, Footer
  sections/     Hero, TwoWays, Experience, Menus (TastingMenu + ALaCarte),
                MenuArchive, Ingredients, Respect, Story, Space, Social, Contact
  ui/           Button, MagneticButton, ImageReveal, WordReveal, Reveal,
                Parallax, ChapterMarker, Eyebrow, Logo, Cursor, AllergenChips,
                EnquiryForm
  providers/    SmoothScroll (Lenis + GSAP ticker, scroll context)
data/           all content (see above)
lib/            gsap loader, motion hooks, cn
public/images/  brand marks, photographs
docs/source/    the client-supplied PDFs and feedback document
```

## Design system

Tokens live in `app/globals.css` (`@theme`): paper, indigo, orange, coral, sea,
sand, wood, the Mosaic palette, type utilities (`t-display`, `t-hero`,
`t-section`, `t-title`, `t-lead`, `t-quote`, `t-body`, `t-caption`,
`t-eyebrow`, `t-folio`), spacing (`gutter`, `section`), hairlines and easings.
Brand orange is used at display sizes and on dark grounds; `orange-deep` is the
small-text variant that clears 4.5:1 on both paper tones.

## Motion & accessibility

- `prefers-reduced-motion` disables every animation and Lenis smoothing;
  content renders fully visible.
- Custom cursor and magnetic buttons run only on fine-pointer devices.
- Semantic landmarks, skip link, focus styles, `aria-expanded` on every
  disclosure, alt text on every photograph, allergen codes exposed as full
  words to assistive tech. Lighthouse accessibility 100 on desktop and mobile.
