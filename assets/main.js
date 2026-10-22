// Baysera website — voice waveform and early-access form.

(function drawWave() {
  const el = document.querySelector('.wave-bars');
  if (!el) return;
  let seed = 42;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const n = window.matchMedia('(max-width: 640px)').matches ? 60 : 120;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const env = Math.pow(Math.sin(Math.PI * t), 0.8);
    const k = 120 / n;
    const wave = 0.5 + 0.3 * Math.sin((i * k) / 3.1) + 0.2 * Math.sin((i * k) / 7.3 + 1);
    const h = Math.max(4, Math.round(100 * env * wave * (0.6 + 0.4 * rand())));
    const bar = document.createElement('span');
    bar.style.height = h + '%';
    bar.style.opacity = (0.3 + 0.7 * env).toFixed(2);
    bar.style.setProperty('--d', (-(i % 24) * 0.13).toFixed(2) + 's');
    frag.appendChild(bar);
  }
  el.appendChild(frag);
  el.classList.add('is-live');
})();

(function earlyAccess() {
  const form = document.querySelector('#early-access-form');
  if (!form) return;
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.className = 'form-status';

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (form.action.includes('YOUR_FORM_ID')) {
      status.textContent = 'Sign-up is not connected yet. See README: "Connect the early-access form".';
      status.classList.add('err');
      return;
    }

    button.disabled = true;
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      status.textContent = 'Thank you. We’ll be in touch soon.';
      status.classList.add('ok');
    } catch (err) {
      status.textContent = 'Something went wrong. Please try again in a moment.';
      status.classList.add('err');
    } finally {
      button.disabled = false;
    }
  });
})();
