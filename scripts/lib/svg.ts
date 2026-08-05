export function escapeXml(value: unknown): string {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function formatCompactNumber(value: number): string {
  if (value < 1_000) return String(value);
  if (value < 1_000_000) return trimCompact(value / 1_000, 'K');
  return trimCompact(value / 1_000_000, 'M');
}

function trimCompact(value: number, suffix: string): string {
  const rounded = Math.round(value * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)}${suffix}`;
}

export function titleCaseEventDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'UNKNOWN';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  })
    .format(date)
    .replace(',', '')
    .toUpperCase();
}
