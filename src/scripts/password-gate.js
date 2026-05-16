// password-gate.js
// Manages gate visibility, password verification, session persistence,
// and form interaction for locked case study pages.
//
// Security note: the plain password never reaches the client.
// import.meta.env.PUBLIC_PASSWORD_HASH is the SHA-256 hash injected
// at build time via vite.define in astro.config.mjs.

const STORAGE_KEY = 'cases-unlocked';
const STORAGE_VALUE = 'true';

async function hashInput(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function showErrorState(input) {
  input.classList.add('password-gate__input--error');
  const error = document.getElementById('gate-error');
  if (error) {
    error.setAttribute('aria-hidden', 'false');
  }
}

function clearErrorState(input) {
  input.classList.remove('password-gate__input--error');
  const error = document.getElementById('gate-error');
  if (error) {
    error.setAttribute('aria-hidden', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const gate = document.querySelector('[data-password-gate]');

  // Not a locked page — no gate element present, bail early.
  if (!gate) return;

  const isUnlocked = sessionStorage.getItem(STORAGE_KEY) === STORAGE_VALUE;

  if (isUnlocked) {
    document.body.classList.add('gate-unlocked');
    document.body.setAttribute('data-gate-unlocked', '');
    return; // content visible, no further interaction needed
  }

  document.body.classList.add('gate-locked');
  document.body.setAttribute('data-gate-locked', '');

  const form = document.querySelector('.password-gate__form');
  const input = document.getElementById('password-gate-input');
  if (!form || !input) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const enteredHash = await hashInput(input.value);
    // import.meta.env.PUBLIC_PASSWORD_HASH is replaced at build time
    // with the literal hash string — never the plain password.
    const expectedHash = import.meta.env.PUBLIC_PASSWORD_HASH;

    if (enteredHash === expectedHash) {
      sessionStorage.setItem(STORAGE_KEY, STORAGE_VALUE);
      window.location.reload();
    } else {
      showErrorState(input);
      input.focus();

      // Clear error after 2000ms or on next keystroke, whichever first
      let clearTimer = setTimeout(() => clearErrorState(input), 2000);

      input.addEventListener('input', () => {
        clearTimeout(clearTimer);
        clearErrorState(input);
      }, { once: true });
    }
  });
});
