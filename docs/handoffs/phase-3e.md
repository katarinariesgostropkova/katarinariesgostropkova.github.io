# Phase 3E — About Page

## Commit message
```
phase-3e: about page with timeline, story columns, and recommendations
```

## What changed
The About page at `/about` is now fully built and live. A new `about` content collection was added to `src/content.config.ts` with a rich Zod schema covering all six page sections. All content lives in the frontmatter of `src/content/about/main.md` — the markdown body is intentionally empty because the page's structure is too sectioned for free-form prose. Two new components were created: `AboutTimeline.astro` renders the five-entry vertical timeline with rose (education) and teal (research) dots and data hooks for Phase 4 animation; `RecommendationCard.astro` handles both the live card (Lucie Pospisilova) and the two dashed-border placeholder states through a single `state` prop. The `about.astro` page route assembles all six sections — hero, timeline, story columns, mid-page CTA, recommendations, bottom CTA — reads entirely from the content collection, and carries five `data-*` animation hooks throughout for Phase 4. `ASSETS.md` Part 4.2 was corrected from `.jpg` to `.png` to match the actual file on disk.

## Files created
- `src/content/about/main.md` — all page content in frontmatter; body empty
- `src/pages/about.astro` — page route; six sections; reads from `about` collection
- `src/components/AboutTimeline.astro` — five-entry vertical timeline with rose/teal dots
- `src/components/RecommendationCard.astro` — live and placeholder card states
- `docs/handoffs/phase-3e.md` — this file

## Files modified
- `src/content.config.ts` — added `about` collection with full Zod schema; updated export
- `specs/ASSETS.md` — Part 4.2: `katarina-photo.jpg` → `katarina-photo.png`

## Files deleted
- None. `src/content/about.md` did not exist on disk — no move or delete was needed.

## Content extracted

### Timeline entries (verbatim from frontmatter)
1. `2011–2014 · BA Sociology & Media · Goldsmiths, London` — dotColor: rose
2. `2014–2016 · MA Cognition & Communication · Univ. of Copenhagen` — dotColor: rose
3. `2017–2019 · Qualitative Research Manager · Ipsos` — dotColor: teal
4. `2019–2020 · UX Researcher · Avast` — dotColor: teal
5. `2021– · Senior UX Researcher · Oracle NetSuite` — dotColor: teal

### Story column eyebrows + bodies
**THE RESEARCH BEGINNING** — "My first real encounter with UX was at Ipsos, running usability studies on infotainment systems — observing how drivers interacted with technology while managing one of the most cognitively demanding tasks there is. Context is everything. Cognitive load is the real obstacle. That never left me."

**THE UX YEARS** — "From there, two years in consumer cybersecurity at Avast, then five years at Oracle NetSuite — running discovery research, mixed-method studies and ideation workshops across a wide range of users, from finance admins to operations teams. Years of translating human behaviour into product decisions."

**THE TRANSITION** — "Then something shifted — in me and in the industry at the same time. AI began collapsing the distance between roles. I could prototype, test, and move from insight to interface without handing off to someone else. UX research alone was never quite enough to own the impact I wanted to have. Now I have the tools and seven years of behavioural research behind me to be the full package. That's why product design."

### Lucie Pospisilova recommendation
- Initials: LP · Name: Lucie Pospisilova
- Subtitle: UX Research & ResearchOps · Avast
- Trait: Research depth
- Quote: "Her ability to formulate actionable insights expanded our project approaches and techniques — and elevated the quality of our work."

## Designer resolutions applied
- 5-entry timeline (DESIGN_DECISIONS §2.4 wins over any earlier 3-entry draft)
- "What stayed with me" reflections SKIPPED entirely per designer decision
- Recommendations: 1 live card (Lucie) + 2 dashed-border placeholder cards
- Photo extension corrected: ASSETS.md `.jpg` → `.png`; reference in `main.md` uses `.png`

## New components
- `AboutTimeline.astro` — props: `entries: Array<{ dates, role, institution, dotColor }>`
- `RecommendationCard.astro` — props: `state: 'live' | 'placeholder'`, `name?`, `initials?`, `subtitle?`, `trait?`, `quote?`

