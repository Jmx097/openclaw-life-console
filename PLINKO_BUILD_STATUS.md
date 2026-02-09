# Plinko Sales CRM - Build Status

**Last Updated**: 2026-02-08 21:50 UTC  
**Status**: ✅ Core Infrastructure Ready

---

## ✅ Completed

### 1. Airtable CRM Base
**Base**: "Plinko Solutions Lead Base" (appvoLtkzliuViGvb)

**Tables Created**:

| Table | ID | Purpose |
|-------|-----|---------|
| **Plinko Leads** | tblfFstDS4Fyn9Exe | Lead tracking & qualification |
| **Activities** | tbl6QswM4V2fcMhqV | Call/email notes & history |
| **Deals** | tblvPiSJewFEzbYxR | Pipeline & revenue tracking |

**Plinko Leads Schema**:
- Name, Email, Company
- Source: Website, Instagram, Reddit, Skool, Email, Outbound, Referral
- Status: New, Qualified, Proposal, Sold, Lost
- Tier Interest: Scan ($247), Build ($2,000), Care ($750/mo)
- Est Deal Size (currency)
- Next Action Date
- Cal.com Booking URL
- Notes

### 2. Webhook Handler
- **Script**: `workspace/scripts/plinko-webhook-handler.sh`
- **Make.com Endpoint**: `https://hook.us1.make.com/hhzxyhjqrlixdnrmbr89sib8u25krnuf`
- **Events**: BOOKING_CREATED, BOOKING_RESCHEDULED
- **Logic**: 
  - Finds/creates lead by email
  - Updates Status → "Qualified"
  - Sets Next Action Date to call time
  - Logs activity in Activities table

### 3. Agent Configuration
- **AGENTS.md**: Operating instructions for Plinko CRM agent
- **TOOLS.md**: API credentials and schema reference
- **Test Record**: Created in Plinko Leads (rec7clZpvwipyqwGj)

---

## 🔄 Next Steps (Lead Source Development)

### 1. Instagram DM Capture
**Options**:
- Use Meta Business Suite API (requires Facebook App)
- Zapier/Make.com integration
- Manual webhook from Instagram → Airtable

**Needed from you**:
- Instagram Business Account connected to Meta?
- Do you want auto-reply or just capture?

### 2. Reddit/Skool Integration
**Skool**: 
- Use Skool API (community platform)
- Webhook on new member join
- Auto-tag leads from community

**Reddit**:
- Monitor r/entrepreneur, r/smallbusiness for posts
- Keyword alerts ("AI automation", "business workflow")
- Manual DM tracking or auto-responder?

### 3. Website Contact Form
**Simplest approach**:
- Formspree or Tally.so → Webhook → Airtable
- Static site or existing website?
- Fields: Name, Email, Company, Pain Point

---

## 📋 Offer Ladder (Hardcoded Logic)

| Tier | Price | Signals | Deliverable |
|------|-------|---------|-------------|
| **Automation Scan** | $247 | 5+ team, manual chaos, losing leads | 90-min audit + roadmap PDF |
| **Workflow Build** | $2,000 | Scan done, urgent pain identified | 1 workflow live |
| **Care Plan** | $750/mo | Build delivered, wants optimization | Monthly tweaks + new flows |

---

## 🎯 Immediate Action Items

1. **Configure Make.com webhook**
   - Add Airtable PAT to webhook handler environment
   - Test with sample Cal.com booking

2. **Choose lead source priority**
   - Which channel do you want live first? (Instagram/Reddit/Skool/Website)

3. **Proposal templates**
   - Do you have existing proposals?
   - Need me to draft templates for each tier?

4. **Discovery call questions**
   - Standard qualification script?
   - What info determines tier recommendation?

---

## 🔐 Security

- API keys stored in TOOLS.md (workspace only)
- Webhook handler logs to `memory/webhook-YYYY-MM-DD.log`
- No sensitive data in messages

---

**Ready for next phase**: Pick your first lead source and I'll build the capture flow.
