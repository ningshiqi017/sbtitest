# SBTI Research Baseline (Phase: Research)

Date: 2026-04-10  
Scope: Foundation research only (no page body rewrites)  
Target: Build SEO + GEO baseline inputs for next phase

## 1) Method and Data Source

This baseline uses:
- Current site inventory from local code (`app/` routes, metadata, sitemap/robots).
- Competitor live-page crawl snapshots (7 domains) saved in `research/raw/`.
- Public web query sampling to validate ecosystem signals, with special attention to acronym ambiguity (`SBTI` vs climate `SBTi`).

Constraint note:
- No paid keyword APIs were used in this run, so this is a directionally strong baseline using observable market signals, not absolute-volume forecasting.

## 2) Current Site Baseline (Observed)

Site coverage currently includes:
- EN and ZH home pages (`/`, `/zh`)
- Type hub and type detail pages (`/types`, `/types/[slug]`, `/zh/types`, `/zh/types/[slug]`)
- About and terms pages in both languages
- Blog pages in both languages (currently blocked from crawling as intended)

Structured data:
- Homepage: `FAQPage`, `WebApplication`
- Limited schema breadth outside homepage

Known strengths:
- Bilingual architecture and locale alternates already in sitemap
- Clear quiz-first product funnel (home -> modal quiz -> result -> type pages)
- Type detail architecture already exists (good for long-tail expansion)

## 3) Research Output A: Keyword Priority Map

Output file: `research/data/keyword-priority.csv`

Priority summary:
- P0 EN: `sbti test`, `what is sbti`, `sbti vs mbti`, `sbti types`
- P0 ZH: `sbti测试`, `sbti人格测试`, `sbti是什么`, `sbti和mbti区别`, `sbti人格类型`
- P1 focus: online/free modifiers, question-flow intent, `27 types` and `30 questions` format-intent
- P2 focus: type-specific long-tail (e.g. `ATM-er`, `死者`)

Strategic keyword principle for this project:
- Use user-natural query forms first (`SBTI test`, `SBTI online`, `SBTI测试`) and keep model-friendly semantic clarity as a secondary optimization layer.

## 4) Research Output B: Competitor Matrix

Output file: `research/data/competitor-matrix.csv`

Tracked domains:
- `sbtitest.co`
- `sbtitest.pro`
- `sbtitest.live`
- `sbtitestai.com`
- `sbti-web.com`
- `sbittest.top`
- `sbti-test.net`

High-confidence patterns observed:
- Most strong pages include explicit `What is SBTI` and/or `SBTI vs MBTI` blocks.
- Competitors frequently surface hard numbers in hero/meta (question count, type count).
- FAQ-heavy packaging is common where ranking intent is informational + conversion mixed.
- Chinese pages often lead with `免费` and `在线` modifiers.

## 5) Research Output C: Content Gap Map (Your Site vs Market)

Output file: `research/data/content-gap.csv`

Top foundation gaps (no rewrite required yet):
- G01: Missing explicit disambiguation against climate `SBTi` intent.
- G02: No standalone canonical `What is SBTI` page.
- G03: No standalone canonical `SBTI vs MBTI` comparison page.
- G04: Method transparency (30 questions, scoring dimensions) not packaged as a dedicated retrieval block.
- G05: Type-page long-tail query mapping not formalized.

## 6) GEO-Relevant Research Conclusions

For AI citation visibility, the current best opportunities are:
1. Canonical answer blocks for definition/comparison/method intent.
2. Strong query-to-page mapping (one primary query per page intent).
3. Stable factual snippets (counts, definitions, scope boundaries) repeated consistently across page + schema.
4. Clarity-first wording for disambiguation (`SBTI personality test`, not climate-target initiative).

## 7) Ready Handoff to Build Phase (No iteration scheduling)

This Research phase is complete and now provides usable inputs for Build:
- `research/data/keyword-priority.csv`
- `research/data/competitor-matrix.csv`
- `research/data/content-gap.csv`
- `research/raw/*.html` and `research/raw/competitor-scrape.txt`

Recommended Build sequence (when you say start):
1. Build page-intent map from P0 keywords.
2. Add dedicated canonical pages for definition/comparison/method.
3. Apply GEO-friendly content structure and schema per page type.

