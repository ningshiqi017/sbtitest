# 博客 GEO 规划（2026-04）

## 1. 目标
- 用博客承接长尾搜索词和问句词，给首页/类型页导流。
- 提升 AI 检索场景下的可引用性（定义、对比、流程、类型解释）。
- 在不牺牲质量的前提下，逐步放开博客抓取。

## 2. 当前策略结论
- 现在不建议“直接大量发文 + 立刻放开抓取”。
- 建议先准备 6-10 篇首批内容，再统一放开 `/blog` 与 `/zh/blog` 的抓取。
- 原因：目前是新站早期阶段，质量与意图匹配优先于数量。

## 3. 发布节奏（建议）
- 第 1 周：完成首批 6 篇（草稿 + 审核 + 内链）。
- 第 2 周：补齐到 10 篇并统一上线，放开抓取。
- 第 3-6 周：每周 2-3 篇，优先类型长尾词与高转化问句词。

## 4. 首批 10 篇内容题单（优先级）

| 优先级 | 语言 | 页面建议 URL | 主关键词 | 意图 | 备注 |
|---|---|---|---|---|---|
| P0 | zh | `/zh/blog/sbti-shi-shen-me` | sbti是什么 | 信息 | 定义页延展，需明确与气候 SBTi 消歧 |
| P0 | zh | `/zh/blog/sbti-mbti-qubie` | sbti和mbti区别 | 信息 | 对比页延展，做对照表 |
| P0 | zh | `/zh/blog/sbti-ce-shi-zen-me-ce` | sbti怎么测 | 信息 | 解释 30 题、流程、结果 |
| P0 | zh | `/zh/blog/sbti-ren-ge-lei-xing-ru-men` | sbti人格类型 | 信息 | 汇总页导流文章 |
| P0 | en | `/blog/what-is-sbti-personality-test` | what is sbti | 信息 | 英文定义页支撑 |
| P1 | en | `/blog/sbti-vs-mbti-guide` | sbti vs mbti | 信息 | 英文对比页支撑 |
| P1 | en | `/blog/how-sbti-test-works` | how sbti test works | 信息 | 英文流程页支撑 |
| P1 | zh | `/zh/blog/sbti-ce-shi-mian-fei-ma` | sbti测试免费 | 转化 | 引导回首页测试 |
| P1 | zh | `/zh/blog/sbti-atm-er-shi-shen-me-yi-si` | sbti atm-er是什么意思 | 信息 | 类型长尾入口 |
| P1 | zh | `/zh/blog/sbti-si-zhe-shi-shen-me-yi-si` | sbti 死者是什么意思 | 信息 | 类型长尾入口 |

## 5. 每篇文章的固定结构（必须）
1. 开头 80-120 字直接回答问题（可被 AI 直接引用）。
2. 一段“避免歧义”说明（SBTI personality test vs SBTi climate）。
3. 主体 3-5 个 H2（定义/差异/流程/适用人群/误区）。
4. FAQ 3-5 条（问句型）。
5. 文末内链（至少 3 条）：
   - 首页：`/` 或 `/zh`
   - 对应意图页：`/what-is-sbti`、`/sbti-vs-mbti`、`/how-sbti-test-works`
   - 对应类型页：`/types/[slug]` 或 `/zh/types/[slug]`

## 6. 质量门槛（上线前）
- 标题：55-60 字符（英文）/ 中文尽量短且可读。
- 描述：150-160 字符（英文）/ 中文以完整表达为主。
- 至少 1 个列表、1 个对照段、1 组 FAQ。
- 不堆词，首段自然出现主关键词即可。
- 英文文案必须自然表达，不用机翻腔。

## 7. 放开博客抓取的触发条件
当以下条件满足后，再放开：
- 首批 >= 6 篇可读内容已发布。
- 每篇有清晰内链，且都能导向首页或类型页。
- 文章页 metadata（canonical/hreflang/title/description）配置完成。

## 8. 放开抓取时的技术变更清单
1. 修改 [app/robots.ts](/Users/ningshiqi/project/sbtitest/app/robots.ts)
- 从 `disallow: ['/blog', '/zh/blog']` 移除博客路径。

2. 修改 [app/blog/page.tsx](/Users/ningshiqi/project/sbtitest/app/blog/page.tsx)
- 移除 `robots: { index: false, follow: false }`。

3. 修改 [app/zh/blog/page.tsx](/Users/ningshiqi/project/sbtitest/app/zh/blog/page.tsx)
- 移除 `robots: { index: false, follow: false }`。

4. 将博客文章路由纳入 sitemap。

## 9. 指标与复盘
- 周频观察：曝光、点击、平均排名（Search Console）。
- 周频观察：`research/monitoring/geo-baseline.csv` 里的 AI 引用变化。
- 若 2 周后“有曝光但低点击”：优先改标题/摘要，而不是继续加量。

## 10. 执行建议（简版）
- 本周先做首批 6 篇（4 篇中文 + 2 篇英文）。
- 下周补齐到 10 篇后统一放开抓取。
- 放开后 7 天、14 天各复盘一次。
