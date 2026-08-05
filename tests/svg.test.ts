import assert from 'node:assert/strict';
import test from 'node:test';
import { escapeXml, formatCompactNumber } from '../scripts/lib/svg.ts';

test('escapeXml protects all XML-sensitive characters', () => {
  assert.equal(
    escapeXml(`Railan & <systems> "online" 'now'`),
    'Railan &amp; &lt;systems&gt; &quot;online&quot; &apos;now&apos;',
  );
});

test('formatCompactNumber keeps small values exact and compacts large values', () => {
  assert.equal(formatCompactNumber(48), '48');
  assert.equal(formatCompactNumber(1_250), '1.3K');
  assert.equal(formatCompactNumber(2_000_000), '2M');
});
