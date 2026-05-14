# CLAUDE.md
# Katarina Riesgo Stropkova — Portfolio Website
# Technical Contract & Guardrails for Claude Code
# ─────────────────────────────────────────────────────────────
# Read this file completely before writing any code.
# When in doubt, re-read it. If the answer is not here,
# check the companion documents listed in §1. If still
# unclear, STOP and ask. Do not infer. Do not improvise.
# ─────────────────────────────────────────────────────────────


---


## 0. PRIME DIRECTIVES

These override everything else. No exceptions.

1. **Do not invent.** If a value, component, or behaviour is not defined in this file or a companion document, ask before building.
2. **Do not refactor.** Fix only what the current task explicitly touches. Leave all other files exactly as they are.
3. **Do not add dependencies.** The stack is closed. See §3.
4. **Do not change navigation labels or routes.** They are locked. See §6.
5. **Comments explain WHY, not WHAT.** Never describe what a line of code does. Describe why a decision was made if it is not obvious.
6. **Do not leave console.log in committed code.** Remove all debug logging before finishing a task.
7. **Commit after each component, not after each page.** Small, focused commits. One component = one commit.
8. **Once a component is signed off, do not touch it while building another.** No opportunistic refactoring. Scope creep between components causes regressions.


---


## 1. Companion Documents — Read Before Each Task

| Document | What it contains |
|---|---|
| `DESIGN_SYSTEM.md` | All CSS tokens. Single source of truth for every value. |
| `ANIMATION_PROMPT.md` | All 13 animation specs — full implementation code included. |
| `IMAGE_TREATMENTS.md` | Two image contexts. CSS, HTML, Astro components. |
| `DESIGN_DECISIONS.md` | Why every decision was made. What was rejected. |
| `DEVELOPER_HANDOFF.md` | UX rationale for all layout and interaction decisions. |

Read the relevant companion documents before writing code for any component. Not after. Before.


---


## 2. Definition of Done — Per Component

A component is not done until ALL of the following are true:

- [ ] Passes WCAG 2.1 AA contrast on all text (check against tokens in DESIGN_SYSTEM.md §2)
- [ ] All touch targets are minimum 44×44px
- [ ] Focus-visible state present on every interactive element (`2px solid #2BA5A5`, `outline-offset: 3px`)
- [ ] `prefers-reduced-motion` fallback implemented for every animation
- [ ] No hardcoded hex values, sizes, or timing values — only CSS custom property tokens
- [ ] No `console.log` statements
- [ ] No `TODO` comments without a matching item in DESIGN_DECISIONS.md §3
- [ ] Renders correctly at 375px, 768px, and 1280px
- [ ] `aria-*` attributes correct and complete
- [ ] No unused CSS
- [ ] No unused JS variables or functions


---


## 3. Tech Stack — Closed. Do Not Extend.

| Concern | Tool | Constraint |
|---|---|---|
| Framework | Astro | `output: 'static'` — no SSR, no islands |
| CSS | Vanilla CSS + custom properties | No Tailwind, no CSS-in-JS, no utility classes |
| JS | Vanilla JS | No GSAP, no anime.js, no Framer Motion, no lodash |
| Hosting | GitHub Pages | `base` in `astro.config.mjs` if subdirectory needed |
| Forms | Formspree free tier | `fetch()` POST only — no SDK, no client library |
| Fonts | Google Fonts | Cormorant Garamond + Jost only. Exact weights only. See §8. |
| Icons | Inline SVG | No icon libraries, no icon fonts |
| Images | `<picture>` WebP/JPEG | Astro `<Image>` component where applicable |

**If you believe an exception is needed: stop and ask.** Do not install anything without confirmation.


---


## 4. File & Folder Structure — Canonical

