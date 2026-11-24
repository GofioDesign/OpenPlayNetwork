const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const languages = ['en', 'es', 'pt', 'fr', 'de', 'ru', 'zh-CN'];
const catalogs = vm.runInNewContext(read('locales.js') + '\nopnTranslations');
const keys = Object.keys(catalogs.en).sort();
for (const language of languages) {
  assert.deepEqual(Object.keys(catalogs[language]).sort(), keys);
  assert.equal(JSON.stringify(catalogs[language]), JSON.stringify(JSON.parse(read(`locales/${language}.json`))));
  for (const key of keys) {
    assert(catalogs[language][key]?.trim(), `${language}: ${key}`);
    assert.deepEqual((catalogs[language][key].match(/\{\w+\}/g) || []).sort(), (key.match(/\{\w+\}/g) || []).sort());
  }
}
const report = read('script.js');
const reportData = vm.runInNewContext(report.slice(0, report.indexOf('const reportSourceData')) + '\n({templates, categoryHelp})');
const kudos = read('kudos/kudos.js');
const qualities = vm.runInNewContext(kudos.slice(0, kudos.indexOf('const qualitySourceData')) + '\nqualities');
function checkStrings(value) {
  if (typeof value === 'string') assert(Object.hasOwn(catalogs.en, value), `Missing source string: ${value}`);
  else Object.values(value).forEach(checkStrings);
}
checkStrings(reportData);
assert.equal(Object.keys(reportData.templates).length, 18);
assert.equal(Object.keys(qualities).length, 19);
for (const quality of Object.values(qualities)) {
  checkStrings({ name: quality.name, definition: quality.definition, ratings: quality.ratings });
  assert.deepEqual(Object.keys(quality.ratings).sort(), ['extreme', 'negative', 'neutral', 'positive', 'top', 'zero']);
}
// Combined Kudos comments use an implicit subject, with no repeated personal label.
const explicitSubjects = { en: /\bthe player\b/i, es: /\b(?:el|del|al) jugador\b/i, pt: /\b(?:o|do|ao) jogador\b/i, fr: /\b(?:le|du|au) joueur\b/i, de: /\b(?:der|den|dem|des) Spieler(?:s)?\b/, ru: /(?<!\p{L})игрок(?:а|у|ом)?(?!\p{L})/iu, 'zh-CN': /^(?:这位|这名|该)?玩家/ };
for (const language of languages) {
  for (const quality of Object.values(qualities)) for (const rating of Object.values(quality.ratings)) {
    assert(!explicitSubjects[language].test(catalogs[language][rating.comment]), `${language}: repeated explicit subject: ${rating.comment}`);
  }
}
const html = read('index.html');
assert(html.includes('value="cs2team@valvesoftware.com"'));
assert(html.includes('value="boosting report"'));
assert(report.includes('https://gofiodesign.eu/OpenPlayNetwork/'));
for (const file of ['index.html', 'script.js', 'kudos/index.html']) assert(!read(file).includes('gofiodesign.github.io'));
for (const language of languages) assert(fs.existsSync(path.join(root, 'assets', 'flags', language + '.svg')));
console.log(`PASS: ${keys.length} strings × 7 languages; 18 report categories; 19 Kudos qualities × 6 ratings; exact email route and base URL.`);
