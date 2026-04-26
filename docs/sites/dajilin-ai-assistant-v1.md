# 大吉林 AI 导览助手 - Phase 2 规格说明

> 版本: 1.0.0
> 更新日期: 2026-04-04
> 状态: Phase 2 Implementation Complete

## 概述

大吉林 AI 导览助手是为 dajilin.net 网站开发的多语言智能客服系统，基于 GEO-N8N-OpenClaw 架构设计。Phase 2 在 Phase 1 基础上增加了实时 AI 对话、对话历史管理、相关问题推荐和增强的人工转接功能。

## 架构

```
用户界面 (AIWidget.astro)
    ↓
n8n Webhooks (AI Session/Chat/Handoff)
    ↓
OpenClaw AI Agent (自然语言理解 + 技能调用)
    ↓
知识域配置 (ai-questions.ts)
```

## 核心功能

### Phase 1 功能 (基础)

- [x] 多语言支持 (zh/en/ja/ko)
- [x] 模块化知识域配置
- [x] 推荐问题快速入口
- [x] 人工转接表单
- [x] 响应式设计

### Phase 2 功能 (增强)

- [x] **实时 AI 对话** - 通过 n8n webhook 与 OpenClaw AI Agent 通信
- [x] **会话管理** - 自动创建/恢复会话，支持 localStorage 持久化
- [x] **对话历史** - 显示完整的对话记录，包含时间戳
- [x] **打字指示器** - AI 思考时显示动画指示
- [x] **相关问题推荐** - 根据上下文智能推荐后续问题
- [x] **增强转接机制** - 结构化转接请求，支持多种转接类型
- [x] **清空对话** - 用户可手动清除对话历史
- [x] **会话恢复** - 刷新页面后自动恢复之前的对话

## 知识域配置

### 五个核心知识域

| ID | 名称 | 模块 Key | 覆盖范围 |
|----|------|---------|---------|
| `destinations` | 吉林文旅导览 | `destinations` | 目的地导览、季节建议、行程规划 |
| `study-tours` | 工业研学咨询 | `industrial_study_tours` | 一汽红旗、中车长客、长春工业文明线路 |
| `route-331` | 331路线咨询 | `route_331` | 331国道吉林段、驿站服务、自驾补给 |
| `official-services` | 官方服务入口 | `official_services` | 票务预约、一机游吉林等官方服务 |
| `cooperation` | 合作咨询引导 | `cooperation` | 研学合作、驿站合作、团体定制 |

### 知识域结构

每个知识域包含三类问题定义：

```typescript
interface KnowledgeDomain {
  id: QuestionCategory;
  answerable: string[];      // AI 可自信回答的问题
  handoffTriggers: string[]; // 应触发人工转接的问题
  outOfScope: string[];      // AI 不应回答的问题
}
```

## API 端点

### n8n Webhook 端点

| 端点 | 方法 | 用途 |
|------|------|------|
| `GN_AI_SESSION_ENDPOINT` | POST | 创建/恢复 AI 会话 |
| `GN_AI_CHAT_ENDPOINT` | POST | 发送消息并获取 AI 回复 |
| `GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT` | GET | 获取推荐问题列表 |
| `GN_AI_HANDOFF_ENDPOINT` | POST | 提交人工转接请求 |

### 请求/响应格式

#### 创建会话

```json
// POST /public/ai/session
{
  "site_id": "dajilin",
  "page_url": "/destinations/changbai",
  "source": "web",
  "context": {
    "module": "destinations",
    "locale": "zh"
  }
}

// Response
{
  "success": true,
  "data": {
    "session_id": "sess_abc123",
    "welcome_message": "你好，我可以帮你了解..."
  }
}
```

#### 发送消息

```json
// POST /public/ai/chat
{
  "site_id": "dajilin",
  "session_id": "sess_abc123",
  "page_url": "/destinations/changbai",
  "message": "长白山适合几天？",
  "context": {
    "module": "destinations",
    "locale": "zh"
  }
}

// Response
{
  "success": true,
  "data": {
    "answer": {
      "content": "长白山一般建议安排2-3天...",
      "summary": "长白山行程建议",
      "detail": "第一天可以游览北坡...",
      "handoff_suggested": false,
      "suggested_follow_ups": [
        "冬季去长白山怎么玩？",
        "长白山门票怎么预约？"
      ],
      "next_actions": [
        {
          "type": "suggested_question",
          "label": "冬季去长白山怎么玩？"
        }
      ]
    }
  }
}
```

