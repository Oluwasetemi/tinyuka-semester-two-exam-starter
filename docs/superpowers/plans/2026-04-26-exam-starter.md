# Exam Starter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality React exam starter with a working posts reference implementation, 11 student TODO stubs each with a pre-written failing Vitest test, and a "Code Dossier" landing page with VSCode deep-links.

**Architecture:** Bulletproof-react feature-based structure (`src/features/{feature}/api/` + `src/features/{feature}/components/`). Routes are thin files in `src/app/routes/` that import feature components. All data fetching uses `useSuspenseQuery` — no `isLoading` flags. Every route is lazy-loaded and wrapped in `ErrorBoundary` + `Suspense`.

**Tech Stack:** React 19, Vite 8, React Router v7, TanStack Query v5, Tailwind CSS v4, shadcn/ui, @unhead/react, react-error-boundary, Vitest, MSW, @testing-library/react

---

## File Map

### Created (provided scaffold)
| File | Purpose |
|---|---|
| `vite.config.js` | Add `__PROJECT_ROOT__` define + `@` alias + Tailwind plugin |
| `vitest.config.js` | Vitest config extending vite config |
| `src/main.jsx` | Mount app with UnheadProvider |
| `src/app/provider.jsx` | QueryClientProvider + RouterProvider |
| `src/app/router.jsx` | createBrowserRouter, lazy routes, Suspense+ErrorBoundary |
| `src/config/paths.js` | Route path constants with getHref helpers |
| `src/config/env.js` | VITE_API_URL |
| `src/lib/api-client.js` | fetch wrapper with baseURL + JSON handling |
| `src/lib/react-query.js` | QueryClient singleton |
| `src/components/layouts/root-layout.jsx` | Nav + Outlet |
| `src/components/layouts/content-layout.jsx` | Page wrapper with title prop |
| `src/components/ui/skeleton.jsx` | Base Skeleton component |
| `src/components/ui/pagination.jsx` | Page controls via useSearchParams |
| `src/components/ui/error-boundary/error-boundary.jsx` | Class component teaching reference |
| `src/components/ui/error-boundary/error-fallback.jsx` | Fallback UI with reset button |
| `src/features/posts/api/get-posts.js` | usePosts reference implementation |
| `src/features/posts/components/post-card.jsx` | Single post card (reference) |
| `src/features/posts/components/posts-list.jsx` | Posts grid + pagination (reference) |
| `src/features/posts/components/posts-list-skeleton.jsx` | Skeleton for posts grid |
| `src/features/posts/components/posts-filters.jsx` | Search + filter (props drilling reference) |
| `src/app/routes/landing.jsx` | Code Dossier task board |
| `src/app/routes/not-found.jsx` | 404 page |
| `src/app/routes/error-test.jsx` | Intentional throw for ErrorBoundary demo |
| `src/app/routes/posts/posts.jsx` | Posts listing route (reference) |
| `src/testing/setup.js` | Vitest global setup |
| `src/testing/test-utils.jsx` | Custom render with all providers |
| `src/testing/msw/server.js` | MSW server |
| `src/testing/msw/handlers.js` | HTTP handlers for all 4 endpoints |

### Created (student TODO stubs + tests)
| Stub | Test |
|---|---|
| `src/app/routes/posts/post.jsx` | `src/app/routes/posts/__tests__/post.test.jsx` |
| `src/features/posts/api/get-post.js` | `src/features/posts/api/__tests__/get-post.test.js` |
| `src/features/posts/components/post-view.jsx` | `src/features/posts/components/__tests__/post-view.test.jsx` |
| `src/features/posts/components/post-view-skeleton.jsx` | *(tested indirectly via post route test)* |
| `src/features/posts/components/posts-filters.jsx` | `src/features/posts/components/__tests__/posts-filters.test.jsx` |
| `src/features/comments/api/get-comments.js` | `src/features/comments/api/__tests__/get-comments.test.js` |
| `src/features/comments/api/create-comment.js` | `src/features/comments/api/__tests__/create-comment.test.js` |
| `src/features/comments/components/comment-card.jsx` | `src/features/comments/components/__tests__/comment-card.test.jsx` |
| `src/features/comments/components/comments-list.jsx` | `src/features/comments/components/__tests__/comments-list.test.jsx` |
| `src/features/comments/components/comments-list-skeleton.jsx` | *(tested indirectly via post route test)* |
| `src/features/comments/components/create-comment.jsx` | `src/features/comments/components/__tests__/create-comment.test.jsx` |
| `src/context/posts-context.jsx` | `src/context/__tests__/posts-context.test.jsx` |

### Modified
| File | Change |
|---|---|
| `vite.config.js` | Add define, alias, Tailwind plugin |
| `src/index.css` | Replace with Tailwind v4 import + Google Fonts |
| `src/main.jsx` | Replace with UnheadProvider + App mount |
| `package.json` | Add all dependencies + test scripts |

### Deleted
- `src/App.jsx`
- `src/App.css`

---

## Task 1: Install Production Dependencies

**Files:** `package.json`

- [ ] **Step 1: Install runtime packages**

```bash
npm install react-router @tanstack/react-query @unhead/react react-error-boundary lucide-react
```

Expected: packages added to `dependencies` in `package.json`.

- [ ] **Step 2: Install Tailwind v4 + shadcn**

```bash
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Install dev/test packages**

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/user-event @testing-library/jest-dom msw happy-dom
```

- [ ] **Step 4: Verify installs**

```bash
npm ls react-router @tanstack/react-query vitest msw --depth=0
```

Expected: all 4 listed at their installed versions, no errors.

- [ ] **Step 5: Commit**

```bash
git init && git add package.json package-lock.json
git commit -m "chore: install all dependencies"
```

---

## Task 2: Configure Vite + Tailwind

**Files:** `vite.config.js`, `src/index.css`, delete `src/App.css`, delete `src/App.jsx`

- [ ] **Step 1: Rewrite vite.config.js**

```js
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: { '@': '/src' },
  },
  define: {
    __PROJECT_ROOT__: JSON.stringify(process.cwd()),
  },
})
```

- [ ] **Step 2: Replace src/index.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
@import "tailwindcss";

:root {
  --font-heading: 'Familjen Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-body: 'DM Sans', sans-serif;
}

body {
  font-family: var(--font-body);
  background: #0c0c0e;
  color: #f0efe8;
}
```

- [ ] **Step 3: Delete legacy files**

```bash
rm src/App.jsx src/App.css
```

- [ ] **Step 4: Create vitest.config.js** (extends vite config, inherits alias + define)

```js
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'happy-dom',
      globals: true,
      setupFiles: ['./src/testing/setup.js'],
      css: false,
    },
  }),
)
```

- [ ] **Step 5: Add test scripts to package.json**

Add under `"scripts"`:
```json
"test": "vitest",
"test:run": "vitest run",
"test:ui": "vitest --ui",
"coverage": "vitest run --coverage"
```

- [ ] **Step 6: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted: choose the defaults, select "Default" style, use slate base color, yes to CSS variables. This writes `components.json` and updates `src/index.css`.

- [ ] **Step 7: Commit**

```bash
git add vite.config.js vitest.config.js src/index.css package.json components.json
git commit -m "chore: configure vite, tailwind v4, vitest, shadcn"
```

---

## Task 3: Config Files

**Files:** `src/config/paths.js`, `src/config/env.js`

- [ ] **Step 1: Create src/config/env.js**

```js
export const env = {
  API_URL: import.meta.env.VITE_API_URL ?? 'https://api.oluwasetemi.dev',
}
```

- [ ] **Step 2: Create src/config/paths.js**

```js
export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  posts: {
    path: '/posts',
    getHref: () => '/posts',
  },
  post: {
    path: '/posts/:id',
    getHref: (id) => `/posts/${id}`,
  },
  errorTest: {
    path: '/error-test',
    getHref: () => '/error-test',
  },
}
```

- [ ] **Step 3: Commit**

```bash
git add src/config/
git commit -m "feat: add paths and env config"
```

---

## Task 4: API Client + React Query

**Files:** `src/lib/api-client.js`, `src/lib/react-query.js`

- [ ] **Step 1: Create src/lib/api-client.js**

```js
import { env } from '@/config/env'

