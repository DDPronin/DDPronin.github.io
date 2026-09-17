# Project context

- `build.mjs` is the source of the bilingual static site and generates all HTML, `sitemap.xml`, and `robots.txt`.
- `site.json` stores the public URL and email. `cv.json` stores both CV versions.
- Generated pages are committed because GitHub Pages serves the repository root directly.
- SEO update, 17 September 2026: aligned each home page `<title>`, Open Graph title, and `ProfilePage.name` with its visible H1. English uses `Dmitry Pronin | Interpretable Digital Stylometry`; Russian uses `Дмитрий Пронин | Интерпретируемая цифровая стилометрия`.
- Google Search Console verification uses the HTML meta tag generated in every page head. Keep it in place while the property is active.
- Checked the profile repository at `../github-profile`: it already links both site languages and consistently presents `Interpretable digital stylometry`, so no edit was needed.

## Verification

Run `node build.mjs`, then `node ../check-site.mjs`. Inspect `git diff` before publishing.
