# TOOLS.md - Plinko CRM Environment

## API Credentials

**⚠️ Secrets stored in `.env` file (not committed to git)**

Copy `.env.example` to `.env` and fill in your credentials.

### Airtable
- PAT: `${AIRTABLE_PAT}` (see .env)
- Base: "Plinko Solutions Lead Base" (`${AIRTABLE_BASE_ID}`)
- Tables:
  - Plinko Leads: tblfFstDS4Fyn9Exe
  - Activities: tbl6QswM4V2fcMhqV
  - Deals: tblvPiSJewFEzbYxR
- Endpoint: https://api.airtable.com/v0

### Cal.com
- API Key: `${CAL_API_KEY}` (see .env)
- Event Type: `steppingstones`
- Webhook URL: `${MAKE_WEBHOOK_URL}`
- Webhook Verification: Enabled (signature check)

### Make.com Webhook
- Endpoint: `${MAKE_WEBHOOK_URL}`
- Method: POST
- Events: BOOKING_CREATED, BOOKING_RESCHEDULED

## Airtable Schema (Target)

### Leads Table
- Name (text, primary)
- Email (email) 
- Company (text)
- Source (select: Website/Instagram/Reddit/Skool/Email/Outbound/Referral)
- Status (select: New/Qualified/Proposal/Sold/Lost)
- Tier Interest (select: Scan/Build/Care)
- Est Deal Size (currency)
- Next Action Date (date)
- Cal.com Booking URL (url)
- Notes (long text)

### Activities Table
- Lead (link to Leads)
- Type (select: Call/Email/Note/Discovery)
- Notes (long text)
- Date (date)
- Duration (number, minutes)

### Deals Table
- Lead (link to Leads)
- Tier (select: Scan/Build/Care)
- Amount (currency)
- Close Date (date)
- Stage (select: Discovery/Proposal/Negotiation/Closed Won/Closed Lost)
- Probability (percent)

## Webhook Payload Structure (Cal.com → Make.com)
```json
{
  "event": "BOOKING_CREATED",
  "payload": {
    "attendee": {
      "name": "string",
      "email": "string"
    },
    "eventType": {
      "title": "string",
      "slug": "steppingstones"
    },
    "startTime": "ISO8601",
    "endTime": "ISO8601",
    "bookingId": "string",
    "metadata": {}
  }
}
```
