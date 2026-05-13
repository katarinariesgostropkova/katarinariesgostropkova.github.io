# Claude Code Animation Prompt — Complete v1.2
# Katarina Riesgo Stropkova — Portfolio Website
# Updated May 2026
# ─────────────────────────────────────────────────────────────
# This prompt implements all motion on top of the static
# HTML/CSS structure. Do not alter layout, colours, spacing,
# or typography. Animation only.
# All animations must respect prefers-reduced-motion.
# animations.css must have the reduced-motion block as its
# absolute first rule before any other declaration.
# ─────────────────────────────────────────────────────────────

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---


## ① Mark entry sequence — page load, sessionStorage gated

Check `sessionStorage.getItem('mark_animated')` on load. If set, skip to final state immediately with no transition. If not set, run the sequence then call `sessionStorage.setItem('mark_animated', 'true')`.

All elements begin at opacity 0 and their transform start state. Page content is visible beneath — nothing is blocked.

- **0–300ms:** outer teardrop SVG path. `opacity 0 → 1`, `scale(0.85) → scale(1)`. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- **200–600ms (overlapping):** teal oval ellipse. Set `stroke-dasharray` to full perimeter (~160px). Animate `stroke-dashoffset` from 160 to 0. Duration 400ms, `ease-out`. Starts 200ms after page load.
- **500–700ms:** coral dot circle. `opacity 0 → 1`, `translateY(-8px) → translateY(0)`. Duration 200ms, `ease-out`.
- **700–1000ms:** name block beside mark. `opacity 0 → 1`, `translateX(-4px) → translateX(0)`. Duration 300ms, `ease-out`. Page hero content (eyebrow, headline, sub, intro, CTA row) fades up simultaneously: `opacity 0 → 1`, `translateY(12px) → translateY(0)`.

`prefers-reduced-motion`: skip all transforms. All elements animate opacity only at 200ms flat, simultaneously.


---


## ② Logo hover rotation

On `mouseenter` of the logo mark SVG: rotate entire SVG 360deg. Duration 800ms, easing `cubic-bezier(0.45, 0, 0.55, 1)`. After rotation completes, return to `rotate(0deg)` with no visible snap.

```javascript
let markHovered = false;
markEl.addEventListener('mouseenter', () => {
  if (markHovered) return;
  markHovered = true;
  // run rotation
});
```

Flag is never reset — fires once per page load only.

`prefers-reduced-motion`: skip entirely.


---


## ③ Mobile hamburger overlay

Trigger: tap `.hamburger-btn`. Toggle `aria-expanded`. Add `role="dialog"` and `aria-label="Main navigation"` to overlay. Focus trap active. Escape key closes.

**Open sequence:**
- Overlay (`position: fixed`, full viewport, `z-index: 200`, `background: #1C2B3A`): `opacity 0 → 1`, 300ms `ease-out`. Fires immediately.
- Hamburger lines: line 1 rotates 45deg, line 2 rotates -45deg, cross to form ✕. 250ms `ease-out`. Transform-origin: centre of each line.
- Nav items cascade at 240ms after overlay open. Each: `translateY(12px) → 0`, `opacity 0 → 1`. 200ms `ease-out`. Stagger: 40ms between items. Order: **Home → Work → About → Notebook → Request access row (+80ms extra after Notebook).**
- Ghost mark (position absolute inside overlay, right -20px, top 20px, opacity 0.06, scale 1.4): fades in at 300ms, duration 200ms, opacity only.

**Close sequence:** overlay `opacity 1 → 0`, 250ms `ease-out`. ✕ returns to asymmetric lines. Nav items exit with overlay — no individual animation out.

`prefers-reduced-motion`: overlay appears/disappears opacity-only at 150ms. No transforms on lines or nav items. No cascade.


---


## ④ Header scroll compression

Listen to `window.scroll`. On `scrollY > 80`: add `.header--scrolled`.

