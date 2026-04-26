# 大吉林 AI 视频生产流水线

这套流程由 Codex 执行和检查，目标是把“Codex 控制网页端 GPT Image 2 生成关键帧 -> 图生视频 -> 预览和发布文案”做成本项目内可重复运行的生产线。

开发过程、踩坑记录和后续优化见 [AI_VIDEO_DEV_LOG.md](./AI_VIDEO_DEV_LOG.md)。

下一步执行清单见 [AI_VIDEO_NEXT_TASKS.md](./AI_VIDEO_NEXT_TASKS.md)。

平台推广快速建议见 [DAJILIN_PROMOTION_QUICK_START.md](./DAJILIN_PROMOTION_QUICK_START.md)。

自有平台 GEO / AI 收录技术方案见 [DAJILIN_GEO_TECH_LAUNCH.md](./DAJILIN_GEO_TECH_LAUNCH.md)。

## 当前边界

- 已支持本地生成分镜、网页端图片任务包、视频请求清单、发布文案和质检报告。
- 已跑通“真实参考图 -> fal.ai 可灵图生视频 -> 15 秒合成 -> BGM/环境音/字幕/轻调色后期”的端到端测试。
- `ai:images` 不调用 OpenAI API，只生成供 Codex 控制网页端执行的提示词队列和 runbook。
- 图片实际生成由 Codex 在网页端操作，例如 ChatGPT 网页端 GPT Image 2。
- 视频模型支持 fal.ai Kling；设置 `FAL_KEY` 和 `VIDEO_GENERATION_PROVIDER=fal-kling-v2.1-standard` 后，Codex 可以把关键帧提交给可灵图生视频。
- 也保留通用 provider bridge：设置 `VIDEO_GENERATION_API_URL` 和 `VIDEO_GENERATION_API_KEY` 后，Codex 可以把图片和视频 prompt 提交给其他 Seedance/Kling/Veo 中转接口。
- 如果视频 API 未设置，脚本会生成 `video-requests.json`，用于手动复制到即梦/Seedance 网页版或后续接 n8n。

## 命令

```bash
npm run ai:storyboard -- changbai
npm run ai:images -- changbai
npm run ai:import-download -- changbai --scene 1
npm run ai:videos -- changbai
npm run ai:preview -- changbai
npm run ai:qa -- changbai
```

指定同一个运行目录：

```bash
npm run ai:storyboard -- changbai --run 2026-04-25-changbai-test
npm run ai:images -- changbai --run 2026-04-25-changbai-test
npm run ai:import-download -- changbai --run 2026-04-25-changbai-test --scene 1
npm run ai:videos -- changbai --run 2026-04-25-changbai-test
npm run ai:preview -- changbai --run 2026-04-25-changbai-test
npm run ai:qa -- changbai --run 2026-04-25-changbai-test
```

## 选题

选题文件放在 `ai-video/topics/`：

- `changbai.json`：长白山日出
- `jilin-rime.json`：吉林市雾凇
- `yanbian-food.json`：延边美食夜游
- `g331-border.json`：G331 吉林边境自驾

每个选题包含：

- 总主题和受众
- 3 个 5 秒镜头
- 每个镜头的画面描述和运动描述
- 发布标题、正文和标签

## 输出目录

每次运行会生成：

```text
ai-video/outputs/YYYY-MM-DD-topic/
  storyboard.json
  01-scene-01.image-prompt.txt
  image-web-tasks.json
  image-web-runbook.md
  01-scene-01.png
  video-requests.json
  video-results.json
  publish-copy.md
  preview-plan.md 或 preview.mp4
  qa-report.json
```

`ai-video/outputs/` 已加入 `.gitignore`，避免把生成图片和视频提交到仓库。

## API 环境变量

```bash
VIDEO_GENERATION_PROVIDER=fal-kling-v2.1-standard
FAL_KEY=your-fal-key
FAL_KLING_CFG_SCALE=0.5
```

fal 可灵 provider 可选值：

```text
fal-kling-v2.1-standard
fal-kling-v2.1-pro
fal-kling-v2.1-master
```

第一条 5 秒测试片建议用 `fal-kling-v2.1-standard`，成本低，适合验证流程。

## Codex 执行策略

第一阶段建议由 Codex 手动触发：

1. 跑 `ai:storyboard` 生成分镜。
2. 你确认分镜和提示词。
3. 跑 `ai:images` 生成网页端任务包。
4. 你确认关键帧。
5. 跑 `ai:videos` 生成视频或请求清单。
6. 跑 `ai:preview` 和 `ai:qa`，整理可用素材。

## 网页端图片生成

`ai:images` 会生成：

- `image-web-tasks.json`：Codex 自动化读取的结构化任务队列。
- `image-web-runbook.md`：人工可读执行清单。
- `*.image-prompt.txt`：每个镜头的完整 GPT Image 2 提示词。

网页端执行时，Codex 需要你先完成这些准备：

1. 打开或告知要使用的网页端地址，例如 ChatGPT 网页端。
2. 确认账号已登录。
3. 确认允许 Codex 把提示词提交到该网页生成图片。
4. 生成完成后，Codex 将下载图片或引导保存到当前 run 目录。

如果图片下载到了 macOS `Downloads`，可导入最近下载的图片：

```bash
npm run ai:import-download -- changbai --run 2026-04-25-changbai-test --scene 1
```

常用参数：

- `--scene 1`：导入到第 1 个镜头目标文件。
- `--since 30`：只查找最近 30 分钟内下载的图片，默认 60 分钟。
- `--downloads /path/to/downloads`：指定下载目录。

第二阶段再考虑 Codex Automation：

- 每周自动生成 10 个分镜和图片提示词。
- 每天自动跑 3 条关键帧草稿。
- 视频生成和发布继续保留人工确认，直到成本、审核和失败率稳定。
