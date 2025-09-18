# Express TypeScript Backend Boilerplate

🚀 A ready-to-use boilerplate for quickly creating Express backends with TypeScript.

## Quick Start

```bash
git clone https://github.com/antancelin/express-ts-backend-boilerplate
cd express-ts-backend-boilerplate
npm install
cp .env.example .env
npm run dev
```

Your server will be running at `http://localhost:3000` 🎉

## Available Scripts

### Development & Build

- `npm run dev` - Development mode with auto-reload
- `npm run build` - TypeScript compilation
- `npm run start` - Production mode
- `npm run clean` - Clean dist folder

### Release & Commits

- `npm run commitlint` - Validate commit message format
- `npm run semantic-release` - Create automated release (CI only)

## Project Structure

```
src/
├── controllers/    # Business logic
├── routes/         # Route definitions
├── middlewares/    # Custom middlewares
├── utils/          # Utility functions
├── config/         # Configuration files
├── types/          # TypeScript type definitions
├── app.ts          # Express app configuration
└── server.ts       # Application entry point
```

## Default Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
PORT=3000
NODE_ENV=development
```

## What's Included

### Core Framework

✅ **Express.js** - Fast web framework  
✅ **TypeScript** - Type safety  
✅ **CORS** - Cross-origin resource sharing  
✅ **dotenv** - Environment variables  
✅ **Nodemon** - Auto-restart in development

### Release Management

✅ **Semantic Release** - Automated versioning and releases  
✅ **Commitlint** - Enforce conventional commit format  
✅ **GitHub Actions** - CI/CD pipeline for releases

## Easy Extensions

Add more features with one command:

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

## Usage as Template

1. Click "Use this template" on GitHub
2. Clone your new repository
3. Run `npm install`
4. Start coding! 🚀

## Release System

This project uses **automated semantic releases** with GitHub Actions:

### Commit Convention

Use conventional commits for automatic versioning:

```bash
feat: add new feature        # → minor version bump (1.0.0 → 1.1.0)
fix: fix a bug              # → patch version bump (1.0.0 → 1.0.1)
docs: update documentation  # → patch version bump
chore: update dependencies  # → patch version bump

# Breaking changes → major version bump (1.0.0 → 2.0.0)
feat!: breaking API change
feat: new feature

BREAKING CHANGE: API endpoint changed
```

### Manual Commits

Create commits manually following the convention:

```bash
git add .
git commit -m "feat(auth): add JWT token validation middleware"
git commit -m "fix(api): resolve CORS issue for external domains"
git commit -m "docs(readme): update installation instructions"
```

### Automatic Releases

- Every push to `main` triggers a release check
- Versions are bumped automatically based on commit types
- Changelog is generated automatically
- GitHub releases are created with release notes

## Contributing

1. Fork the project
2. Create a feature branch
3. Use conventional commits (see examples above)
4. Push to your fork and submit a pull request

Feel free to submit issues and pull requests!
