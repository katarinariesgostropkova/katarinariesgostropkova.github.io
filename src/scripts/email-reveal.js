const parts = ['katka', '.', 'stropkova', '@', 'gmail', '.', 'com'];
const address = parts.join('');

const emailEl = document.getElementById('footer-email');
if (emailEl) {
  emailEl.textContent = address;
  emailEl.setAttribute('href', 'mailto:' + address);
}

const copyBtn = document.getElementById('footer-copy-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(address).then(() => {
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Copied ✓';
      setTimeout(() => {
        copyBtn.textContent = original;
      }, 2000);
    });
  });
}
