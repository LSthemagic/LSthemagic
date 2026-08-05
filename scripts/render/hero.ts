import type { ProfileConfig } from '../lib/types.ts';
import { escapeXml } from '../lib/svg.ts';
import { background, cornerMarks, palette, panel, sectionLabel, statusPill, svgDocument } from './shared.ts';

export function renderHero(profile: ProfileConfig): string {
  const focus = profile.focus.slice(0, 4);
  const focusRows = focus
    .map((item, index) => {
      const y = 184 + index * 48;
      const code = String(index + 1).padStart(2, '0');
      return `<g class="float" style="animation-delay:${index * 0.35}s"><circle cx="828" cy="${y}" r="4" fill="${palette.highlight}" filter="url(#tinyGlow)"/><path d="M832 ${y}H870" stroke="${palette.accent}" stroke-opacity="0.6"/><rect x="870" y="${y - 17}" width="260" height="34" rx="8" fill="#111F34" stroke="#5CA0C6" stroke-opacity="0.25"/><text x="888" y="${y + 5}" class="mono" fill="${palette.text}" font-size="13"><tspan fill="${palette.dim}">${code}</tspan><tspan dx="16">${escapeXml(item)}</tspan></text></g>`;
    })
    .join('');

  const chips = ['BACKEND', 'AI', 'AUTOMATION', 'ARCHITECTURE']
    .map((chip, index) => {
      const x = 58 + index * 145;
      return `<g><rect x="${x}" y="322" width="130" height="34" rx="8" fill="#10243B" stroke="#5CA0C6" stroke-opacity="0.32"/><text x="${x + 65}" y="344" text-anchor="middle" class="mono caps" fill="${palette.muted}" font-size="10">${chip}</text></g>`;
    })
    .join('');

  const body = `${background(1200, 420)}${cornerMarks(1200, 420)}
    <path class="flow" d="M38 74H1162" fill="none" stroke="url(#accentGradient)" stroke-width="2" stroke-dasharray="8 14" opacity="0.75"/>
    ${sectionLabel('RAILAN // ENGINEERING SYSTEM', 58, 54)}
    ${statusPill(profile.status, 1032, 35, 110)}
    <g>
      <text x="58" y="122" class="mono caps muted" font-size="12">IDENTITY / 001</text>
      <text x="58" y="196" class="display" fill="${palette.text}" font-size="64" font-weight="800">${escapeXml(profile.name)}</text>
      <rect x="58" y="215" width="92" height="4" rx="2" fill="url(#accentGradient)" filter="url(#softGlow)"/>
      <text x="58" y="257" class="display" fill="${palette.highlight}" font-size="24" font-weight="600">${escapeXml(profile.role)}</text>
      <text x="58" y="291" class="mono muted" font-size="13">${escapeXml(profile.location.toUpperCase())}  /  BUILDING RELIABLE SYSTEMS</text>
      ${chips}
    </g>
    <g>
      ${panel(790, 106, 360, 266, 18)}
      <text x="820" y="143" class="mono caps" fill="${palette.highlight}" font-size="12" font-weight="700">SYSTEM CORE</text>
      <text x="1114" y="143" text-anchor="end" class="mono dim" font-size="10">SYNC 100%</text>
      <path d="M828 165V336" stroke="${palette.structural}" stroke-width="2"/>
      ${focusRows}
      <circle cx="828" cy="165" r="7" fill="none" stroke="${palette.highlight}" stroke-opacity="0.7"/><circle class="pulse" cx="828" cy="165" r="3" fill="${palette.highlight}"/>
    </g>
    <g opacity="0.7"><text x="58" y="392" class="mono dim" font-size="10">SYS.RS / V1.0</text><text x="1142" y="392" text-anchor="end" class="mono dim" font-size="10">SIGNAL LOCKED</text></g>`;

  return svgDocument({
    width: 1200,
    height: 420,
    title: 'Railan Engineering System hero',
    description: `${profile.name}, ${profile.role}, focused on backend systems, AI automation, and software architecture.`,
    body,
  });
}
