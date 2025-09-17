document.addEventListener('DOMContentLoaded', () => {
    /* ----- Theme toggle ----- */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlEl.setAttribute('data-theme', 'dark');
        themeToggle.setAttribute('aria-pressed', 'true');
    } else {
        htmlEl.setAttribute('data-theme', 'light');
        themeToggle.setAttribute('aria-pressed', 'false');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        if (currentTheme === 'light') {
            htmlEl.setAttribute('data-theme', 'dark');
            themeToggle.setAttribute('aria-pressed', 'true');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlEl.setAttribute('data-theme', 'light');
            themeToggle.setAttribute('aria-pressed', 'false');
            localStorage.setItem('theme', 'light');
        }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                htmlEl.setAttribute('data-theme', 'dark');
                themeToggle.setAttribute('aria-pressed', 'true');
            } else {
                htmlEl.setAttribute('data-theme', 'light');
                themeToggle.setAttribute('aria-pressed', 'false');
            }
        }
    });

    /* ----- Gentle Sleep Timer ----- */
    const overlay = document.getElementById('sleep-fade-overlay');
    const statusEl = document.getElementById('timer-status');
    const cancelBtn = document.getElementById('cancel-timer');
    const presetButtons = document.querySelectorAll('[data-sleep-minutes]');

    let timerInterval = null;
    let endTimeMs = null;
    let lastAnnouncedMinutes = null;

    function formatTime(ms) {
        const totalSec = Math.max(0, Math.floor(ms / 1000));
        const m = Math.floor(totalSec / 60);
        const s = totalSec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function clearTimerState() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        endTimeMs = null;
        lastAnnouncedMinutes = null;
        cancelBtn.disabled = true;
    }

    function startFade() {
        overlay.classList.add('is-fading');
        statusEl.textContent = 'Fading to black. Goodnight.';
    }

    function stopFade() {
        overlay.classList.remove('is-fading');
    }

    function updateCountdown() {
        const remaining = endTimeMs - Date.now();

        if (remaining <= 0) {
            clearTimerState();
            startFade();
            return;
        }

        statusEl.textContent = `Time remaining: ${formatTime(remaining)}`;

        const minutes = Math.ceil(remaining / 60000);
        if (minutes !== lastAnnouncedMinutes && minutes > 0) {
            statusEl.textContent = `Timer set. ${minutes} minute${minutes === 1 ? '' : 's'} remaining`;
            lastAnnouncedMinutes = minutes;
        } else if (remaining <= 10000) {
            statusEl.textContent = `Almost there: ${formatTime(remaining)}`;
        }
    }

    function startTimer(minutes) {
        clearTimerState();
        stopFade();

        endTimeMs = Date.now() + minutes * 60 * 1000;
        cancelBtn.disabled = false;

        statusEl.textContent = `Timer set for ${minutes} minute${minutes === 1 ? '' : 's'}.`;

        updateCountdown();
        timerInterval = setInterval(updateCountdown, 1000);
    }

    function cancelTimer() {
        clearTimerState();
        stopFade();
        statusEl.textContent = 'Timer off';
    }

    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const minutes = parseInt(btn.getAttribute('data-sleep-minutes'), 10);
            if (!Number.isNaN(minutes) && minutes > 0) {
                startTimer(minutes);
            }
        });
    });

    cancelBtn.addEventListener('click', cancelTimer);

    document.addEventListener('visibilitychange', () => {
        if (!timerInterval || !endTimeMs) return;
        updateCountdown();
    });
});
