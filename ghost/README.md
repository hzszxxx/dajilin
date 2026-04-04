# Ghost CMS for dajilin.net

独立的大吉林项目专用 Ghost CMS 实例。

## 快速启动

```bash
# 1. 复制环境配置文件
cp .env.ghost .env

# 2. 修改 .env 中的密码
vim .env

# 3. 启动服务
docker-compose up -d

# 4. 访问后台初始化
open http://localhost:2368/ghost
```

## 初始设置

### 1. 完成 Ghost 初始化向导

首次访问 `http://localhost:2368/ghost` 会进入初始化向导：
- 创建管理员账户
- 设置站点标题为 "dajilin CMS"
- 配置站点 URL

### 2. 创建 Content API Key

1. 进入 **Settings → Integrations**
2. 点击 **Add custom integration**
3. 名称填写：`dajilin-net`
4. 复制生成的 **Content API Key**

### 3. 更新 dajilin 项目环境变量

在 dajilin 项目的 `.env.local` 中添加：

```bash
GHOST_API_URL=http://localhost:2368
GHOST_CONTENT_API_KEY=your_copied_key_here
```

## 创建内容标签

在 Ghost 后台创建以下标签（Settings → Tags）：

| 标签名称 | Slug | 用途 |
|---------|------|------|
| 工业研学 | study-tour | 研学产品内容 |
| 目的地 | destination | 目的地介绍 |
| 331国道 | route-331 | 自驾路线内容 |
| 主题玩法 | theme | 主题旅游内容 |
| 官方服务 | official-service | 官方服务说明 |
| 攻略指南 | guide | 攻略资讯内容 |

## 目录结构

```
ghost/
├── docker-compose.yml   # Docker Compose 配置
├── .env.ghost          # 环境变量模板
├── .env                # 环境变量（需手动创建）
├── content/            # Ghost 内容目录（自动创建）
│   ├── images/         # 上传的图片
│   └── logs/           # 日志文件
└── db/                 # MySQL 数据目录（自动创建）
```

## 常用命令

```bash
# 启动
docker-compose up -d

# 查看日志
docker-compose logs -f ghost

# 重启
docker-compose restart ghost

# 停止
docker-compose down

# 完全清除（包括数据）
docker-compose down -v
```

## 连接到 dajilin 项目

在 dajilin 项目中，Ghost CMS 通过 `src/lib/ghost-cms.ts` 访问：

```typescript
import { getStudyTourPosts, isGhostConfigured } from '@/lib/ghost-cms';

if (isGhostConfigured()) {
  const posts = await getStudyTourPosts({ limit: 10 });
}
```

## 故障排查

### Ghost 无法启动

```bash
# 查看详细日志
docker-compose logs ghost
```

### 数据库连接失败

```bash
# 检查 MySQL 状态
docker-compose logs db

# 等待 MySQL 完全启动后重试
sleep 30
docker-compose restart ghost
```

### 获取 API Key

如果 API Key 不可见，可以在 Ghost 后台 **Settings → Integrations** 重新生成。

---

更多信息请参阅 [../docs/GHOST-CMS-SETUP.md](../docs/GHOST-CMS-SETUP.md)
