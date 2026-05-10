# Express TypeScript Backend Boilerplate

A ready-to-use boilerplate for quickly creating Express backends with TypeScript.

## Requirements

- Node.js >= 22.0.0
- npm or yarn

## Quick Start

> **This is a GitHub template!** Click **"Use this template"** above to create your own project.

```bash
# After creating your project from template:
git clone https://github.com/YOUR_USERNAME/YOUR_NEW_PROJECT
cd YOUR_NEW_PROJECT
npm install
cp .env.example .env
npm run dev
```

Your server will be running at `http://localhost:3000`

## Available Scripts

### Development & Build

- `npm run dev` - Development mode with auto-reload
- `npm run build` - TypeScript compilation
- `npm run typecheck` - Type-check without emitting files
- `npm run start` - Production mode
- `npm run clean` - Clean dist folder

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without modifying files

### Commits & Release

- `npm run commitlint` - Validate commit message format
- `npm run semantic-release` - Trigger a release (CI only)

## Project Structure

```
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
```

When adding features, create `src/controllers/` for HTTP handling and `src/services/` for business logic. These are intentionally absent from the boilerplate — they're always feature-specific.

## Default Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
PORT=3000              # optional, defaults to 3000
NODE_ENV=development   # required: development | production | test
CORS_ORIGIN=http://localhost:5173  # required: allowed origin for CORS
```

`NODE_ENV` and `CORS_ORIGIN` are required — the server exits immediately with a clear error message if either is missing.

## Error Handling

Use `createAppError` to create typed errors anywhere in your code:

```ts
import { createAppError } from "./types";

// In a service or controller:
throw createAppError(404, "USER_NOT_FOUND", "User does not exist");
// → responds with: { code: "USER_NOT_FOUND", message: "User does not exist" }
```

Use `asyncHandler` to wrap async route handlers — no `try/catch` needed:

```ts
import { asyncHandler } from "./middleware/asyncHandler";

router.get("/users/:id", asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) throw createAppError(404, "USER_NOT_FOUND", "User does not exist");
  res.json(user);
}));
```

Unhandled errors return `{ code: "INTERNAL_ERROR", message: "An unexpected error occurred" }`. Stack traces are included in non-production responses.

## What's Included

### Core Framework

- **Express.js 5.x** - Fast and modern web framework
- **TypeScript** - Type safety and better developer experience
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables management
- **helmet** - Secure HTTP headers (XSS protection, clickjacking prevention, etc.)
- **tsx** - Fast TypeScript execution with auto-reload

### Code Quality

- **ESLint** - Code linting with TypeScript support
- **Prettier** - Opinionated code formatter
- **Flat Config** - Modern ESLint configuration (`eslint.config.mjs`)

### CI/CD

- **GitHub Actions CI** - Runs on every PR: format check, lint, typecheck, build
- **Semantic Release** - Automated versioning and GitHub Releases on merge to `main`
- **Commitlint** - Enforces conventional commit format
- **Branch protection** - `main` requires CI to pass and PR approval before merge

## CI/CD Workflow

### On pull requests

The **CI** workflow runs automatically on every PR targeting `main`:

```
format:check → lint → typecheck → build
```

All checks must pass before the PR can be merged.

### On merge to main

The **Release** workflow runs the same checks, then triggers semantic-release:

```
format:check → lint → typecheck → build → release
```

semantic-release analyzes commit messages since the last release and, if a release is warranted, creates a **GitHub Release** with auto-generated notes. No commits are pushed back to `main` — the release lives entirely in GitHub Releases.

### Commit convention

Releases are driven by [Conventional Commits](https://www.conventionalcommits.org/):

| Commit type | Version bump |
|---|---|
| `feat` | minor `1.x.0` |
| `fix` | patch `1.0.x` |
| `chore`, `docs`, `refactor` | patch `1.0.x` |
| `feat!` / `BREAKING CHANGE` | major `x.0.0` |

Examples:

```bash
git commit -m "feat(auth): add JWT token validation middleware"
git commit -m "fix(api): resolve CORS issue for external domains"
git commit -m "docs(readme): update installation instructions"
git commit -m "chore(deps): update express to 5.1.0"
```

## Easy Extensions

```bash
# Security & Performance
npm install helmet morgan compression

# Data Validation
npm install express-validator

# Authentication
npm install jsonwebtoken bcryptjs

# Database (MongoDB)
npm install mongoose

# Database (PostgreSQL)
npm install pg @types/pg
```

## Contributing

1. Fork this repository
2. Create a feature branch
3. Follow the commit convention above
4. Open a pull request — CI runs automatically
5. Wait for review and approval

See [RELEASE.md](./RELEASE.md) for details on the release process.

## Changelog

- Updated all dependencies — TypeScript 6, ESLint 10, commitlint 21, Express 5.2
- Migrated to GitHub-native releases — no bot commits to `main`, compatible with branch protection
- Added CI workflow on pull requests (format, lint, typecheck, build)
- Added branch protection on `main` — PR + CI required for external contributors
- Added ESLint, Prettier, and Commitlint configuration
- Initial Express TypeScript boilerplate setup

See [GitHub Releases](https://github.com/antancelin/express-ts-backend-boilerplate/releases) for full history.

## License

MIT — see `LICENSE`

---

Made with Express.js by [Antoine Ancelin](https://github.com/antancelin)
