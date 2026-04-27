import { useSearchParams } from 'react-router'
import { Pagination } from '@/components/ui/pagination'
import { usePosts } from '../api/get-posts'
import { PostCard } from './post-card'

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
    const matchesFilter
      = filter === 'all' ? true : post.status === filter
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
        {filtered.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {meta && (
        <Pagination totalPages={meta.totalPages} currentPage={meta.page} />
      )}
    </>
  )
}
