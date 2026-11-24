/* Build the static runtime bundle without dependencies or translation services. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const languages = ['en', 'es', 'pt', 'fr', 'de', 'ru', 'zh-CN'];
const catalogs = Object.fromEntries(languages.map(language => [language, JSON.parse(fs.readFileSync(path.join(root, 'locales', `${language}.json`), 'utf8'))]));
const englishKeys = Object.keys(catalogs.en).sort();
for (const language of languages) {
  const catalog = catalogs[language];
  if (JSON.stringify(Object.keys(catalog).sort()) !== JSON.stringify(englishKeys)) throw Error(`Different translation keys: ${language}`);
  for (const key of englishKeys) {
    if (typeof catalog[key] !== 'string' || !catalog[key].trim()) throw Error(`Empty translation: ${language}: ${key}`);
    const tokens = value => JSON.stringify((value.match(/\{\w+\}/g) || []).sort());
    if (tokens(key) !== tokens(catalog[key])) throw Error(`Different placeholders: ${language}: ${key}`);
  }
}
fs.writeFileSync(path.join(root, 'locales.js'), '/* Generated from locales/*.json. Run node scripts/build-locales.cjs. */\nconst opnTranslations = ' + JSON.stringify(catalogs, null, 2) + ';\n');
console.log(`Built ${languages.length} languages, ${englishKeys.length} strings each.`);
