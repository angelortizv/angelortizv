export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('es-CR', {
    year: 'numeric',
    month: 'long',
  }).format(date);
}
