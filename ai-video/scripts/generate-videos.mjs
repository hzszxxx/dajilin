#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  findLatestRun,
  loadLocalEnv,
  loadTopic,
  parseArgs,
  pathExists,
  readJson,
  writeJson
} from './lib/pipeline.mjs';

loadLocalEnv();

const args = parseArgs();
const topic = await loadTopic(args._[0]);
const run = args.run ? { id: args.run, dir: path.resolve('ai-video/outputs', args.run) } : await findLatestRun(topic.slug);
const storyboard = await readJson(path.resolve(run.dir, 'storyboard.json'));
const providerUrl = process.env.VIDEO_GENERATION_API_URL;
const providerKey = process.env.VIDEO_GENERATION_API_KEY;
const falKey = process.env.FAL_KEY;
const providerName = args.provider || process.env.VIDEO_GENERATION_PROVIDER || 'request-only';
const dryRun = args['dry-run'];
const sceneFilter = args.scene ? Number(args.scene) - 1 : null;
const requests = [];
const results = [];

const falEndpoints = {
  'fal-kling-v2.1-standard': 'fal-ai/kling-video/v2.1/standard/image-to-video',
  'fal-kling-v2.1-pro': 'fal-ai/kling-video/v2.1/pro/image-to-video',
  'fal-kling-v2.1-master': 'fal-ai/kling-video/v2.1/master/image-to-video'
};

function mimeTypeFor(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg';
  if (extension === '.webp') return 'image/webp';
  return 'image/png';
}

async function requestFalKling({ endpointId, imagePath, scene, storyboard }) {
  if (!falKey) {
    throw new Error('FAL_KEY is not set. Add it to .env.local or export it in the shell.');
  }

  const imageBase64 = (await readFile(imagePath)).toString('base64');
  const imageUrl = `data:${mimeTypeFor(imagePath)};base64,${imageBase64}`;
  const response = await fetch(`https://fal.run/${endpointId}`, {
    method: 'POST',
    headers: {
      Authorization: `Key ${falKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: scene.videoPrompt,
      image_url: imageUrl,
      duration: String(scene.duration || 5),
      aspect_ratio: storyboard.aspectRatio || '9:16',
      negative_prompt: 'blur, distort, low quality, text, logo, watermark, warped buildings, distorted landscape, flickering artifacts',
      cfg_scale: Number(process.env.FAL_KLING_CFG_SCALE || 0.5)
    })
  });

  const bodyText = await response.text();
  if (!response.ok) {
    throw new Error(`fal request failed: ${response.status} ${response.statusText}\n${bodyText}`);
  }

  const data = JSON.parse(bodyText);
  const videoUrl = data.video?.url || data.video_url || data.output?.video?.url;
  if (!videoUrl) {
    return { status: 'submitted', providerResponse: data };
  }

  const videoResponse = await fetch(videoUrl);
  const videoBody = await videoResponse.arrayBuffer();
  if (!videoResponse.ok) {
    throw new Error(`fal video download failed: ${videoResponse.status} ${videoResponse.statusText}`);
  }

  return {
    status: 'generated',
    videoBuffer: Buffer.from(videoBody),
    providerResponse: data,
    videoUrl
  };
}

for (const [index, scene] of storyboard.scenes.entries()) {
  if (sceneFilter !== null && sceneFilter !== index) continue;

  const imagePath = path.resolve(run.dir, scene.imageFile);
  const videoPath = path.resolve(run.dir, scene.videoFile);
  const request = {
    provider: providerName,
    sceneId: scene.id,
    duration: scene.duration,
    aspectRatio: storyboard.aspectRatio,
    imageFile: scene.imageFile,
    videoFile: scene.videoFile,
    prompt: scene.videoPrompt
  };
  requests.push(request);

  if (!(await pathExists(imagePath))) {
    results.push({ sceneId: scene.id, status: 'missing_image', imageFile: scene.imageFile });
    continue;
  }

  if (await pathExists(videoPath)) {
    results.push({ sceneId: scene.id, status: 'exists', videoFile: scene.videoFile });
    continue;
  }

  if (dryRun || providerName === 'request-only') {
    results.push({
      sceneId: scene.id,
      status: 'request_only',
      reason: dryRun ? 'dry-run flag set' : 'VIDEO_GENERATION_PROVIDER is request-only'
    });
    continue;
  }

  const falEndpoint = falEndpoints[providerName];
  if (falEndpoint) {
    const falResult = await requestFalKling({ endpointId: falEndpoint, imagePath, scene, storyboard });
    if (falResult.videoBuffer) {
      await writeFile(videoPath, falResult.videoBuffer);
    }
    results.push({
      sceneId: scene.id,
      status: falResult.status,
      videoFile: falResult.videoBuffer ? scene.videoFile : undefined,
      provider: providerName,
      endpoint: falEndpoint,
      videoUrl: falResult.videoUrl,
      providerResponse: falResult.providerResponse
    });
    continue;
  }

  if (!providerUrl || !providerKey) {
    results.push({
      sceneId: scene.id,
      status: 'request_only',
      reason: 'VIDEO_GENERATION_API_URL or VIDEO_GENERATION_API_KEY is not set'
    });
    continue;
  }

  const imageBase64 = (await readFile(imagePath)).toString('base64');
  const response = await fetch(providerUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${providerKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      provider: providerName,
      mode: 'image-to-video',
      prompt: scene.videoPrompt,
      duration: scene.duration,
      aspect_ratio: storyboard.aspectRatio,
      image_base64: imageBase64
    })
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}\n${text}`);
  }
  const data = JSON.parse(text);

  if (data.video_base64) {
    await writeFile(videoPath, Buffer.from(data.video_base64, 'base64'));
    results.push({ sceneId: scene.id, status: 'generated', videoFile: scene.videoFile, provider: providerName });
  } else {
    results.push({ sceneId: scene.id, status: 'submitted', providerResponse: data });
  }
}

await writeJson(path.resolve(run.dir, 'video-requests.json'), { runId: run.id, requests });
await writeJson(path.resolve(run.dir, 'video-results.json'), {
  runId: run.id,
  dryRun: Boolean(dryRun),
  provider: providerName,
  scene: args.scene ? Number(args.scene) : 'all',
  results
});

console.log(`Video step complete: ${path.resolve(run.dir, 'video-results.json')}`);
