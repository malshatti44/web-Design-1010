/* =========================
   Theme Toggle (Apple Minimal)
   - Uses <html class="light-mode"> as your current system
   - Dark is default when light-mode is absent
   - Persists user choice
   - Syncs checkbox state
   ========================= */

const THEME_KEY = 'theme';          // 'light' | 'dark'
const USER_SET_KEY = 'theme_user';  // '1' if user manually chose

function applyTheme(theme) {
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  const isLight = theme === 'light';

  html.classList.toggle('light-mode', isLight);

  // Sync switch (checked = dark in our UI style)
  // If you prefer checked = light, flip this line.
  if (toggle) toggle.checked = !isLight;
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return getSystemTheme();
}

function initTheme() {
  applyTheme(getInitialTheme());
}

// Init on load
initTheme();

// Toggle handling (checkbox)
document.getElementById('themeToggle')?.addEventListener('change', function () {
  // checked = dark
  const nextTheme = this.checked ? 'dark' : 'light';

  localStorage.setItem(THEME_KEY, nextTheme);
  localStorage.setItem(USER_SET_KEY, '1');
  applyTheme(nextTheme);
});

// Watch system changes (only if user didn't manually choose)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const userSet = localStorage.getItem(USER_SET_KEY) === '1';
  if (userSet) return; // respect user choice

  const systemTheme = getSystemTheme();
  localStorage.setItem(THEME_KEY, systemTheme);
  applyTheme(systemTheme);
});