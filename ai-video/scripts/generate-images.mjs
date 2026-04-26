#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  findLatestRun,
  loadTopic,
  parseArgs,
  pathExists,
  readJson,
  writeJson
} from './lib/pipeline.mjs';

const args = parseArgs();
const topic = await loadTopic(args._[0]);
const run = args.run ? { id: args.run, dir: path.resolve('ai-video/outputs', args.run) } : await findLatestRun(topic.slug);
const storyboardPath = path.resolve(run.dir, 'storyboard.json');
const storyboard = await readJson(storyboardPath);
const results = [];
const webTasks = [];

for (const [index, scene] of storyboard.scenes.entries()) {
  const imagePath = path.resolve(run.dir, scene.imageFile);
  const promptPath = imagePath.replace(/\.png$/, '.image-prompt.txt');
  await writeFile(promptPath, scene.imagePrompt, 'utf8');

  if (await pathExists(imagePath)) {
    results.push({ sceneId: scene.id, status: 'exists', imageFile: scene.imageFile });
    continue;
  }

  const task = {
    order: index + 1,
    sceneId: scene.id,
    title: scene.title,
    targetFile: scene.imageFile,
    promptFile: path.basename(promptPath),
    prompt: scene.imagePrompt,
    browserInstruction: [
      `在网页端选择 GPT Image 2 / 图像生成模式。`,
      `粘贴 ${path.basename(promptPath)} 的完整提示词。`,
      `生成 1 张竖屏 9:16 图片。`,
      `下载后保存为 ${scene.imageFile}，放入当前 run 目录。`
    ].join('\n')
  };
  webTasks.push(task);
  results.push({
    sceneId: scene.id,
    status: 'web_task_created',
    promptFile: path.basename(promptPath),
    targetFile: scene.imageFile
  });
}

const runbook = [
  `# GPT Image 2 网页端生成任务：${storyboard.theme}`,
  '',
  `Run: ${run.id}`,
  '',
  '## 执行方式',
  '',
  '1. Codex 打开你指定的网页端图像生成工具，例如 ChatGPT 网页端。',
  '2. 你确认账号已登录，并允许 Codex 在该网页输入提示词。',
  '3. Codex 逐条复制下方提示词到网页端生成图片。',
  '4. 图片下载后保存到本目录，文件名必须和 `targetFile` 一致。',
  '5. 图片齐全后再运行 `npm run ai:videos -- <topic> --run <runId>`。',
  '',
  '## 任务列表',
  '',
  ...webTasks.flatMap((task) => [
    `### ${task.order}. ${task.title}`,
    '',
    `目标文件：\`${task.targetFile}\``,
    '',
    `提示词文件：\`${task.promptFile}\``,
    '',
    '```text',
    task.prompt,
    '```',
    ''
  ])
].join('\n');

await writeFile(path.resolve(run.dir, 'image-web-runbook.md'), runbook, 'utf8');
await writeJson(path.resolve(run.dir, 'image-web-tasks.json'), { runId: run.id, tasks: webTasks });
await writeJson(path.resolve(run.dir, 'image-results.json'), {
  runId: run.id,
  mode: 'web',
  results
});

console.log(`Image step complete: ${path.resolve(run.dir, 'image-results.json')}`);
console.log(`Web runbook created: ${path.resolve(run.dir, 'image-web-runbook.md')}`);
