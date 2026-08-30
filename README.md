# MORA Industries — website source

Front-end source for the MORA Industries corporate site, built from
*MORA Industries — Website Content & Development Specification v1.0*,
*Business, Marketing & Brand Strategy v1.0* (both August 2026) and the
approved page copy in *MORA — content of website*.

Static HTML, CSS and vanilla JavaScript. **No build step, no bundler, no
package manager, no framework.** Open it and it runs.

---

## Running it

Because the pages are assembled by JavaScript, serve the folder over HTTP
rather than opening `index.html` from the filesystem:

```bash
cd mora-industries
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static host works: Netlify, Vercel, S3 + CloudFront, nginx, or a CMS
theme folder.

A single-file build is also included at
`dist/mora-industries-single-file.html` — everything inlined, including
fonts. That one *does* open directly from the filesystem and is useful for
emailing to stakeholders or reviewing offline. Regenerate it after any
source change:

```bash
python3 build.py
```

---

## Structure

```
mora-industries/
├── build.py                    Regenerates the single-file build
├── index.html                  Document shell, meta, schema, inline logo symbol
├── assets/
│   ├── css/
│   │   ├── fonts.css           @font-face declarations
│   │   └── styles.css          Design tokens + all component styles
│   ├── fonts/                  9 woff2 files (latin subset)
│   ├── img/
│   │   ├── mora-logo.svg           Vector wordmark, inherits currentColor
│   │   ├── mora-logo-navy.svg      #083A56
│   │   ├── mora-logo-ink.svg       #04202F
│   │   ├── mora-logo-white.svg     Reversed, for dark backgrounds
│   │   ├── favicon.svg             Ring mark from the logo's O
│   │   └── mora-logo-master.pdf    Supplied master artwork
│   └── js/
│       ├── core.js             Helpers, nav data, header, footer, header state
│       ├── components.js       Section builders + the prism diagram
│       ├── prism3d.js         3D hero prism: geometry, render, pointer
│       ├── router.js           Routing, meta, interaction wiring, init
│       └── pages/              One file per page group
└── dist/
    └── mora-industries-single-file.html
```

Script load order matters and is fixed in `index.html`: helpers, then
shared builders, then pages, then the router. There are no ES modules, so
the files work over `file://` and behind any CDN without CORS setup.

### Where the content lives

Page copy is held in plain JS objects rather than being scattered through
markup, so it maps onto the CMS content model in spec §14:

| Object | File | CMS content type |
|---|---|---|
| `NAV`, `FOOTER_COLS` | `core.js` | Navigation |
| `SOLUTIONS` | `pages/solutions-industries.js` | Service |
| `INDUSTRIES` | `pages/solutions-industries.js` | Industry |
| `POSTS`, `CATEGORIES` | `pages/insights.js` | Insight |
| `ROLES` | `pages/company.js` | — |
| `ROUTES`, `TITLES`, `METAS` | `router.js` | Standard page |
| `SOCIAL`, `contactCard()` | `components.js` | Contact details |

---

## Routing

The prototype uses hash routes so it runs without server configuration.
`ROUTE_MAP` in `router.js` maps every hash route to the clean production
URL from spec §2:

| Prototype | Production |
|---|---|
| `#/` | `/` |
| `#/intelligence` | `/intelligence` |
| `#/products/mora-prism` | `/products/mora-prism` |
| `#/advance` | `/advance` |
| `#/international` | `/international` |
| `#/products/masdar-trade` | `/products/masdar-trade` |
| `#/solutions/{slug}` | `/solutions/{slug}` |
| `#/industries/{slug}` | `/industries/{slug}` |
| `#/insights`, `#/insights/{slug}` | `/insights`, `/insights/{slug}` |
| `#/about`, `#/how-we-work`, `#/trust` | same paths |
| `#/partners`, `#/careers`, `#/contact` | same paths |

Each route already carries its approved `<title>` (`TITLES`) and meta
description (`METAS`); the router rewrites the title, description, Open
Graph tags and canonical link on every navigation. When you move to real
URLs, emit those values server-side instead of rewriting them in script.

---

## Design system

No Tailwind, SCSS or PostCSS. Styling is plain CSS with custom properties
declared in `:root` at the top of `styles.css`.

**Colour** — from the brand strategy's visual direction (§10) and sampled
from the master logo artwork:

| Token | Value | Use |
|---|---|---|
| `--ink` | `#04202F` | Dark sections, body text |
| `--navy` | `#083A56` | Trust, logo, headings |
| `--teal` | `#14768C` | Intelligence and advancement, primary buttons |
| `--teal-bright` | `#1F9CB8` | Focus rings, accents |
| `--aqua` | `#6FD6E7` | Digital energy, accents on dark |
| `--gold` | `#B8862B` | **Opportunity only** — used sparingly by design |
| `--paper` / `--panel` / `--tint` | `#F4F8FA` / `#FFFFFF` / `#E9F2F6` | Surfaces |

**Type** — Jost for display (it echoes the geometric wordmark),
IBM Plex Sans for body, and IBM Plex Mono as the *evidence voice*: every
source note, verification scope, review date and section label is set in
mono. That is deliberate — the brand's evidence standard is encoded in the
type system rather than only asserted in copy.

**Signature element** — the prism in the hero. Fragmented internal data
and external signals enter, pass through the prism, and leave as four
prioritized decisions.

It is rendered in 3D by `assets/js/prism3d.js`: a triangular prism
extruded along z, drawn on a 2D canvas with a hand-written projection
and a painter's algorithm. No library, no build step, no third-party
request — about 15KB of source, which keeps the site's zero-third-party
guarantee intact. Faces are translucent, with alpha rising as each face
turns edge-on; edges brighten as they come toward the camera.