```css
.header--scrolled {
  padding-top: calc(original-padding-top - 4px);
  padding-bottom: calc(original-padding-bottom - 4px);
  background: rgba(247, 246, 242, 1.00);
  box-shadow: 0 1px 0 rgba(28, 43, 58, 0.08);
}
header {
  transition: all 200ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

On scroll back (scrollY ≤ 80): remove class. Transition reverses.

`prefers-reduced-motion`: remove transition. State changes instant.


---


## ⑤ Impact strip count-up

`IntersectionObserver`, threshold 0.3 on impact strip section. Fires once — disconnect after first trigger.

- **"7" and "3":** count up from 0 to final value. Duration 800ms, `ease-out`. Use `requestAnimationFrame`. Integers only.
- **"MA" and Research → Roadmap pill:** fade in only. `opacity 0 → 1`, `translateY(6px) → 0`, 400ms `ease-out`, 200ms delay after trigger.
- **Four descriptions beneath metrics:** `opacity 0 → 1`, 300ms `ease-out`, 400ms delay after trigger.

`prefers-reduced-motion`: skip count-up and transforms. Show final values immediately at full opacity on viewport entry.


---


## ⑥ Case row and card left accent

**Homepage case rows and work index cards** — `::before` pseudo-element on each `.case-row` and `.work-card`.

```css
.case-row::before,
.work-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: #D4797A;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}
.case-row:hover::before,
.work-card:hover::before {
  transform: scaleY(1);
}
```

Locked case row / locked work card: use `rgba(107, 122, 141, 0.20)` instead of rose — muted, not inviting.

`prefers-reduced-motion`: remove transition. Present or absent only, no animation.


---


## ⑦ Status rotator

Three items cycling beside the hero CTA. Container: `aria-live="polite"`, `role="region"`, `aria-label="Availability status"`.

**Items:**
- Item 1: "Open to opportunities" — no link, `cursor: default`
- Item 2: "Connect on LinkedIn" + rose arrow → opens `https://www.linkedin.com/in/katarinastropkova/` in new tab
- Item 3: "Drop me a line" + rose arrow → opens `mailto:katka.stropkova@gmail.com`

When item 2 or 3 active: `cursor: pointer` on container. When item 1 active: `cursor: default`, no click action.

**Timing:** visible 4000ms. Exit: `opacity 1 → 0`, `translateY(0) → translateY(-8px)`, 300ms `ease-out`. Enter: `opacity 0 → 1`, `translateY(8px) → translateY(0)`, 400ms `ease-out`. Gap between exit start and enter start: 360ms.

**Teal dot pulse ring:** `::after` on dot. `scale 1 → 1.8`, `opacity 0.8 → 0`. Duration 2500ms, infinite, `ease-out`.

**Pause button:** always in DOM. `aria-label="Pause status rotation"`. On click: stops interval, updates label to "Resume status rotation", emoji → ▶. On resume: restarts from current item. Visually subtle — `rgba(28, 43, 58, 0.25)`, no border, 9px.

`prefers-reduced-motion`: stop all rotation, show item 1 statically, hide pause button, stop dot pulse. Do not start rotation if reduced motion detected on load.


---


## ⑧ Scroll-triggered section reveals

Apply to: hero content blocks, impact strip, work section heading, each case row and work card, About page opening section, timeline section, story paragraphs, recommendation cards, Notebook index rows, any page section.

`IntersectionObserver`, threshold 0.15. Each element starts at:

```css
opacity: 0;
transform: translateY(12px);
transition: opacity 300ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
```

On entry: `opacity → 1`, `transform → translateY(0)`. Add `.revealed`, fires once per element.

**Stagger for grouped elements** (impact metrics, case rows, recommendation cards, work index cards, timeline dots, story columns): 80ms delay between children using `transition-delay`.

`prefers-reduced-motion`: remove all transforms and transitions. Elements appear at full opacity immediately on viewport entry.


---


## ⑨ Work index — card filter

Filter pills on `/work`. On click:

- Active pill: `background: #1C2B3A`, `color: #F7F6F2`, `border-color: #1C2B3A`. Transition 150ms.
- Non-matching cards: `opacity → 0.25`, `pointer-events: none`, 200ms `ease-out`.
- Matching cards: `opacity → 1`, `pointer-events: auto`.
- "All": all cards full opacity.

Filter logic: `data-tags` on each card, `data-filter` on each pill. No page reload. No layout shift.

`prefers-reduced-motion`: opacity change instant, no transition.


---


## ⑩ Case study left sidebar — scroll-aware active state

