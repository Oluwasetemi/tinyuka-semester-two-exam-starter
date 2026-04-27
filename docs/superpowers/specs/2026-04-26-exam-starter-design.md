# Exam Starter — Design Spec

**Date:** 2026-04-26  
**Project:** AltSchool Africa — React Second Semester Exam Starter  
**API:** https://api.oluwasetemi.dev (Posts + Comments)  
**Scaffold strategy:** Option B — layered scaffold. Working reference implementation for posts listing; students implement detail page, comments, context, and forms.

---

## 1. Goal

Produce a quality exam starter that:
- Is immediately runnable (`npm install && npm run dev`)
- Teaches by example — one working reference (posts listing) students can read before implementing their own
- Tests specific patterns taught in the AltSchool React curriculum: lifting state, props drilling → context refactor, `useReducer`, `useActionState`, `useFormStatus`, custom hooks, `Suspense`, `ErrorBoundary`, SEO with `@unhead/react`
- Has a landing page that acts as an interactive task board, with VSCode deep-links to every TODO file

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | React 19 + Vite 8 (React Compiler via babel already configured) |
| Router | React Router v7 (`react-router`) — taught in curriculum |
| Data fetching | TanStack Query v5 (`@tanstack/react-query`) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Icons | Lucide React |
| SEO | `@unhead/react` — `createHead`, `UnheadProvider`, `useHead` |
| Error boundaries | `react-error-boundary` (app usage) + class implementation (teaching reference) |
| Fonts | Familjen Grotesk (headings), JetBrains Mono (code/paths), DM Sans (body) — via Google Fonts |

---

## 3. Project Structure

Follows bulletproof-react conventions:
- kebab-case filenames throughout
- Route files (`src/app/routes/**`) use `export default` — required by React Router's lazy loading
- Feature components (`src/features/**/components/`) use named exports
- Routes in `src/app/routes/` — thin files that import feature components
- Feature code in `src/features/{feature}/api/` and `src/features/{feature}/components/`
- Shared UI in `src/components/ui/` and `src/components/layouts/`
- Paths config in `src/config/paths.js`
- API client in `src/lib/api-client.js`

```
src/
  app/
    provider.jsx            → QueryClientProvider + RouterProvider + UnheadProvider
    router.jsx              → createBrowserRouter, lazy routes, ErrorBoundary+Suspense per route
    routes/
      landing.jsx           → / — interactive task board (PROVIDED)
      not-found.jsx         → * — 404 page (PROVIDED)
      error-test.jsx        → /error-test — deliberately throws to demo boundary (PROVIDED)
      posts/
        posts.jsx           → /posts — working reference implementation (PROVIDED)
        post.jsx            → /posts/:id — (TODO: students implement)

  config/
    paths.js                → { home, posts, post, errorTest } with path + getHref (PROVIDED)
    env.js                  → VITE_API_URL = https://api.oluwasetemi.dev (PROVIDED)

  features/
    posts/
      api/
        get-posts.js        → useSuspenseQuery for paginated posts list (PROVIDED — reference)
        get-post.js         → (TODO: useSuspenseQuery for single post by id)
      components/
        posts-list.jsx      → maps posts → PostCard + Pagination (PROVIDED — reference)
        post-card.jsx       → single post card with title, excerpt, link (PROVIDED — reference)
        posts-list-skeleton.jsx   → skeleton matching posts-list layout (PROVIDED)
        post-view.jsx       → (TODO: full post detail display)
        post-view-skeleton.jsx    → (TODO: skeleton matching post-view layout)
        posts-filters.jsx   → search input + status filter — (TODO: connect to PostsContext)

    comments/
      api/
        get-comments.js     → (TODO: useSuspenseQuery for comments by postId)
        create-comment.js   → (TODO: useMutation to POST a comment, invalidate on success)
      components/
        comments-list.jsx   → (TODO: maps comments → CommentCard)
        comment-card.jsx    → (TODO: renders single comment — body, author, date)
        comments-list-skeleton.jsx  → (TODO: skeleton matching comments-list)
        create-comment.jsx  → (TODO: form using useActionState + useFormStatus)

  context/
    posts-context.jsx       → (TODO: createContext + useReducer for search/filter state)

  components/
    layouts/
      root-layout.jsx       → nav header + <Outlet /> (PROVIDED)
      content-layout.jsx    → page wrapper with title slot (PROVIDED)
    ui/
      skeleton.jsx          → base Skeleton component (PROVIDED)
      pagination.jsx        → page controls using useSearchParams (PROVIDED)
      error-boundary/
        error-boundary.jsx  → class component implementation as teaching reference (PROVIDED)
        error-fallback.jsx  → fallback UI with resetErrorBoundary button (PROVIDED)

  lib/
    api-client.js           → fetch wrapper with baseURL, JSON parse, error throw (PROVIDED)
    react-query.js          → QueryClient configured with suspense defaults (PROVIDED)

  main.jsx                  → mounts app, sets up UnheadProvider (PROVIDED)
```