```
/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── MobileOverlay.astro
│   │   ├── LogoMark.astro              ← inline SVG only
│   │   ├── CaseStudySidebar.astro      ← accepts sections[] prop
│   │   ├── MobileNavPill.astro         ← pill + sheet + progress bar (animation ⑫)
│   │   ├── WorkCard.astro              ← /work grid card (Phase 3)
│   │   ├── WorkRow.astro               ← homepage teaser row; locked prop → locked variant
│   │   ├── WorkCardThumbnail.astro     ← IMAGE_TREATMENTS.md §1; mode: 'image'|'locked'
│   │   ├── InlineImage.astro           ← IMAGE_TREATMENTS.md §2
│   │   ├── PasswordGate.astro          ← locked case studies only
│   │   └── StatusRotator.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro            ← <head>, fonts, global CSS
│   │   ├── CaseStudyLayout.astro       ← sidebar + content split
│   │   └── NotebookLayout.astro        ← article body + right TOC
│   ├── pages/
│   │   ├── index.astro
│   │   ├── work/
│   │   │   ├── index.astro
│   │   │   ├── asociacion.astro        ← open
│   │   │   ├── required-field.astro    ← locked
│   │   │   ├── family-space.astro      ← locked
│   │   │   └── list-interface.astro    ← locked
│   │   ├── about.astro
│   │   └── notebook/
│   │       ├── index.astro
│   │       └── predicting-the-future-of-ux.astro
│   ├── data/
│   │   └── work.js                     ← homepage work teaser data; private: true → locked
│   ├── scripts/
│   │   ├── mark-entry.js               ← animation ①
│   │   ├── logo-hover.js               ← animation ②
│   │   ├── mobile-overlay.js           ← animation ③
│   │   ├── header-scroll.js            ← animation ④
│   │   ├── impact-counter.js           ← animation ⑤
│   │   ├── scroll-reveals.js           ← animation ⑧
│   │   ├── work-filter.js              ← animation ⑨
│   │   ├── sidebar-observer.js         ← animation ⑩ ⑪ (shared)
│   │   ├── mobile-nav-pill.js          ← animation ⑫
│   │   ├── timeline-animation.js       ← animation ⑬
│   │   ├── status-rotator.js           ← animation ⑦
│   │   └── email-reveal.js             ← footer masked email
│   └── styles/
│       ├── tokens.css                  ← ALL :root custom properties
│       ├── global.css                  ← resets + focus-visible
│       ├── typography.css              ← type scale utilities only
│       └── animations.css             ← prefers-reduced-motion FIRST
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── mark-light.svg
│       ├── mark-dark.svg
│       └── images/
│           ├── og-image.png
│           ├── about/
│           │   └── katarina-photo.png
│           └── work/
│               ├── non-profit/         ← checa-hero.png · asociacion-personas.png
│               ├── design-system/      ← rf-hero · rf-three-variants · rf-recognition-chart
│               ├── family-space/       ← fs-hero · fs-problem-cycle · fs-psychological-values · fs-parenting-styles
│               └── list-interface/     ← li-hero · li-redwood-ui · li-behaviour-modes · li-operational-vs-analytical
└── CLAUDE.md                           ← this file
```

**File rules:**
- One component per `.astro` file. No exceptions.
- Page-specific styles go in a `<style>` block inside the `.astro` file.
- Shared tokens live in `tokens.css` only. Never redeclare in component styles.
- One script concern per `.js` file. See the scripts map above — do not create new script files without checking if one already exists for that concern.
- Never put a `<script>` tag inline in a page file. Use `<script src="...">` or Astro's component `<script>` block.


---


## 5. CSS Rules

### 5.1 Tokens Are Non-Negotiable

Every colour, font size, weight, spacing value, border-radius, shadow, and timing value must use a CSS custom property from `tokens.css`. The only exception is `0`, `100%`, `auto`, and mathematical expressions using tokens (`calc(var(--x) + 4px)`).

```css
/* CORRECT */
color: var(--text-primary);
padding: var(--space-4) var(--space-6);
transition: opacity var(--duration-base) var(--ease-out);

/* WRONG — never */
color: #1C2B3A;
padding: 16px 24px;
transition: opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
```

If a token you need does not exist in `tokens.css`, stop and flag it. Do not create a one-off value.

### 5.2 Colour Roles — Do Not Swap

| Token | Value | Role |
|---|---|---|
| `--color-teal` | `#2BA5A5` | Information: tags, links, active states, eyebrows |
| `--color-deep-tide` | `#1C2B3A` | Structure: nav, dark surfaces, primary text |
| `--color-rose` | `#D4797A` | Action: CTAs, explore buttons, hover accents |
| `--color-linen` | `#EAE9E4` | Alt background: impact strip, image frames |
| `--color-warm-canvas` | `#F7F6F2` | Primary page background |

