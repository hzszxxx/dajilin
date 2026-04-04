# 大季林驿站合作计划 (Station Cooperation Plan)

## Overview

This document outlines the Phase 2 station cooperation features for dajilin site, focusing on the partner station application system, management dashboard, and booking integration for Route 331 highway stations.

## Station Cooperation Process

### 1. Application Submission

Partner station operators submit applications through `/stations/cooperation` page:

**Required Information:**
- Station name and type
- Location (province/city/district)
- Detailed address
- Services offered (multi-select)
- Contact person name
- Contact phone (validated for Chinese mobile format)
- Contact email (validated)
- Business license/qualification number (optional)
- Station description (capabilities, features)
- Photos (optional)

**Form Validation:**
- Station name: required
- Location: required
- Contact name: required
- Contact phone: required, validated format
- Contact email: required, validated format
- Services: at least one required
- Terms agreement: required

### 2. Review Workflow

Applications are submitted to n8n webhook for processing:

**Webhook Endpoint:** `PUBLIC_GN_N8N_STATION_APPLY_WEBHOOK_URL`

**Payload Structure:**
```json
{
  "source": "dajilin-website",
  "stationApplication": {
    "stationName": "string",
    "stationType": "string",
    "location": "string",
    "locationDetail": "string",
    "services": ["string"],
    "serviceOther": "string",
    "contactName": "string",
    "contactPhone": "string",
    "contactEmail": "string",
    "businessLicense": "string",
    "description": "string",
    "photos": "string",
    "submittedAt": "ISO8601 timestamp"
  }
}
```

### 3. Approval Workflow

Admin users review applications at `/admin/stations`:

**Status Flow:**
```
pending → approved
       ↘ rejected
```

**Admin Actions:**
- View application details
- Approve application → station goes live
- Reject application → station marked as rejected

## Partner Station Requirements

### Basic Requirements
- Valid business license and venue usage rights
- Located along Route 331 or at main tourism nodes
- Can provide at least 2 services from: parking, rest, dining, accommodation, supply
- Basic hygiene and safety conditions met
- Willing to accept platform service standards

### Service Capabilities
| Service Type | Description |
|-------------|-------------|
| Parking | Large parking areas for vehicles and buses |
| Rest Space | Indoor rest areas, restrooms, washing facilities |
| Dining | Local specialties, light meals, hot beverages |
| Accommodation | Standard rooms, dormitory, camping areas |
| Supply | Fuel reserves, daily necessities, emergency supplies |
| Team Services | Meeting spaces, activity organization, guide connections |

## Revenue Sharing Model

### Commission Structure
- **Order Commission:** 5%-10% per transaction (platform service fee)
- **Member Promotion:** Partner stations can join platform membership program
- **Value-Added Services:** Additional promotion spots and data reports billed separately

### Settlement
- Platform deducts service fee from each transaction
- Partner stations receive payment for completed services
- Monthly settlement cycle (to be implemented)

## n8n Workflow Integration

### Required Workflows

#### 1. Station Application Webhook
**Trigger:** `PUBLIC_GN_N8N_STATION_APPLY_WEBHOOK_URL`

**Function:**
- Receive application form submissions
- Validate application data
- Create notification for admin review
- Store application in database
- Send acknowledgment email to applicant

**Workflow Steps:**
1. Webhook trigger (POST)
2. Data validation
3. Store in database (Airtable/Google Sheets/custom DB)
4. Send Slack/Email notification to admin
5. Send confirmation email to applicant
6. Return success response

#### 2. Application Approval Notification
**Trigger:** When admin approves application

**Function:**
- Notify partner station of approval
- Generate station profile
- Add to station listing
- Send welcome materials

#### 3. Application Rejection Notification
**Trigger:** When admin rejects application

**Function:**
- Notify partner station of rejection
- Provide reason for rejection
- Offer re-application guidance

## Pages Created

### Public Pages

1. **`/stations`** - Station listing page
   - Grid display of partner stations
   - Filter by service type
   - Sort by rating/reviews
   - Partner badge indicator

2. **`/stations/[slug]`** - Individual station pages
   - Station details and services
   - Contact information
   - Operating hours
   - Capacity information
   - Location highlights
   - Photo gallery
   - Reservation CTA
   - AI consultation button

3. **`/stations/cooperation`** - Partner application page
   - Benefits explanation
   - Requirements list
   - Process timeline
   - Revenue model
   - Application form

### Admin Pages

1. **`/admin/stations`** - Station management dashboard
   - Application statistics
   - Application list with filters
   - Status badges (pending/approved/rejected)
   - Quick actions (view/approve/reject)

## Components Created

### React Components

1. **`StationApplyForm.tsx`**
   - Multi-language support (zh/en/ja/ko)
   - Form validation
   - Checkbox groups for services
   - Terms agreement
   - Loading states
   - Success/error feedback
   - n8n webhook submission

## Environment Variables

Add to `.env.example`:

```bash
# Station Application Webhook (n8n)
PUBLIC_GN_N8N_STATION_APPLY_WEBHOOK_URL=

# Station management API (future)
# GN_STATION_API_KEY=
```

## Future Enhancements

### Phase 3 (To Be Implemented)
1. **Booking System**
   - Date/time selection
   - Service package selection
   - Payment integration
   - Confirmation and reminders

2. **Station Reviews**
   - User rating and review submission
   - Review moderation
   - Display on station pages

3. **Dynamic Station Data**
   - Real-time availability
   - Live pricing
   - Dynamic capacity updates

4. **Payment Integration**
   - Online booking payment
   - Commission calculation
   - Settlement system

## Technical Notes

### i18n Support
All station pages support 4 languages:
- Chinese (zh) - default
- English (en)
- Japanese (ja)
- Korean (ko)

### SEO
- Station pages include JSON-LD schema
- Meta descriptions and titles localized
- Canonical URLs with locale prefix

### Mobile Responsive
All pages are mobile responsive with:
- Grid layouts that stack on mobile
- Touch-friendly buttons
- Scrollable tables on small screens

## File Structure

```
src/
├── pages/
│   ├── stations/
│   │   ├── index.astro        # Station listing
│   │   ├── [slug].astro       # Individual station
│   │   └── cooperation.astro # Partner application
│   └── admin/
│       └── stations.astro     # Admin dashboard
├── components/
│   └── react/
│       └── StationApplyForm.tsx
└── lib/
    └── gn/
        └── workflows-client.ts # n8n integration
```

## Dependencies

The station cooperation features use existing dependencies:
- `astro` ^5.16.6
- `@gn/site-adapters` (for workflows client)
- `@tryghost/content-api` (for future CMS integration)

No new npm packages required.
