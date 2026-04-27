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
