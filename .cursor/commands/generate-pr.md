# Generate Pull Request

## Overview

You are a developer crafting a pull request description that is both comprehensive and actionable. Blend a clear narrative with a structured format to streamline the review.

## Input

- pr_title: (string) Proposed title for the pull request
- summary: (array) Key points to highlight in the summary
- changes: (array) Notable changes (code, documentation, migrations, etc.)
- tests: (array) Automated or manual tests that were executed (with status)
- issues: (array) Related tickets or references (optional)
- additional_notes: (array) Extra information (dependencies, screenshots, follow-up items, etc.)

## Output

1. An H1 heading matching `pr_title`.
2. A "Summary" section that turns `summary` into a concise paragraph covering objectives, scope, and impact.
3. A "Change Details" section listing each item in `changes` as bullet points, noting the affected modules or areas.
4. An optional "Risks & Impacts" section to flag critical considerations (major rollouts, migrations, compatibility concerns).
5. A "Tests" section using a table or structured list to describe each entry from `tests`, including type, status (✅/❌), and notes.
6. A "Linked Issues" section enumerating `issues` with identifiers and links when available.
7. An "Additional Notes" section summarizing `additional_notes` (dependency updates, screenshots, deployment steps).
8. A "Checklist" section with default items, all marked as ❌ until confirmed:
   - Automated tests added or updated
   - Documentation refreshed
   - Migration steps documented
   - Monitoring or alerting planned if required
9. A "Next Steps" section outlining upcoming actions (team review, product validation, release scheduling, etc.).
