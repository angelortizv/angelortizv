export type ContentType = 'personal' | 'tech' | 'notas';

const TECH_TAGS = new Set(['tech', 'dev', 'ai', 'design']);

export function getContentType(tags: string[]): ContentType {
  if (tags.includes('personal')) return 'personal';
  if (tags.some(tag => TECH_TAGS.has(tag))) return 'tech';
  if (tags.includes('ideas')) return 'notas';
  return 'tech';
}

export const CONTENT_TYPE_LABELS: Record<ContentType | 'all', string> = {
  all: 'Todos',
  personal: 'Personal',
  tech: 'Tech',
  notas: 'Notas',
};