---

## 4. Routes & Router

`src/app/router.jsx` uses `createBrowserRouter` with lazy loading per route. Every lazy route is wrapped:

```jsx
{
  path: paths.posts.path,
  lazy: async () => {
    const m = await import('./routes/posts/posts')
    return { Component: m.default }
  },
  ErrorBoundary: RouteErrorBoundary,
}
```

The root layout route wraps all app routes with `<ErrorBoundary>` + `<Suspense fallback={<PageSkeleton />}>` so every page transition has a skeleton fallback.

**Routes:**

| Path | File | Status |
|---|---|---|
| `/` | `routes/landing.jsx` | PROVIDED |
| `/posts` | `routes/posts/posts.jsx` | PROVIDED |
| `/posts/:id` | `routes/posts/post.jsx` | TODO |
| `/error-test` | `routes/error-test.jsx` | PROVIDED |
| `*` | `routes/not-found.jsx` | PROVIDED |

---

## 5. Data Fetching Pattern

All hooks use `useSuspenseQuery` (not `useQuery`) — no manual `isLoading` flags in components.

**Provided reference (`get-posts.js`):**
```js
export const getPostsQueryOptions = ({ page = 1 } = {}) =>
  queryOptions({
    queryKey: ['posts', { page }],
    queryFn: () => apiClient.get(`/posts?page=${page}&limit=10`),
  })

export const usePosts = ({ page } = {}) =>
  useSuspenseQuery(getPostsQueryOptions({ page }))
```

Students implement `get-post.js` and `get-comments.js` following the same pattern.

**Mutations (`create-comment.js` — TODO):**
```js
export const useCreateComment = ({ postId }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => apiClient.post(`/posts/${postId}/comments`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', postId] }),
  })
}
```

---

## 6. API Endpoints Used

Base URL: `https://api.oluwasetemi.dev`

| Endpoint | Used by |
|---|---|
| `GET /posts?page=N&limit=10` | `get-posts.js` (provided) |
| `GET /posts/:id` | `get-post.js` (TODO) |
| `GET /posts/:postId/comments` | `get-comments.js` (TODO) |
| `POST /posts/:postId/comments` | `create-comment.js` (TODO) |

No authentication required — all endpoints are publicly writable.

---

## 7. State Management Pattern

### Props drilling (provided, students read)
`routes/posts/posts.jsx` passes `search` and `filter` as props down to `features/posts/components/posts-list.jsx` → `features/posts/components/posts-filters.jsx`. Students see this working first.

### Context refactor (TODO)
`posts-context.jsx` — students implement:
```js
// useReducer shape
const initialState = { search: '', filter: 'all' } // filter: 'all' | 'published' | 'draft'

function postsReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH': ...
    case 'SET_FILTER': ...
    default: return state
  }
}
```

Then `posts-filters.jsx` — students replace props with `useContext(PostsContext)`.

---

