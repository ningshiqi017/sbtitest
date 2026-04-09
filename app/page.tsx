import type { Metadata } from 'next';
import SbtiHome from '@/components/sbti-home';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title:
    'SBTI人格测试在线免费入口与完整说明：首页即测、结果解读、类型总览、分享指南与FAQ｜适合年轻用户自测与社交传播使用',
  description:
    '本页提供SBTI人格测试在线免费入口，打开首页即可开始答题，不跳转页面即可在弹窗中逐题完成并提交结果。完成后你会获得人格名称、维度评分与可分享卡片，还能继续阅读SBTI是什么、与MBTI差异、测试流程和人格类型索引，适合年轻用户自测、讨论和社交传播，内容强调娱乐表达而非心理诊断，方便你快速介绍自己并邀请朋友一起测。',
  alternates: {
    canonical: toAbsoluteUrl('/'),
  },
  openGraph: {
    title:
      'SBTI人格测试在线免费入口与完整说明：首页即测、结果解读、类型总览、分享指南与FAQ｜适合年轻用户自测与社交传播使用',
    description:
      '本页提供SBTI人格测试在线免费入口，打开首页即可开始答题，不跳转页面即可在弹窗中逐题完成并提交结果。完成后你会获得人格名称、维度评分与可分享卡片，还能继续阅读SBTI是什么、与MBTI差异、测试流程和人格类型索引，适合年轻用户自测、讨论和社交传播，内容强调娱乐表达而非心理诊断，方便你快速介绍自己并邀请朋友一起测。',
    url: toAbsoluteUrl('/'),
  },
  twitter: {
    title:
      'SBTI人格测试在线免费入口与完整说明：首页即测、结果解读、类型总览、分享指南与FAQ｜适合年轻用户自测与社交传播使用',
    description:
      '本页提供SBTI人格测试在线免费入口，打开首页即可开始答题，不跳转页面即可在弹窗中逐题完成并提交结果。完成后你会获得人格名称、维度评分与可分享卡片，还能继续阅读SBTI是什么、与MBTI差异、测试流程和人格类型索引，适合年轻用户自测、讨论和社交传播，内容强调娱乐表达而非心理诊断，方便你快速介绍自己并邀请朋友一起测。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'SBTI 和 MBTI 的区别是什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MBTI 是经典心理模型，SBTI 是娱乐向人格测试，不追求心理测量严谨性，更强调幽默表达与社交传播。',
      },
    },
    {
      '@type': 'Question',
      name: 'SBTI 有多少种人格？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '当前版本包含 27 种人格类型，每种类型都有对应的简介和解读内容。',
      },
    },
    {
      '@type': 'Question',
      name: 'SBTI 测试免费吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '目前在线测试免费，打开首页即可直接开始。',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SBTI 人格测试',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'All',
  inLanguage: 'zh-CN',
  description: '首页即测的 SBTI 人格测试工具，提供人格结果与十五维度评分。',
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <SbtiHome />
    </>
  );
}
