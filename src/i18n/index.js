export { getTranslations, translations } from './translations.js';

export function getLang() {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem('for_lang') || 'en';
}

export function setLang(lang) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('for_lang', lang);
  document.documentElement.lang = lang;
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function onLangChange(callback) {
  if (typeof window === 'undefined') return;
  document.addEventListener('langchange', (e) => callback(e.detail.lang));
}
