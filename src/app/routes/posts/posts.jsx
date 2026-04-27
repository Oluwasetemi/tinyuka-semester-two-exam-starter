import { useHead } from '@unhead/react'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ContentLayout } from '@/components/layouts/content-layout'
import { ErrorFallback } from '@/components/ui/error-boundary/error-fallback'
import { PostsProvider } from '@/context/posts-context'
import { PostsFilters } from '@/features/posts/components/posts-filters'
import { PostsList } from '@/features/posts/components/posts-list'
import { PostsListSkeleton } from '@/features/posts/components/posts-list-skeleton'

// PostsFilters and PostsProvider are student TODO implementations.
// Once both are implemented, PostsProvider wraps the page and PostsFilters
// reads search/filter from context. For the reference posts listing we
// keep a local state fallback while the student tasks are incomplete.

function PostsContent() {
  const [search] = useState('')
  const [filter] = useState('all')

  return (
    <ContentLayout title="Posts">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PostsFilters />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList search={search} filter={filter} />
        </Suspense>
      </ErrorBoundary>
    </ContentLayout>
  )
}

export default function PostsRoute() {
  useHead({
    title: 'Posts — Exam Starter',
    meta: [{ name: 'description', content: 'Browse all posts.' }],
  })

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PostsProvider>
        <PostsContent />
      </PostsProvider>
    </ErrorBoundary>
  )
}
