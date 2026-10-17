import sharp from 'sharp';
import { siteMarkGroup } from './siteMark';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapTitle(title: string, maxCharsPerLine = 34): string[] {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

export function buildOgSvg(title: string, subtitle = 'Angelo Ortiz Vega'): string {
  const lines = wrapTitle(title);
  const titleY = lines.length === 1 ? 285 : lines.length === 2 ? 258 : 232;
  const titleLines = lines
    .map((line, i) => {
      const y = titleY + i * 54;
      return `<tspan x="80" y="${y}">${escapeXml(line)}</tspan>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#060010"/>
      <stop offset="100%" stop-color="#1b1236"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#262626" stroke-width="1"/>
  ${siteMarkGroup('translate(1088, 44) scale(2.5)')}
  <text font-family="Georgia, 'Times New Roman', serif" font-size="54" font-weight="600" fill="#ece9ff" letter-spacing="-0.02em">${titleLines}</text>
  <text x="80" y="415" font-family="system-ui, sans-serif" font-size="26" fill="#9a94b8">${escapeXml(subtitle)}</text>
  <line x1="80" y1="460" x2="240" y2="460" stroke="#262626" stroke-width="1"/>
  <text x="80" y="530" font-family="ui-monospace, monospace" font-size="20" letter-spacing="0.06em" fill="#a78bfa">ANGELORTIZV.COM</text>
</svg>`;
}

export function buildHomeOgSvg(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="8%" cy="-5%" r="70%">
      <stop offset="0%" stop-color="#7c5cff" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#7c5cff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="100%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#6d4dff" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="#6d4dff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="name" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#c4b5fd"/>
    </linearGradient>
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="16" cy="16" r="1.5" fill="#a78bfa" fill-opacity="0.18"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#060010"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  ${siteMarkGroup('translate(1088, 44) scale(2.5)')}
  <rect x="80" y="150" width="180" height="34" rx="17" fill="#a78bfa" fill-opacity="0.14"/>
  <text x="170" y="172" text-anchor="middle" font-family="ui-monospace, monospace" font-size="15" letter-spacing="0.1em" fill="#a78bfa">BLOG EN PAUSA</text>
  <text x="80" y="330" font-family="system-ui, sans-serif" font-size="112" font-weight="300" letter-spacing="-0.03em" fill="#ece9ff">Angelo <tspan fill="url(#name)">Ortiz.</tspan></text>
  <text x="80" y="400" font-family="system-ui, sans-serif" font-size="28" fill="#9a94b8">Mi sitio actual está en angelortizv.me</text>
  <rect x="80" y="460" width="270" height="62" rx="31" fill="none" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="215" y="498" text-anchor="middle" font-family="ui-monospace, monospace" font-size="20" letter-spacing="0.1em" fill="#ffffff">angelortizv.me →</text>
</svg>`;
}

export async function buildHomeOgPng(): Promise<Buffer> {
  return sharp(Buffer.from(buildHomeOgSvg())).resize(1200, 630).png().toBuffer();
}

export async function buildOgPng(title: string, subtitle = 'Angelo Ortiz Vega'): Promise<Buffer> {
  return sharp(Buffer.from(buildOgSvg(title, subtitle)))
    .resize(1200, 630)
    .png()
    .toBuffer();
}
