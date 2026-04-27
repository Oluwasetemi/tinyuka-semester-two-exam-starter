import { clamp } from '@setemiojo/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router'

export function Pagination({ totalPages, currentPage }) {
  const [, setSearchParams] = useSearchParams()

  function goToPage(page) {
    const safePage = clamp(page, 1, totalPages)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(safePage))
      return next
    })
  }

  if (totalPages <= 1)
    return null

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-8"
    >
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className="p-2 rounded-md border border-white/10 disabled:opacity-40 hover:bg-white/5 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <span className="text-sm text-white/60 px-3">
        Page
        {' '}
        {currentPage}
        {' '}
        of
        {' '}
        {totalPages}
      </span>

      <button
        type="button"
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
