import GithubSlugger from 'github-slugger';

export interface Heading {
  depth: number;
  text: string;
  slug: string;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\$(.+?)\$/g, '$1')
    .trim();
}

export function extractHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(body)) !== null) {
    const text = stripMarkdown(match[2]);
    headings.push({
      depth: match[1].length,
      text,
      slug: slugger.slug(text),
    });
  }

  return headings;
}
