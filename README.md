# dajilin

`dajilin.net` 是 GN 架构下的吉林文旅资源整合站点骨架。

当前阶段定位：

- 吉林目的地内容入口
- 工业研学与企业参访专题
- `331` 国道与驿站服务专题
- AI 文旅导览助手入口
- 文旅商城预备模块

当前阶段策略：

- 以介绍说明、咨询引导、内容沉淀为主
- 不先做强销售入口
- 开发阶段默认遵循 GEO 优先和内容自动化优先原则

相关项目文档：

- `/Users/aqua/workspace/GEO-N8N-OpenClaw/docs/sites/dajilin-project-plan.md`
- `/Users/aqua/workspace/GEO-N8N-OpenClaw/docs/sites/dajilin-phase1-checklist.md`
- `/Users/aqua/workspace/GEO-N8N-OpenClaw/docs/sites/dajilin-copy-framework.md`
- `/Users/aqua/workspace/GEO-N8N-OpenClaw/docs/sites/dajilin-page-outlines.md`
- `/Users/aqua/workspace/GEO-N8N-OpenClaw/docs/sites/dajilin-ai-assistant-v1.md`

## 启动

```bash
npm install
npm run dev
```

## 部署

- 当前验证域名：`dajilin.renban.xyz`
- 正式域名：`dajilin.net`
- 统一 API：`https://api.renban.xyz`
- 验证域名构建命令：
  - `SITE_URL=https://dajilin.renban.xyz PUBLIC_GN_API_BASE_URL=https://api.renban.xyz npm run build`
- 服务器切换版本时：
  - `/var/www/dajilin/current` 必须保持为 release symlink，不要作为实体目录直接覆盖
- 部署清单：
  - `/Users/aqua/workspace/GEO-N8N-OpenClaw/websites/dajilin/docs/INDEPENDENT_DEPLOYMENT_CHECKLIST.md`
