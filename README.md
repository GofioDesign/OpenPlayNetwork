# OPN Report Kit

A lightweight, dependency-free web tool for filtering, combining and copying neutral Steam report and profile-comment templates.

Steam group: https://steamcommunity.com/groups/OpenPlayNetwork

Selecting **Farming bot** reveals a daily, browser-local queue for Steam profile URLs. Duplicate profiles are merged, their selected report categories are retained, and one consolidated email can be copied at the end of the day for use outside Steam's browser.

The sharing section provides prepared Steam-comment and Discord messages, direct links for supported services, link copying, and the device's native share menu where available.

`/kudos/` contains **OPN Player Feedback**, an additive generator grouped into Individual, Team and Match families. Each quality uses an ordered six-level scale: top, positive, neutral, completely absent, negative or severely negative. Participation and AFK behaviour are included as a separate quality. The generated comment can optionally invite the player to the OpenPlay Network Steam group.

## Use locally

Open `index.html` directly, or serve the directory with any static web server.

## Languages

Report Kit and Player Feedback (Kudos) support **ES, EN, PT, FR, DE, RU and simplified Chinese (zh-CN)**. The seven circular flag buttons have accessible language names and tooltips; only the flags are visible. The active language is indicated by a ring.

Both pages share the browser-local `opnLanguage` preference. A saved choice takes precedence over the first supported language in `navigator.languages`; unsupported browsers fall back to Spanish. Regional variants map to their base language, and Chinese variants use simplified Chinese. Changing language immediately regenerates reports, comments, sharing messages, category help and the daily bot email while retaining selected categories, ratings, the promotion option and saved profiles. If browser storage is blocked, the selector still works for the current page, but the preference and bot queue cannot persist.

The bot email uses **cs2team@valvesoftware.com**, with the fixed, untranslated subject **boosting report**. Only its body follows the selected language. The tool prepares copyable text; it does not send email or reports.

The canonical and sharing base URL is **https://gofiodesign.eu/OpenPlayNetwork/**; Kudos remains under `/kudos/`.

Translations are stored in `locales/*.json`. Edit those catalogs, then run `node scripts/build-locales.cjs` to regenerate `locales.js`. Source text is used as a stable key; preserve placeholders such as `{name}` and `{date}`. All language data and flag SVGs are bundled locally: no translation service or network request is needed at runtime, including when opening the pages directly from disk.

The translations combine machine-assisted drafts with reviewed interface terms and report wording. Full native-speaker editorial review of every help text and Kudos comment has not been performed.

Run `node tests/locales.test.cjs` to check catalog coverage, interpolation tokens, all report and Kudos fields, the base URL and the fixed bot email details.

For optional browser checks, install `playwright-core` locally and run `node tests/browser-i18n.cjs` from the repository root. Set `OPN_BROWSER_PATH` to a Chromium browser executable (Windows defaults to Edge). The test serves local files through an intercepted test origin, mocks clipboard/sharing, and sends no reports. It checks all seven languages, all categories and rating tiers, selection retention, the daily queue, storage failure, copy feedback and layouts at 360, 768 and 1280 pixels. Screenshots go into the ignored `.qa/` directory. This is test tooling only; the site has no runtime dependencies.

## Publish with GitHub Pages

In the repository settings, open **Pages**, select **Deploy from a branch**, and choose the `main` branch and `/ (root)` folder.

