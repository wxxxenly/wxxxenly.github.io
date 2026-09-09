function applyI18n() {
  const lang = localStorage.getItem('lang') || 'ru';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = window.i18n.t(key);
    if (text) el.textContent = text;
  });
}