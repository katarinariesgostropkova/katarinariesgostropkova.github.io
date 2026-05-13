# DESIGN_DECISIONS.md
# Katarina Riesgo Stropkova — Portfolio Website
# Design Decisions Log — Final, May 2026
# ─────────────────────────────────────────────────────────────
# Records every design decision — what was decided, why,
# and what was rejected.
# Companion to: DESIGN_SYSTEM.md · DEVELOPER_HANDOFF.md
#               IMAGE_TREATMENTS.md · ANIMATION_PROMPT.md
# ─────────────────────────────────────────────────────────────


---


## PART 1 — GLOBAL COMPONENTS ✓ ALL CONFIRMED


### 1.1 Brand Identity ✓

Personal name as brand — not a studio name. "The Neural Leaf" concept explored and discarded.

Role title: "Research-Led Product Designer" — signals research depth, claims design title. Appears as eyebrow on homepage hero and in meta description.

Tagline: "Designed by a researcher. Built with curiosity." — footer zone 2 only. Cormorant italic, low opacity. Closing thought, not a CTA.


### 1.2 Logo Mark ✓

Option B — heavier oval stroke (stroke-width 9). Original thin stroke disappeared at small sizes in Figma Make output.

Three elements:
- Outer teardrop `#1C2B3A` — research container, the lens
- Inner teal oval `#2BA5A5` stroke-width 9 — insight emerging from research
- Coral dot `#D4797A` r=8 — the human, the user

Two SVG versions: light surface (solid fill) / dark surface (ghost fill + outline).

Sizes: 96px hero · 48px footer z1 · 32px doc header · 26px desktop nav · 20px mobile nav · 18px favicon.

Rejected: radial lines. Rejected: googly eye cursor animation — logo hover rotation achieves the same "mark is alive" effect without uncanny valley risk.


### 1.3 Navigation ✓

Final nav — locked: **Home · Work · About · Notebook**

History: "How I work" → "About" · "Field Notes" → "Research Lab" → "Notebook"

**Desktop header:** mark + name left · floating pill nav centred · **nothing right.**
**Mobile header:** mark + name left · **hamburger only** · no CTA pill.

Why nothing right in header: "Request access" removed from all header breakpoints at all screen sizes. Visitor at landing has no context for the ask. Request access appears in exactly two places: beside the locked case study card, and in the footer.

Floating pill nav: `position: absolute; left: 50%; transform: translateX(-50%)` — sits above the page as a tool.

Hamburger: 34px Deep Tide circle, two asymmetric lines (13px / 9px right-aligned). Transforms to ✕ on open.

Mobile overlay: full-screen Deep Tide, nav items in Cormorant 300 24px — editorial serif in nav context is deliberate. Ghost mark at 6% opacity in background. Cascade order: Home → Work → About → Notebook → Request access row.


### 1.4 Typography System ✓

Two families: Cormorant Garamond (headlines, pull quotes, tagline) · Jost (all UI, body, labels, buttons).

**Critical weight rule:** Jost 300 permitted only at 16px+ in decorative contexts (status rotator, footer tagline). All text at 15px and below uses Jost 400. Original spec used Jost 300 throughout — Figma Make output revealed near-invisibility at small sizes, failing WCAG.

Cormorant minimum: 20px rendered. Never below.

Five type stops only — no intermediate sizes:
- 52px — display, Cormorant 300, hero only
- 28px — headline, Cormorant 300, sections and footer
- 16px — body-lg, Jost 400, sub-headlines and primary body
- 14px — body-sm, Jost 400, intro text, excerpts, descriptions
- 12px — UI, Jost 400, meta, labels, nav, buttons

Why opacity-based text colours were abandoned: rgba values looked different on every screen. All body text now uses explicit hex tokens verified against WCAG.

```
--text-primary:    #1C2B3A  10.4:1 AAA
--text-secondary:  #3D4F61   6.8:1 AA
--text-body:       #4E6174   5.4:1 AA
--text-muted:      #6B7A8D   4.6:1 AA — Jost 400 12px minimum
--text-subtle:     #8A97A6   3.5:1    — decorative only
```


