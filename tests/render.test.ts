import assert from 'node:assert/strict';
import test from 'node:test';
import { renderHero } from '../scripts/render/hero.ts';
import { renderTechnologyMatrix } from '../scripts/render/matrix.ts';
import { renderTelemetry } from '../scripts/render/telemetry.ts';
import type { ProfileConfig } from '../scripts/lib/types.ts';

const profile = {
  username: 'LSthemagic',
  name: 'Railan & Santana',
  role: 'Full Stack Software Engineer',
  location: 'Feira de Santana, Brazil',
  status: 'ONLINE',
  intro: [],
  focus: ['Backend Systems', 'AI Automation', 'Software Architecture'],
  experience: [],
  mission: [],
  technologyGroups: [{ title: 'Backend <Core>', items: ['Node.js', 'Java'] }],
  social: { linkedin: '', portfolio: '', email: '', github: '' },
} satisfies ProfileConfig;

test('renderHero produces accessible SVG with motion fallback and escaped profile copy', () => {
  const svg = renderHero(profile);
  assert.match(svg, /^<svg/);
  assert.match(svg, /<title[^>]*>Railan Engineering System hero<\/title>/);
  assert.match(svg, /prefers-reduced-motion/);
  assert.match(svg, /Railan &amp; Santana/);
  assert.doesNotMatch(svg, /Railan & Santana/);
  assert.match(svg, /<\/svg>$/);
});

test('renderTechnologyMatrix escapes configuration values', () => {
  const svg = renderTechnologyMatrix(profile);
  assert.match(svg, /Backend &lt;Core&gt;/);
});

test('renderTelemetry never emits invalid numeric text', () => {
  const svg = renderTelemetry({
    publicRepositories: 48,
    followers: 15,
    starsReceived: 0,
    recentActivity: 4,
    languages: [{ name: 'TypeScript', count: 2, percentage: 100 }],
    updatedAt: 'AUG 05, 2026',
  });
  assert.doesNotMatch(svg, /NaN|undefined|null/);
  assert.match(svg, /SYSTEM TELEMETRY/);
});
