import assert from 'node:assert/strict';
import test from 'node:test';
import { buildTransmissionLog } from '../scripts/lib/transmission.ts';

const events = [
  {
    type: 'PushEvent',
    repo: { name: 'LSthemagic/LSthemagic' },
    created_at: '2026-08-05T12:00:00Z',
    payload: { commits: [{ message: 'chore(profile): refresh generated telemetry' }] },
  },
  {
    type: 'PushEvent',
    repo: { name: 'LSthemagic/papacapim' },
    created_at: '2026-08-04T12:00:00Z',
    payload: { commits: [{ message: 'feat: add profile navigation' }, { message: 'test: cover navigation' }] },
  },
  {
    type: 'CreateEvent',
    repo: { name: 'LSthemagic/new-system' },
    created_at: '2026-08-03T12:00:00Z',
    payload: { ref_type: 'repository' },
  },
  {
    type: 'PullRequestEvent',
    repo: { name: 'LSthemagic/api' },
    created_at: '2026-08-02T12:00:00Z',
    payload: { action: 'opened', pull_request: { title: 'Improve API reliability' } },
  },
  {
    type: 'ReleaseEvent',
    repo: { name: 'LSthemagic/tooling' },
    created_at: '2026-08-01T12:00:00Z',
    payload: { action: 'published', release: { tag_name: 'v1.0.0' } },
  },
  {
    type: 'IssuesEvent',
    repo: { name: 'LSthemagic/tooling' },
    created_at: '2026-07-31T12:00:00Z',
    payload: { action: 'opened', issue: { title: 'Add documentation' } },
  },
  {
    type: 'WatchEvent',
    repo: { name: 'someone/else' },
    created_at: '2026-07-30T12:00:00Z',
    payload: {},
  },
];

test('buildTransmissionLog filters automated profile pushes and limits output to five entries', () => {
  const result = buildTransmissionLog(events);
  assert.equal(result.length, 5);
  assert.equal(result[0]?.title, 'Pushed 2 commits');
  assert.equal(result[0]?.repository, 'papacapim');
  assert.ok(result.every((entry) => !entry.title.includes('telemetry')));
});

test('buildTransmissionLog has a graceful empty state', () => {
  assert.deepEqual(buildTransmissionLog([]), [
    {
      date: 'STANDBY',
      title: 'Awaiting the next public transmission',
      repository: 'github.com/LSthemagic',
    },
  ]);
});