## 8. Forms Pattern

`create-comment.jsx` uses React 19's `useActionState` + `useFormStatus`:

```jsx
// Signature students must implement
function CreateComment({ postId }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => { /* TODO */ },
    { error: null }
  )
  return (
    <form action={formAction}>
      {/* SubmitButton uses useFormStatus internally */}
    </form>
  )
}
```

A `SubmitButton` helper component is provided that uses `useFormStatus` to show pending state.

---

## 9. Error Boundary Setup

Two layers:

1. **Class component** in `components/ui/error-boundary/error-boundary.jsx` — teaching reference showing `getDerivedStateFromError` and `componentDidCatch`. Not used directly in the app.

2. **`react-error-boundary`** used in `router.jsx` wrapping every route, and in `routes/posts/post.jsx` wrapping the comments section independently so a comments fetch failure doesn't crash the post view.

`error-test.jsx` route throws unconditionally:
```jsx
export default function ErrorTestRoute() {
  throw new Error('This error is intentional — ErrorBoundary caught it!')
}
```

---

## 10. SEO

`@unhead/react` configured in `app/provider.jsx`:
```jsx
const head = createHead()
// <UnheadProvider head={head}> wraps the app
```

Every route calls `useHead()`:
```js
// Provided in landing.jsx and posts.jsx as reference
useHead({ title: 'Posts — Exam Starter', meta: [{ name: 'description', content: '...' }] })
// TODO in post.jsx — students set title to the post's title
```

---

## 11. Landing Page — "Code Dossier"

**Purpose:** Interactive task board replacing the default Vite welcome screen.  
**Aesthetic:** Dark (`#0C0C0E`), warm accents, monospaced file paths — feels native to a dev environment.

**Typography:**
- Headings: `Familjen Grotesk` (bold, geometric)
- File paths: `JetBrains Mono`
- Body: `DM Sans`

**Layout:**
- Top: large "React Exam" heading, course subtitle, animated progress bar (`X / Y tasks complete`)
- API quick-reference card: base URL + 4 endpoints with HTTP method badges
- Link: "→ View Reference Implementation" → `/posts`
- Task groups: 6 sections, each with a colored left-border stripe and concept badges
- Per task: file path chip (copyable), difficulty badge (easy/medium/hard), description, "Open in VS Code" button

**VSCode deep-links:**  
`vite.config.js` injects `__PROJECT_ROOT__` via `define: { __PROJECT_ROOT__: JSON.stringify(process.cwd()) }`.  
Button href: `` `vscode://file/${__PROJECT_ROOT__}/${task.file}` ``

**Task completion tracking:** `localStorage` key `exam-done` — object of `{ taskId: boolean }`. Students check off tasks as they complete them. Progress bar updates live.

**Task groups and files:**

| Group | Concept | Tasks (all TODO unless noted) |
|---|---|---|
| Routing | `useParams · useNavigate` | `routes/posts/post.jsx` |
| Data Fetching | `useSuspenseQuery · custom hooks` | `features/posts/api/get-post.js`, `features/comments/api/get-comments.js`, `features/comments/api/create-comment.js` |
| Components | `Props · composition` | `features/posts/components/post-view.jsx`, `features/comments/components/comments-list.jsx`, `features/comments/components/comment-card.jsx` |
| State Management | `useReducer · createContext · useContext` | `context/posts-context.jsx`, `features/posts/components/posts-filters.jsx` |
| Forms | `useActionState · useFormStatus` | `features/comments/components/create-comment.jsx` |
| Loading States | `Suspense · Skeleton UI` | `features/posts/components/post-view-skeleton.jsx`, `features/comments/components/comments-list-skeleton.jsx` |

---

## 12. Skeleton Components

All Suspense fallbacks use skeleton components, not spinners.

**Provided:**
- `posts-list-skeleton.jsx` — grid of 10 skeleton cards matching `post-card.jsx` dimensions
- `components/ui/skeleton.jsx` — base `<Skeleton className="..." />` using Tailwind animate-pulse

