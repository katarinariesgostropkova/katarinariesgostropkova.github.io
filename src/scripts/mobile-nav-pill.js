/**
 * Animation ⑫ — Mobile pill + bottom sheet
 * Owner: mobile-nav-pill.js (per CLAUDE.md §7.1)
 *
 * Phase 3B-2 scope: open, close, jump-to-section, focus trap,
 * Escape key, body scroll lock. No cosmetic motion.
 *
 * Phase 4 will add: sheet slide-in animation, reading progress
 * bar, active section label in pill (shared IntersectionObserver
 * with sidebar-observer.js animation ⑩).
 */

document.addEventListener('DOMContentLoaded', () => {
  const pill = document.querySelector('[data-case-pill]');
  const sheet = document.querySelector('[data-case-sheet]');
  const backdrop = document.querySelector('[data-sheet-backdrop]');
  const closeBtn = document.querySelector('[data-sheet-close]');
  const sheetLinks = document.querySelectorAll('[data-sheet-link]');
  const hero = document.querySelector('[data-case-hero]');

  if (!pill || !sheet || !closeBtn || !hero) {
    // Not a case study page — exit silently
    return;
  }

  // ── HERO OBSERVER ────────────────────────────────────────────
  // Show pill once the hero section scrolls out of the viewport.
  // IntersectionObserver preferred over scroll listener per CLAUDE.md §7.3.
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        pill.classList.toggle('visible', !entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );
  heroObserver.observe(hero);

  // ── OPEN / CLOSE ─────────────────────────────────────────────
  function openSheet() {
    sheet.setAttribute('aria-hidden', 'false');
    pill.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
    // Move focus into the sheet — close button is first focusable element
    closeBtn.focus();
  }

  function closeSheet() {
    sheet.setAttribute('aria-hidden', 'true');
    pill.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.classList.remove('visible');
    document.body.style.overflow = '';
    // Return focus to pill on close
    pill.focus();
  }

  // ── EVENT WIRING ─────────────────────────────────────────────
  pill.addEventListener('click', openSheet);

  closeBtn.addEventListener('click', closeSheet);

  // Backdrop tap closes sheet
  if (backdrop) {
    backdrop.addEventListener('click', closeSheet);
  }

  // Section link tap: close sheet, then browser handles #fragment scroll
  sheetLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeSheet();
    });
  });

  // Escape closes sheet when open
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pill.getAttribute('aria-expanded') === 'true') {
      closeSheet();
    }
  });

  // ── FOCUS TRAP ───────────────────────────────────────────────
  // Cycles focus through close button + section links while sheet is open.
  function getFocusable() {
    return Array.from(
      sheet.querySelectorAll('button:not([disabled]), a[href]')
    );
  }

  sheet.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusable = getFocusable();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      // Shift+Tab: wrap from first → last
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab: wrap from last → first
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
});
