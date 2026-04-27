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
          "Implement useMutation that POSTs to /posts/:postId/comments and invalidates ['comments', postId] on success.",
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
          "Render a post's title (as a heading), body, and formatted createdAt date. Use semantic HTML: <article>, <time>.",
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
          "Create PostsContext and PostsProvider using createContext + useReducer. Handle SET_SEARCH and SET_FILTER actions. Default: { search: '', filter: 'all' }.",
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
