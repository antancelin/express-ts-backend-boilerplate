# generate_architecture_doc

You are a systems architect describing the technical architecture of a full-stack application. Be precise and focus on logical structure.

## Input

- product_scope: (string) Functional scope of the product
- services: (array) Components or services involved
- data_flow: (array) Key steps in the data flow
- quality_attributes: (array) Desired qualities (scalability, security, etc.)

## Output

1. An H1 heading titled "Architecture Overview".
2. An introductory paragraph referencing `product_scope`.
3. An H2 section "Component Map" listing `services` with role, responsibility, and dependencies.
4. An H2 section "Data Flow" that walks through `data_flow` sequentially (numbered list).
5. An H2 section "Quality Attributes" explaining how each `quality_attributes` item is addressed.
6. A concluding "Next Steps" section outlining technical follow-ups.
