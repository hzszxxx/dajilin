# dajilin 正式域名部署清单

## 目标

- 正式域名：`dajilin.net`
- 统一 API：`https://api.dajilin.net`
- n8n Webhook：`https://n8n.dajilin.net`
- 部署方式：Astro 混合部署（静态页面 + SSR）+ Nginx + Node.js systemd 服务

## 一、部署前检查

- [ ] `dajilin.net` 已解析到目标服务器
- [ ] 本地已完成：
  - `npm install`
  - `SITE_URL=https://dajilin.net PUBLIC_GN_API_BASE_URL=https://api.dajilin.net npm run build`
- [ ] 已准备环境文件：
  - `.env.production.example`

## 二、服务器目录建议

- `/var/www/dajilin/current`
- `/var/www/dajilin/shared`
- `/var/www/dajilin/releases/<timestamp>`

要求：

- `/var/www/dajilin/current` 必须是指向某个 release 的符号链接
- 不要把 `/var/www/dajilin/current` 作为实体目录长期使用
- 切换版本时应更新 symlink，而不是把新文件覆盖进旧目录

## 三、最小环境变量

写入 `/var/www/dajilin/shared/.env`：

```env
SITE_URL=https://dajilin.net
PUBLIC_GN_API_BASE_URL=https://api.dajilin.net
PUBLIC_GN_SITE_ID=dajilin
PUBLIC_GN_AI_SESSION_ENDPOINT=
PUBLIC_GN_AI_CHAT_ENDPOINT=
PUBLIC_GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT=
PUBLIC_GN_AI_HANDOFF_ENDPOINT=
```

## 四、Nginx

- 使用：
  - `deploy/dajilin.conf`
- 根目录：
  - `/var/www/dajilin/current/dist/client`

验证域名阶段建议：

- 先启用 `dajilin.net`
- DNS 生效后直接申请 HTTPS
- 再用 `https://dajilin.net` 做公网验收

## 四.2、Systemd 服务（SSR 部分）

部分页面（如订单确认页）需要服务端渲染，需要启动 Node.js 服务：

```bash
cp deploy/dajilin.service /etc/systemd/system/dajilin.service
systemctl daemon-reload
systemctl enable dajilin
systemctl start dajilin
```

检查状态：
```bash
systemctl status dajilin
```

## 四.3、n8n Webhook 配置

- **Station 申请 Webhook**：`https://n8n.dajilin.net/webhook/station-apply`
- 在 `.env` 中设置：
  ```env
  PUBLIC_GN_N8N_STATION_APPLY_WEBHOOK_URL=https://n8n.dajilin.net/webhook/station-apply
  ```

## 五、上线验收

- [ ] `https://dajilin.net` 可访问
- [ ] `http://dajilin.net` 已 301 跳转到 HTTPS
- [ ] 首页、一级栏目页、12 个详细页可访问
- [ ] AI 浮层可打开
- [ ] AI 推荐问题能正常返回
- [ ] `api.dajilin.net/public/ai/*` 可用
- [ ] `robots.txt` 与 `sitemap.xml` 正常
- [ ] 页面源码中的 `canonical` 指向 `https://dajilin.net`
- [ ] 页面源码中的 `connect-src` 已包含 `https://api.dajilin.net`

## 六、后续切正式域名

- 当 `dajilin.net` 完成备案并切到目标服务器后：
  - 把 `SITE_URL` 改回 `https://dajilin.net`
  - 把 `deploy/dajilin.conf` 的 `server_name` 改为正式域名
  - 重新构建并申请正式 HTTPS 证书

## 七、注意事项

- 构建时必须显式传入：
  - `SITE_URL=https://dajilin.net`
  - `PUBLIC_GN_API_BASE_URL=https://api.dajilin.net`
