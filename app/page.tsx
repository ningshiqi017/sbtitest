import SbtiHome from '@/components/sbti-home';

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
