'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { typeImages, typeLibrary } from '@/lib/sbti-data';
import { buildShareResultToken, parseShareResultToken } from '@/lib/share-link';
import {
  generateShareCards,
  triggerImageDownload,
  type GeneratedShareCard,
} from '@/lib/share-cards';
import {
  buildQuestionSequence,
  computeResult,
  copywriting,
  dimExplanations,
  dimensionMeta,
  dimensionOrder,
  getAnsweredCount,
  getVisibleQuestions,
  type AnswerMap,
  type AnyQuestion,
  type ComputedResult,
} from '@/lib/sbti-engine';
import { toTypeSlug } from '@/lib/type-slugs';

type ModalStage = 'quiz' | 'result';

const optionCodes = ['A', 'B', 'C', 'D', 'E'];
const featuredTypeCodes = ['CTRL', 'ATM-er', 'MALO', 'MONK', 'DEAD', 'SEXY'] as const;
const featuredTypeEntries = featuredTypeCodes
  .map((code) => typeLibrary[code])
  .filter(Boolean);

function isSpecialQuestion(question: AnyQuestion): boolean {
  return 'special' in question && Boolean(question.special);
}

function getQuestionBadge(question: AnyQuestion): string {
  if (isSpecialQuestion(question)) return '补充题';
  return '';
}

