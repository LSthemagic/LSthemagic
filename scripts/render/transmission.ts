import type { TransmissionEntry } from '../lib/types.ts';
import { escapeXml } from '../lib/svg.ts';
import { background, cornerMarks, palette, panel, sectionLabel, svgDocument } from './shared.ts';

export function renderTransmissionLog(entries: TransmissionEntry[]): string {
  const rows = entries.slice(0, 5)
    .map((entry, index) => {
      const y = 82 + index * 67;
      return `<g>${panel(28, y, 494, 54, 10)}<rect x="28" y="${y}" width="4" height="54" rx="2" fill="${index === 0 ? palette.highlight : palette.structural}"/><text x="48" y="${y + 21}" class="mono caps" fill="${palette.highlight}" font-size="9">${escapeXml(entry.date)}</text><text x="132" y="${y + 21}" class="display" fill="${palette.text}" font-size="12" font-weight="700">${escapeXml(entry.title)}</text><text x="132" y="${y + 40}" class="mono dim" font-size="9">${escapeXml(entry.repository)}</text><circle class="${index === 0 ? 'pulse' : ''}" cx="500" cy="${y + 27}" r="3" fill="${index === 0 ? palette.success : palette.dim}"/></g>`;
    })
    .join('');

  const body = `${background(550, 440)}${cornerMarks(550, 440, 18)}${sectionLabel('TRANSMISSION LOG', 28, 45)}<text x="522" y="45" text-anchor="end" class="mono dim" font-size="9">PUBLIC ACTIVITY</text>${rows}<text x="28" y="421" class="mono dim" font-size="9">AUTOMATED PROFILE REFRESHES FILTERED</text>`;

  return svgDocument({
    width: 550,
    height: 440,
    title: 'Public transmission log',
    description: 'The five most recent relevant public GitHub activities.',
    body,
  });
}
