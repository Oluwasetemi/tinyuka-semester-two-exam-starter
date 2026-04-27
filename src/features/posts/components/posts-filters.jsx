import { Search } from 'lucide-react'

export function PostsFilters({ search, filter, onSearchChange, onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="search"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors"
          aria-label="Search posts"
        />
      </div>

      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors"
        aria-label="Filter by status"
      >
        <option value="all">All posts</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>
    </div>
  )
}
