# 大吉林 AI 视频流水线开发日志

日期：2026-04-25

## 目标

为“大吉林”旅游内容建立一套由 Codex 控制的 AI 视频生产流程：

```text
选题 -> 分镜 -> GPT Image 2 网页端关键帧 -> Seedance 图生视频 -> 预览合成 -> QA -> 发布文案
```

本轮重点不是一次性全自动发布，而是先搭好可重复执行、可人工确认、可逐步升级的生产骨架。

## 已完成

1. 新增 `ai-video/` 工作区：
   - `topics/`：选题库。
   - `prompts/`：图片、视频、文案和浏览器操作规范。
   - `scripts/`：流水线执行脚本。
   - `outputs/`：运行产物目录，已加入 `.gitignore`。

2. 新增 4 个首批旅游主题：
   - `changbai`：长白山日出。
   - `jilin-rime`：吉林市雾凇。
   - `yanbian-food`：延边美食夜游。
   - `g331-border`：G331 吉林边境自驾。

3. 新增 npm 命令：

```bash
npm run ai:storyboard
npm run ai:images
npm run ai:import-download
npm run ai:videos
npm run ai:preview
npm run ai:qa
```

4. 跑通长白山测试 run：

```bash
npm run ai:storyboard -- changbai --run 2026-04-25-changbai-test
npm run ai:images -- changbai --run 2026-04-25-changbai-test
npm run ai:qa -- changbai --run 2026-04-25-changbai-test
```

当前 QA 结果：

```text
Images: 3/3
Videos: 0/3
```

5. 已通过 ChatGPT 网页端生成 3 张长白山关键帧，并保存到：

```text
ai-video/outputs/2026-04-25-changbai-test/
  01-scene-01.png
  02-scene-02.png
  03-scene-03.png
```

## 关键设计决策

### 1. 图片不用 OpenAI API

最初实现过 API 生成思路，但用户明确要求不使用 `OPENAI_API_KEY`，改为 Codex 控制网页端 GPT Image 2。

最终设计：

```text
ai:images 只生成网页端任务包
Codex 读取 image-web-tasks.json
Codex 在 ChatGPT 网页端逐条提交 prompt
图片落盘后再进入视频流程
```

这样保留了网页端账号权益，也避免在项目里管理 OpenAI API key。

### 2. 网页端任务包比临时复制更可靠

`image-web-tasks.json` 和 `image-web-runbook.md` 是本轮很重要的中间产物。它们让 Codex 和人工都能知道：

- 第几个镜头要生成什么。
- prompt 文件在哪里。
- 下载后应该保存成什么文件名。
- 后续视频 prompt 对应哪个关键帧。

### 3. 先人工确认，再自动化

目前不建议直接做 Codex 定时 Automation。原因：

- 网页端图片生成有交互不确定性。
- Seedance 2.0 平台/API 入口尚未最终确定。
- AI 视频生成会产生真实成本。
- 旅游地标真实性需要人工目检。

更稳的阶段划分：

```text
阶段 1：Codex 手动触发，人工确认图片和视频
阶段 2：Codex 批量生成分镜和关键帧
阶段 3：稳定后再做每日/每周 Automation
```

## 踩坑记录

### 1. macOS Downloads 权限

现象：

```text
ls: /Users/aqua/Downloads: Operation not permitted
```

判断：

- `stat` 能读目录元数据。
- `ls` 不能列目录。
- 说明是 macOS TCC 隐私权限，不是 Unix 文件权限。

处理：

- 给 `/Applications/Codex.app` 开了完全磁盘访问权限。
- 之后 Codex 可以读取 `/Users/aqua/Downloads`。

经验：

- macOS 隐私权限不能用普通 shell 命令直接代授权。
- 这类授权必须用户在系统设置里手动确认。

### 2. ChatGPT Atlas 下载按钮不落盘

现象：

- Codex 能读 `Downloads`。
- ChatGPT 页面点击“下载”后，`Downloads` 没有新增文件。
- DOM 能看到三张图的 `backend-api/estuary/content` 链接。
- shell 直接 fetch 链接返回：

```text
File stream access denied.
```

判断：

- 资源链接依赖浏览器会话鉴权。
- 不应该读取浏览器 cookie 去绕过。
- 下载不落盘更可能是 ChatGPT Atlas 自身没有下载写入权限，或 Atlas 内部下载被拦截。

当前处理：

- 已建议给 `/Applications/ChatGPT Atlas.app` 也开完全磁盘访问权限。
- 在 Atlas 下载恢复前，临时使用网页图片查看器截图裁切作为占位关键帧。

经验：

- Codex 能读 Downloads 不等于浏览器能写 Downloads。
- 读权限和写入下载行为要分别验证。

### 3. 网页端原图提取的边界

虽然 DOM 里可以拿到图片资源 URL，但该 URL 不能从 shell 直接下载。继续尝试读取浏览器 cookie 属于不合适的绕过方式，本轮没有做。

经验：

