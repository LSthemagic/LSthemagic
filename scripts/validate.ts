import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function validate(): Promise<void> {
  const svgFiles = [
    ...(await collectSvgFiles('assets/static')),
    ...(await collectSvgFiles('assets/generated')),
  ];

  if (svgFiles.length !== 7) throw new Error(`Expected 7 SVG assets, found ${svgFiles.length}.`);

  for (const relativePath of svgFiles) {
    const content = await readFile(resolve(root, relativePath), 'utf8');
    assertSvg(relativePath, content);
  }

  const readme = await readFile(resolve(root, 'README.md'), 'utf8');
  const localReferences = [...readme.matchAll(/src="\.\/(assets\/[^"]+)"/g)].map((match) => match[1]!);
  if (localReferences.length < 7) throw new Error('README does not reference the complete local visual system.');
  await Promise.all(localReferences.map((path) => access(resolve(root, path))));

  for (const banned of ['capsule-render.vercel.app', 'github-readme-stats', 'readme-typing-svg']) {
    if (readme.includes(banned)) throw new Error(`README still depends on banned generic visual service: ${banned}`);
  }

  console.log(`[profile] Validated ${svgFiles.length} SVG assets and ${localReferences.length} README references.`);
}

async function collectSvgFiles(relativeDirectory: string): Promise<string[]> {
  const entries = await readdir(resolve(root, relativeDirectory), { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && extname(entry.name) === '.svg')
    .map((entry) => `${relativeDirectory}/${entry.name}`)
    .sort();
}

function assertSvg(path: string, content: string): void {
  if (!content.startsWith('<svg') || !content.endsWith('</svg>')) throw new Error(`${path} is not a complete SVG document.`);
  if (!content.includes('<title') || !content.includes('<desc')) throw new Error(`${path} is missing accessible title or description.`);
  if (/\b(?:NaN|undefined|null)\b/.test(content)) throw new Error(`${path} contains an invalid generated value.`);
  if ((content.match(/<svg\b/g) ?? []).length !== 1 || (content.match(/<\/svg>/g) ?? []).length !== 1) {
    throw new Error(`${path} has an invalid SVG root count.`);
  }
}

await validate();