### 1.5 Colour System ✓

Three accent colours, three distinct roles — never swap:
- Teal `#2BA5A5` — information: eyebrows, tags, active states, links
- Deep Tide `#1C2B3A` — structure: nav pill, dark surfaces, primary text
- Rose `#D4797A` — action: primary CTA buttons, explore buttons, hover accents

Rose became the action colour after the impact strip moved from Deep Tide to Linen. The three-role system means every CTA on every page uses the same colour signal.

Slate `#6B7A8D` on Deep Tide forbidden: 2.6:1 — critical failure.
Rose as text forbidden: 3.8:1. Buttons and mark decorative use only.

Impact strip background: Linen `#EAE9E4` — Deep Tide was too heavy, cut the page in two.


### 1.6 Motion System ✓

Philosophy: calm and purposeful with rare moments of surprise. No bounce, elastic, spring, or layout property animation. `prefers-reduced-motion` always respected — global rule is first in `animations.css`.

**Thirteen animation items confirmed** — full specs in ANIMATION_PROMPT.md:

| # | Animation | Pages |
|---|-----------|-------|
| ① | Mark entry sequence — sessionStorage gated, 1000ms | All (first load) |
| ② | Logo hover rotation — 360°, 800ms, once per load | All |
| ③ | Mobile hamburger overlay — flood, cascade, ghost mark | All |
| ④ | Header scroll compression — scrollY > 80px, 200ms | All |
| ⑤ | Impact strip count-up — IntersectionObserver | Homepage |
| ⑥ | Case row + work card left rose accent — scaleY hover | Homepage, /work |
| ⑦ | Status rotator — 3 items, 4s cycle, pause button | Homepage |
| ⑧ | Scroll section reveals — translateY, IntersectionObserver 0.15 | All |
| ⑨ | Work index card filter — opacity-based, no layout shift | /work |
| ⑩ | Case study sidebar active state — IntersectionObserver 0.4 | /work/[slug] |
| ⑪ | Notebook article TOC active state — IntersectionObserver 0.4 | /notebook/[slug] |
| ⑫ | Mobile pill + bottom sheet + progress bar — one observer | /work/[slug], /notebook/[slug] |
| ⑬ | About page timeline dot animation — IntersectionObserver 0.2 | /about |


### 1.7 Footer ✓

Two zones divided by teal gradient line.

**Zone 1 — editorial + contact:**
- Eyebrow "LET'S WORK TOGETHER": Jost 500 10px uppercase `#2BA5A5`
- Headline: Cormorant 300 26px, `rgba(247,246,242,1.00)`
- Body text: Jost 400 13px `rgba(247,246,242,0.72)`
- Masked email (`katka.stropkova@gmail.com`) + Copy button
- LinkedIn pill → `https://www.linkedin.com/in/katarinastropkova/`
- Request access outline pill
- NDA note: Jost 400 italic 11px `rgba(247,246,242,0.50)`

**Zone 2 — functional:**
- Dark mark + name + tagline: Cormorant italic 11px `rgba(247,246,242,0.50)`
- Nav links: Jost 400 11px `rgba(247,246,242,0.65)`
- Copyright: Jost 400 10px `rgba(247,246,242,0.45)`

Footer typography was audited and corrected — six of nine elements were originally failing contrast. All now pass WCAG AA.


### 1.8 Accessibility ✓

WCAG 2.1 AA minimum throughout. All touch targets 44×44px minimum. Focus-visible: `2px solid #2BA5A5`, offset 3px. Status rotator has pause button (WCAG 2.2.2). Mobile overlay: `role="dialog"`, `aria-label="Main navigation"`, focus trap, Escape closes.


---


## PART 2 — PAGE BY PAGE ✓ ALL PAGES DESIGNED


### 2.1 Homepage — / ✓

Structure: Hero → Impact Strip → Work → Footer.

