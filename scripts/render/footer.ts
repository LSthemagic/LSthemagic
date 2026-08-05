import type { ProfileConfig } from '../lib/types.ts';
import { escapeXml } from '../lib/svg.ts';
import { background, cornerMarks, palette, svgDocument } from './shared.ts';

export function renderFooter(profile: ProfileConfig): string {
  const body = `${background(1200, 230)}${cornerMarks(1200, 230)}
    <path class="flow" d="M48 62H1152" fill="none" stroke="url(#accentGradient)" stroke-width="2" stroke-dasharray="9 14" opacity="0.65"/>
    <text x="600" y="108" text-anchor="middle" class="mono caps" fill="${palette.highlight}" font-size="12">END OF TRANSMISSION</text>
    <text x="600" y="151" text-anchor="middle" class="display" fill="${palette.text}" font-size="24" font-weight="800">ENGINEERING SYSTEMS. AUTOMATING COMPLEXITY.</text>
    <text x="600" y="181" text-anchor="middle" class="display" fill="${palette.muted}" font-size="18" font-weight="600">BUILDING WHAT&apos;S NEXT.</text>
    <text x="48" y="211" class="mono dim" font-size="9">${escapeXml(profile.username.toUpperCase())} / SIGNAL COMPLETE</text><text x="1152" y="211" text-anchor="end" class="mono dim" font-size="9">CONNECTION REMAINS OPEN</text>`;

  return svgDocument({
    width: 1200,
    height: 230,
    title: 'End of transmission',
    description: 'Engineering systems, automating complexity, and building what is next.',
    body,
  });
}
