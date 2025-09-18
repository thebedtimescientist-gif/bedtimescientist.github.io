/* =========
   Helpers
   ========= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* =========
   Year stamp
   ========= */
(function stampYear() {
  const el = $('#year');
  if (el) el.textContent = String(new Date().getFullYear());
})();

/* =================
   Theme: dark / light
   ================= */
(function themeInit() {
  const btn = $('#theme-toggle');
  if (!btn) return;

  const STORAGE_KEY = 'bts-theme';
  const root = document.documentElement;

  function apply(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    btn.setAttribute('aria-pressed', String(dark));
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved || (prefersDark ? 'dark' : 'light'));

  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
})();

/* ================
   Gentle Sleep Timer
   ================ */
(function sleepTimer() {
  const overlay = $('#sleep-fade-overlay');
  const status = $('#timer-status');
  const cancelBtn = $('#cancel-timer');
  const buttons = $$('.timer-button[data-sleep-minutes]');

  let endAt = null;
  let rafId = null;
  let ticking = false;

  const reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function announce(text) {
    if (status) status.textContent = text;
  }

  function clearTimer(reason = 'Timer canceled') {
    endAt = null;
    ticking = false;
    if (cancelBtn) cancelBtn.disabled = true;
    if (overlay) {
      overlay.style.transition = '';
      overlay.style.opacity = '0';
      overlay.setAttribute('aria-hidden', 'true');
    }
    if (rafId) cancelAnimationFrame(rafId);
    announce(reason);
  }

  function tick() {
    if (!ticking || !endAt) return;

    const now = performance.now();
    const msLeft = endAt - now;

    if (msLeft <= 0) {
      if (overlay) {
        overlay.setAttribute('aria-hidden', 'false');
        overlay.style.opacity = '1';
        overlay.style.transition = reduceMotion ? 'opacity 0.01s linear' : 'opacity 18s ease-out';
      }
      announce('Good night. Dimming now.');
      ticking = false;
      if (cancelBtn) cancelBtn.disabled = true;
      return;
    }

    const totalSec = Math.ceil(msLeft / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    announce(`Timer on: ${m}m ${s < 10 ? '0' : ''}${s}s`);

    rafId = requestAnimationFrame(tick);
  }

  function start(minutes) {
    const ms = minutes * 60 * 1000;
    endAt = performance.now() + ms;
    ticking = true;
    if (cancelBtn) cancelBtn.disabled = false;

    if (overlay) {
      overlay.style.opacity = '0';
      overlay.setAttribute('aria-hidden', 'true');
    }

    announce(`Timer started for ${minutes} minutes`);
    rafId = requestAnimationFrame(tick);
  }

  // Wire duration buttons
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const minutes = parseInt(btn.getAttribute('data-sleep-minutes'), 10);
      if (!Number.isFinite(minutes) || minutes <= 0) return;
      start(minutes);
    });
  });

  // Wire cancel
  cancelBtn?.addEventListener('click', () => clearTimer());

  // Escape key cancels
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ticking) clearTimer();
  });
})();
