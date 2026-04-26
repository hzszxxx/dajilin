#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import {
  findLatestRun,
  loadTopic,
  parseArgs,
  pathExists,
  readJson
} from './lib/pipeline.mjs';

const args = parseArgs();
const topic = await loadTopic(args._[0]);
const run = args.run ? { id: args.run, dir: path.resolve('ai-video/outputs', args.run) } : await findLatestRun(topic.slug);
const storyboard = await readJson(path.resolve(run.dir, 'storyboard.json'));
const videoFiles = [];

for (const scene of storyboard.scenes) {
  const videoPath = path.resolve(run.dir, scene.videoFile);
  if (await pathExists(videoPath)) {
    videoFiles.push(videoPath);
  }
}

const publishCopy = [
  `# ${storyboard.publishCopy.title}`,
  '',
  storyboard.publishCopy.caption,
  '',
  storyboard.publishCopy.hashtags.map((tag) => `#${tag}`).join(' '),
  '',
  `CTA: ${storyboard.cta}`
].join('\n');
await writeFile(path.resolve(run.dir, 'publish-copy.md'), publishCopy, 'utf8');

if (!videoFiles.length) {
  const plan = [
    `# Preview plan for ${run.id}`,
    '',
    'No local MP4 files were found yet. Generate videos first or place provider results using the scene video filenames below:',
    '',
    ...storyboard.scenes.map((scene) => `- ${scene.videoFile}: ${scene.title}`)
  ].join('\n');
  await writeFile(path.resolve(run.dir, 'preview-plan.md'), plan, 'utf8');
  console.log(`Preview plan created: ${path.resolve(run.dir, 'preview-plan.md')}`);
  process.exit(0);
}

const concatList = videoFiles.map((file) => `file '${file.replaceAll("'", "'\\''")}'`).join('\n');
const concatPath = path.resolve(run.dir, 'concat.txt');
await writeFile(concatPath, concatList, 'utf8');

const outputPath = path.resolve(run.dir, 'preview.mp4');
const ffmpeg = spawnSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', concatPath, '-c', 'copy', outputPath], {
  encoding: 'utf8'
});

if (ffmpeg.status !== 0) {
  throw new Error(`ffmpeg failed:\n${ffmpeg.stderr}`);
}

console.log(`Preview created: ${outputPath}`);

