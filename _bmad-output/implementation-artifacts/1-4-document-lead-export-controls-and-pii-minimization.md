**Story Header**
- **Story ID:** 1.4
- **Story Key:** 1-4-document-lead-export-controls-and-pii-minimization
- **Title:** Document lead export controls and PII minimization
- **Status:** ready-for-dev
- **Owner:** Ashton
- **Created:** 2026-05-14

**Story Requirements**
- **User Story:** As a marketing operator, I want documentation and a checklist for lead exports so exported lists contain only permitted fields and follow access controls.
- **Business Value:** Prevents accidental PII leakage, provides operational guidance, and meets privacy commitments in the PRD.
- **Acceptance Criteria (BDD):**
  - Given lead exports are requested, when an operator follows the repo documentation, then exported lists contain only `email` and `name` fields and storage/retention guidance is followed.
  - Given the documentation exists, when a reviewer inspects `docs/lead-export.md`, then it lists who may access exports, retention policy, and steps to request exports.

**Developer Context**
- **What to build:** Create `docs/lead-export.md` describing export fields (email, name), storage locations, access controls, retention, redaction guidance, and sample command/process for exporting (if applicable).
- **Cross-reference:** Link to `docs/privacy-guidance.md` and `prd.md` for policy context.

**Technical Requirements & Guardrails**
- Do NOT store raw IPs, device identifiers, or any analytics payloads with lead data. Recommend central storage location (e.g., secure drive or Marketing system) and minimum access groups.
- Provide sample CSV schema and a short script or CLI hint (e.g., `scripts/export-leads.sh` placeholder) showing how to produce export with only allowed fields.

**Testing & QA**
- Reviewer checklist: ensure `docs/lead-export.md` includes: allowed fields, redaction instructions, retention period, access control owner, contact for export requests, and example export steps.

**File Changes Suggested**
- `docs/lead-export.md` — new document with export controls and retention guidance

**Next Steps**
1. Draft `docs/lead-export.md` in the repo with approved copy.
2. Share with Marketing Ops for sign-off and add to onboarding docs.