// تحديد الوضع الحالي من localStorage أو تفضيل النظام
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  
  if (isDark) {
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
  }
}

// تشغيل عند تحميل الصفحة
initTheme();

// التعامل مع زر التبديل
document.getElementById('themeToggle')?.addEventListener('click', function() {
  const html = document.documentElement;
  const isLightMode = html.classList.contains('light-mode');
  
  if (isLightMode) {
    html.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  }
});

// مراقبة تغيير تفضيل النظام
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const theme = e.matches ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  initTheme();
});