Each case study page defines its own sections array. `CaseStudySidebar` Astro component receives it as a prop. Section names must not be normalised.

**All four section structures:**

```astro
// Non-profit — /work/asociacion
const sections = [
  { id: 'opening',          label: 'The Opening' },
  { id: 'brief',            label: 'The Brief' },
  { id: 'two-audiences',    label: 'Two Audiences, One Website' },
  { id: 'design-decisions', label: 'The Design Decisions' },
  { id: 'testing',          label: 'Testing Approach' },
  { id: 'revealed',         label: 'What Testing Revealed' },
  { id: 'stands',           label: 'Where It Stands' },
  { id: 'looking-back',     label: 'Looking Back' },
]

// Required Field — /work/required-field
const sections = [
  { id: 'opening',      label: 'The Opening' },
  { id: 'background',   label: 'Background' },
  { id: 'problem',      label: 'The Problem' },
  { id: 'study',        label: 'The Study' },
  { id: 'forward',      label: 'Taking it Forward' },
  { id: 'revealed',     label: 'What it Revealed' },
  { id: 'looking-back', label: 'Looking Back' },
]

// Family Space — /work/family-space
const sections = [
  { id: 'opening',      label: 'The Opening' },
  { id: 'approach',     label: 'The Research Approach' },
  { id: 'found',        label: 'What We Found' },
  { id: 'pointed',      label: 'What the Research Pointed Toward' },
  { id: 'happened',     label: 'What Happened' },
  { id: 'looking-back', label: 'Looking Back' },
]

// List Interface — /work/list-interface
const sections = [
  { id: 'opening',      label: 'The Opening' },
  { id: 'who',          label: 'Who We Were Designing For' },
  { id: 'what-we-did',  label: 'What We Did to Find Out' },
  { id: 'learned',      label: 'What We Learned' },
  { id: 'evolved',      label: 'How the Thinking Evolved' },
  { id: 'led',          label: 'Where the Work Led' },
  { id: 'looking-back', label: 'Looking Back' },
]
```

Each `<section>` must have matching `id` attribute. Use `IntersectionObserver`, threshold 0.4:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id')
      document.querySelectorAll('.cs-nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === id)
      })
    }
  })
}, { threshold: 0.4 })

document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
```

```css
.cs-nav-item { position: relative; }
.cs-nav-item.active { color: #1C2B3A; }
.cs-nav-item.active::before {
  content: '';
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  width: 2px; height: 16px;
  background: #2BA5A5;
  border-radius: 1px;
}
```

Sidebar: `position: sticky; top: 80px`. "← All work": standard `<a href="/work">`, no animation.

`prefers-reduced-motion`: active state updates instantly, no transition on indicator line.


---


## ⑪ Notebook article page — right sidebar TOC

Identical behaviour to the case study left sidebar but positioned on the right side of the two-column article layout.

**Section structure for "Predicting the Future of UX":**

```astro
const sections = [
  { id: 'workshop',     label: 'The Workshop' },
  { id: 'skills',       label: 'Essential Skills' },
  { id: 'needs',        label: 'What Researchers Need' },
  { id: 'moment',       label: 'The Moment Data Misses' },
  { id: 'cannot-hear',  label: 'What AI Cannot Hear' },
  { id: 'learning',     label: 'How Researchers Learn' },
  { id: 'leaves-us',    label: 'Where This Leaves Us' },
]
```

Same `IntersectionObserver` logic as ⑩. Same active state CSS. Sidebar: `position: sticky; top: 80px`.

Future articles follow the same pattern — define sections array per article file.

`prefers-reduced-motion`: active state updates instantly.


---


## ⑫ Mobile navigation — sticky pill, bottom sheet, reading progress bar

Applies to: all case study pages (`/work/[slug]`) and all Notebook article pages (`/notebook/[slug]`). One component, two contexts. Write once.

### Reading progress bar

```css
.progress-track {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 2.5px;
  background: rgba(43, 165, 165, 0.15);
  z-index: 20;
}

.progress-fill {
  height: 100%;
  background: #2BA5A5;
  border-radius: 0 2px 2px 0;
  transition: width 100ms linear;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  right: -3px; top: 50%;
  transform: translateY(-50%);
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #D4797A;
  box-shadow: 0 0 0 3px rgba(212, 121, 122, 0.20);
}

.progress-fill.is-complete {
  background: linear-gradient(to right, #2BA5A5 0%, #2BA5A5 70%, #D4797A 100%);
}
.progress-fill.is-complete::after {
  width: 8px; height: 8px;
  box-shadow: 0 0 0 4px rgba(212, 121, 122, 0.25);
}
```

```javascript
function updateProgress() {
  const pct = Math.min(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
    100
  );
  progressFill.style.width = pct + '%';
  if (pct >= 100) progressFill.classList.add('is-complete');
}
window.addEventListener('scroll', updateProgress, { passive: true });
```

### Sticky navigation pill

```css
.section-pill {
  position: fixed;
  top: var(--nav-height); /* measure nav rendered height in browser */
  left: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 11px 6px 8px;
  background: #fff;
  border: 0.5px solid rgba(28, 43, 58, 0.12);
  border-radius: 100px;
  box-shadow: 0 0 0 2px rgba(212, 121, 122, 0.15);
  z-index: 15;
  cursor: pointer;
}

.pill-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #2BA5A5;
  position: relative;
  flex-shrink: 0;
}

.pill-dot::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(43, 165, 165, 0.35);
  animation: pill-pulse 2.2s ease-out infinite;
}