**Hard prohibitions:**
- `--color-rose` is **never** used as a text colour. 3.8:1 contrast fails AA.
- `--color-slate` (`#6B7A8D`) is **never** placed on `--color-deep-tide` backgrounds. 2.6:1 — critical failure.
- `rgba()` is **never** used for text on light (canvas or linen) backgrounds. Use explicit hex tokens.
- Never use `--text-subtle` (`#8A97A6`) on anything below 24px serif or any sans-serif — decorative only.

### 5.3 Typography Rules

Two families. Three weights. Five stops. These are the only valid combinations.

```
Cormorant Garamond 300      → 52px (hero), 28px (sections), 22px (case headings), 20px (card titles)
Cormorant Garamond 300 ital → pull quotes, tagline, reflections, italic accents in headlines
Jost 400                    → ALL text 15px and below. Sub-headlines 16px. Body 14px. Meta/UI 12px.
Jost 500                    → Eyebrow labels only (10px uppercase)
Jost 300                    → ONLY at 16px+ in explicitly decorative contexts (status rotator, footer tagline)
```

**Forbidden combinations — these cause accessibility failures:**
- Jost 300 below 16px → use Jost 400
- Cormorant below 20px rendered → use Jost instead
- Jost 300 on dark backgrounds at any size below 16px

### 5.4 Writing CSS

- Naming: BEM-lite. `.block`, `.block__element`, `.block--modifier`.
- Nesting: maximum 2 levels. `:hover`, `::before`, `::after` are fine. `.parent .child .grandchild` is not.
- Mobile-first. Base styles are mobile. Overrides at `@media (min-width: 768px)` and `@media (min-width: 1024px)`.
- `position: sticky` always requires an explicit `top` value. Use `var(--header-height-desktop)` or `calc(var(--header-height-desktop) + Npx)`.
- Only animate `opacity`, `transform`, and `stroke-dashoffset`. Never animate `width`, `height`, `color`, or `background-color`.
- No `!important` except inside the `prefers-reduced-motion` block.


---


## 6. Navigation — Locked Permanently

**Four routes. Four labels. Do not rename, reorder, or add.**

| Label | Route |
|---|---|
| Home | `/` |
| Work | `/work` |
| About | `/about` |
| Notebook | `/notebook` |

These labels appear in: desktop nav pill · mobile overlay · footer zone 2.

"← All work" is a contextual back link inside case study sidebars. It links to `/work`. It is not a fifth nav item.

**No CTA appears in the header at any breakpoint.** Request access appears only at: the locked case study card, and the footer.


---


## 7. Animation Rules

### 7.1 Thirteen Animations — Named, Filed, Owned

Each animation has a single owner file in `src/scripts/`. Do not implement animation logic in page files or layout files.

| # | Animation | Owner file | Trigger |
|---|---|---|---|
| ① | Mark entry sequence | `mark-entry.js` | Page load, `sessionStorage` gated |
| ② | Logo hover rotation | `logo-hover.js` | `mouseenter`, once per load |
| ③ | Mobile overlay open/close | `mobile-overlay.js` | Hamburger tap |
| ④ | Header scroll compression | `header-scroll.js` | `scrollY > 80` |
| ⑤ | Impact strip count-up | `impact-counter.js` | `IntersectionObserver` |
| ⑥ | Case row / card left accent | CSS only (`::before` + `:hover`) | hover |
| ⑦ | Status rotator | `status-rotator.js` | Auto-cycle + pause button |
| ⑧ | Scroll-triggered section reveals | `scroll-reveals.js` | `IntersectionObserver` 0.15 |
| ⑨ | Work index card filter | `work-filter.js` | Filter pill click |
| ⑩ | Case study sidebar active state | `sidebar-observer.js` | `IntersectionObserver` 0.4 |
| ⑪ | Notebook article TOC active state | `sidebar-observer.js` | `IntersectionObserver` 0.4 (same file) |
| ⑫ | Mobile pill + sheet + progress bar | `mobile-nav-pill.js` | Scroll + tap |
| ⑬ | About timeline dot animation | `timeline-animation.js` | `IntersectionObserver` 0.2 |

**Do not create new animation files.** If behaviour seems to need a new file, re-read this list first — it is likely already accounted for.

### 7.2 prefers-reduced-motion — First Rule in animations.css

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This must be the first declaration in `animations.css` before any other rule. Every animation in `ANIMATION_PROMPT.md` includes a reduced-motion fallback. Implement it. Do not skip fallbacks.