async function fetchJSON(path, options = {}) {
  const response = await fetch(`${env.API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText)
    throw new Error(`API Error ${response.status}: ${message}`)
  }
  return response.json()
}

export const apiClient = {
  get: (path) => fetchJSON(path),
  post: (path, data) =>
    fetchJSON(path, { method: 'POST', body: JSON.stringify(data) }),
  patch: (path, data) =>
    fetchJSON(path, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (path) => fetchJSON(path, { method: 'DELETE' }),
}
```

- [ ] **Step 2: Create src/lib/react-query.js**

```js
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
})
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/
git commit -m "feat: add api client and query client"
```

---

## Task 5: Shared UI Components

**Files:** `src/components/ui/skeleton.jsx`, `src/components/ui/pagination.jsx`, `src/components/ui/error-boundary/error-boundary.jsx`, `src/components/ui/error-boundary/error-fallback.jsx`

- [ ] **Step 1: Create src/components/ui/skeleton.jsx**

```jsx
export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/10 ${className}`}
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Create src/components/ui/pagination.jsx**

```jsx
import { useSearchParams } from 'react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ totalPages, currentPage }) {
  const [, setSearchParams] = useSearchParams()

  function goToPage(page) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(page))
      return next
    })
  }

  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-8"
    >
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className="p-2 rounded-md border border-white/10 disabled:opacity-40 hover:bg-white/5 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <span className="text-sm text-white/60 px-3">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className="p-2 rounded-md border border-white/10 disabled:opacity-40 hover:bg-white/5 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}
```

- [ ] **Step 3: Create src/components/ui/error-boundary/error-boundary.jsx**

```jsx
import { Component } from 'react'

/**
 * Teaching reference: class component Error Boundary.
 * getDerivedStateFromError updates state when a child throws.
 * componentDidCatch receives error + info for logging.
 *
 * In this project, react-error-boundary is used in production code.
 * This file exists so students can study the underlying class pattern.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert" className="p-6 text-center">
          <h2 className="text-lg font-semibold text-red-400">Something went wrong</h2>
          <pre className="mt-2 text-sm text-white/50">{this.state.error?.message}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
```

- [ ] **Step 4: Create src/components/ui/error-boundary/error-fallback.jsx**

```jsx
export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center"
    >
      <p className="text-4xl mb-4">⚠️</p>
      <h2 className="text-xl font-semibold text-red-400 mb-2">
        Something went wrong
      </h2>
      <pre className="text-sm text-white/50 mb-6 max-w-md overflow-auto">
        {error.message}
      </pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/
git commit -m "feat: add shared UI components (skeleton, pagination, error boundary)"
```

---

## Task 6: Layout Components

**Files:** `src/components/layouts/root-layout.jsx`, `src/components/layouts/content-layout.jsx`

- [ ] **Step 1: Create src/components/layouts/root-layout.jsx**

```jsx
import { Outlet, Link, NavLink } from 'react-router'
import { paths } from '@/config/paths'

export function RootLayout() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>
      <header className="border-b border-white/10 px-6 py-4">
        <nav className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to={paths.home.getHref()}
            className="font-semibold text-sm tracking-wide hover:text-white/70 transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            exam-starter
          </Link>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <NavLink
              to={paths.posts.getHref()}
              className={({ isActive }) =>
                isActive ? 'text-white' : 'hover:text-white transition-colors'
              }
            >
              Posts
            </NavLink>
            <NavLink
              to={paths.errorTest.getHref()}
              className={({ isActive }) =>
                isActive ? 'text-white' : 'hover:text-white transition-colors'
              }
            >
              Error Test
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Create src/components/layouts/content-layout.jsx**

```jsx
export function ContentLayout({ title, children }) {
  return (
    <section>
      {title && (
        <h1
          className="text-3xl font-bold mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h1>
      )}
      {children}
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layouts/
git commit -m "feat: add layout components"
```

---

## Task 7: Test Infrastructure

**Files:** `src/testing/setup.js`, `src/testing/test-utils.jsx`, `src/testing/msw/server.js`, `src/testing/msw/handlers.js`

- [ ] **Step 1: Create src/testing/msw/handlers.js**

```js
import { http, HttpResponse } from 'msw'

const BASE = 'https://api.oluwasetemi.dev'

const makePosts = (page) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `post-${(page - 1) * 10 + i + 1}`,
    title: `Test Post ${(page - 1) * 10 + i + 1}`,
    body: 'Test post body content for automated testing.',
    userId: 'user-1',
    createdAt: '2024-01-15T10:00:00.000Z',
  }))

export const handlers = [
  http.get(`${BASE}/posts`, ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    return HttpResponse.json({
      data: makePosts(page),
      meta: { page, totalPages: 5, total: 50 },
    })
  }),

  http.get(`${BASE}/posts/:id`, ({ params }) =>
    HttpResponse.json({
      id: params.id,
      title: `Test Post ${params.id}`,
      body: 'Full test post body content.',
      userId: 'user-1',
      createdAt: '2024-01-15T10:00:00.000Z',
    }),
  ),

  http.get(`${BASE}/posts/:postId/comments`, ({ params }) =>
    HttpResponse.json({
      data: [
        {
          id: 'c-1',
          body: 'Great post!',
          postId: params.postId,
          userId: 'user-2',
          createdAt: '2024-01-15T11:00:00.000Z',
        },
        {
          id: 'c-2',
          body: 'Thanks for sharing.',
          postId: params.postId,
          userId: 'user-3',
          createdAt: '2024-01-15T12:00:00.000Z',
        },
      ],
      meta: { total: 2 },
    }),
  ),

  http.post(`${BASE}/posts/:postId/comments`, async ({ request, params }) => {
    const body = await request.json()
    return HttpResponse.json(
      {
        id: 'c-new',
        body: body.body,
        postId: params.postId,
        userId: 'anonymous',
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    )
  }),
]
```

- [ ] **Step 2: Create src/testing/msw/server.js**

```js
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

- [ ] **Step 3: Create src/testing/setup.js**

```js
import '@testing-library/jest-dom'
import { server } from './msw/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

- [ ] **Step 4: Create src/testing/test-utils.jsx**

```jsx
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

export function renderWithProviders(ui, { route = '/', ...options } = {}) {
  const queryClient = makeQueryClient()

  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    )
  }

  return {
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...options }),
  }
}

export * from '@testing-library/react'
```

- [ ] **Step 5: Run a quick smoke test to verify MSW + vitest are wired up**

Create a temporary file `src/testing/__tests__/smoke.test.js`:

```js
import { server } from '../msw/server'

test('MSW server can be started', () => {
  expect(server).toBeDefined()
})
```

Run:
```bash
npm run test:run -- src/testing/__tests__/smoke.test.js
```

Expected: `1 passed`.

- [ ] **Step 6: Delete smoke test + commit**

```bash
rm src/testing/__tests__/smoke.test.js
git add src/testing/
git commit -m "feat: add vitest + msw test infrastructure"
```

---

## Task 8: Reference Implementation — Posts API + Components

**Files:** `src/features/posts/api/get-posts.js`, `src/features/posts/components/post-card.jsx`, `src/features/posts/components/posts-list-skeleton.jsx`

- [ ] **Step 1: Create src/features/posts/api/get-posts.js**

```js
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

export const getPostsQueryOptions = ({ page = 1 } = {}) =>
  queryOptions({
    queryKey: ['posts', { page }],
    queryFn: () => apiClient.get(`/posts?page=${page}&limit=10`),
  })

export function usePosts({ page = 1 } = {}) {
  return useSuspenseQuery(getPostsQueryOptions({ page }))
}
```

- [ ] **Step 2: Create src/features/posts/components/post-card.jsx**

```jsx
import { Link } from 'react-router'
import { paths } from '@/config/paths'
import { Calendar } from 'lucide-react'

export function PostCard({ post }) {
  return (
    <article className="group border border-white/10 rounded-lg p-5 hover:border-white/25 hover:bg-white/[0.02] transition-all">
      <Link to={paths.post.getHref(post.id)} className="block">
        <h2
          className="font-semibold text-base mb-2 group-hover:text-white/80 transition-colors line-clamp-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {post.title}
        </h2>
        <p className="text-sm text-white/50 line-clamp-3 mb-4">{post.body}</p>
        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <Calendar className="w-3 h-3" />
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </div>
      </Link>
    </article>
  )
}
```

- [ ] **Step 3: Create src/features/posts/components/posts-list-skeleton.jsx**

```jsx
import { Skeleton } from '@/components/ui/skeleton'

