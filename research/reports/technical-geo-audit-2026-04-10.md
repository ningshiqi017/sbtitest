# Technical SEO + GEO Audit (2026-04-10)

## Scope
- Route coverage audit for EN + ZH pages
- Canonical/hreflang consistency
- Indexing control (robots + page-level robots)
- Structured data coverage for retrieval-oriented pages
- GEO machine-readable files baseline

## Checklist Summary
- [x] Core routes have canonical + language alternates
- [x] `/blog` and `/zh/blog` are blocked in `robots.txt`
- [x] `/blog` and `/zh/blog` set `robots: noindex, nofollow`
- [x] `sitemap.xml` contains EN/ZH alternates for key pages and type detail pages
- [x] Homepage has `FAQPage` + `WebApplication`
- [x] Definition/comparison/method pages have `FAQPage` + `WebPage` + `BreadcrumbList`
- [x] Type index pages now have `WebPage` + `BreadcrumbList` + `ItemList`
- [x] Type detail pages now have `WebPage` + `BreadcrumbList`
- [x] `llms.txt` route exists and lists canonical crawl targets

## Findings
### Pass
1. Canonical/hreflang architecture is consistent for primary EN/ZH route pairs.
2. Index-control logic for blog staging is redundant in a safe way (robots + page metadata both blocked).
3. Structured-data coverage now matches intent page types:
   - Home: app-style entry page
   - Explain pages: QA-centric answer pages
   - Types hub: list-centric page
   - Type detail: entity detail page with breadcrumb context
4. New pages are included in sitemap with alternates:
   - `/what-is-sbti` + `/zh/what-is-sbti`
   - `/sbti-vs-mbti` + `/zh/sbti-vs-mbti`
   - `/how-sbti-test-works` + `/zh/how-sbti-test-works`

### Watchlist
1. `NEXT_PUBLIC_SITE_URL` must be set in production, otherwise canonical URLs may fall back to localhost.
2. GEO visibility still needs weekly manual citation tracking across ChatGPT/Perplexity/Google AI Overviews.
3. Content freshness signals are now present on key pages, but changelog-style updates are not yet centralized.

## Immediate Next Actions
1. Run first manual GEO citation capture using `research/monitoring/geo-baseline.csv`.
2. Add a lightweight public changelog page later to strengthen freshness and citation trust.
3. Keep blog `noindex` until initial editorial quality gate is passed.

## Evidence Pointers
- Canonical/hreflang: `app/**/*.tsx` metadata alternates blocks
- Indexing rules: `app/robots.ts`, `app/blog/page.tsx`, `app/zh/blog/page.tsx`
- Sitemap coverage: `app/sitemap.ts`
- Schema helpers: `lib/seo-schema.ts`
- GEO machine-readable: `app/llms.txt/route.ts`
