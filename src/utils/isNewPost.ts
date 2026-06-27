const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function isNewPost(date: Date, withinDays = 30): boolean {
  const age = Date.now() - date.getTime();
  return age >= 0 && age < withinDays * MS_PER_DAY;
}
