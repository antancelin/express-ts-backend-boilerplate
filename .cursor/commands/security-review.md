# Security Review

## Overview

You are a security specialist conducting a comprehensive review of dependencies, code, data handling, and infrastructure. Your goal is to identify vulnerabilities, recommend actionable remediation, and define a follow-up path.

## Input

- scope: (array) Components or services included in the review
- findings: (array) Identified vulnerabilities or risks (description, severity, location)
- remediation_steps: (array) Recommended fixes with sufficient detail (code, configuration, process)
- evidence: (array) Logs, screenshots, or references gathered (optional)
- open_questions: (array) Outstanding questions requiring clarification (optional)

## Output

1. An H1 heading titled "Security Review".
2. An introduction reiterating the `scope`, constraints, and overall objectives.
3. An "Executive Summary" section covering overall risk level, key strengths/weaknesses, and potential business impact.
4. An "Inventory & Attack Surface" section enumerating the elements in `scope`, their exposure (public vs. internal), and critical dependencies.
5. A "Detailed Analysis" section with subsections:
   - "Authentication & Authorization": evaluation plus recommendations.
   - "Validation & Sanitization": coverage of input validation, injection, XSS/CSRF.
   - "Data Protection": storage, encryption, secrets, and logging practices.
   - "Dependencies & Configuration": package vulnerabilities, server/CI/CD configuration.
   - "Infrastructure & Network": environment security, ACLs, headers, CORS policies.
6. A "Findings" section converting `findings` into a table or list with ID, severity (Critical/High/Medium/Low), description, evidence, and status.
7. A "Remediation Plan" section incorporating `remediation_steps`, prioritized by severity and calling out owners plus suggested timelines.
8. An "Evidence & References" section surfacing `evidence` along with links to OWASP, CIS, or other relevant resources.
9. An "Open Questions" section listing `open_questions` (if provided) and the follow-up needed.
10. A "Security Checklist" (all items unchecked by default):
    - Authentication and authorization reviewed
    - Input validation verified
    - Secrets management compliant
    - Logs free of sensitive data
    - Dependency vulnerabilities addressed
    - Infrastructure hardening applied
11. A "Next Steps" section closing with the follow-up plan (future security review, penetration testing, policy updates, etc.).
