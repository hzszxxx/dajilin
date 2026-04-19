# 大吉林 (dajilin.net) 网站维护日志

> 架构设计阶段记录 — 2026-04-13
> 交接对象：Web Admin

---

## 一、项目概况

| 项目 | 说明 |
|---|---|
| 域名 | https://dajilin.renban.xyz |
| 源码目录 | `/var/www/dajilin/releases/20260402153732/` |
| 部署目录 | `/var/www/dajilin/current/` → `releases/20260402153732/` |
| 技术栈 | Astro 5 + React 19 + Node.js SSR (端口 4321) |
| 内容管理 | 通过 `src/lib/content-pages.ts` 定义所有页面内容（1,555 行） |
| 构建命令 | `SITE_URL=https://dajilin.renban.xyz npm run build` |
| Nginx 根目录 | `/var/www/dajilin/current/dist/client` |
| AI 后端 | `https://api.renban.xyz/public/ai/*` |

---

## 二、本次架构设计阶段核心进展

### 2.1 内容扩充（本次最大变更）

**目的地页面 — 共 18 个**

原有基础页面（+本次扩充）：
- `/destinations/changbai-mountain/` — 长白山（扩充后）
- `/destinations/changchun/` — 长春（扩充后）
- `/destinations/yanbian/` — 延边总览（**大幅扩充**，+8,000 字）
- `/destinations/yanji/` — 延吉（**新增**）
- `/destinations/tumen/` — 图们口岸（**新增**）
- `/destinations/hunchun/` — 珲春防川（**新增**）
- `/destinations/erdaobaihe/` — 二道白河镇（**新增**）

**工业研学页面 — 4 个**

- `/study-tours/changchun-industrial/` — 长春工业研学（扩充）
- `/study-tours/faw-hongqi/` — 一汽红旗（扩充）
- `/study-tours/crrc-changchun/` — 中车长客（扩充）
- `/study-tours/changchun-industrial-route/` — 工业文明线路（保持）

**331 国道页面 — 4 个（全部扩充）**

- `/route-331/overview/` — 线路概览（全新内容，1100km、季节建议、适合人群）
- `/route-331/how-to-travel/` — 怎么玩（3/5/7日方案、四季详解）
- `/route-331/station-services/` — 驿站服务（6大服务节点详解）
- `/route-331/supplies-and-stays/` — 补给与住宿（出发清单、油量管理、住宿分级）

### 2.2 SEO 配置 — og:image（P0 已修复）

**文件：`src/layouts/BaseLayout.astro`**

- 新增 `ogImage?: string` props（第9行）
- 新增 `<meta property="og:image">` 标签（第59行）
- 默认图：`/images/home/hero-jilin.jpg`

**文件：`src/pages/destinations/[slug].astro`**

- 新增 `ogImageMap` 按 slug 映射表（changbai→changbai.jpg, yanbian→yanbian.jpg, changchun→changchun.jpg）
- 动态页面传递对应 ogImage

**已更新的静态页面：**
- `changbaishan.astro` → ogImage="/images/home/changbai.jpg"
- `yanbian.astro` → ogImage="/images/home/yanbian.jpg"
- `changchun.astro` → ogImage="/images/home/changchun.jpg"
- `331-overview.astro` → ogImage="/images/home/hero-jilin.jpg"（默认）
- `index.astro` → ogImage="/images/home/hero-jilin.jpg"（默认）

**构建状态：** ✅ 成功（2026-04-14）

**已有配图（`/images/home/`）：**
```
changbai.jpg  changchun.jpg  hero-jilin.jpg  yanbian.jpg
```

### 2.3 之前阶段已修复的生产问题

| 问题 | 修复方案 | 状态 |
|---|---|---|
| 电话占位符"待提供" | 全文替换为 `13843152815` | ✅ |
| AI Widget 端点失效 | `n.n8n.wang` → `api.renban.xyz` | ✅ 已部署补丁 |
| SSR chunk AI 端点 | 补丁 server chunks 中的硬编码端点 | ✅ |
| Nginx upstream 端口 | 4600 → 4321（SSR） | ✅ |
| Nginx root 路径 | 指向 `current/dist/client` | ✅ |
| GN API CORS | `/etc/nginx/sites-enabled/gn-api.conf` 添加 CORS headers | ✅ |

---

## 三、关键配置文件清单

### 环境变量文件
- **`/var/www/dajilin/shared/.env`**（源，也通过 symlink 链接到 `releases/20260402153732/.env`）
- **`/var/www/dajilin/releases/20260402153732/.env`**