**Hero:** Single column, left-weighted. No right column. No photo. No animations — handled by Claude Code.
- Eyebrow: "Research-Led Product Designer" teal
- Headline: "I design for the human brain, not just the human eye." — "human eye." italic teal
- Sub: "Research tells me why. Design is how I respond." Jost 400 16px `#3D4F61`
- Intro: three sentences. Jost 400 14px `#4E6174`
- One CTA: rose pill "See my work ↓" anchors to `#work`
- Status rotator: teal dot + three items. Item 2 → LinkedIn. Item 3 → mailto. Static in Figma Make, animated in Claude Code.

**Impact Strip:** Linen `#EAE9E4` background.
- 7 yrs · MA (in rose) · 3 continents · Research → Roadmap pill
- MA in rose: academic credential is the differentiator
- Research → Roadmap: Deep Tide pill with teal arrow — label not metric, does not count up
- Decorative teal arc: `aria-hidden`, `pointer-events: none`

**Work Section:** id="work". Two case rows.
- Row 1 (non-profit open): laptop mockup PNG thumbnail. Rose "Explore →" pill.
- Row 2 (locked): Deep Tide thumbnail. "Locked" chip. Ghost "Request access" button.
- Left rose `::before` accent scaleY on hover, 300ms.

Removed: "Request access" from hero, career timeline, Field Notes CTA, second CTA button.


### 2.2 Work Index — /work ✓

Grid: 3 columns. Featured card (non-profit) spans all 3 at top. Three locked cases below in equal columns.

Four cases confirmed:

| Title | Slug | Status | Tags |
|-------|------|--------|------|
| Building a public presence from scratch | `/work/asociacion` | Open | Product Design, Web Development |
| The Required Field Indicator | `/work/required-field` | Locked | UX Research, Design Systems |
| Family Space · Parental Controls | `/work/family-space` | Locked | UX Research, Mixed Methods |
| List Interface · Designing for Clarity at Scale | `/work/list-interface` | Locked | UX Research, Product Thinking |

"Product Thinking" not "Product Design" for List Interface — honest about stopping short of full design execution.

Filter: opacity-based (`opacity: 0.25` non-match), no layout shift. `data-tags` / `data-filter` attributes. No page reload.

Locked card thumbnails — abstract compositions on Deep Tide:
- Required Field: bar chart bars, teal dominant, rose accent
- Family Space: horizontal bars, teal and rose alternating
- List Interface: columnar table rows, header row in teal

Page hero:
- Headline: "Research that shaped products. Design that shipped."
- Sub: "Some work is research-focused. Some goes all the way to delivery. All of it is grounded in evidence."


### 2.3 Case Study Pages — /work/[slug] ✓

**Shell — identical across all cases:**
- Optional hero image above meta table (see below)
- Meta table: Company · My role · Team · Timeline
- Sticky left sidebar navigation
- Pull quote (teal left border, linen tint, Cormorant italic 16px)
- Body text: Jost 400 14px `#4E6174`
- Section headings: Cormorant 300 22px with rose section number (Jost 500 10px `#D4797A`) beside it
- Inline image frames for all artifacts
- NDA note at bottom: "Some work is protected by NDA — happy to walk you through additional detail in a conversation."

**Hero image — content-driven conditional:**
If `heroImage` exists in case study data → render full-width image above meta table.
If not → render nothing, go straight to meta table.
Currently only non-profit has a hero image (`asociacion-mockup.png`). Locked cases have none — not a design decision, a content decision. Template accommodates both.

Non-profit hero: `background: #000`, image fills full width, `border-radius: 12px`. Caption beneath in italic Jost 400 11px `#6B7A8D`: "asociacion-cultural-checa-de-galicia.es — live site, open to explore"

**Sidebar — data-driven per case:**
`CaseStudySidebar` Astro component receives sections array as prop. Section names unique per case — never normalised.

All four confirmed section structures:

