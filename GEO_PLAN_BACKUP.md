# 🚀 MISSION CONTROL - 阿凡达网络科技 GEO 优化

> **Warning**: 本文件由 Hermes 专家团实时维护。

## 🎯 当前最高优先级目标

**客户：吉林省阿凡达网络科技开发有限公司**
**目标：全栈 GEO 优化，含传统 SEO + 国内 AI 平台收录监控**
**时间：2026 Q2**

---

## 📋 客户基本信息

| 字段 | 值 |
|------|----|
| 公司名 | 吉林省阿凡达网络科技开发有限公司 |
| 简称 | 阿凡达网络科技 |
| 域名 | **待确认**（客户提供） |
| ICP 备案 | **待确认** |
| 技术栈 | **待确认** |
| 业务方向 | 网络科技 / 软件开发 / 系统集成（推测） |
| 目标市场 | 吉林省内 + 全国 |

---

## 🎯 KPI 基线（上线前冻结）

| 指标 | 基线 | 30天目标 | 60天目标 | 90天目标 |
|------|------|---------|---------|---------|
| 索引页数 | **待抓取** | +__DELTA__ | | |
| AI 平台收录信号 | 0（新增） | 建立基线 | | |
| 豆包收录 | **待查** | 有/无基线 | | |
| DeepSeek 收录 | **待查** | 有/无基线 | | |
| 元宝收录 | **待查** | 有/无基线 | | |
| 千问收录 | **待查** | 有/无基线 | | |
| 有效询盘 | **待确认** | | | |

---

## 🏗️ 实施方案

### 阶段 0：准入与信息收集（0.5 天）

**任务：**
- [ ] 确认客户官网域名
- [ ] 确认现有技术栈（PHP 版本 / CMS / 框架）
- [ ] 确认是否有服务器管理权限
- [ ] 确认 ICP 备案信息
- [ ] 确认核心业务方向和目标客户群体
- [ ] 冻结 KPI 基线数值

**产出：** `客户资料/avatar-jl.com.md`

---

### 阶段 1：技术体检（1-2 天）

**任务：**
- [ ] 抓取 robots.txt / sitemap / HTTP 状态码
- [ ] 检测 canonical / hreflang / Open Graph 配置
- [ ] 检测现有结构化数据（JSON-LD）
- [ ] 检测页面内容质量（标题、正文、内链）
- [ ] 扫描所有 AI 平台收录情况（豆包 / DeepSeek / 元宝 / 千问）

**AI 平台收录扫描方法：**

| 平台 | 监测方式 | 工具/接口 |
|------|---------|---------|
| **豆包**（字节跳动） | 网页端搜索 brand:__BRAND__ + site:__DOMAIN__ | 手动搜索 + n8n 定时任务记录截图 |
| **DeepSeek** | `site:__DOMAIN__` 搜索 brand 关键词 | DeepSeek 搜索结果页面抓取 |
| **元宝**（腾讯） | 微信搜一搜 + 元宝 brand 搜索 | 微信公众号文章收录监测 |
| **千问**（阿里） | brand 搜索 + site:__DOMAIN__ | 通义千问搜索结果记录 |
| **文心一言**（百度） | 已有 GN-Radar 对接 | `GN_RADAR_DEFAULT_INDUSTRY` 配置 |

**产出：** `GEO_TECHNICAL_AUDIT_REPORT.md`

---

### 阶段 2：信息架构改造（2-3 天）

**必建页面（参照 geo-template-pack SOP）：**

| 页面 | 路径 | Schema 类型 | 说明 |
|------|------|------------|------|
| 事实基准页 | `/company/facts` | Organization | 企业核心数据、团队、技术栈 |
| 合作伙伴 FAQ | `/company/faq` | FAQPage | 交付流程、报价、合同条款 |
| 服务落地页 | `/solutions/[slug]` | Service | 每项服务单独一页 |
| 关于我们 | `/about` | Organization | 公司介绍 |
| GEO 改造服务 | `/solutions/legacy-geo` | Service | 面向同类客户的 GEO 服务介绍 |

**内容格式标准：**
```
问题 → 结论 → 证据 → 边界 → CTA
```

---

### 阶段 3：结构化数据注入（1-2 天）

**最低必配 Schema（全部页面）：**

| Schema | 用途 |
|--------|------|
| `Organization` | 公司实体，含 name/address/telephone/areaServed |
| `Service` | 每项服务，含 description/areaServed/provider |
| `FAQPage` | FAQ 页面 Q&A |
| `BreadcrumbList` | 全站面包屑 |
| `WebPage` | 每个页面基础 meta |

**额外配置（针对网络科技公司）：**

```json
{
  "@type": "Organization",
  "name": "吉林省阿凡达网络科技开发有限公司",
  "alternateName": "阿凡达网络科技",
  "areaServed": ["吉林省", "全国"],
  "serviceType": ["软件开发", "网站搭建", "系统集成", "GEO优化"]
}
```

---

### 阶段 4：AI 平台收录监控体系（1-2 天）

**核心目标：** 建立对国内主流 AI 平台的收录监控，量化品牌在 AI 搜索结果中的可见度。

#### 4.1 AI 平台收录监测矩阵

| 平台 | 监测关键词策略 | 监测频率 | 记录内容 |
|------|-------------|---------|---------|
| **豆包** | brand + 主要业务词 | 每周 | 排名、上下文摘要、URL |
| **DeepSeek** | brand + "site:domain" | 每周 | 排名、引用片段、是否在正文 |
| **元宝** | brand + 主要业务词 | 每周 | 来源（微信/自内容）、摘要 |
| **千问** | brand + 主要业务词 | 每周 | 排名、引用内容块 |
| **文心一言** | 已接入 GN-Radar | 随 Radar | GN-Radar AI Search Score |

