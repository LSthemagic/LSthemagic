import assert from 'node:assert/strict';
import test from 'node:test';
import { buildTelemetry } from '../scripts/lib/telemetry.ts';

const user = { public_repos: 4, followers: 15 };
const repos = [
  { fork: false, stargazers_count: 3, language: 'TypeScript', archived: false },
  { fork: false, stargazers_count: 2, language: 'TypeScript', archived: false },
  { fork: false, stargazers_count: 1, language: 'Dart', archived: false },
  { fork: true, stargazers_count: 99, language: 'JavaScript', archived: false },
  { fork: false, stargazers_count: 8, language: 'Java', archived: true },
];
const events = [
  { created_at: '2026-08-04T10:00:00Z' },
  { created_at: '2026-07-20T10:00:00Z' },
  { created_at: '2026-06-01T10:00:00Z' },
];

test('buildTelemetry aggregates public non-fork, non-archived repository signals', () => {
  const result = buildTelemetry(user, repos, events, new Date('2026-08-05T12:00:00Z'));

  assert.equal(result.publicRepositories, 4);
  assert.equal(result.followers, 15);
  assert.equal(result.starsReceived, 6);
  assert.equal(result.recentActivity, 2);
  assert.deepEqual(result.languages, [
    { name: 'TypeScript', count: 2, percentage: 67 },
    { name: 'Dart', count: 1, percentage: 33 },
  ]);
  assert.equal(result.updatedAt, 'AUG 05, 2026');
});

test('buildTelemetry returns a readable language fallback', () => {
  const result = buildTelemetry(user, [], [], new Date('2026-08-05T12:00:00Z'));
  assert.deepEqual(result.languages, [{ name: 'Exploring', count: 0, percentage: 100 }]);
});

test('buildTelemetry groups languages outside the top three into Other', () => {
  const variedRepos = [
    { fork: false, archived: false, stargazers_count: 0, language: 'TypeScript' },
    { fork: false, archived: false, stargazers_count: 0, language: 'TypeScript' },
    { fork: false, archived: false, stargazers_count: 0, language: 'Java' },
    { fork: false, archived: false, stargazers_count: 0, language: 'Dart' },
    { fork: false, archived: false, stargazers_count: 0, language: 'Python' },
    { fork: false, archived: false, stargazers_count: 0, language: 'JavaScript' },
  ];
  const result = buildTelemetry(user, variedRepos, [], new Date('2026-08-05T12:00:00Z'));
  assert.deepEqual(result.languages, [
    { name: 'TypeScript', count: 2, percentage: 33 },
    { name: 'Dart', count: 1, percentage: 17 },
    { name: 'Java', count: 1, percentage: 17 },
    { name: 'Other', count: 2, percentage: 33 },
  ]);
  assert.equal(result.languages.reduce((sum, item) => sum + item.percentage, 0), 100);
});
