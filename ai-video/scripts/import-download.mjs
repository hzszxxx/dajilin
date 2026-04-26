#!/usr/bin/env node
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import {
  findLatestRun,
  loadTopic,
  parseArgs,
  readJson,
  rootDir,
  writeJson
} from './lib/pipeline.mjs';

const args = parseArgs();
const topic = await loadTopic(args._[0]);
const run = args.run ? { id: args.run, dir: path.resolve(rootDir, 'ai-video/outputs', args.run) } : await findLatestRun(topic.slug);
const storyboard = await readJson(path.resolve(run.dir, 'storyboard.json'));
const sceneIndex = Number(args.scene || args._[1] || 1) - 1;
const scene = storyboard.scenes[sceneIndex];

if (!scene) {
  throw new Error(`Scene not found. Use --scene 1..${storyboard.scenes.length}`);
}

const downloadsDir = args.downloads || path.resolve(process.env.HOME || '/Users/aqua', 'Downloads');
const sinceMs = args.since ? Number(args.since) * 60 * 1000 : 60 * 60 * 1000;
const minMtime = Date.now() - sinceMs;
const allowedExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const entries = await readdir(downloadsDir, { withFileTypes: true });
const candidates = [];

for (const entry of entries) {
  if (!entry.isFile()) continue;
  const source = path.resolve(downloadsDir, entry.name);
  const extension = path.extname(entry.name).toLowerCase();
  if (!allowedExtensions.has(extension)) continue;
  const info = await stat(source);
  if (info.mtimeMs < minMtime) continue;
  candidates.push({
    source,
    name: entry.name,
    size: info.size,
    mtimeMs: info.mtimeMs
  });
}

candidates.sort((a, b) => b.mtimeMs - a.mtimeMs);

if (!candidates.length) {
  throw new Error(`No recent image files found in ${downloadsDir}`);
}

const selected = candidates[0];
const target = path.resolve(run.dir, scene.imageFile);
await mkdir(run.dir, { recursive: true });
await copyFile(selected.source, target);

await writeJson(path.resolve(run.dir, `import-download-scene-${sceneIndex + 1}.json`), {
  runId: run.id,
  sceneId: scene.id,
  targetFile: scene.imageFile,
  source: selected.source,
  sourceSize: selected.size,
  sourceMtime: new Date(selected.mtimeMs).toISOString(),
  candidates: candidates.slice(0, 10)
});

console.log(`Imported ${selected.source}`);
console.log(`Saved as ${target}`);

