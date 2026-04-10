import type { AnswerMap as AnswerMapEn } from '@/lib/sbti-engine-en';
import type { AnswerMap as AnswerMapZh } from '@/lib/sbti-engine';

type ShareAnswerMap = AnswerMapZh | AnswerMapEn;

type ShareTokenPayload = {
  v: 1;
  a: Record<string, number>;
};

function toBase64Url(input: string): string {
  const utf8 = new TextEncoder().encode(input);
  let binary = '';
  utf8.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(token: string): string {
  const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
  const padded = `${base64}${'='.repeat((4 - (base64.length % 4)) % 4)}`;
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new TextDecoder().decode(bytes);
}

export function buildShareResultToken(answers: ShareAnswerMap): string {
  const cleaned = Object.fromEntries(
    Object.entries(answers).filter(([, value]) => Number.isFinite(value)),
  ) as Record<string, number>;

  const payload: ShareTokenPayload = { v: 1, a: cleaned };
  return toBase64Url(JSON.stringify(payload));
}

export function parseShareResultToken(token: string): Record<string, number> | null {
  try {
    const raw = fromBase64Url(token);
    const parsed = JSON.parse(raw) as Partial<ShareTokenPayload>;

    if (parsed.v !== 1 || !parsed.a || typeof parsed.a !== 'object') return null;

    const answers: Record<string, number> = {};
    for (const [key, value] of Object.entries(parsed.a)) {
      if (typeof key !== 'string' || !key.trim()) return null;
      if (typeof value !== 'number' || !Number.isFinite(value)) return null;
      answers[key] = value;
    }

    return answers;
  } catch {
    return null;
  }
}
