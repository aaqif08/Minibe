# MINIBÉ — An Experiential Dessert Dining

Production website for MINIBÉ, Bengaluru. One long evening told in chapters:
cover → where it begins → the islands → our story → the chef → the table
(Opening Act, Mosaic) → the ingredient → the space → the last bite → visit.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the production domain so
canonical / Open Graph URLs and the JSON-LD resolve correctly.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP +
ScrollTrigger · Lenis. GSAP and Lenis are loaded after hydration so they never
sit in the first-paint path. No other runtime dependencies.

## Where content lives

Nothing brand-facing is hard-coded in JSX. Edit the files in `data/`:

| File | What it holds |
| --- | --- |
| `data/site.ts` | Name, tagline, links (reserve / Instagram / Maps), address, coordinates, **hours**, **phone**, nav, chapter names, CTA labels |
| `data/menus.ts` | **Opening Act** items (name, price, badge, ingredients, allergens, add-ons, `available`) and **Mosaic** courses. Transcribed exactly from the supplied menu PDFs |
| `data/story.ts` · `data/chef.ts` · `data/islands.ts` | Story, chef journey and islands copy (from the brand portfolio) |
| `data/ingredients.ts` · `data/respect.ts` | Sourcing (cinnamon, honey, cane sugar, chocolate, produce) and sustainability copy |
| `data/gallery.ts` · `data/social.ts` | The Space grid and Instagram tiles |
| `data/images.ts` | Registry of every photograph with alt text and intrinsic size |

Things that were **not** available from MINIBÉ's materials are `null` and
render nothing until filled in: opening hours beyond "Closed on Mondays",
phone, email, dish/ingredient photography, Instagram tiles.

### Mosaic — Swiss Roll variants

The two supplied Mosaic PDFs print different components for course 03. Both
are stored, unmerged, in `data/menus.ts` under `variants`. While
`activeVariant` is `null` the site shows both lists separated by "or". Set it
to `"a"` or `"b"` once MINIBÉ confirms which is current.

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
  sections/     one file per chapter (Hero … Location)
  ui/           Button, MagneticButton, ImageReveal, WordReveal, Reveal,
                Parallax, ChapterMarker, Eyebrow, Logo, Cursor, AllergenChips
  providers/    SmoothScroll (Lenis + GSAP ticker, scroll context)
data/           all content (see above)
lib/            gsap loader, motion hooks, cn
public/images/  brand marks, photographs
docs/source/    the client-supplied PDFs the content was transcribed from
```

## Design system

Tokens live in `app/globals.css` (`@theme`): paper, indigo, orange, coral, sea,
sand, wood, the Mosaic palette, type utilities (`t-display`, `t-hero`,
`t-section`, `t-title`, `t-lead`, `t-quote`, `t-body`, `t-caption`,
`t-eyebrow`, `t-folio`), spacing (`gutter`, `section`), hairlines and easings.
Brand orange is used at display sizes and on dark grounds; `orange-deep` is the
small-text variant that clears 4.5:1 on paper.

## Motion & accessibility

- `prefers-reduced-motion` disables every animation and Lenis smoothing;
  content renders fully visible.
- Custom cursor and magnetic buttons are enabled only on fine-pointer devices.
- Semantic landmarks, skip link, focus styles, `aria-expanded` on all
  disclosure controls, alt text on every photograph, allergen codes exposed as
  full words to assistive tech.
