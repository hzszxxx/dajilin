# 大吉林 AI 视频下一步任务清单

日期：2026-04-25

## 阶段 1：修通图片原图入库

目标：让 ChatGPT 网页端生成的 GPT Image 2 原图能够稳定进入 `ai-video/outputs/`。

- [ ] 给 `/Applications/ChatGPT Atlas.app` 开启完全磁盘访问权限。
- [ ] 重新打开 ChatGPT Atlas / Codex in-app browser。
- [ ] 在长白山图片会话里重新下载 3 张原图。
- [ ] 用导入命令替换当前截图裁切图：

```bash
npm run ai:import-download -- changbai --run 2026-04-25-changbai-test --scene 1 --since 10
npm run ai:import-download -- changbai --run 2026-04-25-changbai-test --scene 2 --since 10
npm run ai:import-download -- changbai --run 2026-04-25-changbai-test --scene 3 --since 10
```

- [ ] 跑 QA：

```bash
npm run ai:qa -- changbai --run 2026-04-25-changbai-test
```

验收标准：

- `01-scene-01.png`、`02-scene-02.png`、`03-scene-03.png` 都是原始下载图。
- 图片尺寸明显高于当前截图裁切图。
- `qa-report.json` 显示 `Images: 3/3`。

## 阶段 2：跑通第一条 Seedance 图生视频

目标：先只做 1 个镜头，不急着批量生成。

- [x] 在 `.env.local` 设置 `FAL_KEY`。
- [x] 设置 `VIDEO_GENERATION_PROVIDER=fal-kling-v2.1-standard`。
- [x] 用 fal.ai 可灵生成第 1 个 5 秒图生视频：

```bash
npm run ai:videos -- changbai --run 2026-04-25-changbai-test --scene 1
```

- [x] 下载视频并命名为：

```text
ai-video/outputs/2026-04-25-changbai-test/01-scene-01.mp4
```

- [x] 跑 QA：

```bash
npm run ai:qa -- changbai --run 2026-04-25-changbai-test
```

验收标准：

- 视频没有明显变形、文字、水印或人物异常。
- 镜头运动符合“慢速航拍推进、云雾流动、日光变暖”。
- `qa-report.json` 显示 `Videos: 1/3`。

## 阶段 3：完成长白山 15 秒测试片

目标：把 3 个镜头全部生成并合成预览。

- [x] 生成 `02-scene-02.mp4`。
- [x] 生成 `03-scene-03.mp4`。
- [x] 跑 QA：

```bash
npm run ai:qa -- changbai --run 2026-04-25-changbai-test
```

- [x] 合成预览：

```bash
npm run ai:preview -- changbai --run 2026-04-25-changbai-test
```

- [x] 检查 `preview.mp4`。

验收标准：

- `Videos: 3/3`。
- `preview.mp4` 能正常播放。
- 三个镜头风格统一，色调不跳。
- 视频没有多余字幕、logo、水印。

## 阶段 4：补齐发布素材

目标：让第一条片子具备发布测试条件。

- [ ] 检查 `publish-copy.md`。
- [ ] 为抖音、小红书、视频号分别改写 1 版标题和正文。
- [ ] 生成封面标题方案 3 个。
- [ ] 记录建议 BGM 风格。
- [ ] 明确是否添加“大吉林”角标或片尾品牌帧。

验收标准：

- 有 3 套平台文案。
- 有 1 个最终标题。
- 有封面文字建议。
- 有可发布版本视频。

## 阶段 5：扩展到 4 条主题片

目标：验证“大吉林”内容矩阵方向。

按顺序跑：

1. `changbai`：长白山日出。
2. `jilin-rime`：吉林市雾凇。
3. `yanbian-food`：延边美食夜游。
4. `g331-border`：G331 吉林边境自驾。

每个主题执行：

```bash
npm run ai:storyboard -- <topic>
npm run ai:images -- <topic>
npm run ai:qa -- <topic>
npm run ai:videos -- <topic>
npm run ai:preview -- <topic>
```

验收标准：

- 每个主题至少产出 1 条 15 秒测试片。
- 每条都有关键帧、视频请求、发布文案、QA 报告。
- 记录每条的生成成本、耗时、失败原因和画面评分。

## 阶段 6：改进自动化能力

目标：减少重复操作，但保留人工确认。

- [ ] 新增 `ai:import-video-download`，自动导入最新下载的 MP4。
- [ ] 在 `qa-assets` 里增加：
  - 图片尺寸检查。
  - 图片比例检查。
  - 视频文件存在检查。
  - 视频时长检查。
- [ ] 在 `storyboard.json` 里记录素材来源：
  - `web-original`
  - `screenshot-crop`
  - `manual-replace`
- [ ] 给 Seedance 网页端写专门操作规范。
- [ ] 记录每个平台的视频生成成功率和成本。

## 当前优先级

最高优先级只有 3 件事：

1. 修通 ChatGPT Atlas 原图下载。
2. 用 Seedance 跑出第 1 个 5 秒视频镜头。
3. 合成长白山 15 秒测试片。

这 3 件完成后，才进入批量主题扩展。

## 2026-04-26 进度记录

- fal.ai 可灵 `fal-kling-v2.1-standard` 已跑通。
- 长白山测试片已生成 3 个 5 秒镜头并合成为 `preview.mp4`。
- `qa-report.json` 已显示 `Images: 3/3`、`Videos: 3/3`。
- 重新点击 ChatGPT 图片下载后，`/Users/aqua/Downloads` 未出现新的长白山原图文件；当前成片仍基于 run 目录中已有关键帧。
- 长春新民大街第二组真实测试已完成：
  - 用户确认候选图 `33、17、21、20`。
  - 使用候选 `17、21、20` 生成 3 个 5 秒镜头。
  - 候选 `33` 作为备用参考保留。
  - 已合成 `ai-video/outputs/2026-04-26-changchun-xinmin-aerial-confirmed/preview.mp4`。
  - QA 已通过：`Images: 3/3`、`Videos: 3/3`。
