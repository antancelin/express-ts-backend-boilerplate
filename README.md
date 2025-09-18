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

- `npm run dev` - Development mode with auto-reload
- `npm run build` - TypeScript compilation
- `npm run start` - Production mode
- `npm run clean` - Clean dist folder

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

✅ **Express.js** - Fast web framework  
✅ **TypeScript** - Type safety  
✅ **CORS** - Cross-origin resource sharing  
✅ **dotenv** - Environment variables  
✅ **Nodemon** - Auto-restart in development

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

## Contributing

Feel free to submit issues and pull requests!
