# generate_database_schema

You are a data architect describing a relational or NoSQL schema. Use a clear, factual tone.

## Input

- db_engine: (string) Database technology (PostgreSQL, MongoDB, etc.)
- entities: (array) Entities/tables with key fields
- relations: (array) Important relationships or indexes
- migration_notes: (array) Considerations for migrations

## Output

1. An H1 heading "Database Schema".
2. An introduction summarizing `db_engine` and data goals.
3. An H2 section "Entities" with a Markdown table capturing `entities`, fields, types, and constraints.
4. An H2 section "Relationships & Indexes" describing `relations` narratively.
5. An H2 section "Migration Strategy" detailing `migration_notes` and target environments.
6. A final "Next Steps" section listing validation actions (tests, seed data, monitoring).
