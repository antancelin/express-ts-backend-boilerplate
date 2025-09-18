# Express TypeScript Backend Boilerplate

🚀 A ready-to-use boilerplate for quickly creating Express backends with TypeScript.

## Quick Start

> **💡 This is a GitHub template!** Click **"Use this template"** above to create your own project.

```bash
# After creating your project from template:
git clone https://github.com/YOUR_USERNAME/YOUR_NEW_PROJECT
cd YOUR_NEW_PROJECT
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

## 🚀 Use as Template

### For New Projects (Recommended)

1. Click the **"Use this template"** button above
2. Create your new repository with a custom name
3. Clone and set up your project:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_NEW_PROJECT
   cd YOUR_NEW_PROJECT
   npm install
   cp .env.example .env  # Configure your environment
   npm run dev
   ```
4. Start building your API! 🎉

### For Template Development

If you want to improve this template itself:

1. **Fork** this repository
2. Make your improvements
3. Submit a **pull request**

> **💡 Tip:** Use "Use this template" for your projects, "Fork" only to contribute back to this template.

## Release System

This project uses **automated semantic releases** with GitHub Actions:

### Commit Convention

Use conventional commits for automatic versioning:

```bash
feat: add new feature       # → minor version bump (1.0.0 → 1.1.0)
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