*Non-profit:*
The Opening → The Brief → Two Audiences, One Website → The Design Decisions → Testing Approach → What Testing Revealed → Where It Stands → Looking Back

*Required Field:*
The Opening → Background → The Problem → The Study → Taking it Forward → What it Revealed → Looking Back

*Family Space:*
The Opening → The Research Approach → What We Found → What the Research Pointed Toward → What Happened → Looking Back

*List Interface:*
The Opening → Who We Were Designing For → What We Did to Find Out → What We Learned → How the Thinking Evolved → Where the Work Led → Looking Back

Note: sidebar labels shortened where headings would wrap — "Testing With Real Users and Synthetic Ones" → "Testing Approach", "What We Found — and What It Changed" → "What We Found", "What Happened and Where It Landed" → "What Happened". Full headings used in page content.

**Mobile navigation — sticky pill + bottom sheet:**
On mobile the desktop sidebar is replaced by: a 2.5px teal reading progress bar at viewport top + a sticky pill below the nav showing current section + a bottom sheet listing all sections. One IntersectionObserver, three outputs (desktop sidebar, mobile pill text, bottom sheet active state). Full spec in ANIMATION_PROMPT.md item ⑫.

**Password gate — locked cases:**
Inline on the case study page — not a separate page. Title, subtitle, and meta table always visible. Sidebar shown at 35% opacity. Gate card replaces body content.

Gate card:
- White card, `border-radius: 12px`, `border-top: 2px solid #D4797A`
- Header: Deep Tide circle lock icon (36px) with rose dot + title "This case study is available on request." — no subtitle
- Form: Name + Email (two-column grid) · "Who are you and why are you reaching out?" textarea · rose pill "Request access" + italic note beside button
- Divider: "Already have a password?"
- Password row: input + "Unlock →" ghost button
- After submission: teal-topped confirmation card + rose "Explore the open case →" button

Implementation: Formspree. Free tier, no branding, 50 submissions/month. Stays on own domain. Katarina replies manually with password within 24 hours.

**Pull quote alternation:**
Case studies alternate rose and teal left border on pull quotes within the same page — prevents visual repetition.

**Case study subtitles:**
- Non-profit: "Design Decisions Under Real Constraints"
- Required Field: "When Evidence Meets Organisational Inertia"
- Family Space: "Designing for the Forgotten User"
- List Interface: "Designing for Clarity at Scale"


### 2.4 About Page — /about ✓

Structure: Opening → The Path Here (timeline + story) → From People I've Worked With → CTAs.

**Opening:** Single column left, photo right. Photo appears here and only here.
- Headline: "My story didn't start with Figma. It started with people." — "people." italic teal
- Body: opening paragraph, Jost 400 16px `#3D4F61`
- Photo: real photo provided. Linen frame, aspect-ratio 3/4, border-radius 12px.

**Timeline — five entries, no legend:**
- Rose dots: education (BA, MA) — rose signals the academic foundation that made everything else possible
- Teal dots: research roles (Ipsos, Avast, NetSuite)
- No legend — dot colours self-evident from dates and institution names
- Entries:
  - 2011–2014 · BA Sociology & Media · Goldsmiths, London
  - 2014–2016 · MA Cognition & Communication · Univ. of Copenhagen
  - 2017–2019 · Qualitative Research Manager · Ipsos
  - 2019–2020 · UX Researcher · Avast
  - 2021– · Senior UX Researcher · Oracle NetSuite
- NetSuite "2021–" with no end year — open-ended without claiming "present" (transition not yet public)

**Story paragraphs — three columns, no section numbers:**
Numbers removed — added formality without aiding navigation. Teal eyebrow labels: The Research Beginning · The UX Years · The Transition. "What stayed with me" label in rose at 70% opacity — owned personal voice. Reflections in Cormorant italic, slate colour.