**TODO (students implement):**
- `post-view-skeleton.jsx` — matches the post detail layout (title block, body lines, meta)
- `comments-list-skeleton.jsx` — matches comments list (3–4 comment card shapes)

Students must match the skeleton layout to the real component they built — this tests whether they understand their own component's visual structure.

---

## 13. Pagination

`components/ui/pagination.jsx` — provided. Uses `useSearchParams` to read/write `?page=N`.  
Wired into `posts-list.jsx` (reference implementation). Students observe the pattern.

---

## 14. Vite Config Changes

```js
// vite.config.js additions
define: {
  __PROJECT_ROOT__: JSON.stringify(process.cwd()),
},
resolve: {
  alias: { '@': '/src' },
},
```

Path alias `@/` maps to `src/` — matches bulletproof-react import style.

---

## 15. Testing with Vitest

### Philosophy

Tests are **pre-written and ship with the starter**. They all fail on clone (TODOs unimplemented) and pass as students complete each task. Students run `npm run test` to see their progress — a passing test suite is the clearest signal that an implementation is correct.

Each test file maps 1:1 to a TODO file. Students know exactly which test validates which task.

### Testing Stack

| Package | Role |
|---|---|
| `vitest` | Test runner (Vite-native, fast) |
| `@testing-library/react` | Component rendering + queries |
| `@testing-library/user-event` | User interaction simulation |
| `@testing-library/jest-dom` | Custom matchers (`toBeInTheDocument`, etc.) |
| `msw` | Mock Service Worker — intercepts fetch calls to `api.oluwasetemi.dev` |
| `happy-dom` | DOM environment for Vitest (faster than jsdom) |

### Vitest Config (`vitest.config.js`)

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/testing/setup.js'],
    css: false,
  },
  resolve: {
    alias: { '@': '/src' },
  },
  define: {
    __PROJECT_ROOT__: JSON.stringify(process.cwd()),
  },
})
```

### Test Setup (`src/testing/setup.js`)

```js
import '@testing-library/jest-dom'
import { server } from './msw/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### MSW Handlers (`src/testing/msw/`)

```
src/testing/
  setup.js           → global test setup
  test-utils.jsx     → custom render() with all providers (QueryClient, Router, etc.)
  msw/
    server.js        → setupServer(...handlers)
    handlers.js      → HTTP handlers for all API endpoints used
```

`handlers.js` stubs all 4 endpoints:

```js
import { http, HttpResponse } from 'msw'

const BASE = 'https://api.oluwasetemi.dev'

export const handlers = [
  http.get(`${BASE}/posts`, ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    return HttpResponse.json({
      data: Array.from({ length: 10 }, (_, i) => ({
        id: `post-${(page - 1) * 10 + i + 1}`,
        title: `Post ${(page - 1) * 10 + i + 1}`,
        body: 'Post body content.',
        userId: 'user-1',
        createdAt: new Date().toISOString(),
      })),
      meta: { page, totalPages: 5, total: 50 },
    })
  }),

  http.get(`${BASE}/posts/:id`, ({ params }) =>
    HttpResponse.json({
      id: params.id,
      title: `Post ${params.id}`,
      body: 'Full post body.',
      userId: 'user-1',
      createdAt: new Date().toISOString(),
    }),
  ),

  http.get(`${BASE}/posts/:postId/comments`, ({ params }) =>
    HttpResponse.json({
      data: [
        { id: 'c-1', body: 'Great post!', postId: params.postId, userId: 'user-2', createdAt: new Date().toISOString() },
        { id: 'c-2', body: 'Thanks for sharing.', postId: params.postId, userId: 'user-3', createdAt: new Date().toISOString() },
      ],
      meta: { total: 2 },
    }),
  ),

  http.post(`${BASE}/posts/:postId/comments`, async ({ request, params }) => {
    const body = await request.json()
    return HttpResponse.json({
      id: 'c-new',
      body: body.body,
      postId: params.postId,
      userId: 'anonymous',
      createdAt: new Date().toISOString(),
    }, { status: 201 })
  }),
]
```

