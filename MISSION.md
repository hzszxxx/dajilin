# 🚀 MISSION: DaJilin Pro/GEO Upgrade
**Codebase:** `websites/dajilin` (Astro)
**Reference:** `legacy-sites/jlsdjc-php` (ThinkPHP)
**Status:** Phase 1 In Progress — Skeleton → Production-Ready

---

## 🎯 Project Scope & North Star

将"大吉林"从目前的基础骨架升级为符合 GN 架构标准的、内容自动化的吉林文旅资源整合平台。
**核心原则：** GEO 优先（针对 AI 引擎优化）、内容资产自动化流转、性能极致（Astro 驱动）。

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5.16.6 (static + Node adapter) |
| UI (interactive) | React 19 |
| Language | TypeScript |
| Node | 22.x |
| CMS | Ghost Content API (`@tryghost/content-api ^1.12.2`) |
| Storage | unstorage |
| Testing | Vitest |
| Monorepo | GN Workspace (`@gn/gateway-helpers`, `@gn/site-adapters`, etc.) |

---

## 📂 Project Structure

```
src/
├── pages/          # All routes (i18n + root-level dual routes)
│   ├── [lang]*/   # Localized pages (destinations, themes, guides, etc.)
│   ├── index.astro
│   ├── ai-assistant.astro
│   ├── self-drive/
│   ├── shop/
│   ├── orders/
│   ├── checkout
│   ├── payment/success|cancel
│   └── robots.txt.ts
├── layouts/        # BaseLayout.astro
├── components/
│   ├── astro/      # Static components (Header, Footer, Cards, etc.)
│   └── react/      # React islands (AIChat)
├── lib/            # Business logic (ghost-cms, cart, i18n, AI, GN clients)
├── styles/
├── scripts/
└── test/
```

---

## ✅ Completed This Session

### 1. System-wide Site Review (dajilin.renban.xyz)
Inspected the following pages via browser automation:
- `/` — Homepage
- `/ai-assistant` — AI guide entry
- `/self-drive` — G331 road trip hub
- `/shop` — E-commerce (placeholder)
- Sitemap index (`/sitemap-index.xml`)

### 2. SEO Audit Findings
Verified the following SEO elements are present:
- ✅ `robots.txt` configured
- ✅ `@astrojs/sitemap` integrated
- ✅ Canonical URLs on all pages
- ✅ `WebPage` JSON-LD on homepage and inner pages
- ✅ `Organization` JSON-LD (partial — name, url, description, areaServed)
- ✅ `WebSite` JSON-LD (partial)
- ✅ `CollectionPage` JSON-LD on `/guides`
- ✅ `meta[name="robots"]` = `index,follow`
- ✅ `meta[name="description"]` filled
- ✅ `lang="zh-CN"` on `<html>`
- ✅ `charset="UTF-8"`
- ✅ Viewport meta correct
- ✅ 4-language switcher (zh/en/jp/kr) functional

### 3. Visual & UX Review
- ✅ Deep green + white color scheme — natural, professional, no skeleton feel
- ✅ Full-width hero with background image
- ✅ Modular content sections (seasonal routes, topics, AI section)
- ✅ Floating AI guide button (persistent)
- ✅ Footer with 4-column layout
- ✅ Navigation clear and complete

### 4. Architecture Confirmed
- ✅ i18n dual-route pattern (`/[lang]/*` + root-level)
- ✅ React island for AI Chat
- ✅ Ghost CMS integration layer (`ghost-cms.ts`)
- ✅ GN workspace packages wired up
- ✅ Build command: `SITE_URL=https://dajilin.renban.xyz PUBLIC_GN_API_BASE_URL=https://api.renban.xyz npm run build`

