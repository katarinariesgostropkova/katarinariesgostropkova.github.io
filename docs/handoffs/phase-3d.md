# Phase 3D — Password Gate

## Commit message
```
phase-3d: password gate for locked case studies
```

## What changed
Three locked case studies (family-space, list-interface, required-field) now render a full-page password gate instead of their content when a visitor has not yet entered the correct password. The gate is a centered card on a Deep Tide background, containing a lock icon, the case title and description, a password input with shake-on-error feedback, and a mailto "Request access" fallback. Successful entry stores a session flag so all three cases stay unlocked for the duration of the tab. The plain password never ships — only its SHA-256 hash, computed at build time, is present in the client bundle.

## Files created
- `src/components/PasswordGate.astro` — gate UI: card markup, styles, global body-class CSS, script import
- `src/scripts/password-gate.js` — sessionStorage check, body class application, Web Crypto hash comparison, error state, shake animation trigger
- `.env` — `CASE_STUDY_PASSWORD=evidence-2026` (gitignored — rotate before launch)
- `.env.example` — committed reference with placeholder value
- `docs/handoffs/phase-3d.md` — this file

## Files modified
- `astro.config.mjs` — added `loadEnv` + Node `crypto` to compute hash at build time; injected as `import.meta.env.PUBLIC_PASSWORD_HASH` via `vite.define`
- `src/layouts/CaseStudyLayout.astro` — added `<slot name="gate" />` before all layout sections; wrapped hero/meta/callout/body/pill in `<div data-case-content>` for CSS-toggle visibility
- `src/pages/work/[slug].astro` — added `PasswordGate` import; passes gate via named slot (`slot="gate"`) on locked entries only

## Password strategy
- Single password gates all three locked cases (family-space, list-interface, required-field)
- Stored in `.env` (gitignored), variable: `CASE_STUDY_PASSWORD`, current value: `evidence-2026` **(PLACEHOLDER — Katarina to rotate before launch)**
- At build time: `astro.config.mjs` reads the variable via Vite's `loadEnv`, computes SHA-256 using Node's `crypto` module, injects the hash via `vite.define` as `import.meta.env.PUBLIC_PASSWORD_HASH`
- At runtime: client hashes user input via `window.crypto.subtle.digest('SHA-256', …)` and compares to the build-time hash
- Plain password verified absent from shipped bundle: `grep -r "evidence-2026" dist/_astro/` returns zero matches
- Hash verified present: `b42f175ec98f16ec62c8dc972aea0104ac27982a2f40d5bba4ae876e8fad540f` (SHA-256 of `evidence-2026`)

**To rotate the password before launch:**
1. Edit `.env` → change `CASE_STUDY_PASSWORD` to the real password
2. `npm run build`
3. Deploy `dist/`
4. Confirm old placeholder no longer unlocks any case study

**For CI/CD environments** where `.env` isn't present, set `CASE_STUDY_PASSWORD` as an environment variable in the CI runner. `astro.config.mjs` checks `process.env.CASE_STUDY_PASSWORD` first (before `.env` fallback).

## Session persistence
- `sessionStorage` key: `'cases-unlocked'`, value: `'true'`
- Per-tab: closing the tab clears the flag; re-entering is required
- All three locked cases share one unlock state — entering the password once on any locked case unlocks all of them for that tab

## Visual treatment
Per Resolution 3 and DESIGN_DECISIONS.md §2.3:
- Page background: `--color-deep-tide` when locked, `--color-canvas` when unlocked (applied via `body.gate-locked` / `body.gate-unlocked`)
- Gate card: `--color-canvas` background, `--radius-lg` (12px), `--shadow-overlay`, `2px solid --color-rose` top border, max-width 480px
- Lock icon: same SVG path data as `WorkCardThumbnail`, scaled to 32×36px, in `--color-rose`
- Eyebrow: "PROTECTED CASE STUDY" — Jost 500, `--font-size-meta`, uppercase, `--color-teal`
- Title: `--font-serif` 300, `--font-size-section`, `--text-primary`
- Description: Jost 400, `--font-size-body`, `--text-body`
- Submit button: `btn btn--rose` (existing global class) — "Unlock case study →"
- Error message: `--color-rose`, hidden by default via `aria-hidden="true"`; shown on wrong password
- Request access link: `--color-rose`, mailto pre-filled with case title in subject + body

## Error state behaviour
1. Input gets class `password-gate__input--error` → 300ms shake animation + teal border
2. `aria-hidden="false"` on error message element (also has `role="alert"` + `aria-live="polite"`)
3. Input refocused
4. Clears after 2000ms OR on next keystroke, whichever first
5. `prefers-reduced-motion`: animation removed, border + message still work

## Approach A (both gate and content in HTML)
Both `[data-password-gate]` and `[data-case-content]` are in the page HTML at all times on locked pages. Visibility is toggled by `body.gate-locked` / `body.gate-unlocked` CSS classes applied by `password-gate.js` on `DOMContentLoaded`.

**Trade-off accepted:** the unlocked content (prose, images) is accessible in the page source before the password is entered. This is acceptable for this threat model — the content is NDA-safe redacted prose, and the lock communicates social intent rather than providing cryptographic access control. If stronger security is needed post-launch, migrate to Approach B (separate content endpoint, client-side fetch).

Default CSS hides both gate and content before JS runs to prevent flash of either state:
```css
[data-password-gate],
[data-case-content] { display: none; }
```

## Animation hooks left for Phase 4
The following data attributes are in the markup, ready for Phase 4 motion work:
- `data-password-gate` — on the gate root element
- `data-gate-locked` — set on `<body>` when locked
- `data-gate-unlocked` — set on `<body>` when unlocked

Phase 4 may add: lock-to-open transition, content fade-in on reload after unlock.

## Deviations from spec — accepted exceptions
None. All resolutions implemented as specified.

## Regression checks
- `/work/non-profit` (Checa) — no gate, renders as before; `entry.data.private` is `false` so no PasswordGate slot is passed
- `/work/index` — all four cards render; locked cards show "Request access →" as before
- Homepage, Header, Footer — unchanged
- Mobile nav pill + sheet — still functional on unlocked case studies; MobileNavPill is inside `[data-case-content]` so it shows correctly when unlocked

## Open questions for designer
1. **Real password** — `evidence-2026` is a placeholder. Katarina needs to choose a real password before launch, update `.env`, rebuild, and redeploy.
2. **Header on Deep Tide** — When the gate is showing, the page background is `--color-deep-tide`. The existing Header has a semi-transparent background. Verify this looks intentional at `/work/family-space` in a fresh browser; if the header blends oddly, add a `body.gate-locked header { background: var(--color-deep-tide); }` override.

## Next phase
**Phase 4 — Animations and motion.** The functional site is complete as of Phase 3D. Phase 4 wires:
- Mark entry animation (homepage only)
- Logo hover rotation
- Mobile overlay open/close motion
- Header scroll compression
- Impact strip count-up
- Work card rose accent scaleY
- Scroll reveals
- Work filter pill behaviour
- Case study sidebar scroll tracking
- Notebook TOC behaviour
- Mobile case study pill sheet cosmetic motion
- About timeline animation
- Password gate lock-to-open transition (hooks added in 3D)
