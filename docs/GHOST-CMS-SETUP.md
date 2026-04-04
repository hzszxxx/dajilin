# Ghost CMS Setup Guide (dajilin.net)

本文档说明如何为 dajilin.net 项目设置独立的 Ghost CMS 实例。

---

## 1. 环境要求

- Node.js 18+
- MySQL 8.0+ 或 MariaDB 10.4+
- 或使用 Docker（推荐）

---

## 2. 使用 Docker 启动 Ghost CMS（推荐）

### 2.1 创建 Docker Compose 配置

```yaml
# dajilin-ghost/docker-compose.yml
version: '3.8'

services:
  ghost:
    image: ghost:5-alpine
    container_name: dajilin-ghost
    restart: always
    ports:
      - '2368:2368'
    environment:
      url: http://localhost:2368
      NODE_ENV: production
      database__client: mysql
      database__connection__host: db
      database__connection__port: 3306
      database__connection__user: ghost
      database__connection__password: YOUR_PASSWORD
      database__connection__database: dajilin_ghost
    volumes:
      - ./content:/var/lib/ghost/content
    depends_on:
      - db

  db:
    image: mysql:8.0
    container_name: dajilin-ghost-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: YOUR_ROOT_PASSWORD
      MYSQL_DATABASE: dajilin_ghost
      MYSQL_USER: ghost
      MYSQL_PASSWORD: YOUR_PASSWORD
    volumes:
      - ./db:/var/lib/mysql
```

### 2.2 启动命令

```bash
# 创建目录
mkdir -p dajilin-ghost/content dajilin-ghost/db

# 启动服务
cd dajilin-ghost
docker-compose up -d

# 查看日志
docker-compose logs -f ghost
```

---

## 3. Ghost CMS 初始配置

### 3.1 访问后台

启动后访问 `http://localhost:2368/ghost` 完成初始化。

### 3.2 创建 API Key

1. 进入 **Settings → Integrations**
2. 点击 **Add custom integration**
3. 命名：`dajilin-net`
4. 复制 **Content API Key**

### 3.3 配置环境变量

```bash
# .env.local
GHOST_API_URL=http://localhost:2368
GHOST_CONTENT_API_KEY=your_content_api_key_here
GHOST_ADMIN_API_KEY=your_admin_api_key_here
GHOST_WEBHOOK_SECRET=your_webhook_secret
```

---

## 4. 内容标签配置

Ghost CMS 使用标签来组织内容类型。需要创建以下标签：

### 4.1 标签列表

| 标签名称 | 标签别名(slug) | 用途 |
|---------|---------------|------|
| 工业研学 | study-tour | 研学产品内容 |
| 目的地 | destination | 目的地介绍 |
| 331国道 | route-331 | 自驾路线内容 |
| 主题玩法 | theme | 主题旅游内容 |
| 官方服务 | official-service | 官方服务说明 |
| 攻略指南 | guide | 攻略资讯内容 |

### 4.2 创建标签

在 Ghost 后台 **Tags** 页面创建以上标签。

---

## 5. 内容结构

### 5.1 研学产品内容 (study-tour)

研学详情页对应 Ghost Posts，使用 `study-tour` 标签：

```
Title: 一汽红旗工业研学
Slug: faw-hongqi-study-tour
Tags: [study-tour]
Custom Excerpt: 一汽与红旗工业文明、品牌文化、研学价值说明
Feature Image: 研学封面图
```

### 5.2 目的地内容 (destination)

```
Title: 长白山旅游攻略
Slug: changbai-mountain-guide
Tags: [destination]
Custom Excerpt: 长白山四季玩法、门票预约、行程规划
Feature Image: 目的地封面图
```

### 5.3 攻略内容 (guide)

```
Title: 331国道吉林段自驾指南
Slug: route-331-jilin-guide
Tags: [guide, route-331]
Custom Excerpt: 331国道吉林段自驾攻略、驿站服务、补给建议
Feature Image: 公路封面图
```

---

## 6. Webhook 配置（可选）

用于在内容更新时通知 dajilin.net 重新构建页面。

### 6.1 在 Ghost 中添加 Webhook

1. 进入 **Settings → Integrations**
2. 添加 Custom Integration（如果还没有）
3. 添加 Webhook：
   - Event: `site.changed`
   - Target URL: `https://dajilin.net/api/revalidate?secret=YOUR_SECRET`

### 6.2 验证 Webhook

```bash
# 测试 webhook
curl -X POST https://dajilin.net/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "YOUR_SECRET", "type": "site.changed"}'
```

---

## 7. 开发环境连接

### 7.1 本地开发

确保 Ghost 容器正在运行：

```bash
cd dajilin-ghost
docker-compose up -d
```

### 7.2 配置 .env.local

```bash
GHOST_API_URL=http://localhost:2368
GHOST_CONTENT_API_KEY=your_key_here
```

### 7.3 验证连接

```bash
# 运行测试
cd websites/dajilin
pnpm test
```

---

## 8. 生产环境部署

### 8.1 推荐的 Ghost 托管选项

1. **自行托管** (使用 Docker)
2. **Ghost(Pro)** - 官方托管服务
3. **Railway** - 第三方托管
4. **DigitalOcean App Platform** - 一键部署

### 8.2 环境变量

生产环境需要设置：

```bash
GHOST_API_URL=https://cms.dajilin.net
GHOST_CONTENT_API_KEY=production_key
```

---

## 9. 故障排查

### 9.1 连接失败

```bash
# 检查容器状态
docker-compose ps

# 查看日志
docker-compose logs ghost

# 检查网络
curl -I http://localhost:2368
```

### 9.2 API Key 无效

1. 确认在 Ghost 后台生成了正确的 Content API Key
2. 检查 Key 是否完整（不是被截断的）
3. 确认 API Key 没有过期

### 9.3 内容不显示

1. 检查标签是否正确创建
2. 确认 posts 有正确的标签
3. 检查 filter 参数是否正确

---

## 10. 相关资源

- [Ghost 官方文档](https://ghost.org/docs/)
- [@tryghost/content-api](https://github.com/TryGhost/Ghost-CMS/tree/main/packages/content-api)
- [Ghost Docker 镜像](https://github.com/docker-library/ghost)
