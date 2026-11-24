/* Shared, synchronous localization: works from file:// and on any static host. */
const opnI18n = (() => {
  const languageNames = { es: 'Español (ES)', en: 'English (EN)', pt: 'Português (PT)', fr: 'Français (FR)', de: 'Deutsch (DE)', ru: 'Русский (RU)', 'zh-CN': '简体中文 (ZH-CN)' };
  const storageKey = 'opnLanguage';
  function resolveLanguage(value) {
    const tag = String(value || '').toLowerCase().replace(/_/g, '-');
    if (tag === 'zh' || tag.startsWith('zh-')) return 'zh-CN';
    const base = tag.split('-')[0];
    return Object.hasOwn(languageNames, base) ? base : null;
  }
  function detectLanguage() {
    try { const stored = resolveLanguage(localStorage.getItem(storageKey)); if (stored) return stored; } catch {}
    for (const language of navigator.languages || [navigator.language]) {
      const supported = resolveLanguage(language); if (supported) return supported;
    }
    return 'es';
  }
  let language = detectLanguage();
  const listeners = [];
  const staticTexts = [];
  const staticAttributes = [];
  function translate(source, parameters = {}) {
    let result = opnTranslations[language]?.[source] || opnTranslations.en[source] || source;
    return result.replace(/\{(\w+)\}/g, (token, key) => Object.hasOwn(parameters, key) ? String(parameters[key]) : token);
  }
  function translateData(value) {
    if (typeof value === 'string') return translate(value);
    if (Array.isArray(value)) return value.map(translateData);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateData(item)]));
    return value;
  }
  // Keep source text nodes and attributes so a language switch never translates a translation.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.parentElement.closest('script, style, svg, .language-switcher') && node.textContent.trim()) staticTexts.push([node, node.textContent]);
  }
  document.querySelectorAll('[aria-label], [placeholder], [alt], meta[name="description"], meta[property="og:description"]').forEach(element => {
    for (const attribute of ['aria-label', 'placeholder', 'alt', 'content']) {
      if (element.hasAttribute(attribute)) staticAttributes.push([element, attribute, element.getAttribute(attribute)]);
    }
  });
  const scriptUrl = document.currentScript.src;
  const switcher = document.createElement('div');
  switcher.className = 'language-switcher';
  switcher.setAttribute('role', 'group');
  for (const [code, name] of Object.entries(languageNames)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'language-flag';
    button.dataset.language = code;
    button.setAttribute('aria-label', name);
    button.title = name;
    const flag = document.createElement('img');
    flag.src = new URL(`assets/flags/${code}.svg`, scriptUrl).href;
    flag.alt = '';
    flag.setAttribute('aria-hidden', 'true');
    button.appendChild(flag);
    button.addEventListener('click', () => setLanguage(code));
    switcher.appendChild(button);
  }
  document.querySelector('.site-header').appendChild(switcher);
  function renderStatic() {
    document.documentElement.lang = language;
    staticTexts.forEach(([node, source]) => { node.textContent = source.replace(source.trim(), translate(source.trim())); });
    staticAttributes.forEach(([element, attribute, source]) => element.setAttribute(attribute, translate(source)));
    switcher.setAttribute('aria-label', translate('Language'));
    switcher.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  }
  function setLanguage(value) {
    const next = resolveLanguage(value);
    if (!next) return;
    language = next;
    try { localStorage.setItem(storageKey, language); } catch {}
    renderStatic();
    listeners.forEach(callback => callback());
  }
  function profileCount(count) {
    if (language === 'ru') {
      const form = new Intl.PluralRules('ru').select(count);
      return `${count} ${{ one: 'профиль', few: 'профиля', many: 'профилей', other: 'профиля' }[form]}`;
    }
    return `${count}${language === 'zh-CN' ? '' : ' '}${translate(count === 1 ? 'profile' : 'profiles')}`;
  }
  renderStatic();
  return { translate, translateData, resolveLanguage, setLanguage, profileCount, onChange(callback) { listeners.push(callback); }, get language() { return language; } };
})();
function t(source, parameters) { return opnI18n.translate(source, parameters); }
