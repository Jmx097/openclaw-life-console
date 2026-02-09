#!/bin/bash
# Plinko Sales CRM Webhook Handler
# Receives webhooks from Make.com (Cal.com events)
# Processes: BOOKING_CREATED, BOOKING_RESCHEDULED

# Config - Load from environment variables or .env file
if [ -f "/home/ubuntu/.openclaw/workspace/.env" ]; then
    export $(grep -v '^#' /home/ubuntu/.openclaw/workspace/.env | xargs)
fi

AIRTABLE_PAT="${AIRTABLE_PAT:-""}"
BASE_ID="${AIRTABLE_BASE_ID:-"appvoLtkzliuViGvb"}"
LEADS_TABLE="tblfFstDS4Fyn9Exe"
ACTIVITIES_TABLE="tbl6QswM4V2fcMhqV"

# Validate AIRTABLE_PAT is set
if [ -z "$AIRTABLE_PAT" ]; then
    echo '{"status": "error", "message": "AIRTABLE_PAT not configured"}'
    exit 1
fi

# Log file
LOG_FILE="/home/ubuntu/.openclaw/workspace/memory/webhook-$(date +%Y-%m-%d).log"

# Read webhook payload from stdin
read -r payload

# Log incoming webhook
echo "[$(date -Iseconds)] Webhook received" >> "$LOG_FILE"
echo "$payload" >> "$LOG_FILE"

# Parse event type
event=$(echo "$payload" | jq -r '.event // "unknown"')

# Process BOOKING_CREATED
if [ "$event" = "BOOKING_CREATED" ]; then
    attendee_email=$(echo "$payload" | jq -r '.payload.attendee.email')
    attendee_name=$(echo "$payload" | jq -r '.payload.attendee.name')
    start_time=$(echo "$payload" | jq -r '.payload.startTime')
    booking_id=$(echo "$payload" | jq -r '.payload.bookingId')
    cal_link=$(echo "$payload" | jq -r '.payload.metadata.videoCallUrl // empty')
    
    echo "[$(date -Iseconds)] Processing booking for: $attendee_email" >> "$LOG_FILE"
    
    # Search for existing lead by email
    existing_lead=$(curl -s -H "Authorization: Bearer $AIRTABLE_PAT" \
        "https://api.airtable.com/v0/$BASE_ID/$LEADS_TABLE?filterByFormula=%7BEmail%7D=%22$attendee_email%22&maxRecords=1" | \
        jq -r '.records[0].id // empty')
    
    if [ -n "$existing_lead" ]; then
        # Update existing lead
        echo "[$(date -Iseconds)] Found existing lead: $existing_lead" >> "$LOG_FILE"
        
        curl -s -H "Authorization: Bearer $AIRTABLE_PAT" \
            -H "Content-Type: application/json" \
            -X PATCH "https://api.airtable.com/v0/$BASE_ID/$LEADS_TABLE/$existing_lead" \
            -d "{
                \"fields\": {
                    \"Status\": \"Qualified\",
                    \"Next Action Date\": \"$start_time\",
                    \"Cal.com Booking URL\": \"$cal_link\"
                }
            }" >> "$LOG_FILE" 2>&1
    else
        # Create new lead
        echo "[$(date -Iseconds)] Creating new lead for: $attendee_email" >> "$LOG_FILE"
        
        new_lead=$(curl -s -H "Authorization: Bearer $AIRTABLE_PAT" \
            -H "Content-Type: application/json" \
            -X POST "https://api.airtable.com/v0/$BASE_ID/$LEADS_TABLE" \
            -d "{
                \"fields\": {
                    \"Name\": \"$attendee_name\",
                    \"Email\": \"$attendee_email\",
                    \"Status\": \"Qualified\",
                    \"Source\": \"Cal.com Booking\",
                    \"Next Action Date\": \"$start_time\",
                    \"Cal.com Booking URL\": \"$cal_link\"
                }
            }")
        
        existing_lead=$(echo "$new_lead" | jq -r '.id')
        echo "[$(date -Iseconds)] Created lead: $existing_lead" >> "$LOG_FILE"
    fi
    
    # Log activity
    curl -s -H "Authorization: Bearer $AIRTABLE_PAT" \
        -H "Content-Type: application/json" \
        -X POST "https://api.airtable.com/v0/$BASE_ID/$ACTIVITIES_TABLE" \
        -d "{
            \"fields\": {
                \"Activity Name\": \"Discovery Call Booked\",
                \"Type\": \"Discovery\",
                \"Date\": \"$(date -Iseconds)\",
                \"Notes\": \"Booking ID: $booking_id. Call scheduled for: $start_time\"
            }
        }" >> "$LOG_FILE" 2>&1
    
    echo "[$(date -Iseconds)] Booking processed successfully" >> "$LOG_FILE"
fi

echo '{"status": "ok"}'
