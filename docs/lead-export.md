# Lead Exports — Controls and Procedures

Purpose
-------
This document describes the approved procedure, allowed fields, storage locations, access controls, retention policy, and redaction guidance for exporting leads from the EZDriveSite systems.

Allowed Fields
--------------
Only the following personally-identifiable information (PII) fields are permitted in exported lead lists:
- `email` — required
- `name` — optional (first and last together if present)

Prohibited Fields
-----------------
Do NOT include any of the following in exports:
- IP addresses
- Device identifiers
- Session or analytics payloads
- Any other sensitive identifiers (SSNs, credit card numbers, government IDs)

Storage & Approved Locations
----------------------------
- Approved storage locations:
  - The team's secure Marketing Drive (shared folder with restricted access)
  - The approved Marketing system (e.g., MarketingOps platform) configured for PII
- Exports MUST NOT be stored in public buckets, ephemeral developer machines, or analytics stores.
- If storing locally for a short time during processing, delete the file promptly after import and record the deletion.

Access Controls & Who May Request/Receive Exports
-------------------------------------------------
- Owners: Marketing Ops (primary contact: marketing-ops@example.com)
- Requesters: Product Marketing, Growth, or other teams with explicit approval from Marketing Ops
- Approval process: All export requests must be routed to Marketing Ops; they will approve, run the export, and share results using approved storage.

Retention & Redaction Policy
----------------------------
- Retention period for exports: 30 days by default unless a longer retention is explicitly approved and documented by Marketing Ops.
- When retention ends, exports MUST be securely deleted and deletion documented.
- If an export inadvertently contains disallowed fields, notify Privacy and Marketing Ops immediately and follow incident handling procedures.

Sample CSV Schema
-----------------
Header row (CSV):

email,name

Example row:

jane.doe@example.com,Jane Doe

Sample Export Command (placeholder)
-----------------------------------
This repo includes a placeholder script to illustrate the export workflow. It is intentionally minimal and should be executed only by authorized personnel or CI jobs configured by Marketing Ops.

scripts/export-leads.sh (placeholder):

#!/usr/bin/env bash
# Placeholder: assemble an export with only allowed fields
# NOTE: Replace with the Production export tool or a Marketing Ops-managed process.

# Example pseudo-command (do not run without review):
# psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "COPY (SELECT email, name FROM leads WHERE 1=1) TO STDOUT WITH CSV HEADER" > /tmp/leads-export.csv

# After export: securely move to approved storage and delete local copy:
# mv /tmp/leads-export.csv /secure/marketing-drive/leads-$(date +%Y%m%d).csv
# shred -u /tmp/leads-export.csv

Contacts & Request Process
--------------------------
- Marketing Ops owner: marketing-ops@example.com
- Privacy contact: privacy@example.com
- For questions about retention or allowed fields, contact Marketing Ops before running exports.

Reviewer Checklist
------------------
- [ ] Export contains only `email` and `name` fields
- [ ] Export stored in an approved location
- [ ] Retention period documented and followed
- [ ] Access approval recorded
- [ ] Any redaction or incident steps documented

References
----------
- docs/privacy-guidance.md
- prd.md

Change Log
----------
- 2026-05-14: Initial draft created by Dev Agent