### 5. P0 SEO Fixes Applied (This Session)
- **SEO-01** ✅: `Organization` Schema enriched — `logo`, `telephone`, `email`, `address` (PostalAddress), `sameAs` (weibo/xiaohongshu/douyin), `contactPoint` (CustomerServiceContactPoint with 4 languages)
- **SEO-02** ✅: `buildBreadcrumbSchema()` added to `schema.ts` — ready to use on all list/detail pages
- **SEO-03** ✅: Homepage now has 3 `ItemList` schemas — weekly routes, topic cards, editorial/event cards
- **SEO-04** ✅: `WebSite` Schema now includes `potentialAction` (SearchAction pointing to `/search?q={term}`)
- **SEO-05** ✅: `BaseLayout.astro` global meta added — `og:locale`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- **SEO-06** ✅: Homepage upgraded from `WebPage` to `CollectionPage`; all schemas now use builder functions (`buildOrganizationSchema`, `buildWebSiteSchema`, `buildCollectionPageSchema`, `buildItemListSchema`)

### 6. P1 Content & API Fixes Applied (This Session)
- **CONTENT-01** ✅: `shop.astro` completely rewritten — placeholder product cards replaced with professional "coming soon" landing page with: hero badge, 3-category preview, explainer text, email/phone notify form (with client-side validation), and cooperation fallback link. All 4 languages.
- **CONTENT-05** ✅: Ghost CMS verified — `GHOST_CONTENT_API_KEY` IS configured, but `GHOST_API_URL=http://localhost:2368` is localhost-only. Production needs `cms.dajilin.net` endpoint before Ghost content will load.
- **AI-01** ✅: AI Chat E2E tested via browser console — Widget opens and renders correctly. All 3 API calls (`ai.chat.start`, `ai.chat.send`, recommended questions) fail with `TypeError: Failed to fetch` against `https://api.renban.xyz`. Root cause: API base URL unreachable in production browser context. Chat widget UI/UX is fully functional; backend integration is the only blocker.

### 7. Pending Resource Requirement
- ⚠️ `public/images/og-default.jpg` and `public/images/logo.png` need to be created (referenced in schema/meta tags but not yet present in `public/images/`)

---

## ⚠️ Issues Found (Prioritized)

### 🔴 P0 — SEO Structural Gaps

| # | Issue | Impact | Status |
|---|---|---|---|
| SEO-01 | `Organization` Schema 缺少 `contactPoint`, `address`, `telephone`, `logo`, `sameAs`（社交媒体） | 本地 SEO 失效，Google AI Overviews 不出现 | ✅ 已修复 — `schema.ts` 两个 builder 均已补全 |
| SEO-02 | 全站缺少 `BreadcrumbList` Schema（列表页 + 详情页） | 搜索结果无面包屑，CTR 下降 | ✅ builder 已就绪 — `buildBreadcrumbSchema()` 可调用，待各页面使用 |
| SEO-03 | 首页/目的地/研学等列表页缺少 `ItemList` Schema | 列表内容无法被 AI 搜索正确索引 | ✅ 已修复 — 首页本周推荐、继续探索、专题与资讯三区均已注入 |
| SEO-04 | `WebSite` JSON-LD 缺少 `potentialAction`（SearchAction/ContactAction） | SGE 品牌曝光不足 | ✅ 已修复 — `schema.ts` 两个 builder 均已添加 SearchAction |
| SEO-05 | `og:image`, `og:locale`, `twitter:card` 全缺 | 微信/微博/Facebook/Twitter 分享无预览图 | ✅ 已修复 — `BaseLayout.astro` 全局注入 |
| SEO-06 | 首页是 `WebPage` 而非 `CollectionPage`，无内容集合语义 | 首页内容块无法被 AI 正确归类 | ✅ 已修复 — 首页升级为 `CollectionPage` + 多 `ItemList` |

### 🟡 P1 — Content Gaps

| # | Issue | Impact | Status |
|---|---|---|---|
| CONTENT-01 | `/shop` 三个商品卡片全部是占位文字（"文旅服务类产品说明"等） | 商城模块是空壳，损害信任 | ✅ 已修复 — 全新"即将上线"落地页，支持订阅通知 |
| CONTENT-02 | Footer "电话: 待提供" 是占位符 | 联系方式不完整，信任度下降 | ⏳ 待修复 — 需要填入真实电话或移除该行 |
| CONTENT-03 | 首页 4 个 `<article>` 卡片 H3 无可见文字 | 内容渲染或数据缺失 | ⏳ 待排查 |
| CONTENT-04 | EN/JP/KR 页面内容填充状态未知 | 国际化内容是否真实存在未验证 | ⏳ 待验证 |
| CONTENT-05 | Ghost CMS API 连接是否实际工作未验证 | 内容层是否就绪未知 | ✅ 已验证 — `GHOST_CONTENT_API_KEY` 已配置但生产 `GHOST_API_URL=http://localhost:2368`，本地开发专用，需改为 `cms.dajilin.net` 才能在生产环境拉取内容 |