### Test Files

One test file per TODO. Named with `__tests__/` folders following bulletproof-react conventions.

#### `src/features/posts/api/__tests__/get-post.test.js`
Validates `usePost` hook:
- Fetches post by id using correct endpoint `/posts/:id`
- Returns `{ data: { id, title, body } }`
- Uses `useSuspenseQuery` (component suspends while loading)

#### `src/features/comments/api/__tests__/get-comments.test.js`
Validates `useComments` hook:
- Fetches comments for a postId using `/posts/:postId/comments`
- Returns `{ data: Comment[] }`

#### `src/features/comments/api/__tests__/create-comment.test.js`
Validates `useCreateComment` mutation:
- POSTs to `/posts/:postId/comments` with correct body
- Calls `queryClient.invalidateQueries` with `['comments', postId]` on success

#### `src/features/posts/components/__tests__/post-view.test.jsx`
Validates `PostView` component:
- Renders the post `title`
- Renders the post `body`
- Renders a formatted `createdAt` date
- Accepts a `post` prop of shape `{ id, title, body, createdAt }`

#### `src/features/comments/components/__tests__/comment-card.test.jsx`
Validates `CommentCard` component:
- Renders `comment.body`
- Renders `comment.userId` or author identifier
- Accepts a `comment` prop

#### `src/features/comments/components/__tests__/comments-list.test.jsx`
Validates `CommentsList` component:
- Renders the correct number of `CommentCard` elements
- Accepts a `comments` prop (array)
- Renders empty state when array is empty

#### `src/features/comments/components/__tests__/create-comment.test.jsx`
Validates `CreateComment` form:
- Renders a textarea and submit button
- Submit button shows a pending/loading state while submitting
- On successful submit, the textarea is cleared
- On error, an error message is displayed
- Uses `useActionState` — form `action` attribute is set (not `onSubmit`)

#### `src/context/__tests__/posts-context.test.jsx`
Validates `PostsContext` + `postsReducer`:
- `PostsProvider` exposes `{ search, filter, dispatch }` via context
- `SET_SEARCH` action updates `search` value
- `SET_FILTER` action updates `filter` value
- Default state is `{ search: '', filter: 'all' }`
- Consuming a component outside `PostsProvider` throws a helpful error

#### `src/app/routes/posts/__tests__/post.test.jsx`
Validates the `/posts/:id` route:
- Renders the post title fetched for the route param `id`
- Renders comments section below the post
- Has a back button that navigates to `/posts`
- Page `<title>` is updated to the post's title (SEO via `useHead`)

### `package.json` Scripts

```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run",
  "test:ui": "vitest --ui",
  "coverage": "vitest run --coverage"
}
```

Students see output like:

```
 ✓ src/features/posts/api/__tests__/get-post.test.js        (2 tests)
 ✓ src/features/comments/api/__tests__/get-comments.test.js (2 tests)
 ✗ src/features/comments/api/__tests__/create-comment.test.js — not implemented yet
 ...
 Tests  4 passed | 7 failed
```

### Landing Page Integration

The landing page reads test file paths and displays them alongside each task card — students can see which test file validates their work before opening it.

---

## 16. Dependencies to Install

```
react-router
@tanstack/react-query
@unhead/react
react-error-boundary
lucide-react
tailwindcss (v4)
@tailwindcss/vite
shadcn/ui (via CLI)
vitest
@vitest/ui
@testing-library/react
@testing-library/user-event
@testing-library/jest-dom
msw
happy-dom
```

---

## 17. README

A `README.md` is provided covering:
- Project description and exam context
- Tech stack
- Installation (`npm install`)
- Dev server (`npm run dev`)
- API reference (base URL + endpoints)
- Folder structure overview
- Task list with concept-to-file mapping
- Submission instructions (GitHub repo, live URL)