@keyframes pill-pulse {
  0%   { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.9); opacity: 0; }
}

.pill-label  { font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 400; color: #1C2B3A; }
.pill-count  { font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 300; color: #6B7A8D; }
.pill-divider { border-left: 0.5px solid rgba(28, 43, 58, 0.12); padding-left: 7px; }
.pill-chevron { font-size: 9px; color: #6B7A8D; }

/* Hint label — fades after 3s */
.pill-hint {
  position: fixed;
  top: calc(var(--nav-height) + 40px);
  left: 16px;
  font-family: 'Jost', sans-serif;
  font-size: 9px;
  font-weight: 300;
  font-style: italic;
  color: #D4797A;
  transition: opacity 600ms ease-out;
}
```

**Hint label behaviour:**
```javascript
const hint = document.querySelector('.pill-hint');
const hintSeen = sessionStorage.getItem('pillHintSeen');
if (hintSeen) {
  hint.remove();
} else {
  setTimeout(() => {
    hint.style.opacity = '0';
    hint.addEventListener('transitionend', () => hint.remove());
  }, 3000);
}
pillEl.addEventListener('click', () => {
  sessionStorage.setItem('pillHintSeen', 'true');
  if (hint) hint.remove();
});
```

### Bottom sheet

```css
.sheet-overlay {
  position: fixed; inset: 0;
  background: rgba(28, 43, 58, 0.30);
  z-index: 30;
  display: none;
  align-items: flex-end;
}
.sheet-overlay.open { display: flex; }

.bottom-sheet {
  width: 100%;
  background: #F7F6F2;
  border-radius: 16px 16px 0 0;
  padding: 0 0 32px;
  transform: translateY(100%);
  transition: transform 300ms ease;
}
.sheet-overlay.open .bottom-sheet { transform: translateY(0); }

.sheet-handle {
  width: 32px; height: 3px;
  background: rgba(28, 43, 58, 0.15);
  border-radius: 100px;
  margin: 10px auto 14px;
}

.sheet-item {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 16px;
  border-bottom: 0.5px solid rgba(28, 43, 58, 0.06);
  cursor: pointer;
}
.sheet-item-indicator {
  width: 2px; height: 20px;
  border-radius: 1px;
  background: transparent;
  flex-shrink: 0;
}
.sheet-item.active { background: rgba(43, 165, 165, 0.04); }
.sheet-item.active .sheet-item-indicator { background: #2BA5A5; }
.sheet-item-text { font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 300; color: #1C2B3A; }
.sheet-item.active .sheet-item-text { font-weight: 400; }
.sheet-item-num { font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 500; color: rgba(28, 43, 58, 0.25); margin-left: auto; }
.sheet-item.active .sheet-item-num { color: #D4797A; }
```

**Accessibility:** `role="dialog"`, `aria-label="Page sections"`, focus trap when open, Escape closes, overlay tap closes.

### One observer, two outputs

```javascript
const sections = document.querySelectorAll('section[data-title]');
const total = sections.length;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const idx   = entry.target.dataset.index;
    const title = entry.target.dataset.title;

    // Output 1 — desktop sidebar (case studies) or right TOC (articles)
    document.querySelectorAll('.cs-nav-item, .art-toc-item').forEach(item => {
      item.classList.toggle('active', item.dataset.index === idx);
    });

    // Output 2 — mobile pill
    const pillLabel = document.querySelector('.pill-label');
    const pillCount = document.querySelector('.pill-count');
    if (pillLabel) pillLabel.textContent = title;
    if (pillCount) pillCount.textContent = `${idx} / ${total}`;

    // Output 3 — bottom sheet active item
    document.querySelectorAll('.sheet-item').forEach(item => {
      item.classList.toggle('active', item.dataset.index === idx);
    });
  });
}, {
  threshold: 0.3,
  rootMargin: '-10% 0px -60% 0px'
});

sections.forEach(s => observer.observe(s));
```

Each `<section>` needs `data-title` and `data-index` attributes matching the sidebar list exactly.

**Scroll restoration:** close sheet first, then scroll:
```javascript
function jumpToSection(id) {
  closeSheet();
  setTimeout(() => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }, 50);
}
```

`prefers-reduced-motion`: stop pill-pulse animation. Progress bar width updates without transition. Sheet appears/disappears instantly (no transform animation). Pill updates still fire — content updates, no motion.


---


## ⑬ About page — timeline dot animation

Timeline dots animate in when the timeline section enters the viewport. `IntersectionObserver`, threshold 0.2 on the timeline container. Fires once.

Rose dots (education, positions 1 and 2): `scale(0) → scale(1)`, `opacity 0 → 1`. Duration 300ms, `ease-out`. Stagger: 0ms, 100ms.

Teal dots (research, positions 3, 4, 5): same animation. Stagger continues: 200ms, 300ms, 400ms.

Timeline horizontal line: `scaleX(0) → scaleX(1)`, `transform-origin: left`. Duration 600ms, `ease-out`. Starts simultaneously with first dot.

Role labels and dates beneath each dot: `opacity 0 → 1`, `translateY(6px) → 0`, 200ms `ease-out`, 80ms delay after their corresponding dot.

```css
.timeline-dot {
  transform: scale(0);
  opacity: 0;
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 300ms ease-out;
}
.timeline-dot.revealed {
  transform: scale(1);
  opacity: 1;
}
.timeline-line {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}
.timeline-line.revealed { transform: scaleX(1); }
```

`prefers-reduced-motion`: all dots and line appear instantly at full opacity and scale on viewport entry.


---


## Quick reference — all thirteen items

| # | Animation | Page(s) | Trigger |
|---|-----------|---------|---------|
| ① | Mark entry sequence | All (first load) | Page load, sessionStorage gated |
| ② | Logo hover rotation | All | mouseenter, once per load |
| ③ | Mobile hamburger overlay | All | Tap hamburger |
| ④ | Header scroll compression | All | scrollY > 80px |
| ⑤ | Impact strip count-up | Homepage | IntersectionObserver |
| ⑥ | Case row + card left accent | Homepage, /work | hover |
| ⑦ | Status rotator | Homepage | Auto, paused by button |
| ⑧ | Scroll section reveals | All pages | IntersectionObserver 0.15 |
| ⑨ | Work index card filter | /work | Click filter pill |
| ⑩ | Case study sidebar active state | /work/[slug] | IntersectionObserver 0.4 |
| ⑪ | Notebook article TOC active state | /notebook/[slug] | IntersectionObserver 0.4 |
| ⑫ | Mobile pill + sheet + progress bar | /work/[slug], /notebook/[slug] | Scroll + tap |
| ⑬ | About page timeline animation | /about | IntersectionObserver 0.2 |


---


## Confirmed values

```
LinkedIn URL:  https://www.linkedin.com/in/katarinastropkova/
Email:         katka.stropkova@gmail.com
Domain:        katarinariesgostropkova.github.io
```


---

*Animation prompt v1.2 — May 2026*
*Read alongside: DESIGN_SYSTEM.md · DESIGN_DECISIONS.md · DEVELOPER_HANDOFF.md · IMAGE_TREATMENTS.md*
