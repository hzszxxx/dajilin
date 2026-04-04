# dajilin Payment Integration Guide

## Overview

This document outlines the payment integration requirements and implementation plan for the dajilin (大吉林) e-commerce checkout flow at `dajilin.net`.

**Current Status:** The checkout page has UI for payment method selection, but payments are **not yet integrated** with any payment gateway. Orders are stored locally with `paymentStatus: 'unpaid'`.

---

## Supported Payment Methods

| Method | Display Name (CN) | Display Name (EN) | Status |
|--------|-------------------|-------------------|--------|
| `wechat` | 微信支付 | WeChat Pay | UI Ready, Gateway Not Integrated |
| `alipay` | 支付宝 | Alipay | UI Ready, Gateway Not Integrated |
| `banktransfer` | 银行转账 | Bank Transfer | UI Ready, Manual Processing |
| `cod` | 货到付款 | Cash on Delivery | UI Ready, Manual Processing |

---

## Payment Integration Architecture

```
Checkout Page (dajilin.site)
    │
    ├── User selects payment method
    ├── Creates order with paymentMethod + paymentStatus: 'unpaid'
    │
    ▼ (for WeChat/Alipay)
Payment Gateway (WeChat Pay / Alipay)
    │
    ├── Unified Payment API (Native/QR Code/H5)
    │
    ▼
Payment Callback Webhook (n8n)
    │
    ├── Validate payment notification
    ├── Update order status
    │
    ▼
Order Confirmation Page
```

---

## WeChat Pay Integration

### Requirements

1. **WeChat Merchant Account**
   - Register at: https://pay.weixin.qq.com
   - Complete merchant verification (企业认证)

2. **Required API Credentials**
   - `WECHAT_MCHID` - Merchant ID (e.g., 1234567890)
   - `WECHAT_MCHKEY` - Merchant API Key (32-character string)
   - `WECHAT_APPID` - WeChat Open Platform App ID
   - `WECHAT_CERT_PATH` - Path to API certificate (apiclient_cert.p12 or apiclient_cert.pem)

3. **API Version**
   - WeChat Pay API v3 (recommended)
   - WeChat Pay API v2 (legacy, still supported)

### Integration Steps

#### Step 1: Add Environment Variables

```env
# WeChat Pay Configuration
WECHAT_MCHID=your_merchant_id
WECHAT_MCHKEY=your_32_character_api_key
WECHAT_APPID=wx_your_appid
WECHAT_CERT_PATH=/path/to/apiclient_cert.pem

# Payment Callback URL (must be HTTPS, accessible from WeChat servers)
PUBLIC_SITE_URL=https://dajilin.net
PUBLIC_PAYMENT_CALLBACK_URL=https://dajilin.net/api/payment/wechat/callback
```

#### Step 2: Create Payment API Endpoint

Create `/api/payment/wechat/create.ts`:

```typescript
// Unified API v3 implementation example
export async function POST(request: Request) {
  const { orderId, total, description, clientIp } = await request.json();

  const payload = {
    appid: process.env.WECHAT_APPID,
    mchid: process.env.WECHAT_MCHID,
    description: description,
    out_trade_no: orderId,
    amount: {
      total: Math.round(total * 100), // Convert to cents
      currency: 'CNY'
    },
    notify_url: process.env.PUBLIC_PAYMENT_CALLBACK_URL,
    scene_info: {
      payer_client_ip: clientIp
    }
  };

  // Sign and send request to WeChat Pay API
  // ...
}
```

#### Step 3: Create Payment Callback Endpoint

Create `/api/payment/wechat/callback.ts`:

```typescript
// Handle WeChat Pay payment notifications
export async function POST(request: Request) {
  const body = await request.json();

  // 1. Verify signature
  // 2. Check transaction status
  // 3. Update order paymentStatus to 'paid'
  // 4. Return success acknowledgment to WeChat
}
```

