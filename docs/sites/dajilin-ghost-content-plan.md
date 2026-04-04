# Ghost CMS Content Plan for dajilin.net

> Document Version: 1.0.0
> Created: 2026-04-04
> Status: Initial Content Structure

## Overview

This document outlines the Ghost CMS content structure for dajilin.net project. Ghost CMS is used as a headless CMS to manage dynamic content like study tours, guides, and destination information, while the Astro site handles rendering and display.

## Current Setup

### Ghost Instance
- **URL**: http://localhost:2368 (local development)
- **Image**: ghost:5-alpine
- **Database**: MySQL 8.0 (dajilin_ghost)
- **Status**: Running and accessible

### Content API Integration
- **API Version**: v5.0
- **Client**: @tryghost/content-api
- **Key Environment Variables**:
  - `GHOST_API_URL`: http://localhost:2368
  - `GHOST_CONTENT_API_KEY`: [To be configured]

---

## Content Types

### Tag-Based Content Organization

Ghost CMS uses **tags** to categorize content types. All posts should be tagged appropriately:

| Tag Name | Slug | Purpose | Content Examples |
|----------|------|---------|------------------|
| 工业研学 | `study-tour` | Industrial study tour content | FAW Hongqi, CRRC Changchun visits |
| 目的地 | `destination` | Destination information | Changbai Mountain, Yanbian guides |
| 331国道 | `route-331` | G331 highway route content | Route guides, station info |
| 主题玩法 | `theme` | Themed experiences | Ice & Snow, Border Culture |
| 官方服务 | `official-service` | Official service explanations | Ticket booking, Yi Ji You Jilin |
| 攻略指南 | `guide` | Travel guides and tips | How-to articles, seasonal tips |

---

## Content Structure by Section

### 1. Study Tours (study-tour)

**Purpose**: Industrial study tour content for schools, institutions, and corporate visits.

**Ghost Post Structure**:
```
Title: [Product Name]
Slug: [url-friendly-slug]
Tags: [study-tour]
Excerpt: Brief description for listings
Feature Image: Cover image
```

**Sample Content**:

#### Post 1: 一汽红旗工业研学
- **Title**: 一汽红旗工业研学 - 品牌文化与工业文明体验
- **Slug**: faw-hongqi-study-tour
- **Tags**: study-tour
- **Excerpt**: 深入了解中国汽车工业发展历程，红旗品牌文化，体验现代化生产线
- **Content Sections**:
  - 研学看什么 (What to see)
  - 适合人群 (Target audience)
  - 建议时长与安排 (Suggested duration)
  - 注意事项 (Notes)
  - 常见问题 (FAQs)

#### Post 2: 中车长客企业参访
- **Title**: 中车长客企业参访 - 先进制造与行业认知
- **Slug**: crrc-changchun-visit
- **Tags**: study-tour
- **Excerpt**: 探索中国高铁制造奥秘，了解轨道交通行业发展
- **Content Sections**:
  - 参访价值 (Visit value)
  - 适合对象 (Suitable for)
  - 定制说明 (Customization notes)
  - 预约咨询 (Booking info)

#### Post 3: 长春工业文明线路
- **Title**: 长春工业文明线路 - 城市与工业的对话
- **Slug**: changchun-industrial-route
- **Tags**: study-tour
- **Excerpt**: 串联一汽、红旗、中车长客的工业文明探索之旅
- **Content Sections**:
  - 线路介绍 (Route intro)
  - 资源组合 (Resource combinations)
  - 适合对象 (Target audience)
  - 咨询方式 (Consultation methods)

---

### 2. Destinations (destination)

**Purpose**: Destination guides and information pages.

**Sample Content**:

#### Post 1: 长白山旅游指南
- **Title**: 长白山四季玩法 - 目的地完整指南
- **Slug**: changbai-mountain-guide
- **Tags**: destination
- **Excerpt**: 长白山四季景观差异、门票预约、行程规划完整指南
- **Content Sections**:
  - 为什么去长白山 (Why visit)
  - 四季玩法差异 (Seasonal differences)
  - 官方服务与预约 (Official services)
  - 行程建议 (Trip suggestions)
  - 交通指南 (Transportation)

#### Post 2: 延边边境文化体验
- **Title**: 延边目的地 - 边境文化与美食探索
- **Slug**: yanbian-border-culture
- **Tags**: destination
- **Excerpt**: 延边地区边境文化、朝鲜族美食、多日线路体验
- **Content Sections**:
  - 延边核心体验 (Core experiences)
  - 边境线路 (Border routes)
  - 美食推荐 (Food recommendations)
  - 适合人群 (Target audience)

#### Post 3: 长春城市文旅
- **Title**: 长春城市导览 - 城市文旅入口
- **Slug**: changchun-city-guide
- **Tags**: destination
- **Excerpt**: 长春城市文旅、生活体验与工业文明结合
- **Content Sections**:
  - 城市看点 (City highlights)
  - 工业文明 (Industrial heritage)
  - 城市+研学组合 (City + study combos)

