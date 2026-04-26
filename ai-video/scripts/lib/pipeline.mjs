import { mkdir, readFile, readdir, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const rootDir = path.resolve(scriptDir, '../../..');
export const aiVideoDir = path.resolve(rootDir, 'ai-video');
export const topicsDir = path.resolve(aiVideoDir, 'topics');
export const promptsDir = path.resolve(aiVideoDir, 'prompts');
export const outputsDir = path.resolve(aiVideoDir, 'outputs');

export function loadLocalEnv() {
  for (const envFile of ['.env.local', '.env']) {
    const filePath = path.resolve(rootDir, envFile);
    try {
      process.loadEnvFile(filePath);
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        throw error;
      }
    }
  }
}

export function parseArgs(argv = process.argv.slice(2)) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (!value.startsWith('--')) {
      args._.push(value);
      continue;
    }

    const key = value.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    i += 1;
  }
  return args;
}

export async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

export async function writeJson(filePath, data) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export async function readPrompt(name) {
  return readFile(path.resolve(promptsDir, name), 'utf8');
}

export async function loadTopic(slug) {
  if (!slug) {
    throw new Error('Missing topic slug. Example: npm run ai:storyboard -- changbai');
  }
  return readJson(path.resolve(topicsDir, `${slug}.json`));
}

export function todayStamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export async function createRunDir(topic, runId) {
  const id = runId || `${todayStamp()}-${topic.slug}`;
  const dir = path.resolve(outputsDir, id);
  await mkdir(dir, { recursive: true });
  return { id, dir };
}

export async function findLatestRun(slug) {
  const entries = await readdir(outputsDir, { withFileTypes: true }).catch(() => []);
  const runs = entries
    .filter((entry) => entry.isDirectory() && entry.name.endsWith(`-${slug}`))
    .map((entry) => entry.name)
    .sort()
    .reverse();

  if (!runs.length) {
    throw new Error(`No output run found for topic "${slug}". Run ai:storyboard first.`);
  }

  return {
    id: runs[0],
    dir: path.resolve(outputsDir, runs[0])
  };
}

export async function pathExists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export function sceneFileStem(scene, index) {
  return `${String(index + 1).padStart(2, '0')}-${scene.id}`;
}

export function imagePromptFor(topic, scene, imageSystem) {
  return [
    imageSystem.trim(),
    '',
    `项目：${topic.project}`,
    `主题：${topic.theme}`,
    `画面：${scene.visual}`,
    `定位：${topic.positioning}`,
    '输出：cinematic realistic travel photography, premium destination marketing visual, natural colors, sharp details, vertical 9:16, no text, no logo, no watermark.'
  ].join('\n');
}

export function videoPromptFor(scene, videoSystem) {
  return [
    videoSystem.trim(),
    '',
    'Use the reference image as the first frame.',
    `Create a ${scene.duration}-second cinematic vertical travel video.`,
    `Motion: ${scene.motion}.`,
    'Keep the original scene, lighting, composition, and subject identity stable.'
  ].join('\n');
}

export function ensureOk(response, bodyText) {
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}\n${bodyText}`);
  }
}
