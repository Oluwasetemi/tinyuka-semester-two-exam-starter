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
  BookOpen,
  Zap,
} from 'lucide-react'

/* global __PROJECT_ROOT__ */
const PROJECT_ROOT = __PROJECT_ROOT__

// ─── Resource links ─────────────────────────────────────────────────────────

const RESOURCES = [
  {
    name: 'Class Notes',
    url: 'https://react.oluwasetemi.dev',
    desc: 'Course slides — all concepts taught in class',
    badge: 'Primary',
    badgeColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  },
  {
    name: 'react.dev',
    url: 'https://react.dev',
    desc: 'Official React docs (hooks, APIs, patterns)',
    badge: 'Official',
    badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  },
  {
    name: 'TanStack Query v5',
    url: 'https://tanstack.com/query/v5',
    desc: 'useSuspenseQuery, useMutation, queryOptions',
    badge: 'Library',
    badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  },
  {
    name: 'Bulletproof React',
    url: 'https://github.com/alan2207/bulletproof-react',
    desc: 'Architecture patterns used in this project',
    badge: 'Patterns',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
  {
    name: 'Tailwind CSS v4',
    url: 'https://tailwindcss.com/docs',
    desc: 'Utility classes, animate-pulse for skeletons',
    badge: 'Styling',
    badgeColor: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
  },
]

// ─── Task groups with per-task doc references ────────────────────────────────

const TASK_GROUPS = [
  {
    id: 'routing',
    group: 'Routing',
    color: '#FF6B35',
    concept: 'useParams · Dynamic Routes',
    tasks: [
      {
        id: 'post-route',
        title: 'Post Detail Route',
        description:
          'Implement /posts/:id. Use useParams() to get the post id, fetch the post with usePost, render PostView with comments below, and include a back link.',
        file: 'src/app/routes/posts/post.jsx',
        testFile: 'src/app/routes/posts/__tests__/post.test.jsx',
        difficulty: 'medium',
        refs: [
          { label: 'useParams', url: 'https://reactrouter.com/api/hooks/useParams' },
          { label: 'Class Notes: Routing', url: 'https://react.oluwasetemi.dev/187' },
          { label: 'Bulletproof: Routes', url: 'https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md' },
        ],
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
          'Implement getPostQueryOptions(id) and usePost(id) using useSuspenseQuery. Fetch from GET /posts/:id. Mirror the pattern in get-posts.js.',
        file: 'src/features/posts/api/get-post.js',
        testFile: 'src/features/posts/api/__tests__/get-post.test.js',
        difficulty: 'medium',
        refs: [
          { label: 'useSuspenseQuery', url: 'https://tanstack.com/query/latest/docs/framework/react/guides/suspense' },
          { label: 'queryOptions', url: 'https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions' },
          { label: 'Class Notes: Data Fetching', url: 'https://react.oluwasetemi.dev/227' },
        ],
      },
      {
        id: 'get-comments',
        title: 'useComments Hook',
        description:
          'Implement getCommentsQueryOptions(postId) and useComments(postId). Fetch from GET /posts/:postId/comments. Use queryKey: ["comments", postId].',
        file: 'src/features/comments/api/get-comments.js',
        testFile: 'src/features/comments/api/__tests__/get-comments.test.js',
        difficulty: 'medium',
        refs: [
          { label: 'useSuspenseQuery', url: 'https://tanstack.com/query/latest/docs/framework/react/guides/suspense' },
          { label: 'Class Notes: Data Fetching', url: 'https://react.oluwasetemi.dev/227' },
        ],
      },
      {
        id: 'create-comment',
        title: 'useCreateComment Mutation',
        description:
          "Implement useMutation that POSTs to /posts/:postId/comments. On success, call queryClient.invalidateQueries({ queryKey: ['comments', postId] }).",
        file: 'src/features/comments/api/create-comment.js',
        testFile: 'src/features/comments/api/__tests__/create-comment.test.js',
        difficulty: 'hard',
        refs: [
          { label: 'useMutation', url: 'https://tanstack.com/query/latest/docs/framework/react/reference/useMutation' },
          { label: 'invalidateQueries', url: 'https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries' },
          { label: 'Class Notes: Mutations', url: 'https://react.oluwasetemi.dev/252' },
        ],
      },
    ],
  },
  {
    id: 'components',
    group: 'Components',
    color: '#FFE66D',
    concept: 'Props · Composition · Semantic HTML',
    tasks: [
      {
        id: 'post-view',
        title: 'PostView Component',
        description:
          "Render a post's title as an <h1>, body text, and formatted createdAt date. Use semantic HTML: wrap in <article>, date in <time dateTime={post.createdAt}>.",
        file: 'src/features/posts/components/post-view.jsx',
        testFile: 'src/features/posts/components/__tests__/post-view.test.jsx',
        difficulty: 'easy',
        refs: [
          { label: 'Passing Props', url: 'https://react.dev/learn/passing-props-to-a-component' },
          { label: '<article> element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article' },
          { label: 'Class Notes: Components', url: 'https://react.oluwasetemi.dev/43' },
        ],
      },
      {
        id: 'comment-card',
        title: 'CommentCard Component',
        description:
          'Render a single comment: body text, userId as author, and the createdAt date. Wrap in <article> for accessibility.',
        file: 'src/features/comments/components/comment-card.jsx',
        testFile: 'src/features/comments/components/__tests__/comment-card.test.jsx',
        difficulty: 'easy',
        refs: [
          { label: 'Passing Props', url: 'https://react.dev/learn/passing-props-to-a-component' },
          { label: 'Class Notes: Components', url: 'https://react.oluwasetemi.dev/43' },
        ],
      },
      {
        id: 'comments-list',
        title: 'CommentsList Component',
        description:
          'Map over a comments array, render a <CommentCard> for each using comment.id as key. When comments.length === 0, show "No comments yet."',
        file: 'src/features/comments/components/comments-list.jsx',
        testFile: 'src/features/comments/components/__tests__/comments-list.test.jsx',
        difficulty: 'easy',
        refs: [
          { label: 'Rendering Lists', url: 'https://react.dev/learn/rendering-lists' },
          { label: 'Class Notes: Components', url: 'https://react.oluwasetemi.dev/43' },
        ],
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
          "Create PostsContext with createContext(null) and PostsProvider using useReducer. Handle SET_SEARCH and SET_FILTER actions. Provider value: { ...state, dispatch }.",
        file: 'src/context/posts-context.jsx',
        testFile: 'src/context/__tests__/posts-context.test.jsx',
        difficulty: 'hard',
        refs: [
          { label: 'createContext', url: 'https://react.dev/reference/react/createContext' },
          { label: 'useReducer', url: 'https://react.dev/reference/react/useReducer' },
          { label: 'Context + Reducer', url: 'https://react.dev/learn/scaling-up-with-reducer-and-context' },
          { label: 'Class Notes: Context', url: 'https://react.oluwasetemi.dev/217?clicks=4' },
        ],
      },
      {
        id: 'posts-filters-context',
        title: 'PostsFilters — Context Refactor',
        description:
          'Refactor PostsFilters to read search/filter from PostsContext via useContext (no props). Call dispatch({ type: "SET_SEARCH", payload }) and dispatch({ type: "SET_FILTER", payload }) on change.',
        file: 'src/features/posts/components/posts-filters.jsx',
        testFile: 'src/features/posts/components/__tests__/posts-filters.test.jsx',
        difficulty: 'medium',
        refs: [
          { label: 'useContext', url: 'https://react.dev/reference/react/useContext' },
          { label: 'Passing Data Deeply', url: 'https://react.dev/learn/passing-data-deeply-with-context' },
          { label: 'Class Notes: Context', url: 'https://react.oluwasetemi.dev/217?clicks=4' },
        ],
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
          'Use useActionState(async (prev, formData) => {...}, { error: null }) for form state. Use <form action={formAction}> — NOT onSubmit. SubmitButton is provided and uses useFormStatus.',
        file: 'src/features/comments/components/create-comment.jsx',
        testFile: 'src/features/comments/components/__tests__/create-comment.test.jsx',
        difficulty: 'hard',
        refs: [
          { label: 'useActionState', url: 'https://react.dev/reference/react/useActionState' },
          { label: 'useFormStatus', url: 'https://react.dev/reference/react-dom/useFormStatus' },
          { label: 'Class Notes: Forms', url: 'https://react.oluwasetemi.dev/131' },
        ],
      },
    ],
  },
  {
    id: 'theme',
    group: 'Theme',
    color: '#94A3B8',
    concept: 'Dark / Light Toggle · CSS Variables · localStorage',
    tasks: [
      {
        id: 'theme-toggle',
        title: 'Theme Toggle',
        description:
          'Add dark/light theme switching to the app. Persist the chosen theme across page refreshes.',
        file: 'src/features/theme/components/theme-toggle.jsx',
        testFile: null,
        difficulty: 'hard',
        refs: [],
      },
    ],
  },
  {
    id: 'loading',
    group: 'Loading States',
    color: '#34D399',
    concept: 'Suspense · Skeleton UI · animate-pulse',
    tasks: [
      {
        id: 'post-view-skeleton',
        title: 'PostViewSkeleton',
        description:
          'Build skeleton shapes that match PostView layout: large skeleton for title, several lines for body, small one for date. Used as <Suspense fallback> on the post page.',
        file: 'src/features/posts/components/post-view-skeleton.jsx',
        testFile: null,
        difficulty: 'easy',
        refs: [
          { label: 'Suspense', url: 'https://react.dev/reference/react/Suspense' },
          { label: 'animate-pulse', url: 'https://tailwindcss.com/docs/animation' },
          { label: 'Class Notes: Suspense', url: 'https://react.oluwasetemi.dev/237' },
        ],
      },
      {
        id: 'comments-list-skeleton',
        title: 'CommentsListSkeleton',
        description:
          'Build 3–4 skeleton card shapes matching CommentCard layout: a body line and an author line per card. Used as <Suspense fallback> for the comments section.',
        file: 'src/features/comments/components/comments-list-skeleton.jsx',
        testFile: null,
        difficulty: 'easy',
        refs: [
          { label: 'Suspense', url: 'https://react.dev/reference/react/Suspense' },
          { label: 'animate-pulse', url: 'https://tailwindcss.com/docs/animation' },
          { label: 'Class Notes: Suspense', url: 'https://react.oluwasetemi.dev/237' },
        ],
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

// ─── Sub-components ──────────────────────────────────────────────────────────

function FilePath({ file }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(file)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center gap-1.5 mt-3 mb-2">
      <code
        className="text-[11px] px-2 py-1 rounded bg-white/5 border border-white/10 flex-1 truncate"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {file}
      </code>
      <button
        onClick={handleCopy}
        aria-label="Copy file path"
        className="p-1.5 rounded hover:bg-white/10 transition-colors text-white/30 hover:text-white/60 shrink-0"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <a
        href={`vscode://file/${PROJECT_ROOT}/${file}`}
        aria-label="Open in VS Code"
        className="p-1.5 rounded hover:bg-white/10 transition-colors text-white/30 hover:text-white/60 shrink-0"
        title="Open in VS Code"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  )
}

function DocChip({ label, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/35 hover:text-sky-400 hover:border-sky-400/30 transition-colors"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <BookOpen className="w-2.5 h-2.5 shrink-0" />
      {label}
    </a>
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
          className="mt-0.5 shrink-0 text-white/30 hover:text-white/60 transition-colors"
        >
          {done ? (
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          ) : (
            <Square className="w-4 h-4" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          {/* Title + difficulty */}
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <h3
              className={`text-sm font-semibold ${done ? 'line-through text-white/30' : 'text-white/90'}`}
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

          {/* Description */}
          <p className="text-xs text-white/50 leading-relaxed">{task.description}</p>

          {/* File path with copy + VS Code */}
          <FilePath file={task.file} />

          {/* Test file link */}
          {task.testFile && (
            <a
              href={`vscode://file/${PROJECT_ROOT}/${task.testFile}`}
              className="flex items-center gap-1.5 text-[10px] text-white/25 hover:text-white/55 transition-colors mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Terminal className="w-3 h-3 shrink-0" />
              {task.testFile}
            </a>
          )}

          {/* Doc reference chips */}
          {task.refs?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {task.refs.map((ref) => (
                <DocChip key={ref.url} label={ref.label} url={ref.url} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingRoute() {
  useHead({
    title: 'React Exam Starter — AltSchool Africa',
    meta: [
      { name: 'description', content: 'AltSchool Africa second semester React exam starter.' },
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
      style={{
        fontFamily: 'var(--font-body)',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* ── Header ── */}
      <div className="mb-10">
        <p
          className="text-xs uppercase tracking-widest text-white/25 mb-3"
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
        <p className="text-white/45 text-sm mb-6 max-w-lg leading-relaxed">
          Each task below maps to a TODO file. Open it in VS Code, read the comments, implement the code.
          Your tests auto-run — green suite means done.
        </p>

        {/* Progress bar */}
        <div className="mb-2 flex items-center justify-between text-xs text-white/35">
          <span style={{ fontFamily: 'var(--font-mono)' }}>
            {completedCount} / {totalCount} tasks marked done
          </span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{progressPct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #4ECDC4, #FF6B35)',
            }}
          />
        </div>
      </div>

      {/* ── Getting Started ── */}
      <div className="mb-8 rounded-lg border border-white/10 overflow-hidden">
        <div className="bg-white/[0.03] border-b border-white/10 px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          <Zap className="w-3 h-3 text-white/25 ml-1" />
          <span className="text-[10px] text-white/25 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
            getting started
          </span>
        </div>
        <div className="p-4 space-y-2 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          {[
            { cmd: 'npm run dev', note: 'open localhost:5173 — see this page' },
            { cmd: 'npm run test:run', note: 'see all 29 failing tests at once' },
            { cmd: 'npm run test', note: 'watch mode — re-runs on save' },
            { cmd: 'npm run build', note: 'verify production build before submit' },
          ].map(({ cmd, note }) => (
            <div key={cmd} className="flex items-center gap-3">
              <span className="text-emerald-400 select-none">$</span>
              <span className="text-white/70">{cmd}</span>
              <span className="text-white/25 ml-auto hidden sm:block"># {note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Resources ── */}
      <div className="mb-8">
        <p
          className="text-[10px] uppercase tracking-widest text-white/25 mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Key Resources
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {RESOURCES.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg border border-white/8 hover:border-white/20 hover:bg-white/[0.02] transition-all group"
            >
              <BookOpen className="w-3.5 h-3.5 text-white/25 mt-0.5 shrink-0 group-hover:text-white/50 transition-colors" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {r.name}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${r.badgeColor}`}>
                    {r.badge}
                  </span>
                </div>
                <p className="text-[11px] text-white/30 leading-snug">{r.desc}</p>
              </div>
              <ExternalLink className="w-3 h-3 text-white/15 shrink-0 mt-0.5 group-hover:text-white/40 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* ── API Reference ── */}
      <div className="mb-8 border border-white/10 rounded-lg p-4 bg-white/[0.015]">
        <p
          className="text-[10px] uppercase tracking-widest text-white/25 mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          API · api.oluwasetemi.dev
        </p>
        <div className="space-y-1.5 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          {[
            { method: 'GET', path: '/posts?page=N&limit=10', note: 'provided', response: '{ data: Post[], meta: { page, totalPages, total } }' },
            { method: 'GET', path: '/posts/:id', note: 'TODO', response: 'Post' },
            { method: 'GET', path: '/posts/:postId/comments', note: 'TODO', response: '{ data: Comment[], meta: { total } }' },
            { method: 'POST', path: '/posts/:postId/comments', note: 'TODO', response: 'Comment (201)' },
          ].map(({ method, path, note, response }) => (
            <div key={path} className="flex items-center gap-2.5 py-0.5">
              <span
                className={`w-10 text-center text-[10px] font-bold rounded px-1 py-0.5 shrink-0 ${
                  method === 'GET' ? 'text-sky-400 bg-sky-400/10' : 'text-emerald-400 bg-emerald-400/10'
                }`}
              >
                {method}
              </span>
              <span className="text-white/55 flex-1">{path}</span>
              <span className="text-white/20 hidden sm:block text-[10px] truncate max-w-[180px]">→ {response}</span>
              <span className={`text-[10px] shrink-0 ${note === 'provided' ? 'text-white/20' : 'text-amber-400/60'}`}>
                {note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Reference implementation link ── */}
      <Link
        to={paths.posts.getHref()}
        className="flex items-center gap-2 text-sm text-white/40 hover:text-white/75 transition-colors mb-10 group"
      >
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        View reference implementation (Posts listing) — study this before implementing
      </Link>

      {/* ── Task Groups ── */}
      <div className="space-y-10">
        {TASK_GROUPS.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <div className="flex items-baseline gap-3 mb-4">
              <h2
                id={`group-${group.id}`}
                className="text-base font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: group.color }}
              >
                {group.group}
              </h2>
              <p
                className="text-[11px] text-white/25"
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

      {/* ── Footer ── */}
      <footer
        className="mt-16 pt-8 border-t border-white/8 text-center text-[11px] text-white/20"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        AltSchool Africa · React Second Semester Exam ·{' '}
        <a
          href="https://api.oluwasetemi.dev/reference"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/45 transition-colors"
        >
          API Docs ↗
        </a>
        {' · '}
        <a
          href="https://react.oluwasetemi.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/45 transition-colors"
        >
          Class Notes ↗
        </a>
      </footer>
    </div>
  )
}