## Tokens used
| Token | Component | Role |
|---|---|---|
| `--font-serif` / `--weight-light` / `--font-size-section` | All headings | Cormorant 300 28px |
| `--font-sans` / `--weight-regular` / `--font-size-subhead` | Hero body, story body | Jost 400 16px |
| `--font-sans` / `--weight-medium` / `--font-size-meta` | Eyebrows, dates | Jost 500 12px uppercase |
| `--font-sans` / `--weight-regular` / `--font-size-body` | Card quote, institution | Jost 400 14px |
| `--color-teal` | Eyebrows, dates, teal dots | Information role |
| `--color-rose` | Rose timeline dots | Education signifier |
| `--color-canvas` | Page background, live card | Page surface |
| `--color-linen` | Hero photo frame | Image frame treatment |
| `--color-teal` (at 0.15 opacity) | Avatar background | Inline `rgba()` on non-text element |
| `--text-primary` | Headlines | AAA contrast |
| `--text-secondary` | Hero body, story body | AA contrast |
| `--text-body` | Card quote, institution | AA contrast |
| `--text-muted` | Card subtitle, lock icon | AA contrast |
| `--tracking-widest` | Eyebrows | `0.20em` |
| `--tracking-wide` | Timeline dates | `0.08em` |
| `--space-*` | All spacing | Per spec |
| `--radius-md` | Photo frame, photo image | `8px` |
| `--radius-lg` | Recommendation cards | `12px` |
| `--leading-snug` | Headlines | `1.20` |
| `--leading-normal` | Body text | `1.65` |
| `--btn-ghost-border` / `--btn-ghost-text` | Bottom CTA button | Via global `.btn--ghost` |
| `--btn-radius` / `--btn-min-height` | All buttons | Via global `.btn` |
| `--container-max` / `--padding-*` | Layout containers | `900px` max |

## Animation hooks left for Phase 4
- `data-about-hero` on the hero `<section>` — for scroll reveal (animation ⑧)
- `data-about-timeline` on `<section class="timeline">` inside `AboutTimeline.astro` — for dot animation trigger (animation ⑬)
- `data-timeline-entry` on each of the 5 entry `<div>` elements — per-dot targets (animation ⑬)
- `data-about-story` on the story paragraphs `<section>` — for scroll reveal (animation ⑧)
- `data-recommendations` on the recommendations `<section>` — for staggered reveal (animation ⑧)

## Deviations from spec — accepted exceptions
- `20px` literal on timeline role title — same one-off pattern as `work-card-title` from Phase 2C; sits between `--font-size-subhead` (16px) and `--font-size-section` (28px) with no canonical token
- `18px` literal on recommendation card name — same rationale; no token between body (14px) and section (28px) for small card headings
- "What stayed with me" reflections mentioned in DESIGN_DECISIONS §2.4 NOT implemented — explicitly skipped per designer decision in Phase 3E brief
- `src/content/about.md` did not exist on disk — CREATE rather than MOVE; no deletion performed

## Regression checks
- `npm run build` — 7 pages built, zero warnings, zero errors
- `/about/index.html` generated
- `/` (homepage) — builds correctly
- `/work` — builds correctly
- `/work/non-profit`, `/work/family-space`, `/work/list-interface`, `/work/required-field` — all build correctly
- Header `Nav.astro` already contained `/about` in `navItems` with `isActive()` logic — no modification needed; active state works automatically
- No new script files created; no animation logic added

## Open questions for designer
- Cards 2 and 3 recommendation placeholders: when will real recommendations be supplied? Not blocking — the placeholder state is intentional and the component is ready to receive props.
- Bottom CTA body copy: Resolution 7 specified one wording ("Open to senior research…") but `Footer.astro` uses a slightly longer version ("I'm open to…. If that sounds like your team, reach out."). Used the Footer version per the spec's own tiebreaker instruction. Confirm this is the intended final wording.

## Next phase
Phase 3F (Notebook page) — index at `/notebook` + first article at `/notebook/predicting-the-future-of-ux`. After 3F: Phase 4 (all 13 animations) and launch.
