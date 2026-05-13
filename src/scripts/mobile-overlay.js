document.addEventListener('DOMContentLoaded', () => {
  const btn      = document.querySelector('.hamburger-btn');
  const overlay  = document.querySelector('.mobile-overlay');

  if (!btn || !overlay) {
    console.warn('mobile-overlay.js: required elements not found');
    return;
  }

  const closeBtn = overlay.querySelector('[data-overlay-close]');
  const navLinks = overlay.querySelectorAll('a');

  if (!closeBtn) {
    console.warn('mobile-overlay.js: [data-overlay-close] button not found');
    return;
  }

  let lastFocused = null;
  const focusable = [closeBtn, ...navLinks];

  function onKeydown(e) {
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key === 'Tab') {
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function open() {
    overlay.classList.add('mobile-overlay--open');
    overlay.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
    lastFocused = document.activeElement;
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    overlay.classList.remove('mobile-overlay--open');
    overlay.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    lastFocused?.focus();
  }

  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  navLinks.forEach(link => {
    link.addEventListener('click', close);
  });
});
