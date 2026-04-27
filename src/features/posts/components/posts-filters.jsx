// TODO: Refactor PostsFilters to use PostsContext
//
// Current implementation uses props (search, filter, onSearchChange, onFilterChange).
// Your task: remove the props and instead read from PostsContext via useContext.
//
// Steps:
// 1. Import useContext from 'react'
// 2. Import PostsContext from '@/context/posts-context'
// 3. Remove all props from the function signature
// 4. Get { search, filter, dispatch } from useContext(PostsContext)
// 5. Replace onSearchChange(value) with dispatch({ type: 'SET_SEARCH', payload: value })
// 6. Replace onFilterChange(value) with dispatch({ type: 'SET_FILTER', payload: value })
//
// Reference: src/context/posts-context.jsx

export function PostsFilters() {
  throw new Error('TODO: implement PostsFilters context refactor in posts-filters.jsx')
}