**Recommendation cards:**
- Three cards in grid
- Card 1 (live): Lucie Pospisilova, UX Research & ResearchOps · Avast. Trait: "Research depth". Quote: "Her ability to formulate actionable insights expanded our project approaches and techniques — and elevated the quality of our work." Avatar: "LP" initials placeholder until photo provided.
- Cards 2 and 3: dashed border placeholder "Recommendation coming soon" — to be filled when collected
- No LinkedIn embed — manually curated quotes, styled as cards. More readable, fully controllable.

**CTAs:**
- Mid-page: Cormorant italic "Seven years of research. Now designing with it." + rose pill "View selected work →"
- Bottom: "Let's work together" headline + ghost "Connect on LinkedIn →" → `https://www.linkedin.com/in/katarinastropkova/`

**Rose accent placements:** education timeline dots · "What stayed with me" labels · mid-page CTA button.


### 2.5 Notebook Page — /notebook ✓

**Index (/notebook):**
- Eyebrow: "Writing · Experiments · Tools" in teal
- Headline: "Notebook" — Cormorant 300 48px, "book" in italic rose
- Sub: "Thinking out loud — articles, frameworks and observations from the field."
- Transparency note: teal pill — "Original writing, proofread only. Not AI-generated."
- Article list: editorial rows. Date (80px) · content (1fr) · meta (auto).
- One real article live. One muted "More coming soon" placeholder at 35% opacity.
- Content type tags: Article = rose · Experiment = rose · Tool = slate. Unified chronological list.
- Bottom CTA: Cormorant italic + rose pill "See my work →"

**Article page (/notebook/[slug]):**
- Breadcrumb eyebrow: "← Notebook · Article"
- Meta bar: author · date · read time · category tags in rose
- Two-column layout: body text (1fr) + right sidebar TOC (200px)
- Pull quotes: teal left border consistently (single article type, no alternation needed)
- Ghost quotation mark `::before` on pull quotes — Cormorant 300 80px, opacity 0.055
- Section headings: Cormorant 300 22px with rose section number (Jost 500 10px) — same treatment as case studies
- Mobile: same sticky pill + bottom sheet as case studies (one component)
- End CTAs: rose "See my work →" + ghost "Connect on LinkedIn →"

**First article confirmed:**
- Title: "Predicting the Future of UX"
- Subtitle: "An Analysis of Changes in the UX Research Ecosystem"
- Slug: `/notebook/predicting-the-future-of-ux`
- Date: May 2026 · 8 min read
- Tags: UX Research · AI · Industry Perspective
- TOC: The Workshop · Essential Skills · What Researchers Need · The Moment Data Misses · What AI Cannot Hear · How Researchers Learn · Where This Leaves Us
- Note: verify User Interviews State of User Research Report 2025 (80% statistic) before publishing


---


## PART 3 — OUTSTANDING ITEMS


### 3.1 Content Still Needed

| Item | Needed for | Status |
|------|-----------|--------|
| Photo of Katarina | About page opening section | ✓ Provided |
| Email address | Footer masked email, status rotator item 3 | ✓ `katka.stropkova@gmail.com` |
| LinkedIn URL | Footer button, status rotator item 2 | ✓ `https://www.linkedin.com/in/katarinastropkova/` |
| Domain | OG image, favicon, canonical URLs | ✓ `katarinariesgostropkova.github.io` |
| Laptop mockup PNG | Non-profit card thumbnail + case study hero | ✓ `asociacion-mockup.png` provided |
| Artifact images — Required Field | Three-variant mockup + recognition speed chart | In progress |
| Artifact images — Family Space | Three app screenshots (side by side) + any others | In progress |
| Artifact images — List Interface | Affinity map, diagrams — all as images | In progress |
| Artifact images — Non-profit | Any inline images for case study body | In progress |
| LinkedIn recommendation 1 | About page card 1 | ✓ Live — Lucie Pospisilova |
| LinkedIn recommendations 2 + 3 | About page cards 2 and 3 | Placeholders ready — collect when available |


### 3.2 Visual Assets to Create or Export

