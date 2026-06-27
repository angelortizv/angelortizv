const MARK_PATHS = `
  <rect x="7" y="7" width="18" height="2.5" rx="1" fill="ACCENT"/>
  <path d="M9 24 L16 11 L23 24" fill="none" stroke="TEXT" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="11.5" y1="19.5" x2="20.5" y2="19.5" stroke="ACCENT" stroke-width="2" stroke-linecap="round"/>
`;

export function siteMarkGroup(
  transform: string,
  colors: { accent: string; text: string } = { accent: '#e8813a', text: '#f5f5f5' },
): string {
  const paths = MARK_PATHS
    .replace(/ACCENT/g, colors.accent)
    .replace(/TEXT/g, colors.text);

  return `<g transform="${transform}">${paths}</g>`;
}
