# 🎯 MISSION: dajilin (Astro 5)

## 📌 项目概况
- **类型**: Astro/React
- **技术栈**: Astro 5 + React 19 + Ghost CMS + Express (ai-proxy)
- **服务器**: 39.102.148.22 (SSH: renban_server)
- **状态**: 商城重构为文旅产品馆

## 🎯 商城重构方向
**定位**: 文旅产品馆 — 票务引流 + 咨询转化
**不是**: 电商平台（不在线支付）

### 三大产品区块
| 区块 | 内容 | 转化方式 |
|------|------|---------|
| 票务预约 | 景区门票/套票（长白山、延边等） | 引导咨询 → 加微信/电话 |
| 线路定制 | 一日游/多日游/定制游 | 填写需求表单 → 客服跟进 |
| 文旅年卡 | 吉林文旅一卡通/景区联票 | 咨询 + 跳转官方渠道 |

### 原有特产/文创
保留东北特产和文创产品，移至「精选好物」区块，不作为核心业务

## 🛠️ 待办事项 (P0)
- [x] [DONE] 重构 products.ts：新增票务/线路/年卡类型
- [x] [DONE] 重写 shop.astro：三大区块展示（B+A地域色系统 + Tab筛选）
- [x] [DONE] 更新 shop/[slug].astro：详情页已为咨询转化模式
- [x] [DONE] 验证所有页面 200 OK（本地构建通过）

---

## 📅 2026-04-22 · shop.astro B+A 重构完成

### 重构内容
1. **地域功能色系统** — `--pine-green`（票务）/`--lake-blue`（线路）/`--maple-red`（年卡）/`--golden`（好物）/ `--sunset-orange`（文创）
2. **Hero 区域** — 地图叙事（经纬网格背景）+ 目的地标注钉（浮动动画）+ Kenya Hara 极简排版
3. **Section Header** — 竖条 accent + 地域色区分产品类型
4. **地域 Tab 栏** — 全部/长白山/延边/长春/吉林市（客户端 JS 筛选）
5. **产品卡片** — 左边框 4px 地域色 + 地域圆点标识 + 地域信息行
6. **CTA 按钮** — 地域色填充按钮（替代原 conversionType 渐变色）
7. **辅助函数** — `getRegionLabel()` 地域 slug → 中文/英文显示名

### 问题
AI 导览悬浮窗打开后一直显示"AI 正在思考"，不返回结果，同时出现"转人工表单"（正常不应同时出现）。

### 根因
nginx 配置缺少 `/api/gn/public/ai/` 代理规则 → 请求被 fallback 到 Astro index.html 返回 HTML 而非 JSON → fetch 解析失败但无错误提示 → 前端卡在 typing 状态。

### 修复内容
**文件**: `deploy/dajilin.conf`

1. 新增 AI API 代理规则：
   ```
   location /api/gn/public/ai/ {
       proxy_pass http://127.0.0.1:4600/api/gn/public/ai/;
   }
   ```
2. 移除 `ssl_session_cache shared:SSL:10m`（与全局 jlafd.com.conf 的 50m 冲突）

**部署**: 已 scp 到服务器，`nginx -t && nginx -s reload` 通过（仅有 server name 冲突警告，可忽略）

### 待验证
- [ ] 打开 https://dajilin.net/ai-assistant/ → 点击悬浮窗 → 确认能正常对话
- [ ] 如仍异常，可能需 `pm2 reload gn-api`
