# Boilerplate Improvements — Design Spec

**Date:** 2026-05-10
**Status:** Approved

## Context

The current boilerplate ships with 3 source files (`server.ts`, `app.ts`, `routes/index.ts`) and no structure beyond that. Inspired by a real-world project reference, this spec defines structural and architectural improvements that make the boilerplate production-ready without locking users into any database, validation library, or logging stack.

## Constraints

- No new dependency for validation (library-agnostic)
- No HTTP request logger (user chooses their own stack)
- No test runner (user chooses vitest, jest, etc.)
- One new runtime dependency: `helmet`
- Everything else uses Express and Node.js native capabilities

## Target Folder Structure

```
src/
├── config/
│   └── env.ts              ← validates process.env at startup, exports typed config object
├── middleware/
│   ├── asyncHandler.ts     ← wraps async handlers, forwards errors to next()
│   ├── errorHandler.ts     ← global Express error middleware (4-arg signature)
│   └── notFound.ts         ← catch-all 404, creates AppError and calls next(err)
├── types/
│   ├── index.ts            ← AppError interface + createAppError factory
│   └── express.ts          ← Express.Request extension (e.g. req.user)
├── routes/
│   └── index.ts            ← unchanged (health check)
├── app.ts                  ← updated: helmet first, cors from env, notFound + errorHandler last
└── server.ts               ← updated: imports env.ts before app.ts
```

`controllers/` and `services/` are intentionally absent from the boilerplate. They are user-created directories that appear when features are added. The README documents this convention.

## Components

### `src/config/env.ts`

Runs at process startup, before the HTTP server starts listening. Reads `process.env`, checks that all required variables are present, and calls `process.exit(1)` with a clear message if any are missing. Exports a typed `env` object so the rest of the app never touches `process.env` directly.

Required variables: `PORT`, `NODE_ENV`, `CORS_ORIGIN`.

`server.ts` imports `env.ts` as its very first import, before `app.ts`, to guarantee validation runs before any middleware is registered.

### `src/types/index.ts`

Defines `AppError`, an interface that extends the native `Error` with three additional fields:

- `status` — HTTP status code (number)
- `code` — machine-readable error identifier (string, e.g. `NOT_FOUND`, `VALIDATION_ERROR`)
- `publicMessage` — safe message to expose to API consumers

Also exports `createAppError(status, code, publicMessage)`, a factory function that builds a properly shaped `AppError` instance. Using a factory keeps error creation consistent and avoids `new Error()` scattered across the codebase.

### `src/types/express.ts`

Extends Express's `Request` interface to add custom properties (e.g. `req.user` after authentication middleware). Ships as a placeholder with a commented example so users know where to add their own extensions.

### `src/middleware/asyncHandler.ts`

A generic wrapper that accepts an async Express handler and returns a standard handler. Any rejected promise is forwarded to `next(err)`, eliminating the `try/catch` boilerplate in every route.

```ts
// Usage
router.get('/resource', asyncHandler(async (req, res) => {
  const data = await someService.get()
  res.json(data)
}))
```

### `src/middleware/notFound.ts`

Mounted as the last route in `app.ts` (before `errorHandler`). Catches any request that didn't match a registered route and creates a `404` `AppError`, then calls `next(err)` to delegate to `errorHandler`.

### `src/middleware/errorHandler.ts`

Global error middleware with the mandatory 4-argument signature `(err, req, res, next)`. Handles both `AppError` instances and unexpected errors:

- If `err` is an `AppError`: responds with `err.status` and `{ code, message: err.publicMessage }`
- Otherwise: responds with `500` and a generic `{ code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' }`
- In `NODE_ENV !== 'production'`: includes `err.stack` in the response for debugging

### `app.ts` updates

Middleware order:
1. `helmet()` — security headers, first in chain
2. `cors({ origin: env.CORS_ORIGIN, credentials: true })` — origin from typed env object
3. `express.json()` + `express.urlencoded()`
4. Routes (`/api`)
5. `notFound` — 404 catch-all
6. `errorHandler` — must be last

### `tsconfig` split

| File | Purpose |
|---|---|
| `tsconfig.json` | Development — includes `src/**/*` and `**/*.test.ts` |
| `tsconfig.build.json` | Production build — extends base, excludes test files |

`package.json` `build` script updated to use `tsconfig.build.json`.

`noUnusedLocals` and `noUnusedParameters` set to `true` in both configs.

### `helmet` dependency

Added as a runtime dependency. Applied as the first middleware in `app.ts` with no configuration (sane defaults). Covers: `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, `X-XSS-Protection`, and others.

## README Updates

- Add a "Project structure" section documenting the `src/` layout
- Explain the `controllers/` + `services/` convention: user creates these when adding features
- Document the required env variables (`PORT`, `NODE_ENV`, `CORS_ORIGIN`)
- Document `asyncHandler` usage with a short example
- Document `createAppError` usage with a short example

## What This Spec Does Not Cover

- Validation library (user choice)
- HTTP request logger (user choice)
- Test runner (user choice)
- Database integration (user choice)
- Authentication middleware (user adds as needed)
