# dajilin Phase 4 Production Deployment Checklist

**Site:** dajilin.net
**Site ID:** dajilin
**Industry:** tourism
**Region:** CN (Jilin Province)
**Document Version:** 1.0
**Date:** 2026-04-04

---

## Table of Contents

1. [Deployment Overview](#1-deployment-overview)
2. [Pre-Deployment Checks](#2-pre-deployment-checks)
3. [Deployment Steps](#3-deployment-steps)
4. [Post-Deployment Verification](#4-post-deployment-verification)
5. [Rollback Procedure](#5-rollback-procedure)
6. [Production Environment Details](#6-production-environment-details)
7. [Monitoring & Backup](#7-monitoring--backup)

---

## 1. Deployment Overview

### 1.1 Architecture Summary

```
dajilin.site → GN Gateway (API) → GN-Radar (External GEO Engine)
                    ↓
                  n8n (Automation Layer)
                    ↓
              OpenClaw (AI Agent)
```

### 1.2 Deployment Mode

- **Astro Hybrid Mode**: Static pages + SSR via Node.js adapter
- **Static Output**: `dist/client/` - served by Nginx
- **SSR Server**: `dist/server/` - runs as systemd service

### 1.3 Critical URLs

| Service | URL |
|---------|-----|
| Production Site | https://dajilin.net |
| GN Gateway API | https://api.dajilin.net |
| n8n Webhooks | https://n8n.dajilin.net |
| Ghost CMS | http://localhost:2368 (local dev) |

### 1.4 Server Directory Structure

```
/var/www/dajilin/
├── current/          # Symlink to latest release
├── shared/           # Shared files (env, uploads)
│   └── .env          # Environment variables
├── releases/         # Timestamped releases
│   └── <timestamp>/
│       ├── dist/
│       └── package.json
└── backups/          # Database and file backups
```

---

## 2. Pre-Deployment Checks

### 2.1 Build Verification

- [ ] **Run production build:**
  ```bash
  cd /Users/aqua/workspace/GEO-N8N-OpenClaw/websites/dajilin
  npm install
  SITE_URL=https://dajilin.net PUBLIC_GN_API_BASE_URL=https://api.dajilin.net npm run build
  ```

- [ ] **Verify build output in `dist/`:**
  ```
  dist/
  ├── client/                    # Static files (Nginx)
  │   ├── index.html
  │   ├── sitemap-0.xml
  │   ├── robots.txt
  │   ├── _astro/               # Assets (cached 1 year)
  │   ├── stations/
  │   ├── checkout/
  │   ├── shop/
  │   ├── route-331/
  │   ├── ai-assistant/
  │   ├── destinations/
  │   ├── study-tours/
  │   ├── themes/
  │   ├── guides/
  │   ├── en/                   # English pages
  │   ├── ja/                   # Japanese pages
  │   └── ko/                   # Korean pages
  └── server/                    # SSR entry point
      ├── entry.mjs             # Node.js SSR server
      └── pages/                # SSR page handlers
  ```

- [ ] **Verify critical pages exist:**
  - [ ] `dist/client/index.html`
  - [ ] `dist/client/stations/index.html`
  - [ ] `dist/client/stations/cooperation/index.html`
  - [ ] `dist/client/checkout/index.html`
  - [ ] `dist/client/shop/index.html`
  - [ ] `dist/client/route-331/index.html`
  - [ ] `dist/client/ai-assistant/index.html`
  - [ ] `dist/client/sitemap-0.xml`
  - [ ] `dist/client/robots.txt`

### 2.2 Environment Variables Checklist

Required environment variables for production (`/var/www/dajilin/shared/.env`):

```env
# Site Configuration
SITE_URL=https://dajilin.net
PUBLIC_GN_API_BASE_URL=https://api.dajilin.net
PUBLIC_GN_SITE_ID=dajilin

# AI Assistant (if configured)
PUBLIC_GN_AI_SESSION_ENDPOINT=
PUBLIC_GN_AI_CHAT_ENDPOINT=
PUBLIC_GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT=
PUBLIC_GN_AI_HANDOFF_ENDPOINT=

# Ghost CMS
GHOST_API_URL=http://localhost:2368
GHOST_CONTENT_API_KEY=<from-ghost-admin>
GHOST_ADMIN_API_KEY=<from-ghost-admin>
GHOST_WEBHOOK_SECRET=<generated>

# n8n Webhooks (dajilin-specific)
PUBLIC_GN_N8N_STATION_APPLY_WEBHOOK_URL=https://n8n.dajilin.net/webhook/dajilin-station-application
PUBLIC_GN_N8N_ORDER_PROCESSING_WEBHOOK_URL=https://n8n.dajilin.net/webhook/dajilin-order-processing
PUBLIC_GN_N8N_AI_HANDOFF_WEBHOOK_URL=https://n8n.dajilin.net/webhook/dajilin-ai-handoff

# Shared Radar Workflows
GN_N8N_MONITOR_TRIGGER_URL=https://n8n.dajilin.net/webhook/radar-monitor-trigger
GN_N8N_BOOKING_SUBMIT_URL=https://n8n.dajilin.net/webhook/booking-submit
GN_N8N_SITE_ASSESSMENT_URL=https://n8n.dajilin.net/webhook/radar-site-assessment
GN_N8N_SITE_ONBOARDING_URL=https://n8n.dajilin.net/webhook/radar-site-onboarding
GN_N8N_FAILURE_NOTIFY_URL=https://n8n.dajilin.net/webhook/radar-failure-notify
GN_N8N_DAILY_SUMMARY_URL=https://n8n.dajilin.net/webhook/radar-daily-summary
```

### 2.3 n8n Workflow Status Verification

Verify these workflows are active in n8n:

| Workflow | Webhook Path | Purpose | Status |
|----------|--------------|---------|--------|
| dajilin-station-application | `/webhook/dajilin-station-application` | Route 331 partnership applications | Must be ACTIVE |
| dajilin-order-processing | `/webhook/dajilin-order-processing` | E-commerce checkout orders | Must be ACTIVE |
| dajilin-ai-handoff | `/webhook/dajilin-ai-handoff` | Human support requests from AI | Must be ACTIVE |
| radar-monitor-trigger | `/webhook/radar-monitor-trigger` | Start radar monitoring | Should be ACTIVE |
| radar-job-status-poller | `/webhook/radar-job-status-poller` | Poll radar job status | Should be ACTIVE |
| radar-daily-summary | `/webhook/radar-daily-summary` | Daily radar summary | Should be ACTIVE |
| booking-submit | `/webhook/booking-submit` | Booking submissions | Should be ACTIVE |

**Test n8n webhooks before deployment:**
```bash
# Test station application webhook
curl -X POST https://n8n.dajilin.net/webhook/dajilin-station-application \
  -H "Content-Type: application/json" \
  -d '{
    "site_id": "dajilin",
    "source": "dajilin-website",
    "application": {
      "stationName": "Test Station",
      "location": "Jilin Province",
      "services": ["parking"],
      "contactName": "Test User",
      "contactPhone": "13800138000",
      "contactEmail": "test@example.com",
      "agreeTerms": true
    }
  }'
```

### 2.4 Ghost CMS Verification

- [ ] Ghost CMS is running and accessible
- [ ] Content API Key is generated and valid
- [ ] Required tags are created:
  - `study-tour` (工业研学)
  - `destination` (目的地)
  - `route-331` (331国道)
  - `theme` (主题玩法)
  - `official-service` (官方服务)
  - `guide` (攻略指南)

---

## 3. Deployment Steps

### 3.1 Pre-Deployment Commands

Execute on the **local development machine**:

```bash
# 1. Navigate to project directory
cd /Users/aqua/workspace/GEO-N8N-OpenClaw/websites/dajilin

# 2. Ensure dependencies are installed
npm install

# 3. Run production build with correct environment
SITE_URL=https://dajilin.net \
PUBLIC_GN_API_BASE_URL=https://api.dajilin.net \
npm run build

# 4. Verify build output
ls -la dist/client/
ls -la dist/server/
```

### 3.2 Server-Side Deployment Commands

Execute on the **production server** as root or with sudo:

```bash
# 1. Create directory structure (if not exists)
mkdir -p /var/www/dajilin/{current,shared,releases,backups}

# 2. Create environment file
cat > /var/www/dajilin/shared/.env << 'EOF'
SITE_URL=https://dajilin.net
PUBLIC_GN_API_BASE_URL=https://api.dajilin.net
PUBLIC_GN_SITE_ID=dajilin
PUBLIC_GN_AI_SESSION_ENDPOINT=
PUBLIC_GN_AI_CHAT_ENDPOINT=
PUBLIC_GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT=
PUBLIC_GN_AI_HANDOFF_ENDPOINT=
GHOST_API_URL=http://localhost:2368
GHOST_CONTENT_API_KEY=<your-key>
GHOST_ADMIN_API_KEY=<your-key>
GHOST_WEBSHOT_SECRET=<your-secret>
PUBLIC_GN_N8N_STATION_APPLY_WEBHOOK_URL=https://n8n.dajilin.net/webhook/dajilin-station-application
PUBLIC_GN_N8N_ORDER_PROCESSING_WEBHOOK_URL=https://n8n.dajilin.net/webhook/dajilin-order-processing
PUBLIC_GN_N8N_AI_HANDOFF_WEBHOOK_URL=https://n8n.dajilin.net/webhook/dajilin-ai-handoff
GN_N8N_MONITOR_TRIGGER_URL=https://n8n.dajilin.net/webhook/radar-monitor-trigger
GN_N8N_BOOKING_SUBMIT_URL=https://n8n.dajilin.net/webhook/booking-submit
GN_N8N_SITE_ASSESSMENT_URL=https://n8n.dajilin.net/webhook/radar-site-assessment
GN_N8N_SITE_ONBOARDING_URL=https://n8n.dajilin.net/webhook/radar-site-onboarding
GN_N8N_FAILURE_NOTIFY_URL=https://n8n.dajilin.net/webhook/radar-failure-notify
GN_N8N_DAILY_SUMMARY_URL=https://n8n.dajilin.net/webhook/radar-daily-summary
EOF

# 3. Create release timestamp
RELEASE_DIR="/var/www/dajilin/releases/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$RELEASE_DIR"

# 4. Copy build output from local to server (run on local machine)
# scp -r dist/ user@server:/var/www/dajilin/releases/<timestamp>/
# Or use rsync for efficiency:
# rsync -avz --delete dist/ user@server:/var/www/dajilin/releases/<timestamp>/

# 5. Copy package.json if needed
# scp package.json user@server:/var/www/dajilin/releases/<timestamp>/

# 6. Update symlink
rm -f /var/www/dajilin/current
ln -s "$RELEASE_DIR" /var/www/dajilin/current

# 7. Set permissions
chown -R www-data:www-data /var/www/dajilin/current
chmod -R 755 /var/www/dajilin/current
```

### 3.3 Nginx Configuration

Copy and configure Nginx:

```bash
# 1. Copy Nginx configuration
cp /path/to/dajilin/deploy/dajilin.conf /etc/nginx/sites-available/dajilin.conf

# 2. Verify Nginx server_name is set to dajilin.net (already configured in dajilin.conf)

# 3. Enable site
ln -s /etc/nginx/sites-available/dajilin.conf /etc/nginx/sites-enabled/

# 4. Test configuration
nginx -t

# 5. Reload Nginx
systemctl reload nginx
```

### 3.4 SSL Certificate

For HTTPS, obtain SSL certificate (example using Let's Encrypt):

```bash
# Install certbot if not present
apt install certbot python3-certbot-nginx

# Obtain certificate (after DNS is pointed to server)
certbot --nginx -d dajilin.net

# Auto-renewal is configured automatically
```

### 3.5 Systemd Service for SSR

Configure the Node.js SSR service:

```bash
# 1. Copy service file
cp /path/to/dajilin/deploy/dajilin.service /etc/systemd/system/dajilin.service

# 2. Reload systemd
systemctl daemon-reload

# 3. Enable service
systemctl enable dajilin

# 4. Start service
systemctl start dajilin

# 5. Check status
systemctl status dajilin
```

---

## 4. Post-Deployment Verification

### 4.1 Health Check Endpoints

| Check | Command/URL | Expected |
|-------|-------------|----------|
| HTTP accessibility | `curl -I https://dajilin.net` | 200 OK |
| HTTPS accessibility | `curl -Ik https://dajilin.net` | 200 OK with SSL |
| HTTP → HTTPS redirect | `curl -I http://dajilin.net` | 301 to HTTPS |
| robots.txt | `curl https://dajilin.net/robots.txt` | Sitemap reference |
| sitemap | `curl https://dajilin.net/sitemap-0.xml` | XML content |
| SSR endpoint | `curl https://dajilin.net/checkout` | 200 OK |

### 4.2 Critical Page Verification

Test these pages in browser or via curl:

- [ ] https://dajilin.net/ - Homepage
- [ ] https://dajilin.net/stations/ - Stations list
- [ ] https://dajilin.net/stations/cooperation/ - Cooperation form
- [ ] https://dajilin.net/checkout/ - Checkout page
- [ ] https://dajilin.net/shop/ - Shop page
- [ ] https://dajilin.net/route-331/ - Route 331 page
- [ ] https://dajilin.net/ai-assistant/ - AI assistant
- [ ] https://dajilin.net/destinations/ - Destinations
- [ ] https://dajilin.net/study-tours/ - Study tours
- [ ] https://dajilin.net/themes/ - Themes

### 4.3 Internationalization Verification

- [ ] https://dajilin.net/en/ - English homepage
- [ ] https://dajilin.net/ja/ - Japanese homepage
- [ ] https://dajilin.net/ko/ - Korean homepage

### 4.4 Functional Testing Checklist

| Feature | Test | Expected Result |
|---------|------|-----------------|
| Station Application | Submit test form | Success response from n8n webhook |
| Checkout | Complete test order | Order confirmation displayed |
| AI Handoff | Trigger handoff request | Admin notification sent |
| Navigation | Click through menu | All pages load without errors |
| Mobile | Test on mobile device | Responsive layout works |

### 4.5 SEO Verification

- [ ] `canonical` tag points to `https://dajilin.net`
- [ ] `robots.txt` allows crawling
- [ ] `sitemap-index.xml` is accessible
- [ ] Meta tags are correct
- [ ] No console errors on page load

---

## 5. Rollback Procedure

### 5.1 Quick Rollback Steps

```bash
# 1. Identify previous release
ls -la /var/www/dajilin/releases/
# Choose the previous release directory

# 2. Stop current symlink updates
systemctl stop dajilin

# 3. Update symlink to previous release
rm -f /var/www/dajilin/current
ln -s /var/www/dajilin/releases/<previous-timestamp> /var/www/dajilin/current

# 4. Restart SSR service
systemctl start dajilin

# 5. Verify site is working
curl -I https://dajilin.net
```

### 5.2 Full Rollback Steps

```bash
# 1. Stop services
systemctl stop dajilin
systemctl stop nginx

# 2. Restore previous release
RELEASE_DIR="/var/www/dajilin/releases/<previous-timestamp>"
rm -f /var/www/dajilin/current
ln -s "$RELEASE_DIR" /var/www/dajilin/current

# 3. Restore database if needed (Ghost)
# docker-compose -f /path/to/ghost/docker-compose.yml down
# Restore MySQL data from backup
# docker-compose -f /path/to/ghost/docker-compose.yml up -d

# 4. Restart services
systemctl start dajilin
systemctl start nginx

# 5. Verify
curl -I https://dajilin.net
```

### 5.3 Emergency Rollback Commands

```bash
# Single command to rollback to previous release
systemctl stop dajilin && \
  rm -f /var/www/dajilin/current && \
  ln -s $(ls -t /var/www/dajilin/releases/ | sed -n '2p') /var/www/dajilin/current && \
  systemctl start dajilin && \
  systemctl reload nginx
```

---

## 6. Production Environment Details

### 6.1 Server Requirements

| Component | Specification |
|-----------|---------------|
| OS | Ubuntu 22.04 LTS or similar |
| CPU | 2 vCPU minimum |
| RAM | 4 GB minimum |
| Disk | 20 GB minimum |
| Node.js | v22.x |
| Nginx | Latest stable |
| Docker | For Ghost CMS (optional) |

### 6.2 File Locations

| Item | Path |
|------|------|
| Site root | `/var/www/dajilin/current/dist/client` |
| SSR entry | `/var/www/dajilin/current/dist/server/entry.mjs` |
| Environment | `/var/www/dajilin/shared/.env` |
| Nginx config | `/etc/nginx/sites-available/dajilin.conf` |
| Systemd service | `/etc/systemd/system/dajilin.service` |
| Ghost CMS | `/var/www/dajilin/ghost/` (if self-hosted) |

### 6.3 n8n Webhook URLs

| Workflow | Full URL |
|----------|----------|
| Station Application | `https://n8n.dajilin.net/webhook/dajilin-station-application` |
| Order Processing | `https://n8n.dajilin.net/webhook/dajilin-order-processing` |
| AI Handoff | `https://n8n.dajilin.net/webhook/dajilin-ai-handoff` |
| Radar Monitor | `https://n8n.dajilin.net/webhook/radar-monitor-trigger` |
| Booking Submit | `https://n8n.dajilin.net/webhook/booking-submit` |

### 6.4 GN Gateway Endpoints

| Service | Endpoint |
|---------|----------|
| API Base | `https://api.dajilin.net` |
| AI Session | `https://api.dajilin.net/public/ai/session` |
| AI Chat | `https://api.dajilin.net/public/ai/chat` |
| Radar Dashboard | `https://api.dajilin.net/api/radar/dashboard` |
| Radar Jobs | `https://api.dajilin.net/api/radar/jobs` |

---

## 7. Monitoring & Backup

### 7.1 Monitoring Endpoints

| Check | URL/Command | Frequency |
|-------|-------------|-----------|
| Nginx health | `systemctl status nginx` | On-demand |
| SSR health | `systemctl status dajilin` | On-demand |
| Disk space | `df -h` | Daily |
| Memory usage | `free -h` | Daily |
| n8n executions | n8n UI → Executions | Daily |
| Error logs | `journalctl -u dajilin -f` | Real-time |

### 7.2 Log Locations

| Service | Log Location |
|---------|-------------|
| Nginx access | `/var/log/nginx/access.log` |
| Nginx error | `/var/log/nginx/error.log` |
| SSR output | `journalctl -u dajilin -f` |
| Ghost CMS | `/var/www/dajilin/ghost/logs/` |

### 7.3 Backup Procedures

#### Files to Backup

```bash
# Backup script for dajilin site
#!/bin/bash
BACKUP_DIR="/var/www/dajilin/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Backup environment files
tar -czf "$BACKUP_DIR/env_${TIMESTAMP}.tar.gz" /var/www/dajilin/shared/.env

# Backup releases directory (optional, can be large)
# tar -czf "$BACKUP_DIR/releases_${TIMESTAMP}.tar.gz" /var/www/dajilin/releases

# Backup Nginx configuration
cp /etc/nginx/sites-available/dajilin.conf "$BACKUP_DIR/nginx_conf_${TIMESTAMP}.bak"

echo "Backup completed: $TIMESTAMP"
```

#### Ghost CMS Backup (if self-hosted)

```bash
# Backup Ghost database
docker-compose -f /var/www/dajilin/ghost/docker-compose.yml exec db mysqldump -u ghost -p ghost > ghost_db_backup_${TIMESTAMP}.sql

# Backup Ghost content
tar -czf ghost_content_${TIMESTAMP}.tar.gz /var/www/dajilin/ghost/content/
```

### 7.4 Backup Schedule

| Item | Frequency | Retention |
|------|-----------|-----------|
| Environment files | Weekly | 12 weeks |
| Ghost database | Weekly | 12 weeks |
| Ghost content | Weekly | 4 weeks |
| Nginx configs | On change | 4 versions |

---

## Appendix A: Quick Reference Commands

```bash
# Deploy new version
cd /path/to/local/dajilin
SITE_URL=https://dajilin.net PUBLIC_GN_API_BASE_URL=https://api.dajilin.net npm run build
rsync -avz --delete dist/ user@server:/var/www/dajilin/releases/<timestamp>/
ssh user@server "ln -sfn /var/www/dajilin/releases/<timestamp> /var/www/dajilin/current && systemctl restart dajilin && systemctl reload nginx"

# Check site status
curl -I https://dajilin.net

# Rollback to previous version
ssh user@server "systemctl stop dajilin && ln -sfn /var/www/dajilin/releases/<prev_timestamp> /var/www/dajilin/current && systemctl start dajilin"

# View SSR logs
ssh user@server "journalctl -u dajilin -f"
```

---

## Appendix B: Troubleshooting

| Issue | Solution |
|-------|----------|
| Site returns 502 | Check SSR service: `systemctl status dajilin` |
| Static assets 404 | Check Nginx root path in config |
| n8n webhook fails | Verify webhook URL and firewall rules |
| SSL certificate error | Run `certbot --nginx -d dajilin.net` |
| Build fails | Check Node.js version (requires 22.x) |
| Environment not loading | Verify `EnvironmentFile` in systemd service |

---

**Document Author:** Claude Code
**Last Updated:** 2026-04-04
**Next Review:** Before each deployment
