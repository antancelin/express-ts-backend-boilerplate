# Boilerplate Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add proper structure, error handling, security headers, and typed env config to the Express TypeScript boilerplate without introducing any opinion on database, validation library, or test runner.

**Architecture:** New files are grouped into `src/config/`, `src/middleware/`, and `src/types/`. All error handling flows through a central `AppError` type, an `asyncHandler` wrapper, and a global `errorHandler` middleware. Env vars are validated at startup via `src/config/env.ts` before the HTTP server starts.

**Tech Stack:** Express 5, TypeScript 6, helmet (new runtime dep), Node.js native only for everything else.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `src/types/index.ts` | `AppError` interface + `createAppError` factory |
| Create | `src/types/express.ts` | `Express.Request` extension placeholder |
| Create | `src/config/env.ts` | Parse + validate `process.env`, export typed `env` object |
| Create | `src/middleware/asyncHandler.ts` | Wrap async handlers, forward errors to `next()` |
| Create | `src/middleware/notFound.ts` | Catch-all 404 — create `AppError` and call `next(err)` |
| Create | `src/middleware/errorHandler.ts` | Global 4-arg Express error middleware |
| Modify | `src/server.ts` | Import `env.ts` first, use `env.PORT` |
| Modify | `src/app.ts` | Add `helmet`, cors from env, mount `notFound` + `errorHandler` |
| Modify | `tsconfig.json` | Enable `noUnusedLocals`/`noUnusedParameters`, drop test exclude |
| Create | `tsconfig.build.json` | Extends base tsconfig, excludes test files for prod build |
| Modify | `package.json` | Add `helmet` dep, update `build` script to use `tsconfig.build.json` |
| Modify | `.env.example` | Add `CORS_ORIGIN` variable |
| Modify | `README.md` | Update project structure, env vars, add usage examples |

---

## Task 1 — Install helmet, update build script

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install helmet**

```bash
npm install helmet
```

Expected: `helmet` appears in `dependencies` in `package.json`.

- [ ] **Step 2: Update the build script in `package.json`**

Change:
```json
"build": "tsc",
```
To:
```json
"build": "tsc -p tsconfig.build.json",
```

- [ ] **Step 3: Verify typecheck still passes**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore(deps): add helmet, update build to use tsconfig.build.json"
```

---

## Task 2 — Split TypeScript config

**Files:**
- Modify: `tsconfig.json`
- Create: `tsconfig.build.json`

- [ ] **Step 1: Update `tsconfig.json`**

Replace the entire file content with:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 2: Create `tsconfig.build.json`**

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
```

- [ ] **Step 3: Verify both configs compile**

```bash
npm run typecheck && npm run build
```

Expected: no errors, `dist/` is emitted.

- [ ] **Step 4: Clean dist**

```bash
npm run clean
```

- [ ] **Step 5: Commit**

```bash
git add tsconfig.json tsconfig.build.json
git commit -m "chore(ts): split tsconfig, enable noUnusedLocals and noUnusedParameters"
```

---

## Task 3 — `src/types/index.ts`

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Create `src/types/index.ts`**

```ts
export interface AppError extends Error {
  status: number;
  code: string;
  publicMessage: string;
}

export function createAppError(
  status: number,
  code: string,
  publicMessage: string
): AppError {
  const error = new Error(publicMessage) as AppError;
  error.status = status;
  error.code = code;
  error.publicMessage = publicMessage;
  return error;
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat(types): add AppError interface and createAppError factory"
```

---

## Task 4 — `src/types/express.ts`

**Files:**
- Create: `src/types/express.ts`

- [ ] **Step 1: Create `src/types/express.ts`**

```ts
declare global {
  namespace Express {
    interface Request {
      // user?: { id: string; email: string }; // uncomment when adding auth middleware
    }
  }
}

export {};
```

The `export {}` is required to make this file a module — without it, `declare global` is invalid.

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/express.ts
git commit -m "feat(types): add Express.Request extension placeholder"
```

---

## Task 5 — `src/config/env.ts` + update `.env.example`

**Files:**
- Create: `src/config/env.ts`
- Modify: `.env.example`

- [ ] **Step 1: Create `src/config/env.ts`**

```ts
const REQUIRED_VARS = ["NODE_ENV", "CORS_ORIGIN"] as const;

