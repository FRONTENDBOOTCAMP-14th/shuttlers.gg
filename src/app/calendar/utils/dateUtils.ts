export function parseDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr) return null;

  const match = String(dateStr)
    .trim()
    .match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) return null;

  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function parseApplicationDateRange(
  applyPeriod: string | null | undefined
): [Date | null, Date | null] {
  if (!applyPeriod) return [null, null];

  const [startStr, endStr] = applyPeriod.split('~').map((x) => x.trim());
  const start = parseDate(startStr);
  const end = parseDate(endStr);

  return [start, end];
}
