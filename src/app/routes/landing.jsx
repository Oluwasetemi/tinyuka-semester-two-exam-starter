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
        <p className="text-white/50 mb-6">Full landing page coming in Task 20</p>
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