### 7.3 IntersectionObserver Rules

- Use `IntersectionObserver` for all scroll-triggered animations. Never scroll event listeners for animation purposes.
- Disconnect after firing for single-fire animations (⑤, ⑬). Do not leave live observers on elements that have already animated.
- Threshold values are specified per animation in `ANIMATION_PROMPT.md`. Do not change them.

### 7.4 sessionStorage Gating

Animation ① (mark entry) runs once per browser session. Check `sessionStorage.getItem('mark_animated')` on load. If set, skip to final state instantly. If not, run the sequence then set `sessionStorage.setItem('mark_animated', 'true')`.

The pill hint in animation ⑫ uses the same pattern with key `'pillHintSeen'`.

### 7.5 JS Animation Standards

- `requestAnimationFrame` only for frame-by-frame animation (count-up ⑤). Not for anything else.
- Debounce resize listeners at 150ms.
- `passive: true` on all scroll listeners.
- No `setTimeout` for visual transitions — use CSS `transition-delay` or `animation-delay`.
- The logo hover rotation flag (`markHovered`) is never reset — fires once per page load only.


---


## 8. Fonts — Exact Load String

Copy this exactly into `BaseLayout.astro` `<head>`. Do not modify weights. Do not add families.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```

This goes in `BaseLayout.astro` only. Nowhere else.


---


## 9. Logo Mark — Implementation Rules

- Always SVG. Never `<img>` for the logo mark at any scale above favicon.
- `LogoMark.astro` contains inline SVG for header and footer. This enables CSS animation.
- External SVG files (`mark-light.svg`, `mark-dark.svg`) for OG image and favicon only.
- ViewBox: always `0 0 120 150`.
- Option B: outer teardrop + inner teal oval (`stroke-width: 9`) + coral dot. No radial lines.
- Light surface: teardrop `fill="#1C2B3A"`.
- Dark surface: teardrop `fill="rgba(247,246,242,0.08)"` + `stroke="rgba(247,246,242,0.45)"` `stroke-width="2"`.
- Sizes: 96px hero · 48px footer zone 1 · 32px doc header · 26px desktop nav · 20px mobile nav · 18px favicon.


---


## 10. Component Props — All Must Be Typed

All Astro components must declare typed props using TypeScript interfaces.

```astro
---
interface Props {
  src: string
  alt: string
  locked?: boolean
  badge?: string
}
const { src, alt, locked = false, badge } = Astro.props
---
```

Never use untyped `Astro.props` spread. Never use `any`.


---


## 11. CaseStudySidebar — Data-Driven, Labels Are Narrative

`CaseStudySidebar.astro` accepts a `sections` prop. Section labels are part of each case study's narrative voice. Do not normalise or rename them.

**Four confirmed section arrays — copy exactly:**

```js
// /work/asociacion
[
  { id: 'opening',          label: 'The Opening' },
  { id: 'brief',            label: 'The Brief' },
  { id: 'two-audiences',    label: 'Two Audiences, One Website' },
  { id: 'design-decisions', label: 'The Design Decisions' },
  { id: 'testing',          label: 'Testing Approach' },
  { id: 'revealed',         label: 'What Testing Revealed' },
  { id: 'stands',           label: 'Where It Stands' },
  { id: 'looking-back',     label: 'Looking Back' },
]

// /work/required-field
[
  { id: 'opening',      label: 'The Opening' },
  { id: 'background',   label: 'Background' },
  { id: 'problem',      label: 'The Problem' },
  { id: 'study',        label: 'The Study' },
  { id: 'forward',      label: 'Taking it Forward' },
  { id: 'revealed',     label: 'What it Revealed' },
  { id: 'looking-back', label: 'Looking Back' },
]

// /work/family-space
[
  { id: 'opening',      label: 'The Opening' },
  { id: 'approach',     label: 'The Research Approach' },
  { id: 'found',        label: 'What We Found' },
  { id: 'pointed',      label: 'What the Research Pointed Toward' },
  { id: 'happened',     label: 'What Happened' },
  { id: 'looking-back', label: 'Looking Back' },
]

