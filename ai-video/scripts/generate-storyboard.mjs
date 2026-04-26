#!/usr/bin/env node
import path from 'node:path';
import {
  createRunDir,
  imagePromptFor,
  loadTopic,
  parseArgs,
  readPrompt,
  sceneFileStem,
  videoPromptFor,
  writeJson
} from './lib/pipeline.mjs';

const args = parseArgs();
const topic = await loadTopic(args._[0]);
const imageSystem = await readPrompt('image-system.md');
const videoSystem = await readPrompt('video-system.md');
const run = await createRunDir(topic, args.run);

const storyboard = {
  project: topic.project,
  slug: topic.slug,
  theme: topic.theme,
  platform: topic.platform,
  aspectRatio: topic.aspectRatio,
  duration: topic.duration,
  audience: topic.audience,
  positioning: topic.positioning,
  cta: topic.cta,
  publishCopy: topic.publishCopy,
  runId: run.id,
  createdAt: new Date().toISOString(),
  scenes: topic.scenes.map((scene, index) => {
    const stem = sceneFileStem(scene, index);
    return {
      ...scene,
      imageFile: `${stem}.png`,
      videoFile: `${stem}.mp4`,
      imagePrompt: imagePromptFor(topic, scene, imageSystem),
      videoPrompt: videoPromptFor(scene, videoSystem)
    };
  })
};

await writeJson(path.resolve(run.dir, 'storyboard.json'), storyboard);
await writeJson(path.resolve(run.dir, 'report.json'), {
  runId: run.id,
  status: 'storyboard_created',
  next: 'npm run ai:images -- ' + topic.slug + ' -- --run ' + run.id
});

console.log(`Storyboard created: ${path.resolve(run.dir, 'storyboard.json')}`);

