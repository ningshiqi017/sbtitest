export type ShareDimensionLine = {
  name: string;
  score: number;
  level: string;
};

export type ShareCardPayload = {
  locale: 'zh' | 'en';
  typeCode: string;
  typeName: string;
  intro: string;
  description: string;
  badge: string;
  matchRate: number;
  posterUrl: string;
  topDimensions: ShareDimensionLine[];
};

export type GeneratedShareCard = {
  id: 1 | 2 | 3;
  filename: string;
  dataUrl: string;
};

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1440;

function createCanvas(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas context unavailable');
  }

  return { canvas, ctx };
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Image load failed: ${url}`));
    image.src = url;
  });
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  const bg = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  bg.addColorStop(0, '#f5f8f2');
  bg.addColorStop(1, '#e2ecde');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.fillStyle = 'rgba(20, 83, 45, 0.06)';
  for (let y = 0; y < CARD_HEIGHT; y += 6) {
    ctx.fillRect(0, y, CARD_WIDTH, 1);
  }
}

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const chunks = text.replace(/\s+/g, ' ').trim().split(' ');
  const lines: string[] = [];
  let current = '';

  for (const chunk of chunks) {
    const next = current ? `${current} ${chunk}` : chunk;
    if (ctx.measureText(next).width <= maxWidth) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
      current = chunk;
      continue;
    }

    // fallback for CJK/no-space strings
    let inline = '';
    for (const char of chunk) {
      const candidate = `${inline}${char}`;
      if (ctx.measureText(candidate).width > maxWidth && inline) {
        lines.push(inline);
        inline = char;
      } else {
        inline = candidate;
      }
    }
    if (inline) lines.push(inline);
    current = '';
  }

  if (current) lines.push(current);
  return lines;
}

function wrapTextByChars(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const source = text.replace(/\s+/g, ' ').trim();
  const lines: string[] = [];
  let current = '';

  for (const char of source) {
    const next = `${current}${char}`;
    if (ctx.measureText(next).width <= maxWidth) {
      current = next;
      continue;
    }

    if (current) lines.push(current);
    current = char;
  }

  if (current) lines.push(current);
  return lines;
}

function trimLines(lines: string[], maxLines: number): string[] {
  if (lines.length <= maxLines) return lines;
  const sliced = lines.slice(0, maxLines);
  const last = sliced[maxLines - 1] ?? '';
  sliced[maxLines - 1] = `${last.replace(/[。.!?，,；;:：…]+$/g, '')}…`;
  return sliced;
}

function drawMultiline(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
  mode: 'word' | 'char' = 'word',
) {
  const rawLines =
    mode === 'char' ? wrapTextByChars(ctx, text, maxWidth) : wrapText(ctx, text, maxWidth);
  const lines = trimLines(rawLines, maxLines);
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
}

function renderCardOne(payload: ShareCardPayload, poster: HTMLImageElement): string {
  const { canvas, ctx } = createCanvas();
  drawBackground(ctx);

  ctx.fillStyle = '#14532d';
  ctx.font = '600 38px "Noto Sans SC", "PingFang SC", sans-serif';
  ctx.fillText(payload.locale === 'zh' ? 'SBTI 人格测试结果' : 'SBTI Test Result', 80, 100);

  ctx.font = '700 86px "Noto Serif SC", "Source Han Serif SC", serif';
  ctx.fillStyle = '#0b2a18';
  ctx.fillText(`${payload.typeCode} · ${payload.typeName}`, 80, 240);

  const posterBox = { x: 80, y: 360, w: 920, h: 820 };
  drawRoundedRect(ctx, posterBox.x, posterBox.y, posterBox.w, posterBox.h, 36);
  ctx.fillStyle = '#f9fcf8';
  ctx.fill();
  ctx.strokeStyle = 'rgba(20, 83, 45, 0.22)';
  ctx.lineWidth = 2;
  ctx.stroke();

  const fit = Math.min(posterBox.w / poster.width, posterBox.h / poster.height);
  const drawW = poster.width * fit;
  const drawH = poster.height * fit;
  const drawX = posterBox.x + (posterBox.w - drawW) / 2;
  const drawY = posterBox.y + (posterBox.h - drawH) / 2;
  ctx.drawImage(poster, drawX, drawY, drawW, drawH);

  ctx.fillStyle = '#14532d';
  ctx.font = '600 34px "Noto Sans SC", "PingFang SC", sans-serif';
  drawMultiline(ctx, payload.intro, 80, 1240, 920, 44, 2, payload.locale === 'zh' ? 'char' : 'word');

  ctx.fillStyle = '#1d3e2a';
  ctx.font = '500 26px "Noto Sans SC", "PingFang SC", sans-serif';
  ctx.fillText(
    payload.locale === 'zh' ? '结果仅供娱乐，欢迎和朋友一起对照讨论。' : 'For fun only. Compare your result with friends.',
    80,
    1360,
  );

  return canvas.toDataURL('image/png');
}

function renderCardTwo(payload: ShareCardPayload): string {
  const { canvas, ctx } = createCanvas();
  drawBackground(ctx);

  ctx.fillStyle = '#14532d';
  ctx.font = '700 62px "Noto Serif SC", "Source Han Serif SC", serif';
  ctx.fillText(payload.locale === 'zh' ? '人格解释图' : 'Type Explanation', 80, 120);

  drawRoundedRect(ctx, 80, 180, 920, 1160, 36);
  ctx.fillStyle = '#f9fcf8';
  ctx.fill();
  ctx.strokeStyle = 'rgba(20, 83, 45, 0.20)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#0b2a18';
  ctx.font = '700 58px "Noto Serif SC", "Source Han Serif SC", serif';
  ctx.fillText(`${payload.typeCode} · ${payload.typeName}`, 130, 280);

  drawRoundedRect(ctx, 130, 330, 820, 190, 22);
  ctx.fillStyle = 'rgba(20, 83, 45, 0.08)';
  ctx.fill();

  ctx.fillStyle = '#14532d';
  ctx.font = '600 42px "Noto Sans SC", "PingFang SC", sans-serif';
  drawMultiline(ctx, payload.intro, 170, 404, 740, 54, 2, payload.locale === 'zh' ? 'char' : 'word');

  ctx.fillStyle = '#1d3e2a';
  ctx.font = '500 31px "Noto Sans SC", "PingFang SC", sans-serif';
  drawMultiline(
    ctx,
    payload.description,
    130,
    590,
    820,
    44,
    13,
    payload.locale === 'zh' ? 'char' : 'word',
  );

  ctx.fillStyle = '#1d3e2a';
  ctx.font = '500 26px "Noto Sans SC", "PingFang SC", sans-serif';
  ctx.fillText(
    payload.locale === 'zh' ? '关键词：人格画像、行为倾向、社交风格。' : 'Keywords: personality profile, behavior, social style.',
    130,
    1300,
  );

  return canvas.toDataURL('image/png');
}

function renderCardThree(payload: ShareCardPayload): string {
  const { canvas, ctx } = createCanvas();
  drawBackground(ctx);

  ctx.fillStyle = '#14532d';
  ctx.font = '700 58px "Noto Serif SC", "Source Han Serif SC", serif';
  ctx.fillText(payload.locale === 'zh' ? '匹配率' : 'Match Rate', 80, 120);

  ctx.fillStyle = '#0b2a18';
  ctx.font = '700 210px "Noto Serif SC", "Source Han Serif SC", serif';
  ctx.fillText(`${payload.matchRate}%`, 80, 340);

  ctx.fillStyle = '#14532d';
  ctx.font = '600 44px "Noto Sans SC", "PingFang SC", sans-serif';
  drawMultiline(ctx, payload.badge, 80, 420, 920, 56, 2, payload.locale === 'zh' ? 'char' : 'word');

  drawRoundedRect(ctx, 80, 500, 920, 520, 32);
  ctx.fillStyle = '#f9fcf8';
  ctx.fill();
  ctx.strokeStyle = 'rgba(20, 83, 45, 0.20)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#14532d';
  ctx.font = '700 44px "Noto Sans SC", "PingFang SC", sans-serif';
  ctx.fillText(
    payload.locale === 'zh' ? '高匹配维度' : 'Top matching dimensions',
    120,
    590,
  );

  ctx.fillStyle = '#1d3e2a';
  ctx.font = '500 36px "Noto Sans SC", "PingFang SC", sans-serif';
  payload.topDimensions.slice(0, 3).forEach((line, index) => {
    ctx.fillText(`${index + 1}. ${line.name} · ${line.level} / ${line.score}`, 120, 680 + index * 94);
  });

  drawRoundedRect(ctx, 80, 1060, 920, 220, 30);
  ctx.fillStyle = '#14532d';
  ctx.fill();
  ctx.fillStyle = '#f3faf5';
  ctx.font = '700 50px "Noto Serif SC", "Source Han Serif SC", serif';
  ctx.fillText(payload.locale === 'zh' ? '分享这张匹配率图' : 'Share this match-rate card', 120, 1170);
  ctx.font = '500 28px "Noto Sans SC", "PingFang SC", sans-serif';
  ctx.fillText(
    payload.locale === 'zh' ? '让朋友一起测同款人格。' : 'Invite friends to test the same type.',
    120,
    1222,
  );

  return canvas.toDataURL('image/png');
}

export async function generateShareCards(payload: ShareCardPayload): Promise<GeneratedShareCard[]> {
  const posterImage = await loadImage(payload.posterUrl);

  const card1 = renderCardOne(payload, posterImage);
  const card2 = renderCardTwo(payload);
  const card3 = renderCardThree(payload);

  return [
    { id: 1, filename: `sbti-share-1-${payload.typeCode}.png`, dataUrl: card1 },
    { id: 2, filename: `sbti-share-2-${payload.typeCode}.png`, dataUrl: card2 },
    { id: 3, filename: `sbti-share-3-${payload.typeCode}.png`, dataUrl: card3 },
  ];
}

export function triggerImageDownload(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
