import {
  dimensionMeta,
  questions as questionsData,
  specialQuestions as specialQuestionsData,
  typeLibrary,
  normalTypes,
  dimExplanations,
  dimensionOrder,
  DRUNK_TRIGGER_QUESTION_ID,
} from '@/lib/sbti-data';

export type AnswerMap = Record<string, number | undefined>;

type DimensionKey = keyof typeof dimensionMeta;
type TypeCode = keyof typeof typeLibrary;

export type QuestionOption = {
  label: string;
  value: number;
};

export type RegularQuestion = {
  id: string;
  dim: DimensionKey;
  text: string;
  options: QuestionOption[];
};

export type SpecialQuestion = {
  id: string;
  special: true;
  kind: string;
  text: string;
  options: QuestionOption[];
};

export type AnyQuestion = RegularQuestion | SpecialQuestion;

export const questions: RegularQuestion[] = questionsData as unknown as RegularQuestion[];
export const specialQuestions: SpecialQuestion[] =
  specialQuestionsData as unknown as SpecialQuestion[];

const drinkGateQuestion = specialQuestions.find((q) => q.id === 'drink_gate_q1')!;
const drinkTriggerQuestion = specialQuestions.find((q) => q.id === 'drink_gate_q2')!;

export function shuffleQuestions<T>(array: readonly T[], random = Math.random): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildQuestionSequence(random = Math.random): AnyQuestion[] {
  const shuffledRegular = shuffleQuestions(questions, random);
  const insertIndex = Math.floor(random() * shuffledRegular.length) + 1;

  return [
    ...shuffledRegular.slice(0, insertIndex),
    drinkGateQuestion,
    ...shuffledRegular.slice(insertIndex),
  ];
}

export function getVisibleQuestions(baseQuestions: AnyQuestion[], answers: AnswerMap): AnyQuestion[] {
  const visible = [...baseQuestions];
  const gateIndex = visible.findIndex((q) => q.id === drinkGateQuestion.id);

  if (gateIndex !== -1 && answers[drinkGateQuestion.id] === 3) {
    visible.splice(gateIndex + 1, 0, drinkTriggerQuestion);
  }

  return visible;
}

export function getAnsweredCount(visibleQuestions: AnyQuestion[], answers: AnswerMap): number {
  return visibleQuestions.reduce((count, question) => {
    if (answers[question.id] !== undefined) return count + 1;
    return count;
  }, 0);
}

function sumToLevel(score: number): 'L' | 'M' | 'H' {
  if (score <= 3) return 'L';
  if (score === 4) return 'M';
  return 'H';
}

function levelToNumber(level: 'L' | 'M' | 'H'): number {
  return { L: 1, M: 2, H: 3 }[level];
}

function parsePattern(pattern: string): Array<'L' | 'M' | 'H'> {
  return pattern.replace(/-/g, '').split('') as Array<'L' | 'M' | 'H'>;
}

type RankedType = {
  code: TypeCode;
  pattern: string;
  cn: string;
  intro: string;
  desc: string;
  distance: number;
  exact: number;
  similarity: number;
};

export type ComputedResult = {
  rawScores: Record<DimensionKey, number>;
  levels: Record<DimensionKey, 'L' | 'M' | 'H'>;
  ranked: RankedType[];
  bestNormal: RankedType;
  finalType: (typeof typeLibrary)[TypeCode] & { code: TypeCode };
  modeKicker: string;
  badge: string;
  sub: string;
  special: boolean;
  secondaryType: RankedType | null;
};

export function computeResult(answers: AnswerMap): ComputedResult {
  const rawScores = {} as Record<DimensionKey, number>;
  const levels = {} as Record<DimensionKey, 'L' | 'M' | 'H'>;

  (Object.keys(dimensionMeta) as DimensionKey[]).forEach((dim) => {
    rawScores[dim] = 0;
  });

  questions.forEach((question) => {
    const answerValue = Number(answers[question.id] ?? 0);
    rawScores[question.dim] += answerValue;
  });

  (Object.entries(rawScores) as Array<[DimensionKey, number]>).forEach(([dim, score]) => {
    levels[dim] = sumToLevel(score);
  });

  const userVector = dimensionOrder.map((dim) => levelToNumber(levels[dim]));

  const ranked: RankedType[] = normalTypes
    .map((type) => {
      const vector = parsePattern(type.pattern).map(levelToNumber);
      let distance = 0;
      let exact = 0;

      for (let i = 0; i < vector.length; i += 1) {
        const diff = Math.abs(userVector[i] - vector[i]);
        distance += diff;
        if (diff === 0) exact += 1;
      }

      const similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
      const profile = typeLibrary[type.code];

      return {
        ...type,
        ...profile,
        distance,
        exact,
        similarity,
      } satisfies RankedType;
    })
    .sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance;
      if (b.exact !== a.exact) return b.exact - a.exact;
      return b.similarity - a.similarity;
    });

  const bestNormal = ranked[0];
  const drunkTriggered = answers[DRUNK_TRIGGER_QUESTION_ID] === 2;

  let finalType = typeLibrary[bestNormal.code] as (typeof typeLibrary)[TypeCode] & { code: TypeCode };
  let modeKicker = '你的主类型';
  let badge = `匹配度 ${bestNormal.similarity}% · 精准命中 ${bestNormal.exact}/15 维`;
  let sub = '维度命中度较高，当前结果可视为你的第一人格画像。';
  let special = false;
  let secondaryType: RankedType | null = null;

  if (drunkTriggered) {
    finalType = typeLibrary.DRUNK;
    secondaryType = bestNormal;
    modeKicker = '隐藏人格已激活';
    badge = '匹配度 100% · 酒精异常因子已接管';
    sub = '乙醇亲和性过强，系统已直接跳过常规人格审判。';
    special = true;
  } else if (bestNormal.similarity < 60) {
    finalType = typeLibrary.HHHH;
    modeKicker = '系统强制兜底';
    badge = `标准人格库最高匹配仅 ${bestNormal.similarity}%`;
    sub = '标准人格库对你的脑回路集体罢工了，于是系统把你强制分配给了 HHHH。';
    special = true;
  }

  return {
    rawScores,
    levels,
    ranked,
    bestNormal,
    finalType,
    modeKicker,
    badge,
    sub,
    special,
    secondaryType,
  };
}

export const copywriting = {
  defaultFunNote:
    '本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。',
  specialFunNote:
    '本测试仅供娱乐。隐藏人格和傻乐兜底都属于作者故意埋的损招，请勿把它当成医学、心理学、相学、命理学或灵异学依据。',
} as const;

export { dimExplanations, dimensionMeta, dimensionOrder };
