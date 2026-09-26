(() => {
  let theme;
  try { theme = localStorage.getItem('portfolio-theme'); } catch { /* Storage may be unavailable in private browsing. */ }
  document.documentElement.dataset.theme = theme === 'light' || theme === 'dark' ? theme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
})();
