function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapTitle(title: string, maxCharsPerLine = 32): string[] {
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
  const titleY = lines.length === 1 ? 290 : lines.length === 2 ? 265 : 240;
  const titleLines = lines
    .map((line, i) => {
      const y = titleY + i * 52;
      return `<tspan x="80" y="${y}">${escapeXml(line)}</tspan>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect x="80" y="80" width="48" height="4" fill="#e8813a"/>
  <text font-family="system-ui, sans-serif" font-size="52" font-weight="600" fill="#f5f5f5">${titleLines}</text>
  <text x="80" y="420" font-family="system-ui, sans-serif" font-size="28" fill="#888888">${escapeXml(subtitle)}</text>
  <text x="80" y="540" font-family="monospace" font-size="22" fill="#e8813a">angelortizv.com</text>
</svg>`;
}
