import type { ProfileConfig } from '../lib/types.ts';
import { escapeXml } from '../lib/svg.ts';
import { background, cornerMarks, palette, panel, sectionLabel, svgDocument } from './shared.ts';

export function renderMission(profile: ProfileConfig): string {
  const rows = profile.mission.slice(0, 5)
    .map((mission, index) => {
      const y = 104 + index * 58;
      return `<g><circle cx="78" cy="${y + 17}" r="7" fill="#0B1628" stroke="${palette.highlight}" stroke-opacity="0.75"/><circle class="pulse" cx="78" cy="${y + 17}" r="3" fill="${palette.highlight}"/><rect x="108" y="${y}" width="994" height="42" rx="10" fill="#0B1628" fill-opacity="0.82" stroke="#5CA0C6" stroke-opacity="0.18"/><text x="130" y="${y + 17}" class="mono caps" fill="${palette.highlight}" font-size="10">${escapeXml(mission.code)}</text><text x="252" y="${y + 17}" class="display" fill="${palette.text}" font-size="14" font-weight="700">${escapeXml(mission.title)}</text><text x="252" y="${y + 34}" class="mono muted" font-size="11">${escapeXml(mission.detail)}</text><text x="1078" y="${y + 26}" text-anchor="end" class="mono dim" font-size="10">ACTIVE</text></g>`;
    })
    .join('');

  const body = `${background(1200, 430)}${cornerMarks(1200, 430)}${sectionLabel('CURRENT MISSION / ACTIVE RESEARCH', 48, 48)}${panel(48, 72, 1104, 318, 16)}<path d="M78 121V353" stroke="${palette.structural}" stroke-width="2"/>${rows}<text x="48" y="414" class="mono dim" font-size="10">DIRECTION CHANGES. ENGINEERING PRINCIPLES REMAIN.</text>`;

  return svgDocument({
    width: 1200,
    height: 430,
    title: 'Current engineering mission',
    description: 'Railan Santana’s current professional and learning directions.',
    body,
  });
}
