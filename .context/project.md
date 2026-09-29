# Project context

- `build.mjs` is the source of the bilingual static site and generates all HTML, `sitemap.xml`, and `robots.txt`.
- `site.json` stores the public URL and email. `cv.json` stores both CV versions.
- Generated pages are committed because GitHub Pages serves the repository root directly.
- SEO update, 17 September 2026: aligned each home page `<title>`, Open Graph title, and `ProfilePage.name` with its visible H1. English uses `Dmitry Pronin | Interpretable Digital Stylometry`; Russian uses `Дмитрий Пронин | Интерпретируемая цифровая стилометрия`.
- Google Search Console verification uses the HTML meta tag generated in every page head. Keep it in place while the property is active.
- Checked the profile repository at `../github-profile`: it already links both site languages and consistently presents `Interpretable digital stylometry`, so no edit was needed.

## Verification

Run `node build.mjs`, check the generated home pages for the heading, Habr link, source label and card count, then inspect `git diff` before publishing.

## Habr card, 29 September 2026

User approved adding `https://habr.com/ru/articles/1088162/` to the popular-writing grid with section title `Разборы и эссе` (`Explainers and essays` in English). The existing four cards are from System Block; their source label was hardcoded in `mainPage`. Added the Habr card first in each language and an optional fifth tuple value for its source label. Kept the System Block author-page link.

Source: Habr article by Dmitry Pronin, published 29 September 2026. Metadata came from Habr's article page/API. `node build.mjs` generated eight pages; only `index.html` and `ru/index.html` have content diffs. A PowerShell check confirmed the heading, Habr URL, source label and five cards on each home page. The first `node -e` verification attempt failed because PowerShell broke the regular expression; the PowerShell check passed. Clone initially failed under sandbox networking, then succeeded with network escalation.

Published code commit `d57d7ad` to `main`. Direct HTTP checks of `https://ddpronin.github.io/` and `/ru/` returned 200 and confirmed the new heading and Habr link on both live pages.
