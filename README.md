# React Exam Starter

AltSchool Africa — Second Semester React Examination Project.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:5173 to see the task board.

## API

Base URL: `https://api.oluwasetemi.dev`
Docs: https://api.oluwasetemi.dev/reference
No authentication required.

| Method | Endpoint | Used by |
|---|---|---|
| GET | `/posts?page=N&limit=10` | Provided reference |
| GET | `/posts/:id` | Your task |
| GET | `/posts/:postId/comments` | Your task |
| POST | `/posts/:postId/comments` | Your task |

## Checking Your Work

```bash
npm run test        # watch mode
npm run test:run    # single run
npm run test:ui     # browser UI
```

All 29 tests fail on a fresh clone. Each test maps to one TODO file.
A green test suite = complete implementation.

## Tech Stack

- React 19 + Vite 8 (React Compiler enabled)
- React Router v7
- TanStack Query v5
- Tailwind CSS v4 + shadcn/ui
- @unhead/react for SEO
- react-error-boundary
- Vitest + MSW + Testing Library

## Project Structure

```
src/
  app/routes/        → Page components (route layer)
  features/          → Feature modules (posts, comments)
  context/           → Shared React context
  components/        → Shared UI + layouts
  lib/               → API client, QueryClient
  config/            → Paths, env vars
  testing/           → Vitest setup, MSW handlers
```

## Submission

1. Push to a **private** GitHub repository
2. Add `@Oluwasetemi` as a collaborator
3. Deploy to Vercel / Netlify / Pipeops
4. Submit GitHub URL + live URL via the Google Form
