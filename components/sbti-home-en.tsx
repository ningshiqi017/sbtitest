'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { typeImages, typeLibrary } from '@/lib/sbti-data-en';
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
} from '@/lib/sbti-engine-en';
import { toTypeSlug } from '@/lib/type-slugs';
import AdsterraIframeUnit from '@/components/adsterra-iframe-unit';

type ModalStage = 'quiz' | 'result';

const optionCodes = ['A', 'B', 'C', 'D', 'E'];
const featuredTypeCodes = ['CTRL', 'ATM-er', 'MALO', 'MONK', 'DEAD', 'SEXY'] as const;
const adRailSlots = Array.from({ length: 3 }, (_, index) => index);
const featuredTypeEntries = featuredTypeCodes
  .map((code) => typeLibrary[code])
  .filter(Boolean);

function isSpecialQuestion(question: AnyQuestion): boolean {
  return 'special' in question && Boolean(question.special);
}

function getQuestionBadge(question: AnyQuestion): string {
  if (isSpecialQuestion(question)) return 'Bonus';
  return '';
}

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="share-icon">
      <path
        fill="currentColor"
        d="M18.244 2H21.5l-7.113 8.13L22.75 22h-6.555l-5.134-6.72L5.18 22H1.92l7.607-8.695L1.5 2h6.721l4.64 6.13L18.244 2Zm-1.15 18.02h1.804L7.246 3.875H5.31L17.094 20.02Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="share-icon">
      <path
        fill="currentColor"
        d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.9A3.85 3.85 0 0 0 3.9 7.75v8.5a3.85 3.85 0 0 0 3.85 3.85h8.5a3.85 3.85 0 0 0 3.85-3.85v-8.5a3.85 3.85 0 0 0-3.85-3.85h-8.5Zm8.95 1.55a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.9A3.1 3.1 0 1 0 12 15.1 3.1 3.1 0 0 0 12 8.9Z"
      />
    </svg>
  );
}