The prism turns slowly on its own and can be dragged to spin, with
momentum that decays back into the idle drift. `touch-action: pan-y` on
the canvas leaves vertical scrolling to the browser, so on touch a
horizontal drag rotates and a vertical one scrolls the page.

**The beam follows the geometry.** Entry and exit faces are picked each
frame from the *rotated* normals — the side turned furthest left and the
side turned furthest right — so light always enters from the left and
leaves on the right no matter how the solid is turned. The six labels
never move; only the prism and the beams do, which is what keeps the
diagram legible while it spins.

**Labels are the single source of truth for the beam endpoints.** They
are positioned in `styles.css` (`.i1`–`.i2`, `.o1`–`.o4`), and
`prism3d.js` measures them on resize to decide where each ray
terminates. Move a label in CSS and the rays follow. In portrait the
outputs move to the bottom-right rather than the bottom-left, so no ray
has to cross back over the solid.

The renderer pauses when the figure scrolls out of view or the tab is
hidden, and is torn down and re-mounted on every route change.

**Fallback.** `prismFigure()` renders the static SVG diagram
(`prismSVG()` / `prismCompactSVG()`) inside the container. The renderer
replaces it only after confirming a 2D context and no
`prefers-reduced-motion` preference — so with JavaScript off, canvas
unsupported, or reduced motion requested, the original flat diagram is
what shows, carrying the same labels. The rotation is ornament: no
information depends on it, which is why it is not exposed as a keyboard
control.

**Numbering** — `01 / 02 / 03` markers appear only where sequence carries
real meaning: the six-step method, Prism's define-to-improve sequence,
marketplace onboarding, and the hiring process. The benefit ledger
(`benefits()`) numbers its items for scanning, not for order.

**Components added for the approved copy**

| Builder | Renders | Used on |
|---|---|---|
| `audiences()` | Linked audience ledger | Home "Who we work with" |
| `audienceNotes()` | Same ledger, unlinked | Prism and Masdar "Who is it for" |
| `benefits()` | Numbered outcome ledger | Prism and Masdar "Why" sections |
| `contactCard()` | "Get in touch" block with social links | Home, Contact |
| `prismFigure()` | 3D prism container, labels and SVG fallback | Home hero |

**State and depth** — the header condenses on scroll, marks the active
top-level section, and carries a spectrum read-out of scroll position.
Dark sections use a low-intensity radial wash rather than flat fill. All
of it is disabled under `prefers-reduced-motion`.

---

## Before publication

Every unresolved value is wrapped in `ph()` and renders with a gold
highlight, so unresolved content is visible on the page rather than hidden
in the source. Search the rendered site for the gold marks, or grep for
`ph(` in `assets/js/`.

- [ ] `[Email address]`, `[Phone number]`, `[Location]` — home "Get in touch" and contact page
- [ ] `[Registered address]` — contact page and footer
- [ ] `[Year]` — footer copyright
- [ ] Social profile URLs — `SOCIAL` in `components.js` currently points every icon at `/contact`
- [ ] `[Location]` — careers, six roles
- [ ] `[Source name]`, `[Publication]`, `[Date]`, `[Period]` — industry trends and article sources
- [ ] `[Reviewer name and role]` — article sidebar
- [ ] `[domain]` — canonical, Open Graph and JSON-LD in `index.html`
- [ ] `assets/img/og-image.png` — not yet created
- [ ] Legal page bodies — `/legal` is a routing placeholder listing the ten documents spec §13 requires
- [ ] Partner logos, case studies and credentials — reserved slots on `/partners`, deliberately empty

**Proof language.** Per brand strategy §10, no customer logo, testimonial
or quantified result appears anywhere. Case-study slots require a
documented baseline, stated measurement period, named limitations and
written customer approval before anything is published in them.

### Not yet built

Search, Sign in, and the language switcher are present in the header but
stubbed. Multilingual and RTL support is not implemented — `styles.css`
uses logical properties (`padding-inline`, `margin-inline`) in the layout
primitives to make that transition easier, but it has not been tested.

---

## Accessibility

Targets WCAG 2.2 AA (spec §15). Verified across all 25 routes:

- One `<h1>` per page, no skipped heading levels
- All form controls have associated labels; invalid fields receive focus and `aria-invalid`
- Text contrast meets AA at every size in use (lowest pair is 4.6:1)
- Keyboard navigable throughout: skip link first in tab order, mega menus open on Enter and close on Escape, visible focus rings
- `prefers-reduced-motion` respected — all animation is disabled, and a fallback guarantees content is never left hidden
- Decorative SVG is `aria-hidden`; the prism diagram carries a descriptive `aria-label`
- No horizontal overflow at 390px

Re-run an audit after content is loaded, and add the manual
screen-reader pass listed in spec §16 before launch.

## Performance and privacy

- No third-party requests. Fonts are self-hosted, which removes a consent dependency under spec §13.
- No cookies, no analytics, no trackers. The analytics event plan in spec §14 is not implemented — add it behind consent.
- Total page weight is dominated by the fonts (~140KB). Subset further if you add languages.

## Licences

Jost and IBM Plex are licensed under the SIL Open Font License 1.1 and may
be self-hosted and redistributed. The MORA wordmark was vectorised from
the supplied master artwork and remains MORA Industries property.

## Outstanding legal dependency

Per spec §16: MORA Prism is a working name. MORA Industries, MORA Prism
and Masdar Trade require trademark, company-name, domain, translation and
jurisdictional review before final visual identity, SEO investment or
public launch.
