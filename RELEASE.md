# Release Process

This project uses [semantic-release](https://semantic-release.gitbook.io/) to automate versioning and GitHub releases.

## How it works

Every push to `main` triggers the **Release** GitHub Actions workflow, which:

1. Checks formatting, linting, and types
2. Builds the project
3. Analyzes commit messages since the last release
4. If a release is warranted, creates a **GitHub Release** with auto-generated release notes

No bot ever pushes commits back to `main` — the version bump only lives in the GitHub Release tag.

## Commit conventions

Releases are triggered by [Conventional Commits](https://www.conventionalcommits.org/):

| Commit type | Release |
|---|---|
| `feat` | `minor` (1.x.0) |
| `fix` | `patch` (1.0.x) |
| `chore`, `docs`, `refactor` | `patch` (1.0.x) |
| `feat!` / `BREAKING CHANGE` | `major` (x.0.0) |

## Branch protection

The `main` branch should be protected with the following rules:

- Require pull request reviews before merging
- Require status checks to pass before merging (`CI` workflow)
- Do not allow direct pushes

All changes go through a PR, where the **CI** workflow runs format, lint, typecheck, and build checks automatically.

## Releases history

All releases are available on the [GitHub Releases](../../releases) page.
