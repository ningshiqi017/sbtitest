import { typeLibrary } from '@/lib/sbti-data';

const codes = Object.keys(typeLibrary);

export function toTypeSlug(code: string): string {
  return code
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const slugCodePairs = codes.map((code) => [toTypeSlug(code), code] as const);
const slugToCodeMap = new Map<string, string>(slugCodePairs);

export function fromTypeSlug(slug: string): string | null {
  return slugToCodeMap.get(slug) ?? null;
}

export function allTypeSlugs(): string[] {
  return slugCodePairs.map(([slug]) => slug);
}