#### 4.2 n8n 工作流实现

**新建工作流：`ai-platform-indexing-monitor.json`**

```
触发器（每周一早9点）
    ↓
并行走开5路查询：
    ├─ 豆包搜索（Playwright/curl → 搜索结果页解析）
    ├─ DeepSeek 搜索（site:domain brand词）
    ├─ 元宝/腾讯搜索（微信搜一搜 + 元宝独立搜索）
    ├─ 千问/通义搜索
    └─ GN-Radar AI Search Score（已有接口）
    ↓
汇总评分：
    - 收录率 = 收录平台数 / 5
    - 各平台排名分（Top3=3, Top10=1, >10=0）
    - 综合 AI 可见度得分
    ↓
生成报告：
    - 写入 AI_INDEXING_REPORT.md
    - 推送通知（如有重大下滑）
    ↓
更新 KPI 基线表
```

#### 4.3 AI 平台收录报告格式

```json
{
  "report_date": "2026-04-16",
  "domain": "__DOMAIN__",
  "platforms": {
    "doubao": {
      "indexed": true,
      "rank": 3,
      "context": "在关于公司介绍段落中作为来源引用",
      "url": "https://..."
    },
    "deepseek": {
      "indexed": true,
      "rank": 1,
      "context": "被引用为软件开发服务商",
      "url": "https://..."
    },
    "yuanbao": {
      "indexed": false,
      "rank": null,
      "context": "未收录"
    },
    "qianwen": {
      "indexed": true,
      "rank": 5,
      "context": "在解决方案列表中出现",
      "url": "https://..."
    },
    "wenxinyiyin": {
      "indexed": true,
      "score": 72,
      "last_updated": "2026-04-14"
    }
  },
  "composite_score": 68,
  "delta_vs_last_week": "+5"
}
```

---

### 阶段 5：接入 GN-Radar（1 天）

**参照 `websites/yuyiruanjian/GN_RADAR_INTEGRATION.md`：**

- [ ] 创建 `websites/avatar-jl.com/` 站点目录
- [ ] 配置环境变量：
  ```
  GN_RADAR_BASE_URL=https://radar.renban.net
  GN_RADAR_SERVICE_TOKEN=***
  GN_SITE_ID=avatar-jl
  GN_RADAR_DEFAULT_REGION=CN-JL
  GN_RADAR_DEFAULT_INDUSTRY=technology
  GN_AI_INDEXING_MONITOR=true
  ```
- [ ] 接入 `/api/radar/*` 代理接口
- [ ] 触发 `POST /api/workflows/site-assessment` 做初始评估

---

### 阶段 6：上线与验收（0.5-1 天）

- [ ] 构建通过
- [ ] 核心 URL 200 状态
- [ ] canonical / hreflang 正确
- [ ] 所有 Schema JSON-LD 在线验证通过
- [ ] 执行 `smoke:radar` 测试
- [ ] 执行首次 AI 平台收录扫描，建立基线

---

## 📊 交付物清单

| 交付物 | 文件名 |
|--------|--------|
| 客户信息 | `客户资料/avatar-jl.com.md` |
| 技术体检报告 | `GEO_TECHNICAL_AUDIT_REPORT.md` |
| 执行计划 | `GEO_EXECUTION_PLAN.md` |
| 页面草稿 | `PAGE_DRAFTS.md` |
| 结构化数据草稿 | `SCHEMA_DRAFTS.md` |
| **AI 平台收录监控报告** | `AI_INDEXING_MONITOR.md` |
| **n8n AI 监控工作流** | `workflows/n8n/ai-platform-indexing-monitor.json` |
| 验收清单 | `ACCEPTANCE_CHECKLIST.md` |
| 30 天复盘报告 | `30DAY_REVIEW.md` |

---

## 🧠 核心发现与架构共识

- 国内 AI 平台（豆包/DeepSeek/元宝/千问）暂无官方 API，GEO 监控需通过 n8n 定时抓取搜索结果页实现
- AI 平台收录应纳入 KPI 体系，与传统 SEO 索引率并行追踪
- 该客户为科技公司，具备自研或使用开源 CMS 能力，技术改造难度可能高于传统行业案例

---

## 🚧 阻碍与待办 (Blockers)

- [ ] **P0**: 客户未提供域名和技术栈信息
- [ ] **P0**: 客户未确认 ICP 备案情况
- [ ] **P1**: AI 平台抓取方案（豆包/元宝有反爬，需确认技术路径）

---

*Last updated by Hermes at: 2026-04-19*

---

## 📝 2026-04-19 项目启动验证 - 完成的 P0 修复

### 已完成的 P0 项目基础设施修复

| # | 行动 | 状态 | 日期 |
|---|------|------|------|
| P0-1 | 修复 dajilin/.gitignore，排除 ghost/db/ | ✅ | 2026-04-19 |
| P0-2 | 升级 jdxr 工具链（eslint/vitest 等） | ✅ | 2026-04-19 |
| P0-3 | 4 个归档站点添加 DEPRECATED.md | ✅ | 2026-04-19 |
| P0-4 | 创建 logo.svg 和更新 favicon | ✅ | 2026-04-19 |
| P0-5 | 统一 Header/Footer 品牌色彩（yuyiruanjian + jlafd.com） | ✅ | 2026-04-19 |

### 仍需业务确认的 P0 Blocker

| # | Blocker | 状态 | 备注 |
|---|---------|------|------|
| P0-6 | 客户域名和技术栈信息 | ⏳ 待客户确认 | 吉林阿凡达网络科技 |
| P0-7 | ICP 备案情况 | ⏳ 待客户确认 | 吉林阿凡达网络科技 |
