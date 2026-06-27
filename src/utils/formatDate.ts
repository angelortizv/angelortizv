export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}