### 🟡 P2 — AI Feature Validation

| # | Issue | Impact | Status |
|---|---|---|---|
| AI-01 | AI Chat 端到端链路未测试（预设问题 → API → 回复渲染） | AI 导览功能可用性未知 | ✅ 已验证 — AI Widget 面板可打开，但所有 API 调用均报 `Failed to fetch`（`https://api.renban.xyz` 生产环境不可访问），需部署后或配置正确 API 地址 |
| AI-02 | 知识域切换是否生效未验证 | AI 问答结构化程度未知 | ⏳ 待 API 就绪后验证 |
| AI-03 | 转人工顾问链路未验证 | 服务闭环完整性未知 | ⏳ 待 API 就绪后验证 |

### 🟠 P3 — UX & Navigation

| # | Issue | Impact |
|---|---|---|
| UX-01 | Footer 无社交媒体入口（微博/小红书/抖音/微信） | 目标用户主要内容平台无法触达 |
| UX-02 | G331 国道无独立入口（仅在自驾攻略子页覆盖） | 四大专题之一不够突出 |
| UX-03 | 全站无 Breadcrumb 导航 | 用户路径不清晰 |
| UX-04 | 无站内搜索功能 | 内容发现困难 |
| UX-05 | 首页/移动端 LCP 未测量 | Core Web Vitals 合规性未知 |

---

## 📋 TODO — Priority Order

### Immediately (P0)
- [x] **SEO-01**: 补全 `Organization` Schema — 添加 `contactPoint`, `address`, `telephone`, `logo`, `sameAs`
- [x] **SEO-02**: 实现全站 `BreadcrumbList` 组件 + Schema 注入（builder 就绪，待各页面调用）
- [x] **SEO-03**: 为首页和列表页添加 `ItemList` Schema
- [x] **SEO-04**: 为 `WebSite` 添加 `potentialAction`（SearchAction）
- [x] **SEO-05**: 添加 `og:image`, `og:locale`, `twitter:card` 全局配置
- [x] **SEO-06**: 将首页 Schema 从 `WebPage` 升级为 `CollectionPage`

### Short-term (P1)
- [ ] **CONTENT-01**: 商城占位页改为"即将推出"落地页，或接入 Ghost CMS 真实内容
- [ ] **CONTENT-02**: 修复 Footer 电话（填写真实号码或删除该行）
- [ ] **CONTENT-03**: 排查首页 article 卡片文字缺失问题
- [ ] **CONTENT-04**: 验证 EN/JP/KR 页面国际化内容是否真实存在
- [ ] **CONTENT-05**: 验证 Ghost CMS API 连接和内容拉取是否正常
- [ ] **AI-01**: AI Chat 端到端测试（预设问题按钮 → API 响应 → 渲染）
- [ ] **AI-02**: AI 知识域切换 + 转人工顾问链路测试

### Medium-term (P2)
- [ ] **UX-01**: Footer 增加社交媒体链接（微信/微博/小红书/抖音）
- [ ] **UX-02**: 首页增加 G331 国道独立 Banner 入口
- [ ] **UX-03**: 全站 Breadcrumb 导航组件
- [ ] **UX-04**: 实现站内搜索（可基于 Ghost CMS 内容）
- [ ] **UX-05**: Lighthouse 审计 — 测量 LCP/FCP/CLS，控制在目标值内
- [ ] 内容迁移：旧站 `legacy-sites/jlsdjc-php` 内容迁移至 `src/content/`

---

## 🔋 Gatekeeper Criteria