for (const key of REQUIRED_VARS) {
  if (!process.env[key]) {
    console.error(`[env] Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
  CORS_ORIGIN: process.env.CORS_ORIGIN as string,
};
```

`PORT` defaults to `3000` if absent. `NODE_ENV` and `CORS_ORIGIN` are required — missing either causes an immediate `process.exit(1)` with a clear message before the server starts.

- [ ] **Step 2: Update `.env.example`**

Replace the entire content with:

```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

- [ ] **Step 3: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/config/env.ts .env.example
git commit -m "feat(config): add env validation with process.exit on missing required vars"
```

---

## Task 6 — `src/middleware/asyncHandler.ts`

**Files:**
- Create: `src/middleware/asyncHandler.ts`

- [ ] **Step 1: Create `src/middleware/asyncHandler.ts`**

```ts
import { NextFunction, Request, RequestHandler, Response } from "express";

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
```

Wraps an async handler and forwards any rejected promise to `next(err)`, removing the need for `try/catch` in every route.

Usage in routes:
```ts
router.get("/resource", asyncHandler(async (req, res) => {
  const data = await someService.get(req.params.id);
  res.json(data);
}));
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/middleware/asyncHandler.ts
git commit -m "feat(middleware): add asyncHandler wrapper"
```

---

## Task 7 — `src/middleware/notFound.ts`

**Files:**
- Create: `src/middleware/notFound.ts`

- [ ] **Step 1: Create `src/middleware/notFound.ts`**

```ts
import { NextFunction, Request, Response } from "express";
import { createAppError } from "../types";

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  next(createAppError(404, "NOT_FOUND", `Route ${req.method} ${req.path} not found`));
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/middleware/notFound.ts
git commit -m "feat(middleware): add notFound catch-all middleware"
```

---

## Task 8 — `src/middleware/errorHandler.ts`

**Files:**
- Create: `src/middleware/errorHandler.ts`

- [ ] **Step 1: Create `src/middleware/errorHandler.ts`**

```ts
import { ErrorRequestHandler } from "express";
import { AppError } from "../types";

const isAppError = (err: unknown): err is AppError =>
  err instanceof Error && "status" in err && "code" in err && "publicMessage" in err;

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (isAppError(err)) {
    const body: Record<string, unknown> = {
      code: err.code,
      message: err.publicMessage,
    };
    if (process.env.NODE_ENV !== "production") {
      body.stack = err.stack;
    }
    res.status(err.status).json(body);
    return;
  }

  const body: Record<string, unknown> = {
    code: "INTERNAL_ERROR",
    message: "An unexpected error occurred",
  };
  if (process.env.NODE_ENV !== "production" && err instanceof Error) {
    body.stack = err.stack;
    body.details = err.message;
  }
  res.status(500).json(body);
};
```

Notes:
- `ErrorRequestHandler` type from Express guarantees Express recognizes this as an error handler (4-arg signature, `fn.length === 4`).
- `_req` and `_next` use underscore prefix to satisfy `noUnusedParameters`.
- In `production`, stack traces are stripped from all responses.

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/middleware/errorHandler.ts
git commit -m "feat(middleware): add global errorHandler middleware"
```

---

## Task 9 — Update `src/server.ts`

**Files:**
- Modify: `src/server.ts`

- [ ] **Step 1: Replace `src/server.ts`**

```ts
import "./config/env";
import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
});
```

`import "./config/env"` must be the first line. It runs the env validation before any other module is loaded. The second import of `env` gets the cached module — validation only runs once.

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/server.ts
git commit -m "refactor(server): import env first, use typed env object"
```

---

## Task 10 — Update `src/app.ts`

**Files:**
- Modify: `src/app.ts`

- [ ] **Step 1: Replace `src/app.ts`**

```ts
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import routes from "./routes";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
```

Middleware order is intentional:
1. `helmet` — security headers first, before any response can be sent
2. `cors` — allow/deny origins before processing the request body
3. `express.json` / `express.urlencoded` — parse body
4. Routes
5. `notFound` — catches anything the router didn't match
6. `errorHandler` — must be last (4-arg signature)

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app.ts
git commit -m "feat(app): add helmet, cors from env, notFound and errorHandler middlewares"
```

---

## Task 11 — Update `README.md`

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace the "Project Structure" section**

Find:
```markdown
## Project Structure

\`\`\`
src/
├── controllers/    # Business logic
├── routes/         # Route definitions
├── middlewares/    # Custom middlewares
├── utils/          # Utility functions
├── config/         # Configuration files
├── types/          # TypeScript type definitions
├── app.ts          # Express app configuration
└── server.ts       # Application entry point
\`\`\`
```

Replace with:
```markdown
## Project Structure

\`\`\`
src/
├── config/
│   └── env.ts          # Validates process.env at startup, exports typed config
├── middleware/
│   ├── asyncHandler.ts  # Wraps async handlers, forwards errors to next()
│   ├── errorHandler.ts  # Global Express error middleware
│   └── notFound.ts      # 404 catch-all
├── types/
│   ├── index.ts         # AppError interface + createAppError factory
│   └── express.ts       # Express.Request extension (add req.user etc. here)
├── routes/
│   └── index.ts         # Route definitions
├── app.ts               # Express app configuration
└── server.ts            # Entry point
\`\`\`

When adding features, create `src/controllers/` for HTTP handling and `src/services/` for business logic. These are intentionally absent from the boilerplate — they're always feature-specific.
```

- [ ] **Step 2: Replace the "Environment Variables" section**

Find:
```markdown
## Environment Variables

Copy `.env.example` to `.env` and configure:

\`\`\`
PORT=3000
NODE_ENV=development
\`\`\`
```

Replace with:
```markdown
## Environment Variables

Copy `.env.example` to `.env` and configure:

\`\`\`
PORT=3000              # optional, defaults to 3000
NODE_ENV=development   # required: development | production | test
CORS_ORIGIN=http://localhost:5173  # required: allowed origin for CORS
\`\`\`

`NODE_ENV` and `CORS_ORIGIN` are required — the server exits immediately with a clear error message if either is missing.
```

- [ ] **Step 3: Add a "Error Handling" section after "Environment Variables"**

```markdown
## Error Handling

Use `createAppError` to create typed errors anywhere in your code:

\`\`\`ts
import { createAppError } from "./types";

// In a service or controller:
throw createAppError(404, "USER_NOT_FOUND", "User does not exist");
// → responds with: { code: "USER_NOT_FOUND", message: "User does not exist" }
\`\`\`

Use `asyncHandler` to wrap async route handlers — no `try/catch` needed:

\`\`\`ts
import { asyncHandler } from "./middleware/asyncHandler";

router.get("/users/:id", asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) throw createAppError(404, "USER_NOT_FOUND", "User does not exist");
  res.json(user);
}));
\`\`\`

Unhandled errors return `{ code: "INTERNAL_ERROR", message: "An unexpected error occurred" }`. Stack traces are included in non-production responses.
```

- [ ] **Step 4: Update the "What's Included" section to add helmet**

Find the `### Core Framework` bullet list and add:

```markdown
- **helmet** - Secure HTTP headers (XSS protection, clickjacking prevention, etc.)
```

- [ ] **Step 5: Typecheck and smoke test**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add README.md
git commit -m "docs(readme): update project structure, env vars, add error handling examples"
```

---

## Task 12 — Smoke test + final build

- [ ] **Step 1: Copy env example and start dev server**

```bash
cp .env.example .env
npm run dev
```

Expected output:
```
Server running on port 3000 [development]
```

- [ ] **Step 2: Test health endpoint**

```bash
curl http://localhost:3000/api/health
```

Expected:
```json
{ "status": "OK", "timestamp": "...", "message": "API is healthy! 💚" }
```

- [ ] **Step 3: Test 404 catch-all**

```bash
curl http://localhost:3000/api/does-not-exist
```

Expected:
```json
{ "code": "NOT_FOUND", "message": "Route GET /api/does-not-exist not found", "stack": "..." }
```

- [ ] **Step 4: Stop dev server and run full build**

```bash
npm run build
```

Expected: `dist/` emitted, no errors.

- [ ] **Step 5: Clean**

```bash
npm run clean
```

- [ ] **Step 6: Final commit if anything was adjusted**

If any files were tweaked during smoke test:
```bash
git add -p
git commit -m "fix: address issues found during smoke test"
```
