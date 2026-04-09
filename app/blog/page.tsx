import type { Metadata } from 'next';
import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title:
    'SBTI博客更新与内容日志中心：玩法迭代记录、人格观察文章、站点公告与后续专题计划说明｜适合年轻用户自测与社交传播使用',
  description:
    '博客页用于发布SBTI玩法更新、题目迭代记录、人格观察文章与站点公告，方便你持续关注测试内容变化和后续功能计划。当前页面处于建设阶段，后续会按专题沉淀可读内容与案例复盘，并在正式开放抓取前完成结构优化、质量校对与发布节奏安排。内容将覆盖产品思路、SEO实践和社媒传播样本，便于你追踪项目长期演进路径。',
  alternates: {
    canonical: toAbsoluteUrl('/blog'),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlogPage() {
  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>SBTI Blog</p>
        <h1>博客</h1>
        <p className="type-desc">这里将发布 SBTI 玩法更新、人格观察和站点公告。</p>
        <Link href="/">返回首页测试</Link>
      </header>

      <section className="type-detail-card">
        <h2>内容建设中</h2>
        <p className="type-desc">后续可按分类发布：产品更新、人格故事、社媒传播案例、FAQ 深度解读。</p>
      </section>
    </main>
  );
}