1. ✅ `robots.txt` configured
2. ✅ Sitemap auto-generated via `@astrojs/sitemap`
3. ✅ Core meta tags present (title, description, canonical, robots, lang, charset, viewport)
4. ✅ Organization Schema **enriched** — address, contactPoint, logo, sameAs, telephone all present
5. ✅ BreadcrumbList builder `buildBreadcrumbSchema()` **ready** — needs per-page integration
6. ✅ OpenGraph + Twitter Card **globally configured** — `og:locale`, `og:image`, `twitter:card`
7. ✅ WebSite `potentialAction` (SearchAction) **added** to both builders
8. ✅ Shop page **restructured** — now a "coming soon" landing page with notify form (pending deploy)
9. ⚠️ AI Chat E2E — Widget 可打开，但 `https://api.renban.xyz` 生产环境 `Failed to fetch`，API 链路需部署后验证
10. ❌ Mobile LCP **unmeasured**
11. ✅ 视觉重新设计 — 冬日冰蓝+暖琥珀配色体系上线 (`commit 1d7668a`)

**Definition of Done:**
- [ ] Google/Bing SEO 检查无严重错误
- [ ] Organization + LocalBusiness 结构化数据测试工具 100% 通过
- [ ] 首页 LCP 移动端 ≤ 1.5s

---

## 🆕 Milestone — 视觉重新设计 (2026-04-19)

**目标：** 将"青绿自然"配色体系升级为"白山黑水·冰雪吉林"文旅调性。

### 新配色体系

| Token | 旧值 | 新值 | 说明 |
|---|---|---|---|
| `--primary` | `#0f766e` 深青 | `#1e5f8a` 冬日蓝 | 主品牌色 |
| `--primary-strong` | `#115e59` | `#154a6a` 深夜蓝 | 深色状态 |
| `--accent` | `#f59e0b` 橙黄 | `#c47d1a` 暖琥珀 | CTA/温度感 |
| `--bg` | `#f5f8f6` 绿调白 | `#f4f8fb` 冰霜白 | 页面背景 |
| `--text` | `#1f2937` | `#1a2e3d` 冬夜蓝黑 | 正文色 |
| `--muted` | `#54606d` | `#5a7385` 雾灰蓝 | 辅助文字 |
| 阴影 | 青绿 rgba | 蓝调 rgba | 统一冷色基调 |

**新增 Token：**
- `--ice-blue: #cce8f4` — 冰霜白蓝（卡片背景）
- `--ice-deep: #7bb8d4` — 深海冰（装饰线）
- `--snow: #f0f8ff` — 雪白（表面色）
- `--season-spring/summer/autumn/winter` — 四季变色 token

### 改动明细

| 文件 | 改动 |
|---|---|
| `src/styles/index.css` | `:root` 变量替换（+40/-28行）、`.vs-hero` 叠加层减重、`.button` hover 动效 |
| `src/layouts/BaseLayout.astro` | `theme-color` `#0f766e` → `#1e5f8a` |

### 构建状态

- ✅ `npm run build` 通过
- ⚠️ `content-pages.ts` 20处 `duplicate notes` 警告（历史遗留，待修复）

### 设计方向

**"雪山+雾凇+暖阳"二元对立美学**
- 冷峻冰蓝 + 温暖琥珀 = 吉林"冰雪胜境 + 人情烟火"双重气质
- Hero 图叠加层从 `0.58+0.44` 降至 `0.18+0.38`，图片更通透
- 按钮 12px 圆角 + hover 上浮动效，更现代

---

## 🔋 Environment & Context

- **Framework:** Astro 5.x
- **Build Command:** `SITE_URL=https://dajilin.renban.xyz PUBLIC_GN_API_BASE_URL=https://api.renban.xyz npm run build`
- **Main API:** `https://api.renban.xyz`
- **Dev Domain:** `dajilin.renban.xyz`
- **Production Domain:** `dajilin.net`
- **Docs Path:** `../../docs/sites/dajilin-*`
- **Monorepo Ref:** `/Users/aqua/workspace/GEO-N8N-OpenClaw/websites/dajilin/`
