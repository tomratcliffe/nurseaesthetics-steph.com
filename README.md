# nurseaesthetics-steph.com

Static brochure site for **Nurse Aesthetics with Steph**. React + Vite, deployed
to GitHub Pages on a custom domain.

## Running it

```sh
npm install
npm run dev      # local development, http://localhost:5173
npm run build    # type-check and produce dist/
npm run preview  # serve the production build
npm run lint
```

## Editing the site

**All copy, links and image references live in one file: [`src/content.ts`](src/content.ts).**
Components read from it and contain no wording of their own, so text can be
changed without touching any React code. Anything marked `TODO` in that file is
placeholder content waiting to be replaced.

The things most likely to need changing first:

| What | Where |
| --- | --- |
| Booking system link | `site.bookingUrl` |
| Treatment copy and durations | `treatments` |
| Product shots beside a treatment | `treatments[].products` |
| About me / Clinical approach text | `aboutMe`, `clinicalApproach` |
| Review quotes and rating | `reviews` |
| Email, Instagram, location, NMC line | `footer` |

### The logo

`src/assets/logo.svg` is currently a placeholder. Replace it with
`Logo Transparent.svg` from Drive, keeping the filename. Use the **dark
(espresso) colourway**: the logo is rendered as an `<img>`, so it cannot inherit
colour from the page — the footer places it on a cream disc so a dark logo works
on both backgrounds.

### Photographs

Drop image files into `src/assets/`, then import and assign them **in
`src/content.ts`** — no component needs editing:

```ts
import aboutPhoto from "./assets/about.jpg";

export const aboutMe: Feature = {
  // …
  image: aboutPhoto,
};
```

- **About me / Clinical approach** — set `image` on `aboutMe` and
  `clinicalApproach`. Omit it and a labelled placeholder panel of the right
  aspect ratio is shown, so the layout is already final.
- **Before/afters** — set both `beforeSrc` and `afterSrc` on each entry in the
  `clientResults` array; if either is missing the pair falls back to placeholder
  panels. Shoot each pair at the same crop, angle and lighting so the comparison
  slider lines up.

Vite content-hashes anything under `src/assets/`, so a wrong path is a build
error rather than a broken image on the live site. Aim for roughly 1200px on the
long edge — the slots crop with `object-fit: cover` (`3/4` on desktop, `4/5` on
mobile), so keep the subject centred.

Note that before/after photographs of real patients need documented written
consent, and UK advertising rules restrict showing before/afters for
prescription-only treatments such as botulinum toxin.

## Structure

```
src/
  content.ts                 all copy and links
  styles/tokens.css          brand colours, type scale, spacing
  styles/global.css          reset and base typography
  components/                Header, NavOverlay, BeforeAfter, Reviews, …
  pages/                     Home, Treatments, ClientResults, Aftercare, NotFound
```

Routes: `/`, `/treatments` (with `#anti-wrinkle`, `#dermal-filler`,
`#skin-boosters`, `#microneedling` anchors), `/client-results`, `/aftercare`.

Styling is plain CSS — design tokens as custom properties in `tokens.css`, plus
one CSS Module per component. No CSS framework. Change a brand colour in
`tokens.css` and it changes everywhere.

### Typography

Two faces, both from Google Fonts:

- **Cormorant Garamond** (`--font-display`, weight 600) for headings, large nav
  items and pull-quotes, set in sentence case with near-normal tracking.
- **Inter** (`--font-body`) for paragraphs, and for the small uppercase labels —
  buttons, eyebrows, captions — where wide tracking reads better in a sans.

Italiana is deliberately *not* used for live text. It ships in a single 400
weight with very thin strokes, and set as uppercase headings it was hard to
read. It survives in the logo artwork itself, which keeps the brand lockup
intact. If you want it back for headings, change `--font-display` in
`tokens.css` and re-add it to the font `<link>` in `index.html`.

## Deployment

The production build is served from the GitHub Pages project path
`https://tomratcliffe.github.io/nurseaesthetics-steph.com/`, so `npm run build`
and `npm run preview` pass `--base=/nurseaesthetics-steph.com/`. The dev server
stays on the root, and `BrowserRouter` takes its `basename` from
`import.meta.env.BASE_URL`, so routing follows the base automatically.

To move to the custom domain: point DNS at GitHub (the apex A records, or a
CNAME for www), set the domain under Settings -> Pages, then drop the
`--base` flag from both scripts so the site builds for the root again. There is
deliberately no `public/CNAME`: committing one makes Pages adopt the domain
before its DNS resolves, which takes the working subpath URL down with it.


Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. In the repo settings, **Pages → Source** must
be set to **GitHub Actions**.

GitHub Pages cannot rewrite URLs server-side, so a direct hit on
`/treatments` would 404. `public/404.html` stashes the requested URL and bounces
to the app entry point, where a snippet in `index.html` restores it before React
mounts. `public/CNAME` holds the custom domain and `public/.nojekyll` stops
Jekyll from swallowing the hashed asset filenames.

## Accessibility notes

The menu traps focus while open, closes on `Escape`, and returns focus to its
trigger. The before/after comparison is an ARIA slider: arrow keys move the
split in 5% steps, `Home`/`End` jump to either end. Motion respects
`prefers-reduced-motion`. The palette is a single warm neutral, `#6f5d55`, on paper/wash/cream grounds.
Measured contrast: 5.88:1 on paper, 5.29:1 on the wash band, 4.66:1 on cream,
and 4.66:1 for cream text on the espresso footer — all above the 4.5:1 WCAG AA
threshold for normal text, but the cream pairings have little headroom, so
re-measure if the palette is adjusted.