export default function SbtiHomeEn() {
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
  const [isSharingX, setIsSharingX] = useState(false);
  const [isSharingInstagram, setIsSharingInstagram] = useState(false);
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
    setShareStatus('Shared result loaded');
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
        locale: 'en',
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
      setShareStatus('Share cards generated');
    } catch {
      setShareStatus('Failed to generate share cards');
    } finally {
      setIsGeneratingShare(false);
    }
  };

  const downloadSingleCard = (card: GeneratedShareCard) => {
    triggerImageDownload(card.dataUrl, card.filename);
    setShareStatus(`Downloaded card ${card.id}`);
  };

  const downloadAllCards = async () => {
    if (!shareCards.length) return;

    for (const card of shareCards) {
      triggerImageDownload(card.dataUrl, card.filename);
      // Keep small delay so browsers are less likely to block multiple downloads.
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => window.setTimeout(resolve, 180));
    }
    setShareStatus('Download triggered');
  };

  const handleShareAction = async () => {
    if (shareCards.length) {
      await downloadAllCards();
      return;
    }
    await handleGenerateShareCards();
  };

  const buildResultShareLink = () => {
    const token = buildShareResultToken(answers);
    return `${window.location.origin}/?r=${encodeURIComponent(token)}`;
  };

  const handleShareToX = () => {
    if (!result) return;
    setShareStatus('');

    try {
      setIsSharingX(true);
      const link = buildResultShareLink();
      const intentUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(link)}`;
      const popup = window.open(intentUrl, '_blank', 'noopener,noreferrer');
      if (!popup) {
        window.prompt('Copy and share this result link on X', link);
      }
      setShareStatus('X sharing opened');
    } catch {
      setShareStatus('Failed to open X sharing');
    } finally {
      setIsSharingX(false);
    }
  };

  const handleShareToInstagram = async () => {
    if (!result) return;
    setShareStatus('');

    try {
      setIsSharingInstagram(true);
      const link = buildResultShareLink();

      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ url: link });
          setShareStatus('Link ready for Instagram sharing');
          return;
        } catch {
          // Fallback to clipboard for browsers where native share is cancelled or unavailable.
        }
      }

      try {
        await navigator.clipboard.writeText(link);
        setShareStatus('Link copied for Instagram');
      } catch {
        window.prompt('Copy and paste this link into Instagram', link);
        setShareStatus('Link ready for Instagram');
      }
    } catch {
      setShareStatus('Failed to prepare Instagram sharing');
    } finally {
      setIsSharingInstagram(false);
    }
  };

  const progress = visibleQuestions.length
    ? Math.round((answeredCount / visibleQuestions.length) * 100)
    : 0;

  return (
    <main className="landing-page">
      <section className="hero-screen">
        <h1 className="hero-title">
          <span className="hero-line">MBTI had its era.</span>
          <span className="hero-line">SBTI is now.</span>
        </h1>
        <button className="primary-btn hero-start" onClick={openTest}>
          Start Test
        </button>
      </section>

      <section className="home-after-hero" aria-label="Homepage content and ad rails">
        <aside className="home-ads-rail home-ads-left" aria-label="Left ad rail">
          {adRailSlots.map((slot) => (
            <div key={`en-left-${slot}`} className="home-ad-unit">
              <AdsterraIframeUnit />
            </div>
          ))}
        </aside>

        <section className="content-wrap" id="about">
        <article className="content-card" id="what-is-sbti">
          <h2>What is SBTI?</h2>
          <p>
            SBTI stands for Silly Big Personality Test. The SBTI test is built for fast, playful
            self-expression, not clinical diagnosis. On SBTI online, you get internet-native type
            labels, quick interpretation, and shareable results you can post right away.
          </p>
          <div className="type-more-wrap">
            <Link href="/what-is-sbti" className="type-more-link">
              Read full guide
            </Link>
          </div>
        </article>

        <article className="content-card" id="vs-mbti">
          <h2>SBTI vs MBTI: what is different?</h2>
          <p>
            MBTI is a classic framework for structured reflection. The SBTI test has a different
            goal: social resonance, humor, and speed. If MBTI is model-first, SBTI online is
            culture-first. Both are enjoyable, but users search SBTI test when they want a lighter,
            share-ready experience.
          </p>
          <div className="type-more-wrap">
            <Link href="/sbti-vs-mbti" className="type-more-link">
              Open comparison
            </Link>
          </div>
        </article>

        <article className="content-card" id="how-to-play">
          <h2>How the test works</h2>
          <p>
            The SBTI test online includes 30 core questions across 15 dimensions, plus conditional
            bonus questions. The quiz runs one-by-one in a modal. Select an option to auto-advance,
            use previous when needed, then submit to get instant SBTI test results, dimension scores,
            and a summary made for sharing.
          </p>
          <div className="type-more-wrap">
            <Link href="/how-sbti-test-works" className="type-more-link">
              View method details
            </Link>
          </div>
        </article>

        <article className="content-card" id="types">
          <h2>What personality types are available?</h2>
          <p>
            SBTI currently includes 27 type outcomes. You can preview featured profiles below, then
            open the full SBTI test type index for all details. Each type page helps you understand
            your SBTI test result and share it with clearer context.
          </p>
          <div className="type-link-grid" aria-label="Personality type list">
            {featuredTypeEntries.map((item) => (
              <Link key={item.code} href={`/types/${toTypeSlug(item.code)}`} className="type-link-item">
                <div className="type-link-top">
                  <strong>{item.code}</strong>
                  <span>{item.cn}</span>
                </div>
                <p>{item.intro}</p>
              </Link>
            ))}
          </div>
          <div className="type-more-wrap">
            <Link href="/types" className="type-more-link">
              View all types
            </Link>
          </div>
        </article>

        <article className="content-card" id="why-hot">
          <h2>Why is SBTI popular?</h2>
          <p>
            SBTI went viral because the SBTI test compresses complex self-description into one vivid
            label. For younger users, SBTI online works as social language: funny, quick, and easy
            to repost. Once SBTI test results become shareable content, distribution happens naturally.
          </p>
        </article>

        <article className="content-card faq-card" id="faq">
          <h2>FAQ</h2>
          <details>
            <summary>How is SBTI different from MBTI?</summary>
            <p>
              MBTI is a structured framework, while the SBTI test is entertainment-focused and
              internet-native in tone.
            </p>
          </details>
          <details>
            <summary>How many SBTI types are there?</summary>
            <p>There are 27 types in the current SBTI test version.</p>
          </details>
          <details>
            <summary>Is SBTI test online free?</summary>
            <p>Yes. SBTI online is free to start from the homepage without registration.</p>
          </details>
          <details>
            <summary>Does the SBTI test open a new page?</summary>
            <p>No. The full SBTI test and result stay in a top-level modal on the homepage.</p>
          </details>
        </article>
        </section>

        <aside className="home-ads-rail home-ads-right" aria-label="Right ad rail">
          {adRailSlots.map((slot) => (
            <div key={`en-right-${slot}`} className="home-ad-unit">
              <AdsterraIframeUnit />
            </div>
          ))}
        </aside>
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
              aria-label="SBTI test modal"
            >
              <header className="modal-header">
                <div>
                  <p className="eyebrow">SBTI Personality Test</p>
                  <h3>{stage === 'quiz' ? 'Answer questions' : 'Your result'}</h3>
                </div>
                <button className="ghost-btn" onClick={closeModal}>
                  Close
                </button>
              </header>

              {stage === 'quiz' && currentQuestion && (
                <div className="quiz-body">
                  <div className="progress-head">
                    <span>
                      Question {currentIndex + 1} / {visibleQuestions.length}
                    </span>
                    <span>
                      Completed {answeredCount}/{visibleQuestions.length}
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
                      Previous
                    </button>
                    <span className="auto-next-note">
                      {currentIndex === visibleQuestions.length - 1
                        ? 'Selecting an answer will submit automatically'
                        : 'Selecting an answer moves to the next question'}
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
                        {result.finalType.code} ({result.finalType.cn})
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
                              {level} / {result.rawScores[dim]} pts
                            </span>
                          </div>
                          <p>{dimExplanations[dim][level]}</p>
                        </article>
                      );
                    })}
                  </section>

                  <section className="result-note">
                    <h4>Note</h4>
                    <p>{result.special ? copywriting.specialFunNote : copywriting.defaultFunNote}</p>
                  </section>

                  <footer className="result-actions result-actions-en">
                    <a
                      className="social-share-btn action-coffee"
                      href="https://buymeacoffee.com/ningshiqi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Buy Me a Coffee</span>
                    </a>
                    <button
                      className="ghost-btn social-share-btn share-x-btn action-share-x"
                      onClick={handleShareToX}
                      disabled={isSharingX}
                    >
                      <XIcon />
                      <span>{isSharingX ? 'Opening X...' : 'Share on X'}</span>
                    </button>
                    <button
                      className="ghost-btn social-share-btn share-ig-btn action-share-ig"
                      onClick={handleShareToInstagram}
                      disabled={isSharingInstagram}
                    >
                      <InstagramIcon />
                      <span>{isSharingInstagram ? 'Preparing...' : 'Share on Instagram'}</span>
                    </button>
                    <button
                      className="ghost-btn action-generate"
                      onClick={handleShareAction}
                      disabled={isGeneratingShare}
                    >
                      {isGeneratingShare
                        ? 'Generating...'
                        : shareCards.length
                          ? 'One-click download'
                          : 'Generate share cards'}
                    </button>
                    <button className="ghost-btn action-retake" onClick={openTest}>
                      {isSharedResult ? 'Take same test' : 'Retake'}
                    </button>
                    <button className="ghost-btn action-back" onClick={closeModal}>
                      Back to homepage
                    </button>
                  </footer>
                  {shareStatus ? <p className="copy-status">{shareStatus}</p> : null}

                  {shareCards.length ? (
                    <section className="share-panel">
                      <h4>Share Cards</h4>
                      <p>Share cards are ready for Xiaohongshu, Bilibili, and social feeds.</p>
                      <div className="share-grid">
                        {shareCards.map((card) => (
                          <article key={card.id} className="share-card-preview">
                            <img src={card.dataUrl} alt={`Share card ${card.id}`} />
                            <button className="ghost-btn" onClick={() => downloadSingleCard(card)}>
                              Download card {card.id}
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