---

## Alipay Integration

### Requirements

1. **Alipay Merchant Account**
   - Register at: https://b.alipay.com
   - Complete merchant verification (企业认证)

2. **Required API Credentials**
   - `ALIPAY_APP_ID` - Application ID
   - `ALIPAY_PRIVATE_KEY` - RSA2 Private Key (PKCS#8 format)
   - `ALIPAY_PUBLIC_KEY` - Alipay RSA2 Public Key
   - `ALIPAY_SIGN_TYPE` - RSA2 (recommended)

3. **Gateway**
   - Alipay Open API (https://openapi.alipay.com)
   - Or use Alipay+ (for international payments)

### Integration Steps

#### Step 1: Add Environment Variables

```env
# Alipay Configuration
ALIPAY_APP_ID=your_app_id
ALIPAY_PRIVATE_KEY=your_private_key_base64
ALIPAY_PUBLIC_KEY=alipay_public_key_base64
ALIPAY_SIGN_TYPE=RSA2

# Payment Callback URL
PUBLIC_PAYMENT_CALLBACK_URL=https://dajilin.net/api/payment/alipay/callback
```

#### Step 2: Create Payment API Endpoint

Create `/api/payment/alipay/create.ts`:

```typescript
export async function POST(request: Request) {
  const { orderId, total, subject } = await request.json();

  const payload = {
    app_id: process.env.ALIPAY_APP_ID,
    method: 'alipay.trade.create',
    biz_content: {
      out_trade_no: orderId,
      total_amount: total.toFixed(2),
      subject: subject,
      product_code: 'FAST_INSTANT_TRADE'
    },
    notify_url: process.env.PUBLIC_PAYMENT_CALLBACK_URL
  };

  // Sign request with RSA2 and send to Alipay API
  // ...
}
```

#### Step 3: Create Payment Callback Endpoint

Create `/api/payment/alipay/callback.ts`:

```typescript
// Handle Alipay payment notifications
export async function POST(request: Request) {
  const formData = await request.formData();

  // 1. Verify signature
  // 2. Check trade_status
  // 3. Update order paymentStatus to 'paid'
  // 4. Return 'success' to Alipay
}
```

---

## Payment Callback Workflow (n8n)

### New Workflow: `dajilin-payment-callback`

**Trigger:** POST from WeChat/Alipay payment servers

**Webhook URL:** `https://n.n8n.wang/webhook/dajilin-payment-callback`

#### Request Format (WeChat)

```json
{
  "payment_type": "wechat",
  "order_id": "ORD-1743772000000-ABC123",
  "transaction_id": "4208450740201411100007822347",
  "transaction_status": "SUCCESS",
  "total": 598,
  "paid_at": "2026-04-04T12:00:01.000Z"
}
```

#### Processing Steps

1. **Validate Payment Signature** - Verify with WeChat/Alipay API
2. **Update Order Payment Status** - Set `paymentStatus: 'paid'`
3. **Send Confirmation Email** - Optional: order confirmation to customer
4. **Update Inventory** - If applicable
5. **Trigger Fulfillment** - Notify relevant systems

#### Response Format

```json
{
  "success": true,
  "data": {
    "order_id": "ORD-1743772000000-ABC123",
    "payment_status": "paid",
    "updated_at": "2026-04-04T12:00:02.000Z"
  }
}
```

---

## Security Considerations

### 1. Never Store Sensitive Data

- Do NOT store credit card numbers locally
- Use tokenization with payment gateways
- Keep API keys and secrets in environment variables only

### 2. Signature Verification

- Always verify payment gateway signatures before processing
- Use HTTPS for all payment-related endpoints
- Validate callback IP addresses (WeChat/Alipay have specific ranges)

### 3. Idempotency

- Handle duplicate payment callbacks gracefully
- Use order ID as idempotency key

### 4. TLS/SSL

- Payment callbacks MUST use HTTPS
- Keep SSL certificates up to date

### 5. PCI DSS Compliance (if storing cards)

- If you plan to store cards, you need PCI DSS compliance
- Consider using hosted payment pages instead

---

## Environment Variables Summary

### Required for Production

```env
# ===========================================
# PAYMENT CONFIGURATION (WeChat + Alipay)
# ===========================================

# WeChat Pay
WECHAT_MCHID=
WECHAT_MCHKEY=
WECHAT_APPID=
WECHAT_CERT_PATH=

# Alipay
ALIPAY_APP_ID=
ALIPAY_PRIVATE_KEY=
ALIPAY_PUBLIC_KEY=
ALIPAY_SIGN_TYPE=RSA2

# Payment Callback URLs
PUBLIC_PAYMENT_CALLBACK_URL=https://dajilin.net/api/payment/callback

# ===========================================
# EXISTING (from .env.example)
# ===========================================

SITE_URL=https://dajilin.net
PUBLIC_GN_API_BASE_URL=https://api.renban.xyz
PUBLIC_GN_SITE_ID=dajilin
PUBLIC_GN_N8N_ORDER_PROCESSING_WEBHOOK_URL=https://n.n8n.wang/webhook/dajilin-order-processing
```

---

## Implementation Checklist

### Phase 1: Mock Payment Flow (Development)

- [ ] Create mock payment success page at `/payment/success`
- [ ] Create mock payment cancel page at `/payment/cancel`
- [ ] Update checkout to redirect to mock payment flow
- [ ] Update order status after mock confirmation
- [ ] Test full flow end-to-end

### Phase 2: WeChat Pay Integration

- [ ] Register WeChat Merchant Account
- [ ] Obtain API credentials
- [ ] Create `/api/payment/wechat/create` endpoint
- [ ] Create `/api/payment/wechat/callback` endpoint
- [ ] Create n8n payment callback workflow
- [ ] Test with WeChat sandbox (if available)
- [ ] Production testing

### Phase 3: Alipay Integration

- [ ] Register Alipay Merchant Account
- [ ] Obtain API credentials
- [ ] Create `/api/payment/alipay/create` endpoint
- [ ] Create `/api/payment/alipay/callback` endpoint
- [ ] Create n8n payment callback workflow
- [ ] Test with Alipay sandbox
- [ ] Production testing

### Phase 4: Production Deployment

- [ ] SSL certificate configured
- [ ] Payment callback URLs validated
- [ ] Error handling and logging
- [ ] Admin notifications for failed payments
- [ ] Payment reconciliation process

---

## Alternative: Payment Aggregators

If managing direct WeChat/Alipay integrations is complex, consider using a payment aggregator:

| Provider | Website | Pros | Cons |
|----------|---------|------|------|
| Ping++ | https://www.pingxx.com | Unified API, Multiple providers | Fees, Additional dependency |
| Pay.js | https://payjs.cn | Simple integration | Limited features |
| Nowpayment | https://nowpayment.io | Crypto support | Higher fees |

These aggregators simplify integration but add transaction fees (typically 0.6% - 1%).

---

## Testing

### Test Accounts

- **WeChat Pay:** Use merchant test account (沙箱环境)
- **Alipay:** Use sandbox at https://openhome.alipay.com/develop/sandbox

### Test Scenarios

1. Successful WeChat Pay payment
2. Successful Alipay payment
3. Payment timeout handling
4. Payment cancellation handling
5. Duplicate callback handling
6. Invalid signature rejection

---

## Related Documentation

- [WeChat Pay API v3 Docs](https://pay.weixin.qq.com/docs/partner/apiv3/apiv3.html)
- [Alipay Open API Docs](https://opendocs.alipay.com/open)
- [dajilin n8n Workflows](./dajilin-n8n-workflows.md)
- [dajilin GN Integration Plan](./dajilin-gn-integration-plan.md)
