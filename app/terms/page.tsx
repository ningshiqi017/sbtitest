import type { Metadata } from 'next';
import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title:
    'SBTI用户协议与使用条款完整说明：娱乐用途边界、免责声明、分享规范、权益责任与合规更新｜适合年轻用户自测与社交传播使用',
  description:
    '本页集中说明SBTI站点的用户协议与使用条款，包括测试内容仅供娱乐参考、结果不构成医疗或心理诊断依据、用户分享与转载应遵守的平台规范，以及我们对内容更新、服务调整和必要合规处理的规则，帮助你在使用前清楚了解双方权责边界与信息使用方式。若你继续使用本站，即视为已阅读并同意相关条款；我们也会在规则变更后及时公示更新版本。',
  alternates: {
    canonical: toAbsoluteUrl('/terms'),
  },
};

export default function TermsPage() {
  return (
    <main className="type-page">
      <header className="type-page-header">
        <p>Legal</p>
        <h1>用户协议</h1>
        <Link href="/">返回首页测试</Link>
      </header>

      <section className="type-detail-card">
        <p className="type-desc">1. 本站提供的测试内容仅用于娱乐与社交分享，不作为医疗、心理或法律依据。</p>
        <p className="type-desc">2. 用户应合理使用本站内容，不得用于违法用途或恶意传播。</p>
        <p className="type-desc">3. 本站保留在必要时更新页面内容和展示形式的权利。</p>
      </section>
    </main>
  );
}