关键变量：
```
SITE_URL=https://dajilin.renban.xyz
PUBLIC_GN_API_BASE_URL=https://api.renban.xyz
PUBLIC_GN_SITE_ID=dajilin
PUBLIC_GN_AI_SESSION_ENDPOINT=https://api.renban.xyz/public/ai/session
PUBLIC_GN_AI_CHAT_ENDPOINT=https://api.renban.xyz/public/ai/chat
PUBLIC_GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT=https://api.renban.xyz/public/ai/recommended-questions
PUBLIC_GN_AI_HANDOFF_ENDPOINT=https://api.renban.xyz/public/ai/handoff
```

### Nginx 配置
- **`/etc/nginx/sites-enabled/dajilin.conf`** — 主站配置（root、upstream 4321）
- **`/etc/nginx/sites-enabled/gn-api.conf`** — GN API 代理（含 CORS headers）

### 核心源码
- **`src/lib/content-pages.ts`** — 所有页面内容定义（1,555 行，18个目的地 + 其他）
- **`src/layouts/BaseLayout.astro`** — 页面布局（含 og:image 支持）
- **`src/pages/destinations/[slug].astro`** — 动态目的地页面路由
- **`astro.config.mjs`** — Astro 配置

### 已部署的客户端 JS 补丁
- **`dist/client/_astro/AIWidget.astro_...RKjeOStb.js`** — AI 端点硬编码补丁

---

## 四、部署流程与注意事项

### 日常内容更新流程

1. **编辑内容文件**：`src/lib/content-pages.ts`
2. **构建（**注意必须指定 `SITE_URL` 环境变量**）：
   ```bash
   cd /var/www/dajilin/releases/20260402153732
   SITE_URL=https://dajilin.renban.xyz npm run build
   ```
3. **同步构建产物到已部署目录**：
   - 使用 `sync_destinations.py` 或 `rsync`（注意：rsync 带尾部斜杠自引用会清空目录）
   - 禁止用 `cp -r dir/. dir/` 在同一目录自引用，会导致内容丢失
   - 推荐 Python `shutil.copytree` 经临时目录中转
4. **重启 SSR（如需）**：`pm2 restart <app-name>` 或 `systemctl restart`

### rsync 安全用法（重要）

```bash
# ❌ 错误 — 会清空目标目录
rsync -av /path/src/ /path/src/

# ✅ 正确
rsync -av --delete /path/src/ /path/dst/
```

### 自引用 cp 风险

```bash
# ❌ 错误 — 在同一目录执行 cp -r dir/. dir/ 会清空内容
cp -r /var/www/dajilin/releases/20260402153732/dist/client/route-331/. /var/www/dajilin/releases/20260402153732/dist/client/route-331/

# ✅ 安全方式 — Python shutil 经临时目录中转
```

---

## 五、已知问题与后续建议

### 高优先级

**1. 配图缺失 — og:image 无法完全生效**

目前 `images/home/` 目录只有 4 张图片：
- `changbai.jpg` ✅
- `changchun.jpg` ✅
- `hero-jilin.jpg` ✅（默认 fallback）
- `yanbian.jpg` ✅

以下目的地/页面的 og:image 会 fallback 到 `hero-jilin.jpg`，需补充上传：
- `yanji.jpg` — 延吉
- `tumen.jpg` — 图们
- `hunchun.jpg` — 珲春
- `erdaobaihe.jpg` — 二道白河
- 其他目的地图片待补

**建议**：上传尺寸 1200×630px 以上、文件小于 500KB 的图片到 `/var/www/dajilin/releases/20260402153732/public/images/home/`，然后重新构建。

**2. 构建时的 SITE_URL 环境变量**

当前 `package.json` 的 `build` 脚本没有内联 `SITE_URL`，导致如果 shell 环境没有导入该变量，构建产物中的 og:url 会使用错误的域名（`https://dajilin.net`）。

**建议修复**：`package.json` 中改为：
```json
"build": "SITE_URL=https://dajilin.renban.xyz astro build"
```

### 中优先级

**3. 多语言内容**

目前 EN/JA/KO 页面语言开关存在，但各语言版本的内容尚未独立编写。如果目标用户包含海外游客，需要逐步补充多语言内容。

**4. URL 别名**

长白山页面的实际输出路径是 `/destinations/changbai-mountain/`，但早期 URL 使用 `/destinations/changbaishan/`。当前通过 `dist/client/destinations/changbaishan → changbai-mountain` 软链接解决。如有需要可考虑统一 URL 并做 301 重定向。