export default function SbtiHome() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<ModalStage>('quiz');
  const [sequence, setSequence] = useState<AnyQuestion[]>([]);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<ComputedResult | null>(null);
  const [shareCards, setShareCards] = useState<GeneratedShareCard[]>([]);
  const [shareStatus, setShareStatus] = useState('');
  const [isGeneratingShare, setIsGeneratingShare] = useState(false);
  const [isSharingLink, setIsSharingLink] = useState(false);
  const [shareTokenHandled, setShareTokenHandled] = useState<string | null>(null);
  const [isSharedResult, setIsSharedResult] = useState(false);

  const visibleQuestions = useMemo(() => getVisibleQuestions(sequence, answers), [sequence, answers]);
  const answeredCount = useMemo(
    () => getAnsweredCount(visibleQuestions, answers),
    [visibleQuestions, answers],
  );

  const currentQuestion = visibleQuestions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canGoPrev = currentIndex > 0;

  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    if (currentIndex > visibleQuestions.length - 1) {
      setCurrentIndex(Math.max(visibleQuestions.length - 1, 0));
    }
  }, [visibleQuestions.length, currentIndex]);

  useEffect(() => {
    if (!shareStatus) return;
    const timer = window.setTimeout(() => setShareStatus(''), 1800);
    return () => window.clearTimeout(timer);
  }, [shareStatus]);

  useEffect(() => {
    const token = searchParams.get('r');
    if (!token || token === shareTokenHandled) return;
    setShareTokenHandled(token);

    const decodedAnswers = parseShareResultToken(token);
    if (!decodedAnswers) return;

    setSequence(buildQuestionSequence());
    setAnswers(decodedAnswers);
    setCurrentIndex(0);
    setResult(computeResult(decodedAnswers));
    setStage('result');
    setShareCards([]);
    setShareStatus('已打开分享结果');
    setIsSharedResult(true);
    setIsOpen(true);
  }, [searchParams, shareTokenHandled]);

  const openTest = () => {
    setSequence(buildQuestionSequence());
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setStage('quiz');
    setShareCards([]);
    setShareStatus('');
    setIsSharedResult(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setShareStatus('');
  };

  const selectOption = (value: number) => {
    if (!currentQuestion) return;

    setAnswers((prev) => {
      const next: AnswerMap = { ...prev, [currentQuestion.id]: value };

      if (currentQuestion.id === 'drink_gate_q1' && value !== 3) {
        delete next.drink_gate_q2;
      }

      const projectedVisible = getVisibleQuestions(sequence, next);
      const hasNext = currentIndex < projectedVisible.length - 1;

      if (hasNext) {
        window.setTimeout(() => {
          setCurrentIndex((idx) => Math.min(idx + 1, projectedVisible.length - 1));
        }, 110);
      } else {
        setResult(computeResult(next));
        setStage('result');
      }

      return next;
    });
  };

  const toPrev = () => {
    if (!canGoPrev) return;
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const extractMatchRate = (currentResult: ComputedResult): number => {
    const matched = currentResult.badge.match(/(\\d+)%/);
    if (matched) return Number(matched[1]);
    return currentResult.bestNormal.similarity;
  };

  const handleGenerateShareCards = async () => {
    if (!result) return;
    setIsGeneratingShare(true);
    setShareStatus('');

    try {
      const posterUrl = new URL(typeImages[result.finalType.code], window.location.origin).toString();
      const topDimensions = dimensionOrder
        .map((dim) => ({
          name: dimensionMeta[dim].name,
          score: result.rawScores[dim],
          level: result.levels[dim],
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      const cards = await generateShareCards({
        locale: 'zh',
        typeCode: result.finalType.code,
        typeName: result.finalType.cn,
        intro: result.finalType.intro,
        description: result.finalType.desc,
        badge: result.badge,
        matchRate: extractMatchRate(result),
        posterUrl,
        topDimensions,
      });

      setShareCards(cards);
      setShareStatus('分享图片已生成');
    } catch {
      setShareStatus('分享图生成失败，请重试');
    } finally {
      setIsGeneratingShare(false);
    }
  };

  const downloadSingleCard = (card: GeneratedShareCard) => {
    triggerImageDownload(card.dataUrl, card.filename);
    setShareStatus(`已下载第 ${card.id} 张`);
  };

  const downloadAllCards = async () => {
    if (!shareCards.length) return;

    for (const card of shareCards) {
      triggerImageDownload(card.dataUrl, card.filename);
      // Keep small delay so browsers are less likely to block multiple downloads.
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => window.setTimeout(resolve, 180));
    }
    setShareStatus('已触发下载');
  };

  const handleShareAction = async () => {
    if (shareCards.length) {
      await downloadAllCards();
      return;
    }
    await handleGenerateShareCards();
  };

  const handleShareResultLink = async () => {
    if (!result) return;
    setIsSharingLink(true);
    setShareStatus('');

    try {
      const token = buildShareResultToken(answers);
      const link = `${window.location.origin}/zh?r=${encodeURIComponent(token)}`;
      const shareText = `我测出了 ${result.finalType.code}（${result.finalType.cn}），来测同款：${link}`;

      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({
            title: 'SBTI 测试结果',
            text: shareText,
            url: link,
          });
          setShareStatus('分享链接已生成');
          return;
        } catch {
          // Fallback to clipboard for browsers where native share is cancelled or unavailable.
        }
      }

      try {
        await navigator.clipboard.writeText(link);
        setShareStatus('结果链接已复制');
      } catch {
        window.prompt('复制这个结果链接分享给朋友', link);
        setShareStatus('结果链接已生成');
      }
    } catch {
      setShareStatus('结果链接生成失败，请重试');
    } finally {
      setIsSharingLink(false);
    }
  };

  const progress = visibleQuestions.length
    ? Math.round((answeredCount / visibleQuestions.length) * 100)
    : 0;

  return (
    <main className="landing-page">
      <section className="hero-screen">
        <h1 className="hero-title">MBTI已经过时，SBTI来了。</h1>
        <button className="primary-btn hero-start" onClick={openTest}>
          开始测试
        </button>
      </section>

      <section className="content-wrap" id="about">
        <article className="content-card" id="what-is-sbti">
          <h2>SBTI 是什么</h2>
          <p>
            SBTI 全称 Silly Big Personality Test，是一个轻松向的人格测试。它借用了 MBTI
            的结构灵感，但结果并不是严肃心理学标签，而是更贴近中文互联网语境的“自嘲式人格”，比如“死者”“吗喽”“ATM-er”。
            你可以把它当成一面带幽默滤镜的镜子：快速测、快速懂、快速分享。它的核心价值是娱乐和社交传播，而不是学术诊断。
          </p>
          <div className="type-more-wrap">
            <Link href="/zh/what-is-sbti" className="type-more-link">
              查看完整说明
            </Link>
          </div>
        </article>

        <article className="content-card" id="vs-mbti">
          <h2>SBTI 和 MBTI 有什么区别</h2>
          <p>
            MBTI 是经典的人格模型，有明确理论来源，常用于自我认知和沟通风格讨论。SBTI 的目标完全不同：
            它不追求科学严谨，更像一种当代青年语境里的表达游戏。SBTI 用荒诞和梗文化描述处境，把“解释自己”这件事变得更轻松。
            两者都能带来“被看见”的感觉，但 MBTI 偏分析框架，SBTI 偏幽默共鸣与社交话题。
          </p>
          <div className="type-more-wrap">
            <Link href="/zh/sbti-vs-mbti" className="type-more-link">
              查看对比详情
            </Link>
          </div>
        </article>

        <article className="content-card" id="how-to-play">
          <h2>测试包含哪些内容 / 怎么测</h2>
          <p>
            当前版本包含 30 道主问题，围绕 15 个维度评估作答倾向；根据你的选择，还会插入补充题分支。
            交互方式是单题逐条模式：点击选项后自动进入下一题，支持上一题返回调整。完成后会即时展示人格名称、匹配说明、十五维度解读，
            并提供可复制的分享文案，方便你一键发到社交平台。
          </p>
          <div className="type-more-wrap">
            <Link href="/zh/how-sbti-test-works" className="type-more-link">
              查看测试流程
            </Link>
          </div>
        </article>

        <article className="content-card" id="types">
          <h2>有哪些人格类型</h2>
          <p>
            SBTI 目前包含 27 种人格类型，覆盖从“拿捏者”“僧人”到“死者”“酒鬼”等不同表达风格。每一种类型都对应独立解释，
            你可以先看下方精选类型，点击“查看更多人格类型”进入完整汇总页。
          </p>
          <div className="type-link-grid" aria-label="人格类型列表">
            {featuredTypeEntries.map((item) => (
              <Link key={item.code} href={`/zh/types/${toTypeSlug(item.code)}`} className="type-link-item">
                <div className="type-link-top">
                  <strong>{item.code}</strong>
                  <span>{item.cn}</span>
                </div>
                <p>{item.intro}</p>
              </Link>
            ))}
          </div>
          <div className="type-more-wrap">
            <Link href="/zh/types" className="type-more-link">
              查看更多人格类型
            </Link>
          </div>
        </article>

        <article className="content-card" id="why-hot">
          <h2>为什么 SBTI 会火 / 背后说明了什么</h2>
          <p>
            SBTI 的走红，本质上是一种“用幽默消解压力”的集体表达。相比长篇解释自己，年轻人更愿意用一个荒诞但准确的标签快速对齐情绪：
            既能自嘲，也能破冰，还能形成社交货币。当测试结果变成可转发的内容，个体情绪就会转化为传播节点，这也是 SBTI
            在社媒平台持续扩散的重要原因。
          </p>
        </article>

        <article className="content-card faq-card" id="faq">
          <h2>FAQ</h2>
          <details>
            <summary>SBTI 和 MBTI 的区别是什么？</summary>
            <p>MBTI 偏心理模型，SBTI 偏娱乐表达。前者强调结构化认知，后者强调社交语境下的幽默共鸣。</p>
          </details>
          <details>
            <summary>SBTI 有多少种人格？</summary>
            <p>当前版本共 27 种人格类型，后续会继续完善描述和类型详情页。</p>
          </details>
          <details>
            <summary>SBTI 测试免费吗？</summary>
            <p>目前在线版本免费使用，打开首页即可测试，不需要注册。</p>
          </details>
          <details>
            <summary>SBTI 测试会跳转新页面吗？</summary>
            <p>不会。点击开始后在顶层弹窗完成测试和结果查看，用户始终停留在首页。</p>
          </details>
        </article>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.section
              className="modal-shell"
              data-stage={stage}
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="SBTI 测试弹窗"
            >
              <header className="modal-header">
                <div>
                  <p className="eyebrow">SBTI 人格测试</p>
                  <h3>{stage === 'quiz' ? '逐题作答' : '测试结果'}</h3>
                </div>
                <button className="ghost-btn" onClick={closeModal}>
                  关闭
                </button>
              </header>

              {stage === 'quiz' && currentQuestion && (
                <div className="quiz-body">
                  <div className="progress-head">
                    <span>
                      第 {currentIndex + 1} / {visibleQuestions.length} 题
                    </span>
                    <span>
                      已完成 {answeredCount}/{visibleQuestions.length}
                    </span>
                  </div>
                  <div className="progress-track" aria-hidden="true">
                    <span style={{ width: `${progress}%` }} />
                  </div>

                  <motion.article
                    key={currentQuestion.id}
                    className="question-card"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="question-meta">
                      {getQuestionBadge(currentQuestion) ? (
                        <span className="badge">{getQuestionBadge(currentQuestion)}</span>
                      ) : null}
                    </div>
                    <p className="question-title">{currentQuestion.text}</p>

                    <div className="option-list">
                      {currentQuestion.options.map((option, index) => {
                        const selected = currentAnswer === option.value;
                        return (
                          <button
                            key={`${currentQuestion.id}-${option.value}`}
                            className={`option-btn ${selected ? 'is-selected' : ''}`}
                            onClick={() => selectOption(option.value)}
                          >
                            <span className="option-code">{optionCodes[index] ?? String(index + 1)}</span>
                            <span>{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.article>

                  <footer className="quiz-actions">
                    <button className="ghost-btn" onClick={toPrev} disabled={!canGoPrev}>
                      上一题
                    </button>
                    <span className="auto-next-note">
                      {currentIndex === visibleQuestions.length - 1
                        ? '选择答案后将自动提交'
                        : '选择答案后自动下一题'}
                    </span>
                  </footer>
                </div>
              )}

              {stage === 'result' && result && (
                <div className="result-body">
                  <section className="result-top">
                    <div className="result-poster">
                      <img
                        src={typeImages[result.finalType.code]}
                        alt={`${result.finalType.code} ${result.finalType.cn}`}
                      />
                      <p>{result.finalType.intro}</p>
                    </div>

                    <div className="result-main">
                      <p className="eyebrow">{result.modeKicker}</p>
                      <h3>
                        {result.finalType.code}（{result.finalType.cn}）
                      </h3>
                      <p className="result-badge">{result.badge}</p>
                      <p className="result-sub">{result.sub}</p>
                      <p className="result-desc">{result.finalType.desc}</p>
                    </div>
                  </section>

                  <section className="dim-grid">
                    {dimensionOrder.map((dim) => {
                      const level = result.levels[dim];
                      return (
                        <article key={dim} className="dim-card">
                          <div className="dim-head">
                            <strong>{dimensionMeta[dim].name}</strong>
                            <span>
                              {level} / {result.rawScores[dim]}分
                            </span>
                          </div>
                          <p>{dimExplanations[dim][level]}</p>
                        </article>
                      );
                    })}
                  </section>

                  <section className="result-note">
                    <h4>友情提示</h4>
                    <p>{result.special ? copywriting.specialFunNote : copywriting.defaultFunNote}</p>
                  </section>

                  <footer className="result-actions">
                    <button className="ghost-btn" onClick={openTest}>
                      {isSharedResult ? '测同款' : '重新测试'}
                    </button>
                    <button
                      className="ghost-btn"
                      onClick={handleShareResultLink}
                      disabled={isSharingLink}
                    >
                      {isSharingLink ? '处理中...' : '一键分享'}
                    </button>
                    <button
                      className="ghost-btn"
                      onClick={handleShareAction}
                      disabled={isGeneratingShare}
                    >
                      {isGeneratingShare ? '生成中...' : shareCards.length ? '一键下载' : '生成分享图'}
                    </button>
                    <button className="primary-btn" onClick={closeModal}>
                      回到首页
                    </button>
                  </footer>
                  {shareStatus ? <p className="copy-status">{shareStatus}</p> : null}

                  {shareCards.length ? (
                    <section className="share-panel">
                      <h4>分享图片</h4>
                      <p>已生成分享图片，适合发到小红书、B 站、朋友圈。</p>
                      <div className="share-grid">
                        {shareCards.map((card) => (
                          <article key={card.id} className="share-card-preview">
                            <img src={card.dataUrl} alt={`分享图 ${card.id}`} />
                            <button className="ghost-btn" onClick={() => downloadSingleCard(card)}>
                              下载第 {card.id} 张
                            </button>
                          </article>
                        ))}
                      </div>
                    </section>
                  ) : null}
                </div>
              )}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
