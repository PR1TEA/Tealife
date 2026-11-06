const pad = (value: number): string => String(value).padStart(2, '0');

/** 2026.11.06 */
export function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  return `${year}.${month}.${day}`;
}

/** 2026 年 11 月 6 日 */
export function formatDateLong(date: Date): string {
  return `${date.getUTCFullYear()} 年 ${date.getUTCMonth() + 1} 月 ${date.getUTCDate()} 日`;
}
