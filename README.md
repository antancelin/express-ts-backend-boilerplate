# Express TypeScript Backend Boilerplate

A ready-to-use GitHub template for Express backends with TypeScript.

**Stack:** Express 5, TypeScript, helmet, CORS, dotenv, ESLint, Prettier, commitlint, semantic-release.

## Quick Start

Requires Node.js >= 26.12.1.

Click **"Use this template"** on GitHub, then:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_NEW_PROJECT
cd YOUR_NEW_PROJECT
npm install
cp .env.example .env
npm run dev
```

Check it works at `http://localhost:3000/api/health`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start with auto-reload |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run the compiled app |
| `npm run typecheck` | Check types without emitting files |
| `npm run lint` / `lint:fix` | Run ESLint, or fix issues |
| `npm run format` / `format:check` | Format with Prettier, or only check |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NODE_ENV` | Yes | `development`, `production` or `test` |
| `CORS_ORIGIN` | Yes | Allowed origin for CORS |
| `PORT` | No | Defaults to `3000` |

The server exits at startup if a required variable is missing.

## Project Structure

```
src/
├── config/env.ts   # Validates env variables, exports typed config
├── middleware/     # asyncHandler, errorHandler, notFound
├── routes/         # Route definitions
├── types/          # AppError, Express.Request extensions
├── app.ts          # Express app configuration
└── server.ts       # Entry point
```

Add `src/controllers/` and `src/services/` as your features need them.

## Error Handling

Wrap async handlers with `asyncHandler` and throw errors with `createAppError`:

```ts
router.get("/users/:id", asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) throw createAppError(404, "USER_NOT_FOUND", "User does not exist");
  res.json(user);
}));
// → 404 { code: "USER_NOT_FOUND", message: "User does not exist" }
```

Any other error returns a 500 with `code: "INTERNAL_ERROR"`. Stack traces are only included outside production.

## CI and Releases

Every PR runs format, lint, typecheck and build. Every merge to `main` runs the same checks, then semantic-release publishes a GitHub Release based on [Conventional Commits](https://www.conventionalcommits.org/). See [RELEASE.md](./RELEASE.md) for details.

## Contributing

Fork the repository, create a feature branch, follow the commit convention, and open a pull request.

## License

MIT — see `LICENSE`

---

Made with Express.js by [Antoine Ancelin](https://github.com/antancelin)
