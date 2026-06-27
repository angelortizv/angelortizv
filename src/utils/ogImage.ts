import sharp from 'sharp';

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
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#111111"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#262626" stroke-width="1"/>
  <rect x="80" y="72" width="56" height="5" rx="1" fill="#e8813a"/>
  <text font-family="Georgia, 'Times New Roman', serif" font-size="54" font-weight="600" fill="#f5f5f5" letter-spacing="-0.02em">${titleLines}</text>
  <text x="80" y="415" font-family="system-ui, sans-serif" font-size="26" fill="#888888">${escapeXml(subtitle)}</text>
  <line x1="80" y1="460" x2="240" y2="460" stroke="#262626" stroke-width="1"/>
  <text x="80" y="530" font-family="ui-monospace, monospace" font-size="20" letter-spacing="0.06em" fill="#e8813a">ANGELORTIZV.COM</text>
</svg>`;
}

export async function buildOgPng(title: string, subtitle = 'Angelo Ortiz Vega'): Promise<Buffer> {
  return sharp(Buffer.from(buildOgSvg(title, subtitle)))
    .resize(1200, 630)
    .png()
    .toBuffer();
}
