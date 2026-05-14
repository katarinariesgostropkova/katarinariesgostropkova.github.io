# Phase 3B-2 — Case Study Template

## Commit message
```
phase-3b-2: case study layout + sidebar + functional mobile pill/sheet + meta table + section headings + pull quotes
```

## What changed
Built the complete case study page shell: `CaseStudyLayout.astro` wraps `BaseLayout` and composes the hero block, meta table, a two-column desktop grid (sticky sidebar + body content), and the mobile pill+sheet navigation. Five supporting components handle the individual pieces. The functional mobile navigation behaviour — open, close, jump-to-section, focus trap, Escape, body scroll lock — is wired in `mobile-nav-pill.js` without any cosmetic motion (Phase 4 adds the slide-in). The desktop sidebar statically marks the first section as active; Phase 4 will wire dynamic scroll tracking via `sidebar-observer.js`. The old test harness (`inline-image-test.astro`) was deleted and replaced by `case-study-test.astro`, which renders a four-section synthetic case study for visual verification of the full template.

## Files created
- `src/layouts/CaseStudyLayout.astro` — page shell, hero, meta table, body grid, script import
- `src/components/CaseStudySidebar.astro` — sticky desktop sidebar with "← All work" back link and numbered section links
- `src/components/MobileNavPill.astro` — sticky pill + bottom sheet + backdrop markup and styles
- `src/components/CaseStudyMetaTable.astro` — Company / Team / My role / Timeline `<dl>` grid
- `src/components/SectionHeading.astro` — rose-numbered `<h2>` with Cormorant title
- `src/components/PullQuote.astro` — rose and teal left-border pull quote variants
- `src/scripts/mobile-nav-pill.js` — animation ⑫ functional behaviour
- `src/pages/case-study-test.astro` — Phase 3B-2 test harness (delete when Phase 3C's first case lands)

## Files deleted
- `src/pages/inline-image-test.astro` — replaced by the case study test harness

## Files modified
- None. No existing files were touched.

## Component contracts

### CaseStudyLayout.astro
```ts
interface Props {
  title: string;
  description: string;
  eyebrow?: string;                         // default: 'Case study'
  heroImage?: { src: string; alt: string }; // optional — only renders if provided
  meta: {
    company: string;
    team: string;
    role: string;
    timeline: string;
  };
  sections: Array<{ id: string; label: string }>;
}
```
Body content passed via `<slot />`. Each case study page provides its own section markup.

### CaseStudySidebar.astro
```ts
interface Props {
  sections: Array<{ id: string; label: string }>;
}
```
Renders "← All work" back link + numbered section list. Sticky at desktop, hidden via `display: none` on the grid column at ≤1023px.

### MobileNavPill.astro
```ts
interface Props {
  sections: Array<{ id: string; label: string }>;
}
```
Renders pill button + backdrop + bottom sheet. Pill hidden until hero leaves viewport (JS adds `.visible`). All three elements suppressed at ≥1024px by media query (no `!important` needed — specificity matched in the `@media (min-width: 1024px)` block).

### CaseStudyMetaTable.astro
```ts
interface Props {
  meta: {
    company: string;
    team: string;
    role: string;
    timeline: string;
  };
}
```
Renders a `<dl>` as a two-column grid (label / value). Collapses to stacked label-above-value at ≤600px.

### SectionHeading.astro
```ts
interface Props {
  number: string;  // e.g. '01', '02'
  title: string;
  id: string;      // must match the wrapping <section id="..."> for fragment links to work
}
```
Renders `<h2 id={id}>` with rose number (Jost 500 12px) and Cormorant 300 22px title on the same baseline.

### PullQuote.astro
```ts
interface Props {
  quote: string;
  attribution?: string;
  variant?: 'rose' | 'teal'; // default: 'teal'
}
```
Rose variant: 22px Cormorant italic, rose 3px left border — max one per page, for the primary insight.
Teal variant: 20px Cormorant italic, teal 3px left border — zero or more per page.

## Body section markup contract
Each `<section>` in case study body content must carry three attributes for the future `sidebar-observer.js` (animation ⑩) to work correctly:
```html
<section id="opening" data-title="The Opening" data-index="1">
```
Phase 3C must follow this pattern on every case study page.

## Functional behaviour delivered

**Mobile pill + sheet (animation ⑫, Phase 3B-2 scope):**
- Pill appears (`.visible` class) when hero section leaves viewport — detected via `IntersectionObserver`
- Tap pill → sheet opens (`aria-hidden="false"`), body scroll locked, focus moves to close button
- Tap close button or Escape → sheet closes, body scroll unlocked, focus returns to pill
- Tap backdrop → sheet closes identically
- Tap section link in sheet → sheet closes, browser handles `#fragment` scroll (global `scroll-behavior: smooth` from Phase 2D applies)
- Tab key while sheet open → focus cycles between close button and section links, does not escape the sheet (focus trap)
- `aria-expanded` on pill and `aria-hidden` on sheet toggle correctly throughout

**Desktop sidebar (animation ⑩ markup only):**
- Sticky at `top: calc(var(--header-height-desktop) + var(--space-6))`
- First section link statically marked `data-active="true"` with teal left accent and primary text colour
- `data-section-link` and `data-section-id` hooks in place for Phase 4's `sidebar-observer.js`

## Animation hooks left for Phase 4
All hooks are in markup; no behaviour wired yet:
- `data-case-hero` — on the `.case-hero` section; `IntersectionObserver` target for pill visibility
- `data-case-study` — on `.case-body`; Phase 4 scroll-reveal root
- `data-case-sidebar` — on sidebar `<aside>`; Phase 4 sidebar active state root
- `data-section-link` + `data-section-id="..."` — on each sidebar link; toggled by `sidebar-observer.js`
- `data-active="true"` — on first sidebar link; Phase 4 moves this dynamically
- `data-case-pill` — on pill button; Phase 4 updates label text to active section name
- `data-case-sheet` — on sheet container; Phase 4 adds slide-up animation
- `id`, `data-title`, `data-index` — on each body `<section>`; required by `sidebar-observer.js`

Phase 4 additions for animation ⑫: sheet slide-up (`transform: translateY(100%)` → `translateY(0)`), reading progress bar, active section label in pill text (shared observer with sidebar ⑩).

## Tokens used
Colours: `--color-canvas`, `--color-linen`, `--color-deep-tide`, `--color-teal`, `--color-rose`, `--color-deep-tide-08`, `--border-dark-soft`, `--border-light`

Text: `--text-primary`, `--text-secondary`, `--text-body`, `--text-muted`, `--text-dark-100`, `--text-dark-085`, `--text-dark-050`

Typography: `--font-serif`, `--font-sans`, `--weight-light`, `--weight-regular`, `--weight-medium`, `--font-size-hero`, `--font-size-subhead`, `--font-size-body`, `--font-size-meta`, `--leading-tight`, `--leading-snug`, `--leading-normal`, `--tracking-tight`, `--tracking-body`, `--tracking-wide`, `--tracking-widest`

Spacing: `--space-1` through `--space-20`

Layout: `--container-wide`, `--padding-desktop`, `--padding-tablet`, `--padding-mobile`, `--header-height-desktop`, `--header-height-mobile`

Effects: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`, `--shadow-card`, `--shadow-overlay`, `--duration-fast`, `--ease-out`

## Deviations from spec — accepted exceptions

| Spec says | Built as | Reason |
|-----------|----------|--------|
| `_case-study-test.astro` (underscore) | `case-study-test.astro` (no underscore) | Astro excludes `_`-prefixed pages from routing; test harness needs to be viewable in browser |
| `CaseStudyMobileNav.astro` | `MobileNavPill.astro` | CLAUDE.md §4 canonical component name; CLAUDE.md §7.1 canonical script name |
| `case-study-mobile-nav.js` | `mobile-nav-pill.js` | CLAUDE.md §7.1 assigns animation ⑫ to `mobile-nav-pill.js`; prime directive prohibits new files for existing concerns |
| `sections[].title` | `sections[].label` | CLAUDE.md §11 defines the sections contract as `{ id, label }` throughout |
| `--sidebar-w` token | Scoped `--_sidebar-w: 220px` in layout | Token does not exist in `global.css`; no new global tokens per constraint; scoped to component |
| Section heading 28px (`--font-size-section`) | Scoped `--_heading-size: 22px` in SectionHeading | DESIGN_DECISIONS.md §2.3 and CLAUDE.md §5.3 both specify 22px for case headings; 28px is section/footer level |
| Section number 10px | `--font-size-meta` (12px) | No 10px token; hardcoding forbidden; 12px is the closest token |

## Regression checks
- `npm run build` passes, 3 pages, no new warnings
- Pre-existing `copy.md` content collection warning persists (expected, allowed)
- Homepage (`/`): unchanged — Hero, ImpactStrip, WorkRow, Footer all untouched
- `/work`: unchanged — grid, filter, cards untouched
- Header, Footer, MobileOverlay: not touched
- No existing component files modified

## Open questions for designer
- Confirm case study eyebrow label: "Case study" is the current default. If a different label is preferred (e.g. "Selected work" or "Case study — NDA"), update the `eyebrow` prop default in `CaseStudyLayout.astro`.
- Confirm mobile pill default label: "Sections" is currently hardcoded in `MobileNavPill.astro`. Phase 4 will replace this with the active section name.

## Next phase
Phase 3C builds the four real case study pages (Asociación Cultural Checa, Family Space, List Interface, Required Field Indicator) using `CaseStudyLayout.astro` and the component contracts documented above. `case-study-test.astro` is deleted when Phase 3C's first real case page lands.
