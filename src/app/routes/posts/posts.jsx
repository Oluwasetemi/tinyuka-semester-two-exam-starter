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