- 对网页端生成图片，优先走浏览器提供的下载按钮。
- 下载失败时，先解决浏览器授权或保存路径，而不是绕过网站鉴权。

### 4. 截图裁切只能当临时方案

当前 3 张图片是从网页图片查看器截图裁切得到的，不是原始下载图。

可用于：

- 测试图生视频流程。
- 验证分镜和风格。
- 跑通 QA 和视频请求清单。

不建议用于：

- 正式商业发布。
- 最终素材归档。
- 对清晰度要求高的视频生成。

## 当前状态

可继续使用的 run：

```text
ai-video/outputs/2026-04-25-changbai-test/
```

关键文件：

```text
storyboard.json
image-web-tasks.json
image-web-runbook.md
video-requests.json
video-results.json
preview-plan.md
qa-report.json
```

当前素材状态：

```text
01-scene-01.png  已有，占位裁切图
02-scene-02.png  已有，占位裁切图
03-scene-03.png  已有，占位裁切图
```

## 下一步

1. 给 `ChatGPT Atlas` 开完全磁盘访问权限，或把其下载路径改到项目内目录。
2. 重新从 ChatGPT 网页端下载三张原图。
3. 使用导入命令替换占位图：

```bash
npm run ai:import-download -- changbai --run 2026-04-25-changbai-test --scene 1 --since 10
npm run ai:import-download -- changbai --run 2026-04-25-changbai-test --scene 2 --since 10
npm run ai:import-download -- changbai --run 2026-04-25-changbai-test --scene 3 --since 10
```

4. 再跑 QA：

```bash
npm run ai:qa -- changbai --run 2026-04-25-changbai-test
```

5. 打开 Seedance / 即梦 / Rita 网页端，按 `video-requests.json` 逐条做图生视频。

6. 视频下载后放入 run 目录：

```text
01-scene-01.mp4
02-scene-02.mp4
03-scene-03.mp4
```

7. 合成预览：

```bash
npm run ai:preview -- changbai --run 2026-04-25-changbai-test
```

## 后续优化建议

1. 新增 `ai:browser-images` 命令，自动读取任务队列并辅助网页端执行。
2. 新增 `ai:import-video-download`，处理 Seedance 视频下载入库。
3. 给 `qa-assets` 增加图片尺寸、比例和文件大小检查。
4. 给 `storyboard.json` 增加 `assetSource` 字段，标记图片是原图、截图裁切还是人工替换。
5. 当 Seedance 平台确定后，为对应网页端单独写操作规范。

## 2026-04-26 长春新民大街第二组真实测试

用户指出第一批新民大街图片不是最新照片，因此停止继续使用旧图生成。

重新检索公开渠道后，较新的可用图片主要集中在 2025-07-05 至 2025-07-07 新民大街焕新开街报道。候选图整理在：

```text
ai-video/outputs/2026-04-26-changchun-xinmin-aerial-test/candidates/
```

用户确认候选编号：

```text
33、17、21、20
```

新建正式测试 run：

```text
ai-video/outputs/2026-04-26-changchun-xinmin-aerial-confirmed/
```

本次 15 秒测试采用 3 个 5 秒镜头：

```text
01-scene-01.png  候选 17，新民大街林荫轴线高机位
02-scene-02.png  候选 21，街区活动高机位
03-scene-03.png  候选 20，历史建筑与开街人流
```

候选 33 作为备用参考保留：

```text
sources/selected-33-ctdsb-202507-08.jpg
sources/backup-selected-33-vertical.png
```

处理经验：

- 不复用旧 run 中已生成的 `mp4`，避免脚本因文件存在而跳过。
- 对带媒体水印的参考图，先裁成竖屏首帧并尽量避开右下角水印。
- fal.ai 可灵同步请求耗时不稳定，第 2、3 镜头单条请求约 5-6 分钟。
- 第 2、3 镜头首帧从 1080x1920 降到 720x1280 后继续生成，最终成功。

生成结果：

```text
preview.mp4  720x1280, 24fps, 15.125s, 约 25MB
qa-report.json  Images: 3/3, Videos: 3/3
```

## 2026-04-26 后期处理流程跑通

基于长春新民大街 confirmed run，完成第一版后期处理：

```text
ai-video/outputs/2026-04-26-changchun-xinmin-aerial-confirmed/preview-post.mp4
```

处理内容：

- 添加程序生成 BGM。
- 添加程序生成城市环境音。
- 烧录 3 句旁白字幕。
- 做轻微调色、锐化和颗粒。
- 抬高音频音量，适配手机播放。

后期记录文件：

```text
ai-video/outputs/2026-04-26-changchun-xinmin-aerial-confirmed/post/POST_PRODUCTION.md
ai-video/outputs/2026-04-26-changchun-xinmin-aerial-confirmed/post/narration.srt
```

阶段结论：

```text
真实参考图确认 -> 竖屏关键帧 -> fal.ai 可灵视频 -> 15 秒合成 -> 后期声音/字幕/调色
```

这条生产流程已经完整跑通，可以开始复制到长白山、吉林雾凇、延边美食、G331 自驾等主题。
