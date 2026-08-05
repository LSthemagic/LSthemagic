import type { ProfileConfig } from '../lib/types.ts';
import { escapeXml } from '../lib/svg.ts';
import { background, cornerMarks, palette, panel, sectionLabel, svgDocument } from './shared.ts';

const positions = [
  { x: 56, y: 105, w: 300, h: 135 },
  { x: 56, y: 280, w: 300, h: 135 },
  { x: 844, y: 105, w: 300, h: 135 },
  { x: 844, y: 280, w: 300, h: 135 },
  { x: 450, y: 345, w: 300, h: 135 },
];

export function renderTechnologyMatrix(profile: ProfileConfig): string {
  const groups = profile.technologyGroups.slice(0, 5);
  const connectors = groups
    .map((_, index) => {
      const p = positions[index]!;
      const startX = p.x < 400 ? p.x + p.w : p.x > 800 ? p.x : p.x + p.w / 2;
      const startY = p.y + p.h / 2;
      return `<path class="flow" d="M${startX} ${startY} C${startX < 600 ? 460 : 740} ${startY}, ${startX < 600 ? 500 : 700} 260, 600 260" fill="none" stroke="${palette.accent}" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="7 11"/>`;
    })
    .join('');

  const cards = groups
    .map((group, index) => {
      const p = positions[index]!;
      const itemLines = chunk(group.items, 3)
        .slice(0, 2)
        .map((items, lineIndex) => `<text x="${p.x + 22}" y="${p.y + 76 + lineIndex * 27}" class="mono muted" font-size="12">${items.map(escapeXml).join('  ·  ')}</text>`)
        .join('');
      return `<g>${panel(p.x, p.y, p.w, p.h, 15)}<rect x="${p.x}" y="${p.y}" width="5" height="${p.h}" rx="2.5" fill="url(#accentGradient)"/><text x="${p.x + 22}" y="${p.y + 37}" class="mono caps" fill="${palette.highlight}" font-size="11" font-weight="700">${escapeXml(group.title)}</text><text x="${p.x + p.w - 20}" y="${p.y + 37}" text-anchor="end" class="mono dim" font-size="10">0${index + 1}</text>${itemLines}</g>`;
    })
    .join('');

  const body = `${background(1200, 520)}${cornerMarks(1200, 520)}${sectionLabel('TECHNOLOGY MATRIX / CONNECTED ECOSYSTEM', 48, 48)}
    ${connectors}
    <g><circle cx="600" cy="260" r="85" fill="#10243B" stroke="#5CA0C6" stroke-opacity="0.5"/><circle class="pulse" cx="600" cy="260" r="68" fill="none" stroke="#89CFF0" stroke-opacity="0.18"/><circle cx="600" cy="260" r="48" fill="#0B1628" stroke="#89CFF0" stroke-opacity="0.4"/><text x="600" y="252" text-anchor="middle" class="mono caps" fill="${palette.highlight}" font-size="11">ENGINEERING</text><text x="600" y="276" text-anchor="middle" class="display" fill="${palette.text}" font-size="18" font-weight="700">SYSTEM CORE</text></g>
    ${cards}
    <text x="48" y="495" class="mono dim" font-size="10">TOOLS ARE SELECTED BY CONTEXT — NOT COLLECTED AS TROPHIES</text>`;

  return svgDocument({
    width: 1200,
    height: 520,
    title: 'Technology matrix',
    description: 'A connected map of backend, AI, data, product experience, and delivery technologies.',
    body,
  });
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size));
  return chunks;
}
