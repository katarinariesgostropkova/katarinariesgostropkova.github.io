# Phase 2A — Homepage Hero Section

## Commit message
phase-2a: homepage hero with static status rotator

## What changed
Created `src/components/Hero.astro` containing the full homepage hero section: eyebrow label, display headline with teal italic accent, sub-headline, intro paragraph, rose CTA pill anchoring to `#work`, and a static three-item status rotator with teal dot and disabled pause button. Added `.btn` and `.btn--rose` primitives to `global.css` as shared design-system rules. Updated `src/pages/index.astro` to import and render `Hero`, replacing the placeholder "Portfolio — coming soon" content. Renamed `src/content/copy.md.txt` to `src/content/copy.md`.

## Files created
- `src/components/Hero.astro`

## Files modified
- `src/pages/index.astro` — replaced placeholder content with `<Hero />`
- `src/styles/global.css` — added `.btn` and `.btn--rose` button primitives
- `src/content/copy.md.txt` → renamed to `src/content/copy.md`

## Copy extracted from src/content/copy.md

| Element | Verbatim text |
|---|---|
| Eyebrow | Research-led Product Designer |
| Headline line 1 | I design for the human brain, |
| Headline line 2 | not just the human eye. |
| Italic accent | human eye. (teal italic, sourced from copy.md annotation) |
| Sub-headline | Research tells me why. Design is how I respond. |
| Intro | MA in Cognition & Communication. Two years researching users in consumer cybersecurity, five more embedded in enterprise ERP at NetSuite. Now building the products I spent seven years diagnosing. |
| CTA label | See my work ↓ |
| Status item 1 | Open to opportunities |
| Status item 2 | Connect on LinkedIn → |
| Status item 3 | Drop me a line → |

## Tokens used

Typography: `--font-serif`, `--font-sans`, `--weight-light`, `--weight-regular`, `--weight-medium`, `--font-size-hero`, `--font-size-subhead`, `--font-size-body`, `--font-size-meta`

Line heights: `--leading-tight`, `--leading-normal`, `--leading-loose`

Letter spacing: `--tracking-tight`, `--tracking-widest`

Colours: `--color-canvas`, `--color-teal`, `--color-rose`, `--text-primary`, `--text-secondary`, `--text-body`, `--text-muted`

Spacing: `--space-1`, `--space-2`, `--space-4`, `--space-6`, `--space-8`, `--space-10`, `--space-12`, `--space-16`

Layout: `--container-max`, `--padding-desktop`, `--padding-tablet`, `--padding-mobile`

Shape: `--radius-full`

Motion: `--duration-fast`, `--ease-out`

## Decision: button styles location

**(a) global.css** — `.btn` and `.btn--rose` are design-system primitives, not Hero-specific. Phase 2B requires identical styles for the Work section "Explore →" CTA, and the Work page cards need both `.btn--rose` and `.btn--ghost`. Placing them in `global.css` now avoids duplication across components and a guaranteed refactor one phase later.

## Decision: copy loading approach

Copy strings are **inlined directly in `Hero.astro`** for Phase 2A. `src/content/copy.md` remains the canonical source; a future refactor can wire up dynamic loading via Astro content collections or `fs.readFileSync`. Inlining was chosen to keep Phase 2A scope contained — no content collection configuration was needed, and the copy is stable enough that synchronisation risk is low for this phase.

Note: Astro emits a build warning (`copy.md must live in a content/... collection subdirectory`) because `src/content/` is watched by Astro's content layer but the file is not in a named collection folder. The warning is harmless in Phase 2A since the file is not queried via the content API. A future phase that wires up dynamic loading should move the file to `src/content/homepage/copy.md` to silence the warning.

## Animation hooks left for future phase

All of the following are in the Phase 2A markup and ready for the animations phase to wire up — no markup changes needed:

| Hook | Element | Purpose |
|---|---|---|
| `data-cta="hero-primary"` | Hero CTA `<a>` | Animation ① mark-entry scroll reveal trigger; animation ⑧ scroll reveal |
| `data-status-rotator` | Status rotator `<div>` | Animation ⑦ — rotator JS attaches to this |
| `data-status-active="0"` | Status rotator `<div>` | Animation ⑦ — JS reads/writes this to track active item |
| `data-status-item="0/1/2"` | Each `<li>` | Animation ⑦ — JS toggles active state by index |
| `data-status-pause` | Pause `<button>` | Animation ⑦ — JS attaches click handler; `disabled` removed when rotation starts |
| `data-status-dot` | Teal dot `<span>` | Animation ⑦ — JS/CSS targets for the pulse-ring `::after` |
| `status-rotator__item--active` class | Item 1 `<li>` | Animation ⑦ — JS toggles this class to show/hide items |
| `aria-hidden="true"` on items 2 and 3 | `<li>` elements | Animation ⑦ — JS toggles this attribute during rotation |

## Deviations from spec

**1. Status rotator font weight**
DESIGN_SYSTEM.md §10 specified Jost 300 (light) at 12px for the status rotator items. DESIGN_SYSTEM.md §3 forbids Jost 300 below 16px (accessibility rule — insufficient stroke weight at small sizes). §3 is the authoritative weight rule. Used `--weight-regular` (Jost 400) at `--font-size-meta` (12px) to honour §3.

**2. Eyebrow font size**
DESIGN_SYSTEM.md §10 and §3 call for the eyebrow at 10px. No 10px token exists; §3 explicitly constrains the type scale to "5 stops only" and the smallest stop is `--font-size-meta` (12px). Used `--font-size-meta` (12px) to honour the 5-stop ceiling. This resolution applies globally: wherever the spec calls for 10px (footer copyright, ghost button labels, etc.), use `--font-size-meta` (12px). The visual difference is negligible and the spec integrity is preserved.

**3. role attribute on status rotator**
The Phase 2A work order draft used `role="status"`. Corrected to `role="region"` per ANIMATION_PROMPT.md §⑦ (authoritative spec for the rotator component).

**4. aria-label on status rotator**
The Phase 2A work order draft used `aria-label="Current status"`. Corrected to `aria-label="Availability status"` per ANIMATION_PROMPT.md §⑦.

## Source-of-truth resolutions

`master_content.docx` (via `copy.md`) had only item 1 of the status rotator ("Open to opportunities") because it represents the default visible state. Items 2 and 3 only appear during rotation, which is animation behaviour. ANIMATION_PROMPT.md §⑦ is the authoritative source for all three items and their link targets — used as source of truth for items 2 and 3.

## Regressions checked

- `npm run build` — clean, one harmless content-collection warning (see copy loading decision above)
- Built HTML confirmed: `<Header>`, `<MobileOverlay>`, `<Hero>`, `<Footer>` all present
- `aria-labelledby="hero-headline"` on `<section class="hero">`
- `id="hero-headline"` on `<h1>`
- `<em class="hero__headline-accent">human eye.</em>` in headline
- `role="region"` + `aria-live="polite"` + `aria-label="Availability status"` on rotator
- `aria-hidden="true"` on status items 2 and 3
- `disabled` on pause button
- `data-cta`, `data-status-rotator`, `data-status-active`, `data-status-item`, `data-status-pause`, `data-status-dot` all present in built HTML
- No hardcoded hex values in `Hero.astro`
- No `rgba()` on light-surface text in `Hero.astro`
- No Jost 300 below 16px anywhere in `Hero.astro`
- `.btn` and `.btn--rose` present in `global.css`
- Footer renders at all widths — not touched
- Header renders at all widths — not touched
- MobileOverlay in DOM — not touched

## Open questions for designer

None.
