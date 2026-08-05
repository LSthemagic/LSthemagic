import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchGitHubSnapshot } from './lib/github.ts';
import { buildTelemetry } from './lib/telemetry.ts';
import { buildTransmissionLog } from './lib/transmission.ts';
import type { ProfileConfig, ProfileSnapshot } from './lib/types.ts';
import { renderEngineeringConsole } from './render/console.ts';
import { renderFooter } from './render/footer.ts';
import { renderHero } from './render/hero.ts';
import { renderTechnologyMatrix } from './render/matrix.ts';
import { renderMission } from './render/mission.ts';
import { renderTelemetry } from './render/telemetry.ts';
import { renderTransmissionLog } from './render/transmission.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const live = process.argv.includes('--live');

export async function generateProfileAssets(): Promise<void> {
  const profile = await readJson<ProfileConfig>('data/profile.json');
  let snapshot = await readJson<ProfileSnapshot>('data/snapshot.json');
  let source = 'offline snapshot';

  if (live) {
    try {
      snapshot = await fetchGitHubSnapshot(profile.username, process.env.GITHUB_TOKEN);
      await writeJsonAtomic('data/snapshot.json', snapshot);
      source = 'GitHub public API';
    } catch (error) {
      console.warn(`[profile] Live telemetry unavailable; preserving generation with snapshot. ${formatError(error)}`);
    }
  }

  const now = live ? new Date() : new Date(snapshot.capturedAt);
  const telemetry = buildTelemetry(snapshot.user, snapshot.repositories, snapshot.events, now);
  const transmissionLog = buildTransmissionLog(snapshot.events);

  const assets: Record<string, string> = {
    'assets/static/hero.svg': renderHero(profile),
    'assets/static/engineering-console.svg': renderEngineeringConsole(profile),
    'assets/static/technology-matrix.svg': renderTechnologyMatrix(profile),
    'assets/static/current-mission.svg': renderMission(profile),
    'assets/static/footer.svg': renderFooter(profile),
    'assets/generated/telemetry.svg': renderTelemetry(telemetry),
    'assets/generated/transmission-log.svg': renderTransmissionLog(transmissionLog),
  };

  await Promise.all(Object.entries(assets).map(([path, content]) => writeTextAtomic(path, content)));
  console.log(`[profile] Generated ${Object.keys(assets).length} SVG assets from ${source}.`);
}

async function readJson<T>(relativePath: string): Promise<T> {
  return JSON.parse(await readFile(resolve(root, relativePath), 'utf8')) as T;
}

async function writeJsonAtomic(relativePath: string, value: unknown): Promise<void> {
  await writeTextAtomic(relativePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function writeTextAtomic(relativePath: string, content: string): Promise<void> {
  const target = resolve(root, relativePath);
  await mkdir(dirname(target), { recursive: true });
  const temporary = `${target}.tmp`;
  await writeFile(temporary, content, 'utf8');
  await rename(temporary, target);
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

await generateProfileAssets();