export function PostsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="border border-white/10 rounded-lg p-5 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-3 w-24 mt-2" />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/features/posts/
git commit -m "feat: add posts reference implementation (api + card + skeleton)"
```

---

## Task 9: Reference Implementation — PostsList + PostsFilters (Props Drilling)

**Files:** `src/features/posts/components/posts-list.jsx`, `src/features/posts/components/posts-filters.jsx`

- [ ] **Step 1: Create src/features/posts/components/posts-filters.jsx**

This is the reference version that receives `search`, `filter`, `onSearchChange`, `onFilterChange` as props (props drilling pattern students will later refactor to use context).

```jsx
import { Search } from 'lucide-react'

export function PostsFilters({ search, filter, onSearchChange, onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="search"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors"
          aria-label="Search posts"
        />
      </div>

      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors"
        aria-label="Filter by status"
      >
        <option value="all">All posts</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>
    </div>
  )
}
```

- [ ] **Step 2: Create src/features/posts/components/posts-list.jsx**

```jsx
import { useSearchParams } from 'react-router'
import { usePosts } from '../api/get-posts'
import { PostCard } from './post-card'
import { Pagination } from '@/components/ui/pagination'

export function PostsList({ search, filter }) {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)

  const { data } = usePosts({ page })
  const posts = data?.data ?? []
  const meta = data?.meta

  const filtered = posts.filter((post) => {
    const matchesSearch = search
      ? post.title.toLowerCase().includes(search.toLowerCase())
      : true
    const matchesFilter =
      filter === 'all' ? true : post.status === filter
    return matchesSearch && matchesFilter
  })

  if (filtered.length === 0) {
    return (
      <p className="text-center text-white/40 py-16 text-sm">
        No posts found. Try a different search or filter.
      </p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {meta && (
        <Pagination totalPages={meta.totalPages} currentPage={meta.page} />
      )}
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/posts/components/posts-list.jsx src/features/posts/components/posts-filters.jsx
git commit -m "feat: add posts-list and posts-filters (props drilling reference)"
```

---

## Task 10: App Provider + Router + main.jsx

**Files:** `src/app/provider.jsx`, `src/app/router.jsx`, `src/main.jsx`, `src/app/routes/not-found.jsx`, `src/app/routes/error-test.jsx`

- [ ] **Step 1: Create src/app/routes/not-found.jsx**

```jsx
import { Link } from 'react-router'
import { paths } from '@/config/paths'
import { useHead } from '@unhead/react'

export default function NotFoundRoute() {
  useHead({ title: '404 — Page Not Found' })

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p
        className="text-8xl font-bold text-white/10 mb-4 select-none"
        style={{ fontFamily: 'var(--font-mono)' }}
        aria-hidden="true"
      >
        404
      </p>
      <h1
        className="text-2xl font-semibold mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Page not found
      </h1>
      <p className="text-white/50 text-sm mb-8 max-w-sm">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to={paths.home.getHref()}
        className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
      >
        Go home
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Create src/app/routes/error-test.jsx**

```jsx
/**
 * This route intentionally throws an error.
 * Visit /error-test to see the ErrorBoundary in action.
 */
export default function ErrorTestRoute() {
  throw new Error(
    'This error is intentional — the ErrorBoundary caught it! Check router.jsx to see how it is configured.',
  )
}
```

- [ ] **Step 3: Create src/app/router.jsx**

```jsx
import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/ui/error-boundary/error-fallback'
import { RootLayout } from '@/components/layouts/root-layout'
import { PostsListSkeleton } from '@/features/posts/components/posts-list-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { paths } from '@/config/paths'

function PageSkeleton() {
  return (
    <div className="space-y-4 py-4">
      <Skeleton className="h-8 w-48" />
      <PostsListSkeleton />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<PageSkeleton />}>
          <RootLayout />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        lazy: async () => {
          const m = await import('./routes/landing')
          return { Component: m.default }
        },
      },
      {
        path: paths.posts.path,
        lazy: async () => {
          const m = await import('./routes/posts/posts')
          return { Component: m.default }
        },
      },
      {
        path: paths.post.path,
        lazy: async () => {
          const m = await import('./routes/posts/post')
          return { Component: m.default }
        },
      },
      {
        path: paths.errorTest.path,
        lazy: async () => {
          const m = await import('./routes/error-test')
          return { Component: m.default }
        },
      },
      {
        path: '*',
        lazy: async () => {
          const m = await import('./routes/not-found')
          return { Component: m.default }
        },
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
```

- [ ] **Step 4: Create src/app/provider.jsx**

```jsx
import { QueryClientProvider } from '@tanstack/react-query'
import { createHead, UnheadProvider } from '@unhead/react/client'
import { queryClient } from '@/lib/react-query'
import { AppRouter } from './router'

const head = createHead()

export function App() {
  return (
    <UnheadProvider head={head}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </UnheadProvider>
  )
}
```

- [ ] **Step 5: Rewrite src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/provider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 6: Commit**

```bash
git add src/app/ src/main.jsx
git commit -m "feat: add app provider, router, and static routes"
```

---

## Task 11: Posts Route (Reference) + Landing Stub

**Files:** `src/app/routes/posts/posts.jsx`, `src/app/routes/landing.jsx` (stub only)

- [ ] **Step 1: Create src/app/routes/posts/posts.jsx**

```jsx
import { Suspense, useState } from 'react'
import { useHead } from '@unhead/react'
import { ErrorBoundary } from 'react-error-boundary'
import { ContentLayout } from '@/components/layouts/content-layout'
import { PostsList } from '@/features/posts/components/posts-list'
import { PostsListSkeleton } from '@/features/posts/components/posts-list-skeleton'
import { PostsFilters } from '@/features/posts/components/posts-filters'
import { ErrorFallback } from '@/components/ui/error-boundary/error-fallback'

export default function PostsRoute() {
  useHead({
    title: 'Posts — Exam Starter',
    meta: [{ name: 'description', content: 'Browse all posts.' }],
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  return (
    <ContentLayout title="Posts">
      {/* PostsFilters receives search/filter as props — this is the props drilling pattern.
          Your task: refactor this to use PostsContext instead (see context/posts-context.jsx) */}
      <PostsFilters
        search={search}
        filter={filter}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList search={search} filter={filter} />
        </Suspense>
      </ErrorBoundary>
    </ContentLayout>
  )
}
```

- [ ] **Step 2: Create src/app/routes/landing.jsx (stub — full version in Task 17)**

```jsx
import { useHead } from '@unhead/react'
import { Link } from 'react-router'
import { paths } from '@/config/paths'

export default function LandingRoute() {
  useHead({ title: 'React Exam Starter — AltSchool Africa' })

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-4xl font-bold mb-4">
          React Exam Starter
        </h1>
        <p className="text-white/50 mb-6">Full landing page coming in Task 17</p>
        <Link
          to={paths.posts.getHref()}
          className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
        >
          View Reference Implementation →
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Start dev server and verify the app loads**

```bash
npm run dev
```

Visit `http://localhost:5173` — should show the stub landing page.
Visit `http://localhost:5173/posts` — should show 10 post cards with pagination.
Visit `http://localhost:5173/error-test` — should show the error fallback UI.
Visit `http://localhost:5173/nonexistent` — should show the 404 page.

- [ ] **Step 4: Commit**

```bash
git add src/app/routes/
git commit -m "feat: add posts route reference implementation and landing stub"
```

---

## Task 12: Student Stub + Test — usePost Hook

**Files:** `src/features/posts/api/get-post.js`, `src/features/posts/api/__tests__/get-post.test.js`

- [ ] **Step 1: Write the failing test**

Create `src/features/posts/api/__tests__/get-post.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { usePost, getPostQueryOptions } from '../get-post'

function makeWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('usePost', () => {
  it('returns post data for a given id', async () => {
    const { result } = renderHook(() => usePost('post-1'), {
      wrapper: makeWrapper(),
    })
    await waitFor(() => expect(result.current.data).toBeDefined())
    expect(result.current.data.id).toBe('post-1')
    expect(result.current.data.title).toBe('Test Post post-1')
    expect(result.current.data.body).toBeDefined()
  })

  it('getPostQueryOptions uses correct query key', () => {
    const opts = getPostQueryOptions('post-42')
    expect(opts.queryKey).toEqual(['posts', 'post-42'])
  })
})
```

- [ ] **Step 2: Create the stub src/features/posts/api/get-post.js**

```js
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

// TODO: Implement getPostQueryOptions and usePost
//
// getPostQueryOptions(id) should return queryOptions({
//   queryKey: ['posts', id],
//   queryFn: () => apiClient.get(`/posts/${id}`),
// })
//
// usePost(id) should call useSuspenseQuery(getPostQueryOptions(id))
// and return the result.
//
// Reference: src/features/posts/api/get-posts.js

export const getPostQueryOptions = (id) => {
  throw new Error('TODO: implement getPostQueryOptions in get-post.js')
}

export function usePost(id) {
  throw new Error('TODO: implement usePost in get-post.js')
}
```

- [ ] **Step 3: Run the test and confirm it fails**

```bash
npm run test:run -- src/features/posts/api/__tests__/get-post.test.js
```

Expected: `2 failed` — `Error: TODO: implement getPostQueryOptions in get-post.js`

- [ ] **Step 4: Commit**

```bash
git add src/features/posts/api/
git commit -m "test: add failing tests for usePost hook (student TODO)"
```

---

## Task 13: Student Stub + Test — useComments Hook

**Files:** `src/features/comments/api/get-comments.js`, `src/features/comments/api/__tests__/get-comments.test.js`

- [ ] **Step 1: Write the failing test**

Create `src/features/comments/api/__tests__/get-comments.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useComments, getCommentsQueryOptions } from '../get-comments'

function makeWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('useComments', () => {
  it('returns comments array for a given postId', async () => {
    const { result } = renderHook(() => useComments('post-1'), {
      wrapper: makeWrapper(),
    })
    await waitFor(() => expect(result.current.data).toBeDefined())
    expect(Array.isArray(result.current.data.data)).toBe(true)
    expect(result.current.data.data).toHaveLength(2)
    expect(result.current.data.data[0].body).toBe('Great post!')
  })

  it('getCommentsQueryOptions uses correct query key', () => {
    const opts = getCommentsQueryOptions('post-99')
    expect(opts.queryKey).toEqual(['comments', 'post-99'])
  })
})
```

- [ ] **Step 2: Create the stub src/features/comments/api/get-comments.js**

```js
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

// TODO: Implement getCommentsQueryOptions and useComments
//
// getCommentsQueryOptions(postId) should return queryOptions({
//   queryKey: ['comments', postId],
//   queryFn: () => apiClient.get(`/posts/${postId}/comments`),
// })
//
// useComments(postId) should call useSuspenseQuery(getCommentsQueryOptions(postId))
//
// Reference: src/features/posts/api/get-posts.js

export const getCommentsQueryOptions = (postId) => {
  throw new Error('TODO: implement getCommentsQueryOptions in get-comments.js')
}

export function useComments(postId) {
  throw new Error('TODO: implement useComments in get-comments.js')
}
```

- [ ] **Step 3: Run the test and confirm it fails**

```bash
npm run test:run -- src/features/comments/api/__tests__/get-comments.test.js
```

Expected: `2 failed`

- [ ] **Step 4: Commit**

```bash
git add src/features/comments/api/
git commit -m "test: add failing tests for useComments hook (student TODO)"
```

---

## Task 14: Student Stub + Test — useCreateComment Mutation

**Files:** `src/features/comments/api/create-comment.js`, `src/features/comments/api/__tests__/create-comment.test.js`

- [ ] **Step 1: Write the failing test**

Create `src/features/comments/api/__tests__/create-comment.test.js`:

```js
import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useCreateComment } from '../create-comment'

function makeWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } })
  return { queryClient, wrapper: ({ children }) =>
    createElement(QueryClientProvider, { client: queryClient }, children) }
}

describe('useCreateComment', () => {
  it('posts a comment to the correct endpoint', async () => {
    const { wrapper } = makeWrapper()
    const { result } = renderHook(() => useCreateComment({ postId: 'post-1' }), { wrapper })

    act(() => {
      result.current.mutate({ body: 'My test comment' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data.body).toBe('My test comment')
    expect(result.current.data.postId).toBe('post-1')
  })

  it('invalidates comments query on success', async () => {
    const { queryClient, wrapper } = makeWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useCreateComment({ postId: 'post-5' }), { wrapper })

    act(() => result.current.mutate({ body: 'Test' }))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(invalidateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['comments', 'post-5'] }),
    )
  })
})
```

- [ ] **Step 2: Create the stub src/features/comments/api/create-comment.js**

```js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

// TODO: Implement useCreateComment
//
// useCreateComment({ postId }) should:
// 1. Call useMutation with:
//    mutationFn: (data) => apiClient.post(`/posts/${postId}/comments`, data)
// 2. On success, invalidate the comments query:
//    queryClient.invalidateQueries({ queryKey: ['comments', postId] })
// 3. Return the mutation result
//
// Reference: https://tanstack.com/query/latest/docs/framework/react/guides/mutations

export function useCreateComment({ postId }) {
  throw new Error('TODO: implement useCreateComment in create-comment.js')
}
```

- [ ] **Step 3: Run test and confirm it fails**

```bash
npm run test:run -- src/features/comments/api/__tests__/create-comment.test.js
```

Expected: `2 failed`

- [ ] **Step 4: Commit**

```bash
git add src/features/comments/api/
git commit -m "test: add failing tests for useCreateComment mutation (student TODO)"
```

---

## Task 15: Student Stubs + Tests — PostView + CommentCard

**Files:** `src/features/posts/components/post-view.jsx`, `src/features/posts/components/__tests__/post-view.test.jsx`, `src/features/comments/components/comment-card.jsx`, `src/features/comments/components/__tests__/comment-card.test.jsx`

- [ ] **Step 1: Write failing test for PostView**

Create `src/features/posts/components/__tests__/post-view.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostView } from '../post-view'

const mockPost = {
  id: 'post-1',
  title: 'My Test Post Title',
  body: 'This is the full body content of the post.',
  userId: 'user-1',
  createdAt: '2024-01-15T10:00:00.000Z',
}

describe('PostView', () => {
  it('renders the post title', () => {
    render(<PostView post={mockPost} />)
    expect(screen.getByRole('heading', { name: /my test post title/i })).toBeInTheDocument()
  })

  it('renders the post body', () => {
    render(<PostView post={mockPost} />)
    expect(screen.getByText(/full body content/i)).toBeInTheDocument()
  })

  it('renders the creation date', () => {
    render(<PostView post={mockPost} />)
    expect(screen.getByText(/jan.*2024|2024.*jan/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Create stub src/features/posts/components/post-view.jsx**

```jsx
// TODO: Implement PostView component
//
// PostView receives a `post` prop with shape:
//   { id, title, body, userId, createdAt }
//
// It should render:
// - An <h1> or heading element with post.title
// - A paragraph or section with post.body
// - The formatted createdAt date (use new Date(post.createdAt).toLocaleDateString())
//
// Accessibility: use semantic HTML (<article>, <time datetime={post.createdAt}>)

export function PostView({ post }) {
  throw new Error('TODO: implement PostView in post-view.jsx')
}
```

- [ ] **Step 3: Write failing test for CommentCard**

Create `src/features/comments/components/__tests__/comment-card.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CommentCard } from '../comment-card'

const mockComment = {
  id: 'c-1',
  body: 'This is a great comment.',
  postId: 'post-1',
  userId: 'user-2',
  createdAt: '2024-01-15T11:00:00.000Z',
}

describe('CommentCard', () => {
  it('renders the comment body', () => {
    render(<CommentCard comment={mockComment} />)
    expect(screen.getByText(/this is a great comment/i)).toBeInTheDocument()
  })

  it('renders the author userId', () => {
    render(<CommentCard comment={mockComment} />)
    expect(screen.getByText(/user-2/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 4: Create stub src/features/comments/components/comment-card.jsx**

```jsx
// TODO: Implement CommentCard component
//
// CommentCard receives a `comment` prop with shape:
//   { id, body, postId, userId, createdAt }
//
// It should render:
// - comment.body text
// - comment.userId as the author
// - The formatted createdAt date (optional but recommended)
//
// Accessibility: wrap in <article> with appropriate aria attributes

export function CommentCard({ comment }) {
  throw new Error('TODO: implement CommentCard in comment-card.jsx')
}
```

- [ ] **Step 5: Run both tests and confirm they fail**

```bash
npm run test:run -- src/features/posts/components/__tests__/post-view.test.jsx src/features/comments/components/__tests__/comment-card.test.jsx
```

Expected: `5 failed`

- [ ] **Step 6: Commit**

```bash
git add src/features/posts/components/ src/features/comments/components/comment-card.jsx src/features/comments/components/__tests__/
git commit -m "test: add failing tests for PostView and CommentCard (student TODO)"
```

---

## Task 16: Student Stubs + Tests — CommentsList + Skeletons

**Files:** `src/features/comments/components/comments-list.jsx`, `src/features/comments/components/__tests__/comments-list.test.jsx`, `src/features/posts/components/post-view-skeleton.jsx`, `src/features/comments/components/comments-list-skeleton.jsx`

- [ ] **Step 1: Write failing test for CommentsList**

Create `src/features/comments/components/__tests__/comments-list.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CommentsList } from '../comments-list'

const mockComments = [
  { id: 'c-1', body: 'First comment', postId: 'post-1', userId: 'user-2', createdAt: '2024-01-15T11:00:00.000Z' },
  { id: 'c-2', body: 'Second comment', postId: 'post-1', userId: 'user-3', createdAt: '2024-01-15T12:00:00.000Z' },
  { id: 'c-3', body: 'Third comment', postId: 'post-1', userId: 'user-4', createdAt: '2024-01-15T13:00:00.000Z' },
]

describe('CommentsList', () => {
  it('renders all comments', () => {
    render(<CommentsList comments={mockComments} />)
    expect(screen.getByText(/first comment/i)).toBeInTheDocument()
    expect(screen.getByText(/second comment/i)).toBeInTheDocument()
    expect(screen.getByText(/third comment/i)).toBeInTheDocument()
  })

  it('renders correct number of comment items', () => {
    render(<CommentsList comments={mockComments} />)
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('renders an empty state when no comments', () => {
    render(<CommentsList comments={[]} />)
    expect(screen.getByText(/no comments/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Create stub src/features/comments/components/comments-list.jsx**

```jsx
// TODO: Implement CommentsList component
//
// CommentsList receives a `comments` prop (array of comment objects).
//
// It should:
// - Map over comments and render a <CommentCard> for each
// - Pass each comment as the `comment` prop to CommentCard
// - Use comment.id as the React key
// - Render an empty state message when comments.length === 0
//   (e.g. <p>No comments yet. Be the first!</p>)
//
// Import CommentCard from './comment-card'

export function CommentsList({ comments }) {
  throw new Error('TODO: implement CommentsList in comments-list.jsx')
}
```

- [ ] **Step 3: Create stub src/features/posts/components/post-view-skeleton.jsx**

```jsx
// TODO: Implement PostViewSkeleton
//
// This component is used as the Suspense fallback for the post detail view.
// It should visually match the layout of PostView:
// - A large skeleton for the title
// - Several lines of skeleton for the body paragraphs
// - A small skeleton for the date
//
// Import Skeleton from '@/components/ui/skeleton'
// Use className props to control width and height (e.g. "h-8 w-3/4", "h-4 w-full")

import { Skeleton } from '@/components/ui/skeleton'

export function PostViewSkeleton() {
  throw new Error('TODO: implement PostViewSkeleton in post-view-skeleton.jsx')
}
```

- [ ] **Step 4: Create stub src/features/comments/components/comments-list-skeleton.jsx**

```jsx
// TODO: Implement CommentsListSkeleton
//
// This component is used as the Suspense fallback for the comments section.
// It should visually match the layout of CommentsList with 3-4 CommentCard shapes.
// Each skeleton card should have space for a body line and an author line.
//
// Import Skeleton from '@/components/ui/skeleton'

import { Skeleton } from '@/components/ui/skeleton'

export function CommentsListSkeleton() {
  throw new Error('TODO: implement CommentsListSkeleton in comments-list-skeleton.jsx')
}
```

- [ ] **Step 5: Run test and confirm it fails**

```bash
npm run test:run -- src/features/comments/components/__tests__/comments-list.test.jsx
```

Expected: `3 failed`

- [ ] **Step 6: Commit**

```bash
git add src/features/comments/components/ src/features/posts/components/post-view-skeleton.jsx
git commit -m "test: add failing tests for CommentsList + skeleton stubs (student TODO)"
```

---

## Task 17: Student Stub + Test — CreateComment Form

**Files:** `src/features/comments/components/create-comment.jsx`, `src/features/comments/components/__tests__/create-comment.test.jsx`

- [ ] **Step 1: Create the provided SubmitButton helper**

Create `src/features/comments/components/submit-button.jsx`:

```jsx
import { useFormStatus } from 'react-dom'

export function SubmitButton({ label = 'Submit', pendingLabel = 'Submitting...' }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-md text-sm transition-colors"
    >
      {pending ? pendingLabel : label}
    </button>
  )
}
```

- [ ] **Step 2: Write the failing test**

Create `src/features/comments/components/__tests__/create-comment.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'
import { CreateComment } from '../create-comment'

function Wrapper({ children }) {
  const qc = new QueryClient({ defaultOptions: { mutations: { retry: false } } })
  return (
    <QueryClientProvider client={qc}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  )
}

describe('CreateComment', () => {
  it('renders a textarea and submit button', () => {
    render(<CreateComment postId="post-1" />, { wrapper: Wrapper })
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add comment|submit/i })).toBeInTheDocument()
  })

  it('uses form action attribute (useActionState), not onSubmit', () => {
    render(<CreateComment postId="post-1" />, { wrapper: Wrapper })
    const form = screen.getByRole('form') ?? document.querySelector('form')
    expect(form).not.toBeNull()
  })

  it('clears textarea after successful submission', async () => {
    const user = userEvent.setup()
    render(<CreateComment postId="post-1" />, { wrapper: Wrapper })

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'My new comment')
    expect(textarea).toHaveValue('My new comment')

    const button = screen.getByRole('button', { name: /add comment|submit/i })
    await user.click(button)

    await waitFor(() => expect(textarea).toHaveValue(''))
  })

  it('shows an error message when submission fails', async () => {
    const user = userEvent.setup()
    // Override handler to return error
    const { server } = await import('@/testing/msw/server')
    const { http, HttpResponse } = await import('msw')
    server.use(
      http.post('https://api.oluwasetemi.dev/posts/:postId/comments', () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 }),
      ),
    )

    render(<CreateComment postId="post-1" />, { wrapper: Wrapper })
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Bad comment')
    await user.click(screen.getByRole('button', { name: /add comment|submit/i }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toBeInTheDocument(),
    )
  })
})
```

- [ ] **Step 3: Create stub src/features/comments/components/create-comment.jsx**

```jsx
import { useActionState } from 'react'
import { SubmitButton } from './submit-button'

// TODO: Implement CreateComment using useActionState + useFormStatus
//
// CreateComment receives: { postId }
//
// Implementation steps:
// 1. Use useActionState(async (prevState, formData) => { ... }, { error: null })
//    Inside the action:
//    - Read the body: formData.get('body')
//    - POST to the API using apiClient.post(`/posts/${postId}/comments`, { body })
//    - On success: return { error: null } (cleared state)
//    - On error: return { error: error.message }
//
// 2. Return a <form action={formAction}> (NOT onSubmit)
//    - A <textarea name="body" /> for the comment
//    - <SubmitButton label="Add Comment" pendingLabel="Adding..." />
//    - An error display: {state.error && <p role="alert">{state.error}</p>}
//
// Import apiClient from '@/lib/api-client'
// Import SubmitButton from './submit-button' (already provided above)
//
// Reference: https://react.dev/reference/react/useActionState

export function CreateComment({ postId }) {
  throw new Error('TODO: implement CreateComment in create-comment.jsx')
}
```

- [ ] **Step 4: Run test and confirm it fails**

```bash
npm run test:run -- src/features/comments/components/__tests__/create-comment.test.jsx
```

Expected: `4 failed`

- [ ] **Step 5: Commit**

```bash
git add src/features/comments/components/
git commit -m "test: add failing tests for CreateComment form (student TODO)"
```

---

## Task 18: Student Stub + Test — PostsContext

**Files:** `src/context/posts-context.jsx`, `src/context/__tests__/posts-context.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/context/__tests__/posts-context.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'
import { PostsContext, PostsProvider } from '../posts-context'

function Consumer() {
  const ctx = useContext(PostsContext)
  if (!ctx) throw new Error('PostsContext must be used within PostsProvider')
  return (
    <div>
      <span data-testid="search">{ctx.search}</span>
      <span data-testid="filter">{ctx.filter}</span>
      <button onClick={() => ctx.dispatch({ type: 'SET_SEARCH', payload: 'react' })}>
        Set Search
      </button>
      <button onClick={() => ctx.dispatch({ type: 'SET_FILTER', payload: 'published' })}>
        Set Filter
      </button>
    </div>
  )
}

describe('PostsContext', () => {
  it('provides default state { search: "", filter: "all" }', () => {
    render(<PostsProvider><Consumer /></PostsProvider>)
    expect(screen.getByTestId('search')).toHaveTextContent('')
    expect(screen.getByTestId('filter')).toHaveTextContent('all')
  })

  it('SET_SEARCH action updates search value', async () => {
    const user = userEvent.setup()
    render(<PostsProvider><Consumer /></PostsProvider>)
    await user.click(screen.getByRole('button', { name: /set search/i }))
    expect(screen.getByTestId('search')).toHaveTextContent('react')
  })

  it('SET_FILTER action updates filter value', async () => {
    const user = userEvent.setup()
    render(<PostsProvider><Consumer /></PostsProvider>)
    await user.click(screen.getByRole('button', { name: /set filter/i }))
    expect(screen.getByTestId('filter')).toHaveTextContent('published')
  })

  it('context value is null outside PostsProvider', () => {
    expect(() => render(<Consumer />)).toThrow(
      'PostsContext must be used within PostsProvider',
    )
  })
})
```

- [ ] **Step 2: Create stub src/context/posts-context.jsx**

```jsx
import { createContext, useReducer } from 'react'

// TODO: Implement PostsContext and PostsProvider
//
// 1. Define initialState:
//    { search: '', filter: 'all' }
//    filter can be: 'all' | 'published' | 'draft'
//
// 2. Define postsReducer(state, action):
//    - 'SET_SEARCH': return { ...state, search: action.payload }
//    - 'SET_FILTER': return { ...state, filter: action.payload }
//    - default: return state
//
// 3. Create PostsContext with createContext(null)
//
// 4. PostsProvider wraps children with PostsContext.Provider
//    The value should be: { ...state, dispatch }
//
// Usage in components:
//   const { search, filter, dispatch } = useContext(PostsContext)
//   dispatch({ type: 'SET_SEARCH', payload: 'react' })
//
// Reference: src/pages in teaching notes — state-management.md

export const PostsContext = createContext(null)

export function PostsProvider({ children }) {
  throw new Error('TODO: implement PostsProvider in posts-context.jsx')
}
```

- [ ] **Step 3: Run the test and confirm it fails**

```bash
npm run test:run -- src/context/__tests__/posts-context.test.jsx
```

Expected: `4 failed`

- [ ] **Step 4: Commit**

```bash
git add src/context/
git commit -m "test: add failing tests for PostsContext (student TODO)"
```

---

## Task 19: Student Stub + Test — PostsFilters (Context Version) + Post Route

**Files:** `src/features/posts/components/__tests__/posts-filters.test.jsx`, `src/app/routes/posts/post.jsx`, `src/app/routes/posts/__tests__/post.test.jsx`

- [ ] **Step 1: Write failing test for PostsFilters context version**

Create `src/features/posts/components/__tests__/posts-filters.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PostsFilters } from '../posts-filters'
import { PostsContext } from '@/context/posts-context'

function renderWithContext(search = '', filter = 'all') {
  const dispatch = vi.fn()
  render(
    <PostsContext.Provider value={{ search, filter, dispatch }}>
      <PostsFilters />
    </PostsContext.Provider>,
  )
  return { dispatch }
}

describe('PostsFilters (context version)', () => {
  it('renders search input with current search value from context', () => {
    renderWithContext('react hooks')
    expect(screen.getByRole('searchbox')).toHaveValue('react hooks')
  })

  it('dispatches SET_SEARCH when input changes', async () => {
    const user = userEvent.setup()
    const { dispatch } = renderWithContext()
    await user.type(screen.getByRole('searchbox'), 'react')
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_SEARCH', payload: expect.stringContaining('r') })
  })

  it('dispatches SET_FILTER when select changes', async () => {
    const user = userEvent.setup()
    const { dispatch } = renderWithContext()
    await user.selectOptions(screen.getByRole('combobox'), 'published')
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_FILTER', payload: 'published' })
  })

  it('renders with no props (reads from context, not props)', () => {
    renderWithContext('hooks', 'published')
    expect(screen.getByRole('searchbox')).toHaveValue('hooks')
    expect(screen.getByRole('combobox')).toHaveValue('published')
  })
})
```

- [ ] **Step 2: Write failing test for post.jsx route**

Create `src/app/routes/posts/__tests__/post.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createHead, UnheadProvider } from '@unhead/react/client'
import PostRoute from '../post'