---

### 3. Route 331 (route-331)

**Purpose**: G331 Highway content including route guides, station services, supplies.

**Sample Content**:

#### Post 1: 331国道吉林段概览
- **Title**: 331国道吉林段 - 线路资源总览
- **Slug**: g331-jilin-overview
- **Tags**: route-331
- **Excerpt**: 331国道吉林段自驾资源、路线逻辑、季节建议
- **Content Sections**:
  - 331是什么 (What is G331)
  - 推荐浏览路径 (Suggested reading path)
  - 季节建议 (Seasonal tips)
  - 相关资源 (Related resources)

#### Post 2: 331驿站服务说明
- **Title**: 331驿站服务 - 服务节点说明
- **Slug**: g331-station-services
- **Tags**: route-331
- **Excerpt**: 驿站能提供的服务、常见停留场景、合作说明
- **Content Sections**:
  - 驿站服务类型 (Service types)
  - 停留场景 (Stop scenarios)
  - 合作接入 (Partnership info)

#### Post 3: 331自驾补给指南
- **Title**: 331自驾补给 - 出发准备与沿线补给
- **Slug**: g331-self-drive-supplies
- **Tags**: route-331
- **Excerpt**: 自驾出发准备、沿线补给选择、团队注意事项
- **Content Sections**:
  - 出发前准备 (Pre-trip preparation)
  - 沿线补给 (Route supplies)
  - 团队注意 (Group travel notes)

---

### 4. Themes (theme)

**Purpose**: Themed experience content organizing multiple destinations/resources.

**Sample Content**:

#### Post 1: 冰雪吉林主题
- **Title**: 冰雪吉林 - 冬季主题玩法
- **Slug**: ice-snow-jilin
- **Tags**: theme
- **Excerpt**: 吉林冬季冰雪体验、长白山滑雪、冰雪路线
- **Content Sections**:
  - 冰雪主题价值 (Theme value)
  - 推荐目的地组合 (Recommended destinations)
  - 季节说明 (Season info)

#### Post 2: 边境与延边主题
- **Title**: 边境延边主题 - 区域文化体验
- **Slug**: border-yanbian-theme
- **Tags**: theme
- **Excerpt**: 延边边境文化、美食、自驾体验主题
- **Content Sections**:
  - 主题独特性 (Theme uniqueness)
  - 内容组合 (Content combinations)

#### Post 3: 工业文明主题
- **Title**: 工业文明主题 - 长春特色专题
- **Slug**: industrial-civilization-theme
- **Tags**: theme
- **Excerpt**: 长春工业文明、研学资源、品牌文化专题
- **Content Sections**:
  - 主题价值 (Theme value)
  - 资源组合 (Resource combinations)

---

### 5. Guides (guide)

**Purpose**: How-to guides, tips, and informational content.

**Sample Content**:

#### Post 1: 长春工业研学内容线
- **Title**: 长春工业研学内容线 - 专题组织说明
- **Slug**: changchun-study-tour-content-line
- **Tags**: guide
- **Excerpt**: 如何围绕长春工业研学持续组织专题与攻略
- **Content Sections**:
  - 内容线结构 (Content structure)
  - 更新方向 (Update direction)

#### Post 2: 331自驾玩法内容线
- **Title**: 331自驾玩法内容线 - 路线专题组织
- **Slug**: g331-content-line
- **Tags**: guide
- **Excerpt**: 331路线、驿站、补给内容组织方式
- **Content Sections**:
  - 内容线组成 (Content line components)
  - 更新方向 (Update direction)

---

### 6. Official Services (official-service)

**Purpose**: Official service explanations and入口 guides.

**Sample Content**:

#### Post 1: 吉林官方文旅入口说明
- **Title**: 官方服务说明 - 票务预约与一机游吉林
- **Slug**: jilin-official-services
- **Tags**: official-service
- **Excerpt**: 官方入口说明、票务预约、一机游吉林使用指南
- **Content Sections**:
  - 官方入口说明 (Official entry explanation)
  - 预约流程 (Booking process)
  - 注意事项 (Notes)

---

## CMS vs Hardcoded Content

### What Stays in Ghost CMS (Dynamic)

| Content Type | Reason to Use CMS |
|--------------|-------------------|
| Study tour detailed descriptions | Frequent updates, seasonal variations |
| Destination guides | Content team manages, SEO important |
| Route 331 updates | Timely information,驿站 changes |
| Seasonal themes | Regular updates needed |
| News/Announcements | Dynamic publishing workflow |
| FAQ content | Easy A/B testing, quick updates |

### What Stays Hardcoded (Static)

