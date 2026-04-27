import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { RootLayout } from '@/components/layouts/root-layout'
import { ErrorFallback } from '@/components/ui/error-boundary/error-fallback'
import { Skeleton } from '@/components/ui/skeleton'
import { paths } from '@/config/paths'
import { PostsListSkeleton } from '@/features/posts/components/posts-list-skeleton'

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
