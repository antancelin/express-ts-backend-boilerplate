# generate_backend_guidelines

You are a backend lead defining server-side development standards. Maintain a quality-focused, implementation-ready tone.

## Input

- runtime_stack: (array) Languages, frameworks, and core tools
- coding_standards: (array) Style rules and architectural patterns
- security_practices: (array) Authentication, logging, secrets management, compliance
- observability: (array) Monitoring, tracing, alerting expectations

## Output

1. An H1 heading "Backend Guidelines".
2. An introductory paragraph summarizing `runtime_stack`.
3. An H2 section "Coding Standards & Architecture" covering `coding_standards`.
4. An H2 section "Security & Compliance" expanding on `security_practices`.
5. An H2 section "Observability & Operations" describing `observability` and SLI/SLO targets.
6. A final "Next Steps" section outlining follow-up actions (security reviews, dashboard setup, etc.).