| Content Type | Reason for Hardcode |
|--------------|---------------------|
| Page structure/layout | Core UX, rarely changes |
| Navigation/menus | Site architecture |
| Schema markup | SEO consistency |
| i18n keys | Localization structure |
| Component logic | Shared across pages |
| Basic page content (hero, CTAs) | Design consistency |

---

## Using Ghost Admin API

### Authentication

Ghost Admin API requires an Admin API Key. Generate one at:
**Settings → Integrations → Add custom integration**

### API Endpoints

#### Create Post
```bash
curl -X POST "http://localhost:2368/ghost/api/admin/posts/" \
  -H "Authorization: Ghost xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "posts": [{
      "title": "Post Title",
      "slug": "url-slug",
      "html": "<p>Post content in HTML</p>",
      "excerpt": "Brief excerpt",
      "tags": [{"name": "study-tour"}],
      "feature_image": "https://example.com/image.jpg"
    }]
  }'
```

#### Create Tag
```bash
curl -X POST "http://localhost:2368/ghost/api/admin/tags/" \
  -H "Authorization: Ghost xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "tags": [{
      "name": "Study Tour",
      "slug": "study-tour",
      "description": "Industrial study tour content"
    }]
  }'
```

#### Get Posts
```bash
curl "http://localhost:2368/ghost/api/admin/posts/" \
  -H "Authorization: Ghost xxx"
```

### Ghost Content API (Public)

For public content access:
```bash
curl "http://localhost:2368/ghost/api/content/posts/?key=YOUR_CONTENT_API_KEY"
```

---

## Content Initialization Steps

### Step 1: Create Tags

Create these tags in Ghost Admin (Settings → Tags):

1. **工业研学** (slug: `study-tour`)
2. **目的地** (slug: `destination`)
3. **331国道** (slug: `route-331`)
4. **主题玩法** (slug: `theme`)
5. **官方服务** (slug: `official-service`)
6. **攻略指南** (slug: `guide`)

### Step 2: Create Content API Key

1. Go to Settings → Integrations
2. Click "Add custom integration"
3. Name: `dajilin-net`
4. Copy the **Content API Key**

### Step 3: Configure Environment Variables

Add to `/websites/dajilin/.env.local`:
```bash
GHOST_API_URL=http://localhost:2368
GHOST_CONTENT_API_KEY=your_content_api_key_here
```

### Step 4: Create Sample Posts

Follow the sample content structure above to create initial posts.

### Step 5: Verify Integration

Test with the ghost-cms.ts client:
```typescript
import { getStudyTourPosts, isGhostConfigured } from '@/lib/ghost-cms';

if (isGhostConfigured()) {
  const posts = await getStudyTourPosts({ limit: 10 });
  console.log(posts);
}
```

---

## Current Site Content vs CMS Content

The dajilin site currently has **hardcoded content** in `/src/lib/content-pages.ts`. This includes:

- 3 destination pages (changchun, changbai-mountain, yanbian)
- 4 study tour pages (changchun-industrial, faw-hongqi, crrc-changchun, changchun-industrial-route)
- 4 route-331 pages (overview, how-to-travel, station-services, supplies-and-stays)
- 4 theme pages (ice-snow, industrial-civilization, border-and-yanbian, roadtrip-331)
- 4 guide pages (various content lines)
- 3 shop pages
- 1 official-services page

**Migration Strategy**:
1. Keep hardcoded content-pages.ts as-is for now
2. Use Ghost CMS for NEW dynamic content (seasonal updates, news, additional guides)
3. Eventually migrate some hardcoded content to CMS when content team is ready to manage

---

## File Structure Reference

```
websites/dajilin/
├── ghost/
│   ├── README.md              # Ghost setup guide
│   ├── docker-compose.yml     # Docker configuration
│   ├── .env.ghost            # Environment template
│   └── content/               # Ghost content directory
│       ├── images/           # Uploaded images
│       ├── settings/         # Site settings
│       └── themes/           # Ghost themes
├── src/
│   └── lib/
│       └── ghost-cms.ts      # Ghost API client
└── docs/
    └── sites/
        └── dajilin-ghost-content-plan.md  # This document
```

---

## Next Steps

1. [ ] Create Ghost Admin account at http://localhost:2368/ghost
2. [ ] Generate Content API Key
3. [ ] Configure .env.local with API key
4. [ ] Create required tags in Ghost Admin
5. [ ] Create sample posts for each content type
6. [ ] Verify API connectivity from Astro site
7. [ ] Update content-pages.ts migration plan

---

## Related Documentation

- [Ghost CMS Setup Guide](/docs/GHOST-CMS-SETUP.md)
- [AI Assistant V1 Spec](/docs/sites/dajilin-ai-assistant-v1.md)
- [Stations Cooperation Plan](/docs/sites/dajilin-stations-cooperation-plan.md)
- [Ghost CMS Integration](https://ghost.org/docs/)
- [@tryghost/content-api](https://github.com/TryGhost/Ghost-CMS/tree/main/packages/content-api)