#### 提交转接

```json
// POST /public/ai/handoff
{
  "site_id": "dajilin",
  "session_id": "sess_abc123",
  "handoff_type": "consultation",
  "contact": {
    "name": "张三",
    "phone_or_wechat": "13800138000",
    "organization": "某学校"
  },
  "message": "我们学校想组织一次研学活动..."
}

// Response
{
  "success": true
}
```

## 文件结构

```
websites/dajilin/
├── src/
│   ├── components/
│   │   ├── astro/
│   │   │   └── AIWidget.astro      # AI 组件 (Phase 1 + 2)
│   │   └── react/
│   │       └── AIChat.tsx          # React 版本 AI 聊天 (Phase 2)
│   ├── lib/
│   │   ├── ai-questions.ts         # 知识域配置
│   │   ├── ai-context.ts           # 上下文推断
│   │   ├── ai-chat-client.ts       # OpenClaw AI 客户端 (Phase 2)
│   │   └── gn-public.ts            # n8n 端点配置
│   └── pages/
│       └── ai-assistant.astro      # AI 助手介绍页面
├── docs/
│   └── sites/
│       └── dajilin-ai-assistant-v1.md  # 本文档
└── styles/
    └── index.css                    # 包含 AI 组件样式
```

## 组件 Props

### AIWidget.astro

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `siteId` | string | `'dajilin'` | 网站标识 |
| `pageUrl` | string | `window.location.pathname` | 当前页面 URL |
| `module` | string | `''` | 知识域模块 |
| `title` | string | `'吉林文旅 AI 导览助手'` | 组件标题 |

### AIChat.tsx (React)

| Prop | 类型 | 说明 |
|------|------|------|
| `siteId` | string | 网站标识 |
| `pageUrl` | string | 当前页面 URL |
| `module` | string | 知识域模块 |
| `locale` | string | 当前语言 |
| `endpoints` | object | n8n webhook 端点 |
| `*Placeholder` | string | 各种占位符文本 |
| `*Label` | string | 各种按钮/标题文本 |

## 环境变量

```bash
# n8n Webhook 端点
GN_AI_SESSION_ENDPOINT=https://n8n.dajilin.net/public/ai/session
GN_AI_CHAT_ENDPOINT=https://n8n.dajilin.net/public/ai/chat
GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT=https://n8n.dajilin.net/public/ai/recommended-questions
GN_AI_HANDOFF_ENDPOINT=https://n8n.dajilin.net/public/ai/handoff

# GN API 配置
PUBLIC_GN_API_BASE_URL=https://api.dajilin.net
```

## 后续规划

### Phase 3 计划

- [ ] 语音输入支持
- [ ] 图片上传支持
- [ ] 会话评分反馈
- [ ] 管理员对话监控面板
- [ ] 多轮对话上下文优化

### 潜在优化

- [ ] OpenClaw 直接集成 (绕过 n8n)
- [ ] 会话持久化到数据库
- [ ] 实时 WebSocket 通信
- [ ] AI 回答质量评估

## 错误处理

| 错误场景 | 用户提示 | 后续操作 |
|---------|---------|---------|
| 网络错误 | "当前无法回答这个问题" | 显示转接按钮 |
| 会话创建失败 | 静默重试 3 次 | 提示刷新页面 |
| 消息发送失败 | "暂时提交失败" | 保留输入内容供重试 |
| 转接提交失败 | "请稍后再试" | 提供合作咨询页链接 |

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 相关文档

- [GN 责任矩阵](../../docs/GNO-RESPONSIBILITY-MATRIX.md)
- [n8n 集成规格](../../docs/n8n-integration-spec.md)
- [OpenClaw 客户端](../../shared/gn-openclaw-client/README.md)
- [技能契约](../../shared/gn-skill-contract/index.ts)