// /work/list-interface
[
  { id: 'opening',      label: 'The Opening' },
  { id: 'who',          label: 'Who We Were Designing For' },
  { id: 'what-we-did',  label: 'What We Did to Find Out' },
  { id: 'learned',      label: 'What We Learned' },
  { id: 'evolved',      label: 'How the Thinking Evolved' },
  { id: 'led',          label: 'Where the Work Led' },
  { id: 'looking-back', label: 'Looking Back' },
]
```

Each content `<section>` must have all three attributes for the shared observer to work:

```html
<section id="opening" data-title="The Opening" data-index="1">
```

### 11.1 Sidebar Active State CSS

```css
.cs-nav-item { position: relative; }
.cs-nav-item.active { color: var(--text-primary); }
.cs-nav-item.active::before {
  content: '';
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  width: 2px; height: 16px;
  background: var(--color-teal);
  border-radius: 1px;
}
```

### 11.2 Notebook Article TOC

Same component logic as case study sidebar, positioned right. Same `sidebar-observer.js`.

Section array for `/notebook/predicting-the-future-of-ux`:
```js
[
  { id: 'workshop',    label: 'The Workshop' },
  { id: 'skills',      label: 'Essential Skills' },
  { id: 'needs',       label: 'What Researchers Need' },
  { id: 'moment',      label: 'The Moment Data Misses' },
  { id: 'cannot-hear', label: 'What AI Cannot Hear' },
  { id: 'learning',    label: 'How Researchers Learn' },
  { id: 'leaves-us',   label: 'Where This Leaves Us' },
]
```


---


## 12. Image Rules

Two and only two image contexts. See `IMAGE_TREATMENTS.md` for full CSS and markup.

| Context | Component | Where used |
|---|---|---|
| Work card thumbnail | `WorkCardThumbnail.astro` | `/work` grid + homepage rows |
| Inline case study image | `InlineImage.astro` | `/work/[slug]` body |

**Hard rules:**
- Never `#FFFFFF` as image frame background. Use `--color-linen` (`#EAE9E4`).
- Screenshot always `object-fit: cover; object-position: top center` — hero section only.
- No shadows inside image frames.
- No coloured borders around images inside frames.
- Annotation colours in diagrams: `--color-teal` only.
- All `<img>` require descriptive `alt`. Decorative: `alt=""` + `aria-hidden="true"`.
- Format: WebP primary, JPEG fallback via `<picture>`.
- `loading="lazy"` on all images below the fold.

File paths: `public/assets/images/work/[case-slug]/`
Filenames: lowercase, hyphens only, no underscores, no spaces.


---


## 13. Formspree Integration

**Request access form** (inside `PasswordGate.astro`):
- Fields: name, email, short note textarea
- POST via `fetch()` to Formspree endpoint
- Success: replace form with teal-topped confirmation card in place. No redirect. No `alert()`.
- Error: inline error beneath submit button. No `alert()`.
- Endpoint URL: add as `TODO: confirm Formspree endpoint before build` until confirmed

**Footer masked email** (via `email-reveal.js`):
```js
const parts = ['katka.stropkova', '@', 'gmail.com']
const address = parts.join('')
emailEl.textContent = address
emailEl.href = 'mailto:' + address
```
- Copy button: `navigator.clipboard.writeText()`. On copy: label → "Copied ✓" for 2000ms then resets. No `alert()`.


---


## 14. Password Gate — Locked Case Studies

`PasswordGate.astro` replaces body content on locked case study pages. Inline only — not a separate page, not a modal.

- **Always visible:** case study title, subtitle, meta table.
- **Gated:** all body content sections.
- **Sidebar:** rendered at 35% opacity while gate is active.

Gate card: white, `border-radius: var(--radius-lg)`, `border-top: 2px solid var(--color-rose)`.

On correct password: remove gate, reveal content, save unlock to `sessionStorage` key `unlocked-[slug]`.
On incorrect password: inline error only. No `alert()`.
On Formspree submit success: replace form with confirmation card. Rose pill "Explore the open case →" links to `/work/asociacion`.

Pull quotes on case study pages alternate rose and teal left border to prevent visual repetition.


---


## 15. Accessibility — Non-Negotiable

WCAG 2.1 AA everywhere. Not optional.