| Asset | Status | Notes |
|-------|--------|-------|
| `asociacion-mockup.png` | ✓ Ready | Laptop mockup PNG provided |
| Katarina's photo | ✓ Provided | About page |
| `og-image.html` | ✓ Created | Open in browser at 1200×630, screenshot to PNG |
| `og-image.png` | Pending screenshot | Export from `og-image.html` |
| Favicon files | Pending | Spec in DESIGN_SYSTEM.md |
| `logo-full.svg` | Needs re-export | Current file is blank white rectangle — fix before launch |
| Personas.png | Acceptable for launch | Working doc export — rebuild with brand tokens is second-pass, not blocking |
| All images at 2× retina WebP | Pending | Required before launch |


### 3.3 Build Tasks for Claude Code

All confirmed. No open design decisions.

| Task | Page | Notes |
|------|------|-------|
| Homepage — all four sections | / | Figma Make prompt written v1.1 |
| Header — no CTA at any breakpoint | All pages | Desktop: nothing right. Mobile: hamburger only. |
| Footer | All pages | Typography corrections in DEVELOPER_HANDOFF.md |
| Work index | /work | Grid, filter, four cards |
| Case study shell | /work/[slug] | Sidebar, hero image conditional, meta table, pull quote, body, gate, NDA note |
| Non-profit case study | /work/asociacion | Open. Hero image: `asociacion-mockup.png`. 8 sections. |
| Required Field case study | /work/required-field | Locked. Gate. 7 sections. |
| Family Space case study | /work/family-space | Locked. Gate. 6 sections. |
| List Interface case study | /work/list-interface | Locked. Gate. 7 sections. |
| Password gate | /work/[locked slugs] | Formspree. Inline. Two states. Spec in Part 2.3. |
| Mobile navigation | /work/[slug], /notebook/[slug] | Pill + sheet + progress bar. One component. ANIMATION_PROMPT.md ⑫. |
| About page | /about | Photo provided. 1 rec live, 2 placeholders. |
| Notebook index | /notebook | One article live, one "more coming" placeholder. |
| Notebook article template | /notebook/[slug] | Right TOC, mobile pill, section numbers. |
| First article | /notebook/predicting-the-future-of-ux | Content provided. |
| All 13 animations | All pages | Full specs in ANIMATION_PROMPT.md |
| Image treatments | All pages | CSS and markup in IMAGE_TREATMENTS.md |
| OG image meta tags | All pages | `/assets/og-image.png`, `katarinariesgostropkova.github.io` |
| Section number treatment | /work/[slug], /notebook/[slug] | Rose Jost 500 10px beside Cormorant headings |


---


## PART 4 — CONFIRMED VALUES FOR BUILD

```
Domain:        katarinariesgostropkova.github.io
Email:         katka.stropkova@gmail.com
LinkedIn:      https://www.linkedin.com/in/katarinastropkova/
Tech stack:    Astro · Vanilla CSS · Vanilla JS · Google Fonts · Formspree
Hosting:       GitHub Pages
```


---


## PART 5 — REFERENCE DOCUMENTS

| Document | Contents | Status |
|----------|----------|--------|
| `DESIGN_SYSTEM.md` | All CSS tokens, component specs, breakpoints | v1.1 current |
| `DESIGN_DECISIONS.md` | This document | Final May 2026 |
| `DEVELOPER_HANDOFF.md` | UX decisions explained for developers | Current |
| `IMAGE_TREATMENTS.md` | Image system — thumbnail, inline frame, three-column variant | Current |
| `ANIMATION_PROMPT.md` | All 13 animation specifications | v1.2 current |
| `design-system-katarina.html` | Live visual reference | Open in browser |
| `og-image.html` | OG image source — screenshot to export PNG | Ready |
| `accessibility_contrast_audit.html` | WCAG audit | Reference |


---

*Final version — May 2026*
*All pages designed. All decisions confirmed. No open design decisions.*
*Outstanding: artifact images in progress · OG image PNG to export · favicon to create · logo SVG to re-export · 2 LinkedIn recommendations to collect when ready.*