function renderPostRoute(id = 'post-1') {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const head = createHead()
  const router = createMemoryRouter(
    [{ path: '/posts/:id', element: <PostRoute /> }],
    { initialEntries: [`/posts/${id}`] },
  )
  return render(
    <UnheadProvider head={head}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UnheadProvider>,
  )
}

describe('Post route /posts/:id', () => {
  it('renders the post title', async () => {
    renderPostRoute('post-1')
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /test post post-1/i })).toBeInTheDocument(),
    )
  })

  it('renders a back button that links to /posts', async () => {
    renderPostRoute('post-1')
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /back|posts/i })).toBeInTheDocument(),
    )
  })

  it('renders comments section', async () => {
    renderPostRoute('post-1')
    await waitFor(() =>
      expect(screen.getByText(/great post!/i)).toBeInTheDocument(),
    )
  })
})
```

- [ ] **Step 3: Create stub src/app/routes/posts/post.jsx**

```jsx
// TODO: Implement the /posts/:id route
//
// This route should:
// 1. Use useParams() to get { id } from the URL
// 2. Call useHead({ title: post.title }) for SEO (after fetching the post)
// 3. Render PostView with the fetched post
// 4. Wrap PostView in <Suspense fallback={<PostViewSkeleton />}>
// 5. Below the post, render a comments section:
//    - Heading: "Comments"
//    - Wrap CommentsList in <Suspense fallback={<CommentsListSkeleton />}>
//    - Wrap that Suspense in <ErrorBoundary FallbackComponent={ErrorFallback}>
//      so a comments failure doesn't break the whole page
//    - Render CreateComment below the list
// 6. Include a back button/link to /posts
//
// Imports you will need:
//   import { useParams } from 'react-router'
//   import { useHead } from '@unhead/react'
//   import { Suspense } from 'react'
//   import { ErrorBoundary } from 'react-error-boundary'
//   import { usePost } from '@/features/posts/api/get-post'
//   import { PostView } from '@/features/posts/components/post-view'
//   import { PostViewSkeleton } from '@/features/posts/components/post-view-skeleton'
//   import { CommentsList } from '@/features/comments/components/comments-list'
//   import { CommentsListSkeleton } from '@/features/comments/components/comments-list-skeleton'
//   import { CreateComment } from '@/features/comments/components/create-comment'
//   import { ErrorFallback } from '@/components/ui/error-boundary/error-fallback'
//   import { paths } from '@/config/paths'

