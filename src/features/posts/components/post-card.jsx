import { Calendar } from 'lucide-react'
import { Link } from 'react-router'
import { paths } from '@/config/paths'

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
