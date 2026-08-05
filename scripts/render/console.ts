import type { ProfileConfig } from '../lib/types.ts';
import { escapeXml } from '../lib/svg.ts';
import { background, cornerMarks, palette, panel, sectionLabel, svgDocument } from './shared.ts';

export function renderEngineeringConsole(profile: ProfileConfig): string {
  const focusLines = [
    profile.focus.slice(0, 2).map(escapeXml).join('  ·  '),
    profile.focus.slice(2, 4).map(escapeXml).join('  ·  '),
  ];
  const experience = profile.experience.slice(0, 4);
  const lines = experience
    .map((line, index) => `<text x="690" y="${151 + index * 31}" class="mono muted" font-size="13"><tspan fill="${palette.highlight}">+</tspan><tspan dx="12">${escapeXml(line)}</tspan></text>`)
    .join('');

  const body = `${background(1200, 320)}${cornerMarks(1200, 320)}${sectionLabel('SYSTEM PROFILE / WHOAMI', 48, 48)}
    ${panel(48, 76, 1104, 198, 15)}
    <g><circle cx="75" cy="99" r="5" fill="#FF6B6B"/><circle cx="94" cy="99" r="5" fill="#FFD166"/><circle cx="113" cy="99" r="5" fill="#75E6B5"/><text x="1130" y="103" text-anchor="end" class="mono dim" font-size="10">/usr/profile/railan</text></g>
    <line x1="648" y1="126" x2="648" y2="252" stroke="${palette.line}"/>
    <text x="76" y="151" class="mono" fill="${palette.highlight}" font-size="14">&gt; whoami<tspan class="blink">_</tspan></text>
    <text x="76" y="188" class="display" fill="${palette.text}" font-size="26" font-weight="700">${escapeXml(profile.role)}</text>
    <text x="76" y="214" class="mono muted" font-size="12">${focusLines[0]}</text>
    <text x="76" y="235" class="mono muted" font-size="12">${focusLines[1]}</text>
    <text x="76" y="258" class="mono dim" font-size="11">${escapeXml(profile.location)} · ${escapeXml(profile.status)}</text>
    <text x="690" y="117" class="mono caps" fill="${palette.highlight}" font-size="11">CAPABILITY SIGNALS</text>
    ${lines}
    <text x="48" y="302" class="mono dim" font-size="10">MINDSET / UNDERSTAND DEEPLY · BUILD CLEARLY · IMPROVE CONTINUOUSLY</text>`;

  return svgDocument({
    width: 1200,
    height: 320,
    title: 'Engineering console',
    description: 'A command-line inspired summary of Railan Santana’s engineering profile and experience.',
    body,
  });
}
