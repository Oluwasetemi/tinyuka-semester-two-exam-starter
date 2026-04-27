import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'
import { PostsContext, PostsProvider } from '../posts-context'

function Consumer() {
  const ctx = useContext(PostsContext)
  if (!ctx) throw new Error('PostsContext must be used within PostsProvider')
  return (
    <div>
      <span data-testid="search">{ctx.search}</span>
      <span data-testid="filter">{ctx.filter}</span>
      <button onClick={() => ctx.dispatch({ type: 'SET_SEARCH', payload: 'react' })}>
        Set Search
      </button>
      <button onClick={() => ctx.dispatch({ type: 'SET_FILTER', payload: 'published' })}>
        Set Filter
      </button>
    </div>
  )
}

describe('PostsContext', () => {
  it('provides default state { search: "", filter: "all" }', () => {
    render(<PostsProvider><Consumer /></PostsProvider>)
    expect(screen.getByTestId('search')).toHaveTextContent('')
    expect(screen.getByTestId('filter')).toHaveTextContent('all')
  })

  it('SET_SEARCH action updates search value', async () => {
    const user = userEvent.setup()
    render(<PostsProvider><Consumer /></PostsProvider>)
    await user.click(screen.getByRole('button', { name: /set search/i }))
    expect(screen.getByTestId('search')).toHaveTextContent('react')
  })

  it('SET_FILTER action updates filter value', async () => {
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