export default function PostRoute() {
  throw new Error('TODO: implement PostRoute in src/app/routes/posts/post.jsx')
}
```

- [ ] **Step 4: Run tests and confirm they fail**

```bash
npm run test:run -- src/features/posts/components/__tests__/posts-filters.test.jsx src/app/routes/posts/__tests__/post.test.jsx
```

Expected: `7 failed`

- [ ] **Step 5: Commit**

```bash
git add src/features/posts/components/__tests__/ src/app/routes/posts/
git commit -m "test: add failing tests for PostsFilters context + PostRoute (student TODO)"
```

---

## Task 20: Landing Page — Code Dossier

**Files:** `src/app/routes/landing.jsx` (full implementation replacing stub from Task 11)

- [ ] **Step 1: Write the full landing page**

```jsx
import { useHead } from '@unhead/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { paths } from '@/config/paths'
import {
  ExternalLink,
  CheckSquare,
  Square,
  Copy,
  Check,
  ArrowRight,
  Terminal,
} from 'lucide-react'

/* global __PROJECT_ROOT__ */
const PROJECT_ROOT = __PROJECT_ROOT__

const TASK_GROUPS = [
  {
    id: 'routing',
    group: 'Routing',
    color: '#FF6B35',
    concept: 'useParams · useNavigate · Dynamic Routes',
    tasks: [
      {
        id: 'post-route',
        title: 'Post Detail Route',
        description:
          'Implement /posts/:id. Use useParams() to get the post id, fetch the post with usePost, render PostView, show comments below, and add a back button.',
        file: 'src/app/routes/posts/post.jsx',
        testFile: 'src/app/routes/posts/__tests__/post.test.jsx',
        difficulty: 'medium',
      },
    ],
  },
  {
    id: 'data-fetching',
    group: 'Data Fetching',
    color: '#4ECDC4',
    concept: 'useSuspenseQuery · Custom Hooks · TanStack Query',
    tasks: [
      {
        id: 'get-post',
        title: 'usePost Hook',
        description:
          'Implement getPostQueryOptions(id) and usePost(id) using useSuspenseQuery. Fetch from GET /posts/:id.',
        file: 'src/features/posts/api/get-post.js',
        testFile: 'src/features/posts/api/__tests__/get-post.test.js',
        difficulty: 'medium',
      },
      {
        id: 'get-comments',
        title: 'useComments Hook',
        description:
          'Implement getCommentsQueryOptions(postId) and useComments(postId). Fetch from GET /posts/:postId/comments.',
        file: 'src/features/comments/api/get-comments.js',
        testFile: 'src/features/comments/api/__tests__/get-comments.test.js',
        difficulty: 'medium',
      },
      {
        id: 'create-comment',
        title: 'useCreateComment Mutation',
        description:
          'Implement useMutation that POSTs to /posts/:postId/comments and invalidates [\'comments\', postId] on success.',
        file: 'src/features/comments/api/create-comment.js',
        testFile: 'src/features/comments/api/__tests__/create-comment.test.js',
        difficulty: 'hard',
      },
    ],
  },
  {
    id: 'components',
    group: 'Components',
    color: '#FFE66D',
    concept: 'Props · Component Composition · Semantic HTML',
    tasks: [
      {
        id: 'post-view',
        title: 'PostView Component',
        description:
          'Render a post\'s title (as a heading), body, and formatted createdAt date. Use semantic HTML: <article>, <time>.',
        file: 'src/features/posts/components/post-view.jsx',
        testFile: 'src/features/posts/components/__tests__/post-view.test.jsx',
        difficulty: 'easy',
      },
      {
        id: 'comment-card',
        title: 'CommentCard Component',
        description:
          'Render a single comment: body text, userId as author, and the createdAt date. Wrap in <article>.',
        file: 'src/features/comments/components/comment-card.jsx',
        testFile: 'src/features/comments/components/__tests__/comment-card.test.jsx',
        difficulty: 'easy',
      },
      {
        id: 'comments-list',
        title: 'CommentsList Component',
        description:
          'Map over a comments array and render CommentCard for each. Show an empty state when the array is empty.',
        file: 'src/features/comments/components/comments-list.jsx',
        testFile: 'src/features/comments/components/__tests__/comments-list.test.jsx',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'state',
    group: 'State Management',
    color: '#A78BFA',
    concept: 'useReducer · createContext · useContext · Lifting State',
    tasks: [
      {
        id: 'posts-context',
        title: 'PostsContext',
        description:
          'Create PostsContext and PostsProvider using createContext + useReducer. Handle SET_SEARCH and SET_FILTER actions. Default: { search: \'\', filter: \'all\' }.',
        file: 'src/context/posts-context.jsx',
        testFile: 'src/context/__tests__/posts-context.test.jsx',
        difficulty: 'hard',
      },
      {
        id: 'posts-filters-context',
        title: 'PostsFilters — Context Refactor',
        description:
          'Refactor PostsFilters to read search/filter from PostsContext via useContext instead of props. Dispatch SET_SEARCH and SET_FILTER on change.',
        file: 'src/features/posts/components/posts-filters.jsx',
        testFile: 'src/features/posts/components/__tests__/posts-filters.test.jsx',
        difficulty: 'medium',
      },
    ],
  },
  {
    id: 'forms',
    group: 'Forms',
    color: '#F472B6',
    concept: 'useActionState · useFormStatus · React 19',
    tasks: [
      {
        id: 'create-comment-form',
        title: 'CreateComment Form',
        description:
          'Implement using useActionState for form state and SubmitButton (provided) which uses useFormStatus. Use <form action={formAction}> not onSubmit.',
        file: 'src/features/comments/components/create-comment.jsx',
        testFile: 'src/features/comments/components/__tests__/create-comment.test.jsx',
        difficulty: 'hard',
      },
    ],
  },
  {
    id: 'loading',
    group: 'Loading States',
    color: '#34D399',
    concept: 'Suspense · Skeleton UI',
    tasks: [
      {
        id: 'post-view-skeleton',
        title: 'PostViewSkeleton',
        description:
          'Build a skeleton that visually matches PostView layout. Used as the Suspense fallback on the post detail page.',
        file: 'src/features/posts/components/post-view-skeleton.jsx',
        testFile: null,
        difficulty: 'easy',
      },
      {
        id: 'comments-list-skeleton',
        title: 'CommentsListSkeleton',
        description:
          'Build a skeleton that visually matches 3-4 CommentCard shapes. Used as the Suspense fallback for the comments section.',
        file: 'src/features/comments/components/comments-list-skeleton.jsx',
        testFile: null,
        difficulty: 'easy',
      },
    ],
  },
]

const DIFFICULTY_STYLES = {
  easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  hard: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
}

const ALL_TASKS = TASK_GROUPS.flatMap((g) => g.tasks)

function FilePath({ file, onCopy }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(file)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
    onCopy?.()
  }

  return (
    <div className="flex items-center gap-2 mt-3 mb-2">
      <code
        className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 flex-1 truncate"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {file}
      </code>
      <button
        onClick={handleCopy}
        aria-label="Copy file path"
        className="p-1.5 rounded hover:bg-white/10 transition-colors text-white/40 hover:text-white/70"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <a
        href={`vscode://file/${PROJECT_ROOT}/${file}`}
        aria-label="Open in VS Code"
        className="p-1.5 rounded hover:bg-white/10 transition-colors text-white/40 hover:text-white/70"
        title="Open in VS Code"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  )
}

function TaskCard({ task, done, onToggle, groupColor }) {
  return (
    <div
      className="rounded-lg border border-white/10 p-4 hover:border-white/20 transition-all"
      style={{ borderLeftColor: groupColor, borderLeftWidth: '3px' }}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          aria-label={done ? 'Mark as incomplete' : 'Mark as complete'}
          className="mt-0.5 shrink-0 text-white/40 hover:text-white/70 transition-colors"
        >
          {done ? (
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          ) : (
            <Square className="w-4 h-4" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3
              className={`text-sm font-semibold ${done ? 'line-through text-white/40' : 'text-white/90'}`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {task.title}
            </h3>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${DIFFICULTY_STYLES[task.difficulty]}`}
            >
              {task.difficulty}
            </span>
          </div>

          <p className="text-xs text-white/50 leading-relaxed">{task.description}</p>

          <FilePath file={task.file} />

          {task.testFile && (
            <a
              href={`vscode://file/${PROJECT_ROOT}/${task.testFile}`}
              className="flex items-center gap-1.5 text-[10px] text-white/30 hover:text-white/60 transition-colors mt-1"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Terminal className="w-3 h-3" />
              {task.testFile}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LandingRoute() {
  useHead({
    title: 'React Exam Starter — AltSchool Africa',
    meta: [
      {
        name: 'description',
        content: 'AltSchool Africa second semester React exam starter.',
      },
    ],
  })

  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('exam-done') || '{}')
    } catch {
      return {}
    }
  })

  function toggleDone(id) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      localStorage.setItem('exam-done', JSON.stringify(next))
      return next
    })
  }

  const completedCount = ALL_TASKS.filter((t) => done[t.id]).length
  const totalCount = ALL_TASKS.length
  const progressPct = Math.round((completedCount / totalCount) * 100)

  return (
    <div
      className="min-h-screen px-4 py-12 max-w-3xl mx-auto"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs uppercase tracking-widest text-white/30 mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          AltSchool Africa · Second Semester
        </p>
        <h1
          className="text-5xl font-bold mb-2 text-white"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          React Exam
        </h1>
        <p className="text-white/50 text-sm mb-6">
          Complete the tasks below. Each task maps to a TODO file — open it in VS Code and implement the code.
          Run <code style={{ fontFamily: 'var(--font-mono)' }} className="text-xs bg-white/10 px-1.5 py-0.5 rounded">npm run test</code> to check your progress.
        </p>

        {/* Progress */}
        <div className="mb-2 flex items-center justify-between text-xs text-white/40">
          <span style={{ fontFamily: 'var(--font-mono)' }}>
            {completedCount} / {totalCount} tasks marked done
          </span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{progressPct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #4ECDC4, #FF6B35)',
            }}
          />
        </div>
      </div>

      {/* API Reference */}
      <div className="mb-10 border border-white/10 rounded-lg p-5 bg-white/[0.02]">
        <p
          className="text-xs uppercase tracking-widest text-white/30 mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          API Reference
        </p>
        <p
          className="text-sm font-medium mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          https://api.oluwasetemi.dev
        </p>
        <div className="space-y-1.5 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          {[
            { method: 'GET', path: '/posts?page=N&limit=10', note: 'provided' },
            { method: 'GET', path: '/posts/:id', note: 'TODO' },
            { method: 'GET', path: '/posts/:postId/comments', note: 'TODO' },
            { method: 'POST', path: '/posts/:postId/comments', note: 'TODO' },
          ].map(({ method, path, note }) => (
            <div key={path} className="flex items-center gap-3">
              <span
                className={`w-10 text-center text-[10px] font-bold rounded px-1 py-0.5 ${
                  method === 'GET'
                    ? 'text-sky-400 bg-sky-400/10'
                    : 'text-emerald-400 bg-emerald-400/10'
                }`}
              >
                {method}
              </span>
              <span className="text-white/60">{path}</span>
              <span className={`text-[10px] ml-auto ${note === 'provided' ? 'text-white/20' : 'text-amber-400/60'}`}>
                {note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reference link */}
      <Link
        to={paths.posts.getHref()}
        className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-10 group"
      >
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        View reference implementation (Posts listing)
      </Link>

      {/* Task Groups */}
      <div className="space-y-10">
        {TASK_GROUPS.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <div className="flex items-baseline gap-3 mb-4">
              <h2
                id={`group-${group.id}`}
                className="text-lg font-bold"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: group.color,
                }}
              >
                {group.group}
              </h2>
              <p
                className="text-xs text-white/30"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {group.concept}
              </p>
            </div>
            <div className="space-y-3">
              {group.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  done={!!done[task.id]}
                  onToggle={toggleDone}
                  groupColor={group.color}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/20"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        AltSchool Africa · React Second Semester Exam ·{' '}
        <a
          href="https://api.oluwasetemi.dev/reference"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/50 transition-colors"
        >
          API Docs ↗
        </a>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Start dev server and verify landing page renders**

```bash
npm run dev
```

Visit `http://localhost:5173`. You should see:
- Large "React Exam" heading
- Animated gradient progress bar
- API reference card with GET/POST badges
- 6 task groups with colored left borders
- File path chips with copy + VS Code open buttons
- Checkbox toggles that persist on refresh

- [ ] **Step 3: Commit**

```bash
git add src/app/routes/landing.jsx
git commit -m "feat: implement Code Dossier landing page"
```

---

## Task 21: Verify All Tests Fail + Run Build + README

**Files:** `README.md`, verify test suite

- [ ] **Step 1: Run full test suite — confirm all student tests fail**

```bash
npm run test:run
```

Expected output:
```
 ✗ src/features/posts/api/__tests__/get-post.test.js          (2 tests | 2 failed)
 ✗ src/features/comments/api/__tests__/get-comments.test.js   (2 tests | 2 failed)
 ✗ src/features/comments/api/__tests__/create-comment.test.js (2 tests | 2 failed)
 ✗ src/features/posts/components/__tests__/post-view.test.jsx (3 tests | 3 failed)
 ✗ src/features/comments/components/__tests__/comment-card.test.jsx (2 tests | 2 failed)
 ✗ src/features/comments/components/__tests__/comments-list.test.jsx (3 tests | 3 failed)
 ✗ src/features/comments/components/__tests__/create-comment.test.jsx (4 tests | 4 failed)
 ✗ src/context/__tests__/posts-context.test.jsx               (4 tests | 4 failed)
 ✗ src/features/posts/components/__tests__/posts-filters.test.jsx (4 tests | 4 failed)
 ✗ src/app/routes/posts/__tests__/post.test.jsx               (3 tests | 3 failed)

 Test Files  10 failed
 Tests       29 failed
```

All failures should say `Error: TODO: implement ...` — if any fail for other reasons (import errors, missing files), fix before proceeding.

- [ ] **Step 2: Run production build — confirm it compiles**

```bash
npm run build
```

Expected: `dist/` created, no TypeScript/build errors.

- [ ] **Step 3: Write README.md**

```markdown
# React Exam Starter

AltSchool Africa — Second Semester React Examination Project.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

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

\`\`\`bash
npm run test        # watch mode
npm run test:run    # single run
npm run test:ui     # browser UI
\`\`\`

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

\`\`\`
src/
  app/routes/        → Page components (route layer)
  features/          → Feature modules (posts, comments)
  context/           → Shared React context
  components/        → Shared UI + layouts
  lib/               → API client, QueryClient
  config/            → Paths, env vars
  testing/           → Vitest setup, MSW handlers
\`\`\`

## Submission

1. Push to a **private** GitHub repository
2. Add `@Oluwasetemi` as a collaborator
3. Deploy to Vercel / Netlify / Pipeops
4. Submit GitHub URL + live URL via the Google Form
```

- [ ] **Step 4: Final commit**

```bash
git add README.md
git commit -m "feat: complete exam starter scaffold with 29 failing student tests"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Section 1 (Goal) — runnable scaffold with reference + TODOs + task board
- ✅ Section 2 (Tech Stack) — all packages installed in Tasks 1-2
- ✅ Section 3 (Project Structure) — all files created across Tasks 3-20
- ✅ Section 4 (Routes) — all 5 routes in Task 10-11
- ✅ Section 5 (Data fetching pattern) — `useSuspenseQuery` in Tasks 8, 12, 13
- ✅ Section 6 (API endpoints) — all 4 endpoints in MSW handlers Task 7
- ✅ Section 7 (State management) — props drilling reference Task 9, context stub Task 18
- ✅ Section 8 (Forms) — `useActionState` + `SubmitButton` in Task 17
- ✅ Section 9 (Error Boundary) — class reference Task 5, `react-error-boundary` Task 10, error-test Task 10
- ✅ Section 10 (SEO) — `UnheadProvider` in Task 10, `useHead` in Tasks 11, 20
- ✅ Section 11 (Landing Page) — Code Dossier in Task 20
- ✅ Section 12 (Skeletons) — `PostsListSkeleton` Task 8, stubs Tasks 16
- ✅ Section 13 (Pagination) — `Pagination` component Task 5, wired in Task 9
- ✅ Section 14 (Vite config) — Task 2
- ✅ Section 15 (Testing) — all 10 test files across Tasks 12-19, MSW Task 7
- ✅ Section 16 (Dependencies) — Tasks 1-2
- ✅ Section 17 (README) — Task 21
