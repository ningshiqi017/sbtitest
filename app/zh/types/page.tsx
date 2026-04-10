import type { Metadata } from 'next';
import Link from 'next/link';
import { typeLibrary } from '@/lib/sbti-data';
import { toAbsoluteUrl } from '@/lib/site';
import { toTypeSlug } from '@/lib/type-slugs';

export const metadata: Metadata = {
  title:
    'SBTI全部人格类型索引与结果解释中心：27种类型速查、标签含义解读、详情页导航与分享建议｜适合年轻用户自测与社交传播',
  description:
    '这里汇总SBTI全部人格类型并提供统一导航，你可以快速查找27种结果对应的名称、标签含义和简要特征，再进入详情页查看完整解读。每个类型页都会补充行为风格、关系倾向和表达方式，方便你在测完后继续对照阅读，也便于直接分享链接给朋友进行讨论与二次传播。页面结构按长期SEO收录设计，后续会持续扩展类型内容与关联文章入口。',
  alternates: {
    canonical: toAbsoluteUrl('/zh/types'),
    languages: {
      en: toAbsoluteUrl('/types'),
      'zh-CN': toAbsoluteUrl('/zh/types'),
      'x-default': toAbsoluteUrl('/types'),
    },
  },
  openGraph: {
    title:
      'SBTI全部人格类型索引与结果解释中心：27种类型速查、标签含义解读、详情页导航与分享建议｜适合年轻用户自测与社交传播',
    description:
      '这里汇总SBTI全部人格类型并提供统一导航，你可以快速查找27种结果对应的名称、标签含义和简要特征，再进入详情页查看完整解读。每个类型页都会补充行为风格、关系倾向和表达方式，方便你在测完后继续对照阅读，也便于直接分享链接给朋友进行讨论与二次传播。页面结构按长期SEO收录设计，后续会持续扩展类型内容与关联文章入口。',
    url: toAbsoluteUrl('/zh/types'),
    locale: 'zh_CN',
  },
};

export default function ZhTypeIndexPage() {
  const list = Object.values(typeLibrary);

  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>SBTI 人格索引</p>
        <h1>全部人格类型</h1>
        <Link href="/zh">返回首页测试</Link>
      </header>

      <section className="type-page-grid" aria-label="SBTI 人格列表">
        {list.map((item) => (
          <Link key={item.code} href={`/zh/types/${toTypeSlug(item.code)}`} className="type-page-card">
            <h2>{item.code}</h2>
            <strong>{item.cn}</strong>
            <p>{item.intro}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
