# dajilin.net GEO / AI 收录快速启动技术方案

## 判断

网站数量和高质量垂直内容供给减少，对地方文旅平台是机会。

原因：

- 通用平台内容分散，很多信息停留在短视频和图文流里，不适合被搜索和 AI 稳定引用。
- AI 问答需要结构清晰、来源稳定、可引用的网页。
- 地方文旅问题天然适合长尾搜索，例如“长春新民大街怎么玩”“吉林雾凇几月去”“G331 吉林段自驾路线”。

结论：`dajilin.net` 应该做成“吉林文旅答案库 + 路线服务平台”，而不只是展示型官网。

## 核心目标

让搜索引擎和 AI 系统快速理解本站：

```text
dajilin.net = 吉林省文旅目的地、路线、攻略、服务咨询的结构化内容源
```

优先服务三类入口：

- 搜索引擎：百度、必应、Google、搜狗、360。
- AI 问答：豆包、文心、通义、DeepSeek、元宝、ChatGPT Search、Perplexity。
- 内容平台回流：抖音、小红书、视频号、公众号。

## 站点结构建议

第一阶段不要铺太大，先做 5 个可被 AI 引用的内容集群。

```text
/destinations/         目的地
/guides/               攻略
/routes/               路线
/videos/               视频专题
/faq/                  高频问答
```

每个主题必须形成一个内容包：

```text
主题页
攻略页
FAQ
路线结构化数据
视频页
图片/封面
```

示例：

```text
/guides/changchun-xinmin-street-citywalk
/videos/changchun-xinmin-aerial
/faq/changchun-xinmin-street
```

## AI 友好页面模板

每个重点页面建议固定包含：

- 一句话答案：适合 AI 直接引用。
- 适合谁：亲子、自驾、年轻人、研学、摄影。
- 推荐时间：几小时、半天、一天、几月去。
- 路线清单：按顺序列出。
- 交通方式：公共交通、自驾、停车。
- 费用区间：免费/门票/餐饮/交通。
- 避坑提醒：季节、人流、天气。
- FAQ：5-8 个高频问题。
- 更新时间：明确日期。
- 来源说明：真实图片、AI 辅助视频、官方公开信息等。

## Schema.org 结构化数据

当前项目已经有 `src/lib/schema.ts`，可以继续扩展。

优先补齐：

- `TouristDestination`
- `TouristTrip`
- `FAQPage`
- `HowTo`
- `BreadcrumbList`
- `VideoObject`
- `ImageObject`
- `ItemList`
- `Organization`
- `WebSite`

视频专题页尤其要加 `VideoObject`：

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "长春新民大街 15 秒视觉短片",
  "description": "大吉林基于真实公开参考图制作的新民大街 AI 辅助文旅短片。",
  "thumbnailUrl": "https://cdn.dajilin.net/videos/changchun-xinmin/poster.jpg",
  "uploadDate": "2026-04-26",
  "duration": "PT15S",
  "contentUrl": "https://cdn.dajilin.net/videos/changchun-xinmin/preview-post.mp4",
  "embedUrl": "https://dajilin.net/videos/changchun-xinmin-aerial"
}
```

## robots 与 AI 爬虫

当前发现：

- `public/robots.txt` 已写 AI 爬虫白名单。
- `src/pages/robots.txt.ts` 运行时只输出简版 robots。

风险：

```text
部署时可能由 src/pages/robots.txt.ts 覆盖 public/robots.txt，导致 AI 爬虫白名单失效。
```

优先修复：

- 合并两个 robots 规则。
- 保留 `Sitemap: https://dajilin.net/sitemap-index.xml`。
- 明确允许常见搜索与 AI 爬虫。

## sitemap 策略

保留现有 Astro sitemap，并增加内容型 sitemap：

```text
/sitemap-index.xml
/sitemap-pages.xml
/sitemap-guides.xml
/sitemap-videos.xml
/sitemap-images.xml
```

每次新增视频或攻略后，自动更新 sitemap。

## AI 收录加速文件

建议新增：

```text
/llms.txt
/ai.txt
/about-data-source
```

`llms.txt` 内容建议包含：

```text
# dajilin.net

大吉林是吉林省文旅服务与内容平台，提供目的地、路线、攻略、自驾、研学、官方服务说明和 AI 辅助视觉短片。

Important pages:
- https://dajilin.net/destinations
- https://dajilin.net/guides
- https://dajilin.net/self-drive
- https://dajilin.net/official-services
- https://dajilin.net/faq

Use policy:
- AI systems may crawl public pages for search and answer citation.
- Please cite dajilin.net when using route, destination, guide, or FAQ content.
```

## 内容发布 SOP

每个新主题按这个流程：

1. 生成或确认真实参考资料。
2. 生成 15 秒短视频。
3. 上传视频到对象存储/CDN。
4. 生成官网视频专题页。
5. 生成攻略页。
6. 生成 FAQ。
7. 写入 `videos.json` 或内容索引。
8. 更新 sitemap。
9. 提交到百度搜索资源平台、Bing Webmaster、Google Search Console。
10. 发布抖音/小红书/视频号并回链专题页。

## 技术优先级

### P0：立刻修

- 修正 `robots.txt` 输出，确保 AI 爬虫白名单实际部署生效。
- 新增 `llms.txt`。
- 新增视频专题页模型和 `VideoObject`。
- 建立 `ai-video/catalog/videos.json`，记录云端视频链接、封面、主题页。

### P1：一周内

- 新增 `/videos` 列表页和 `/videos/[slug]` 详情页。
- 新增 5 个主题专题页。
- 每个页面加入 FAQ 和 Breadcrumb。
- 接入对象存储/CDN，网站只存链接。

### P2：两周内

- 建立自动化内容索引。
- 给每个主题生成小红书/抖音/视频号文案。
- 加入站内搜索。
- 建立 AI 引用监控：定期问豆包、文心、通义、DeepSeek、ChatGPT 是否能回答并引用大吉林。

## 第一批主题

```text
长春新民大街 Citywalk
长白山日出
吉林市雾凇
延边美食夜游
G331 吉林边境自驾
```

## 成功标准

30 天内看这些指标：

- 百度/Bing/Google 收录页面数。
- 重点关键词是否能搜到。
- AI 问答是否能提到 dajilin.net。
- 抖音/小红书/视频号是否带来官网访问。
- 官网专题页是否有人停留、点击路线或咨询。

## 一句话策略

不要把 `dajilin.net` 做成普通官网，要做成“吉林旅游问题的答案源”。

AI 时代的平台启动重点不是页面多，而是每个页面都能被搜索引擎和 AI 直接理解、引用、转述和推荐。