**5. MISSION.md**

项目中未见 MISSION.md 文件。如需建立项目任务文档，建议在 `/var/www/dajilin/docs/` 下创建。

### 低优先级（监控即可）

- AI Widget 在极端网络条件下可能偶发超时（当前生产端点 `api.renban.xyz` 已验证可用）
- 冬季冰雪路况期间，331 国道山区路段内容可能需要增加冬季出行提示
- 331 国道辽宁段与吉林段的衔接内容（目前内容以吉林段为主）

---

## 六、常用运维命令

```bash
# 查看 SSR 进程
pm2 list

# 重启 SSR
pm2 restart <app-name>

# 查看 Nginx 状态
systemctl status nginx

# 重载 Nginx
nginx -s reload

# 查看站点日志
tail -f /var/log/nginx/dajilin-access.log

# 构建（新内容发布）
cd /var/www/dajilin/releases/20260402153732
SITE_URL=https://dajilin.renban.xyz npm run build

# 检查构建产物
ls /var/www/dajilin/releases/20260402153732/dist/client/
```

---

## 七、交接清单

- [x] 电话号码替换完成并验证
- [x] AI Widget 端点修复完成并验证
- [x] Nginx 配置修复完成
- [x] 内容页扩充（目的地、研学、331）完成
- [x] og:image SEO 配置完成
- [x] 补充缺失的 og:image 配图（yanji、tumen、hunchun、erdaobaihe）（已生成 1200×630 JPEG，均约 22KB）
- [x] 修复 package.json build 脚本添加 SITE_URL
- [x] 多语言路由框架（[lang] 包装页）— 框架已完成，33 条路由全部 200（内容翻译后续分层补充）
- [x] BaseLayout hreflang SEO 标注（x-default + en + ja + ko）
- [x] DetailPage CTA 链接本地化（EN/JA/KO 页面内链正确）
- [x] AI widget pageUrl 使用 canonical path（不受 locale 前缀影响）
- [ ] 多语言内容翻译（EN/JA/KO）— 详情页内容仍为中文，SEO title/description 可独立优化

---

---

## GEO 优化 — AI 平台收录（2026-04-17）

### 执行概要
针对豆包/千问/DeepSeek/元宝/文心一言进行 Schema 结构化优化。

### 完成项
- [x] FAQ Hub 页（/faq）— 新建，含 FAQPage + WebPage Schema，18 个问题（4大主题）
- [x] 自驾节点 Hub 页（/self-drive/nodes）— 新建，含 ItemList + FAQPage Schema，4大节点
- [x] HowTo Schema — 已存在于 overview/how-to-travel/supplies，含 4 步 HowToStep
- [x] Robots.txt — 新建，含豆包/千问/DeepSeek/元宝/文心一言爬虫白名单 + AI 收录说明注释
- [x] FAQPage Schema — 全站已有 8 处（节点页 + stations + official-services + faq hub）
- [x] BreadcrumbList Schema — 主要页面均已添加
- [x] GN-Radar 监控脚本 — scripts/gn-radar.sh（含 Schema 抽检 + HTTP 状态 + 百度检测）

### 新建文件
- `src/pages/faq.astro` — FAQ Hub（含 4 语言 zh/en/ja/ko，18 FAQ）
- `src/pages/self-drive/nodes.astro` — 节点 Hub（含 GeoCoordinates 数据）
- `public/robots.txt` — AI 平台爬虫白名单

### Build 产物
- `dist/dajilin-geo-build-20260417.tar.gz`（6.0MB）— 待上传至 /var/www/dajilin/current/dist/client/

### 待部署
- 上传 tar.gz 到服务器
- 替换 /var/www/dajilin/current/dist/client/
- 运行 GN-Radar 验证 Schema 完整性

### AI 平台优先级
1. 豆包/字节 — FAQPage + HowTo + TouristDestination
2. 千问/通义 — Organization + WebSite + FAQPage + HowTo
3. DeepSeek — 完整 Schema.org 标记 + BreadcrumbList
4. 元宝/腾讯 — Organization + TouristDestination + ItemList
5. 文心/百度 — GeoCoordinates + FAQPage + BreadcrumbList

---

*本文档由架构设计阶段生成，2026-04-13*
*GEO 优化补充：2026-04-17*
*如有问题请参考本文档第五节「已知问题与后续建议」*
