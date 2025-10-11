# Run Lint Suite

## Overview

You are responsible for running the lint command across the entire project to ensure style consistency, adherence to custom rules, and a clean, error-free baseline before merging.

## Steps

1. **Prepare Environment**

   - Verify that project dependencies are installed (`npm install`, `yarn install`, etc.).
   - Confirm the canonical lint command (e.g., `npm run lint` or `pnpm lint`) and whether `--fix` is available.
   - Double-check ignore files (.eslintignore, .prettierignore, etc.) so third-party directories stay excluded.

2. **Run Lint Command**

   - Execute the primary command with autofix enabled when appropriate (`npm run lint -- --fix`).
   - Capture the full output: errors, warnings, and any files that were changed.

3. **Review & Remediate**

   - Inspect remaining messages: items that cannot be auto-fixed, custom rule failures, files outside scope.
   - Fix the affected code manually or adjust rules/configuration only when justified and agreed on by the team.
   - When relaxing rules, document the rationale before updating configuration.

4. **Verify**
   - Re-run the lint command without autofix to confirm a clean result.
   - Optional: trigger quick tests that depend on lint output (e.g., `npm run test:lint` if available).
   - Prepare a summary of the fixes applied and any follow-up actions.

## Lint Checklist

- [ ] Lint command executed with up-to-date dependencies
- [ ] Autofix applied wherever possible
- [ ] Remaining issues reviewed and resolved manually
- [ ] Final lint run passes without blocking warnings
- [ ] Changes ready for commit/PR with documented follow-up
