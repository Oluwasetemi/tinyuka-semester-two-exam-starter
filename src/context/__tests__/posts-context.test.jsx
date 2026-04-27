import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { use } from 'react'
import { describe, expect, it } from 'vitest'
import { PostsContext, PostsProvider } from '../posts-context'

function Consumer() {
  const ctx = use(PostsContext)
  if (!ctx)
    throw new Error('PostsContext must be used within PostsProvider')
  return (
    <div>
      <span data-testid="search">{ctx.search}</span>
      <span data-testid="filter">{ctx.filter}</span>
      <button type="button" onClick={() => ctx.dispatch({ type: 'SET_SEARCH', payload: 'react' })}>
        Set Search
      </button>
      <button type="button" onClick={() => ctx.dispatch({ type: 'SET_FILTER', payload: 'published' })}>
        Set Filter
      </button>
    </div>
  )
}

describe('postsContext', () => {
  it('provides default state { search: "", filter: "all" }', () => {
    render(<PostsProvider><Consumer /></PostsProvider>)
    expect(screen.getByTestId('search')).toHaveTextContent('')
    expect(screen.getByTestId('filter')).toHaveTextContent('all')
  })

  it('sET_SEARCH action updates search value', async () => {
    const user = userEvent.setup()
    render(<PostsProvider><Consumer /></PostsProvider>)
    await user.click(screen.getByRole('button', { name: /set search/i }))
    expect(screen.getByTestId('search')).toHaveTextContent('react')
  })

  it('sET_FILTER action updates filter value', async () => {
    const user = userEvent.setup()
    render(<PostsProvider><Consumer /></PostsProvider>)
    await user.click(screen.getByRole('button', { name: /set filter/i }))
    expect(screen.getByTestId('filter')).toHaveTextContent('published')
  })

  it('context value is null outside PostsProvider', () => {
    expect(() => render(<Consumer />)).toThrow(
      'PostsContext must be used within PostsProvider',
    )
  })
})
