#!/usr/bin/env node
import path from 'node:path';
import { findLatestRun, loadTopic, parseArgs, pathExists, readJson, writeJson } from './lib/pipeline.mjs';

const args = parseArgs();
const topic = await loadTopic(args._[0]);
const run = args.run ? { id: args.run, dir: path.resolve('ai-video/outputs', args.run) } : await findLatestRun(topic.slug);
const storyboard = await readJson(path.resolve(run.dir, 'storyboard.json'));
const checks = [];

for (const scene of storyboard.scenes) {
  checks.push({
    sceneId: scene.id,
    title: scene.title,
    image: {
      file: scene.imageFile,
      exists: await pathExists(path.resolve(run.dir, scene.imageFile))
    },
    video: {
      file: scene.videoFile,
      exists: await pathExists(path.resolve(run.dir, scene.videoFile))
    },
    promptQuality: {
      imageHasNoTextRule: scene.imagePrompt.includes('no text'),
      videoUsesReference: scene.videoPrompt.includes('reference image'),
      hasMotion: Boolean(scene.motion)
    }
  });
}

const summary = {
  runId: run.id,
  theme: storyboard.theme,
  totalScenes: storyboard.scenes.length,
  imagesReady: checks.filter((check) => check.image.exists).length,
  videosReady: checks.filter((check) => check.video.exists).length,
  checks
};

await writeJson(path.resolve(run.dir, 'qa-report.json'), summary);
console.log(`QA report created: ${path.resolve(run.dir, 'qa-report.json')}`);
console.log(`Images: ${summary.imagesReady}/${summary.totalScenes}, Videos: ${summary.videosReady}/${summary.totalScenes}`);

