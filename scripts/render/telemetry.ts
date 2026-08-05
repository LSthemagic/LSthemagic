import type { TelemetryModel } from '../lib/types.ts';
import { escapeXml, formatCompactNumber } from '../lib/svg.ts';
import { background, cornerMarks, palette, panel, sectionLabel, svgDocument } from './shared.ts';

export function renderTelemetry(model: TelemetryModel): string {
  const metrics = [
    ['PUBLIC REPOS', formatCompactNumber(model.publicRepositories)],
    ['FOLLOWERS', formatCompactNumber(model.followers)],
    ['STARS RECEIVED', formatCompactNumber(model.starsReceived)],
    ['30D ACTIVITY', formatCompactNumber(model.recentActivity)],
  ];

  const metricCards = metrics
    .map(([label, value], index) => {
      const x = 34 + (index % 2) * 258;
      const y = 82 + Math.floor(index / 2) * 102;
      return `<g>${panel(x, y, 238, 82, 12)}<text x="${x + 18}" y="${y + 25}" class="mono caps dim" font-size="9">${label}</text><text x="${x + 18}" y="${y + 62}" class="display" fill="${palette.text}" font-size="28" font-weight="800">${value}</text><circle cx="${x + 212}" cy="${y + 21}" r="3" fill="${palette.highlight}" opacity="0.7"/></g>`;
    })
    .join('');

  const languageRows = model.languages.slice(0, 4)
    .map((language, index) => {
      const y = 316 + index * 24;
      const barWidth = Math.max(8, Math.min(210, Math.round(language.percentage * 2.1)));
      return `<g><text x="34" y="${y}" class="mono muted" font-size="10">${escapeXml(language.name)}</text><rect x="142" y="${y - 8}" width="210" height="7" rx="3.5" fill="#16304A"/><rect x="142" y="${y - 8}" width="${barWidth}" height="7" rx="3.5" fill="url(#accentGradient)"/><text x="374" y="${y}" class="mono dim" font-size="9">${language.percentage}%</text></g>`;
    })
    .join('');

  const body = `${background(550, 440)}${cornerMarks(550, 440, 18)}${sectionLabel('SYSTEM TELEMETRY', 34, 45)}<text x="516" y="45" text-anchor="end" class="mono dim" font-size="9">LIVE / PUBLIC DATA</text>${metricCards}<text x="34" y="286" class="mono caps" fill="${palette.highlight}" font-size="10">LANGUAGE SIGNAL</text>${languageRows}<text x="34" y="421" class="mono dim" font-size="9">LAST SYNC / ${escapeXml(model.updatedAt)}</text>`;

  return svgDocument({
    width: 550,
    height: 440,
    title: 'System telemetry',
    description: 'Public GitHub repository, follower, star, activity, and language signals.',
    body,
  });
}