| Requirement | Implementation |
|---|---|
| Touch targets | Minimum 44×44px — hamburger is 34px visual, use padding/`::after` |
| Focus-visible | `2px solid var(--color-teal)`, `outline-offset: 3px`, `border-radius: var(--radius-sm)` |
| Reduced motion | Respected for all 13 animations |
| Contrast — light bg | Minimum `--text-muted` (4.6:1) for meaningful text |
| Contrast — dark bg | Minimum `--text-dark-045` (4.6:1) for meaningful text |
| Decorative elements | `aria-hidden="true"` on arcs, ghost marks, decorative SVGs |
| Status rotator | `aria-live="polite"`, `role="region"`, pause button keyboard-accessible |
| Mobile overlay | `role="dialog"`, `aria-label="Main navigation"`, focus trap, Escape closes |
| Hamburger | `aria-expanded` toggled, `aria-label` set |
| External links | `rel="noopener noreferrer"` + "(opens in new tab)" in `aria-label` where unclear |
| Password gate | `role="dialog"`, `aria-label`, focus moves to gate on load |
| Password input | `type="password"`, proper `<label>` |


---


## 16. Confirmed Build Values

```
Domain:        katarinariesgostropkova.github.io
Email:         katka.stropkova@gmail.com
LinkedIn:      https://www.linkedin.com/in/katarinastropkova/
Tech stack:    Astro · Vanilla CSS · Vanilla JS · Google Fonts · Formspree
Hosting:       GitHub Pages
```

**Astro config:**
```js
// astro.config.mjs
export default defineConfig({
  output: 'static',
  site: 'https://katarinariesgostropkova.github.io',
})
```

**OG meta (in BaseLayout.astro):**
```html
<meta property="og:image" content="https://katarinariesgostropkova.github.io/assets/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```


---


## 17. Session Boundary Rules

At the end of every session, the codebase must be in this state:

- No commented-out code
- No `console.log` statements
- No `TODO` comments not tracked in `DESIGN_DECISIONS.md §3`
- No broken imports
- No partially implemented components (finish or revert — never leave half-built)
- No hardcoded values that should be tokens
- All new files committed: `feat: [ComponentName] — [one line description]`


---


## 18. Anti-Pattern Reference

If you are about to do any of the following, stop.

| Anti-pattern | Correct approach |
|---|---|
| Hardcoding any hex value | CSS custom property token from `tokens.css` |
| Installing any library | Vanilla JS/CSS. Ask if genuinely blocked. |
| Adding a third font | Cormorant Garamond + Jost only |
| Using `<img>` for the logo mark | Inline SVG in `LogoMark.astro` |
| `display: none` for filter or gate state | `opacity` + `pointer-events: none` |
| Scroll event listener for animation | `IntersectionObserver` |
| Inline `<script>` in a page file | `src/scripts/` files only |
| `alert()` for any user message | Inline DOM messages only |
| CSS nesting beyond 2 levels | Flatten with BEM naming |
| Slide-in panel for mobile nav | Full-screen Deep Tide overlay |
| CTA in the header | Footer and locked card only |
| Cormorant below 20px | Use Jost 400 instead |
| Jost 300 below 16px | Use Jost 400 instead |
| `rgba()` for text on light backgrounds | Explicit hex token |
| `--text-muted` on Deep Tide background | `--text-dark-*` tokens |
| Animating `width`, `height`, `background-color` | `transform` and `opacity` only |
| `console.log` in committed code | Remove before committing |
| Refactoring a signed-off component | Current task scope only |
| New script file for an existing concern | Check §7.1 script map first |
| Normalising case study section labels | Labels are narrative — copy from §11 exactly |
| Shadows inside image frames | Prohibited — see IMAGE_TREATMENTS.md |
| `#FFFFFF` as image frame background | `--color-linen` (`#EAE9E4`) |
| `rgba()` opacity values below `--text-dark-045` | Absolute floor — nothing below 0.45 on dark surfaces |


---


## 19. How To Add a New Case Study

1. Create `src/pages/work/[new-slug].astro` using `CaseStudyLayout.astro`
2. Define `sections` array — labels must come from the designer, not be invented
3. Each `<section>` needs `id`, `data-title`, and `data-index` attributes
4. Add to `src/pages/work/index.astro` grid with correct `status`, `tags`, and `locked` prop
5. Add to homepage `WorkRow` list if it appears as a teaser
6. Add images to `public/assets/images/work/[new-slug]/`
7. If locked: `PasswordGate.astro` replaces body content

**No other files need touching.** If you are editing a file not in this list, stop and reconsider.


---


*This file is the implementation contract.*
*When in doubt, the answer is here or it requires a conversation.*
*Last updated: May 2026*
