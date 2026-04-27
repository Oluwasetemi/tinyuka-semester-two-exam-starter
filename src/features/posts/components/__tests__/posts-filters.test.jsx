import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { PostsContext } from '@/context/posts-context'
import { PostsFilters } from '../posts-filters'

function renderWithContext(search = '', filter = 'all') {
  const dispatch = vi.fn()
  render(
    <PostsContext value={{ search, filter, dispatch }}>
      <PostsFilters />
    </PostsContext>,
  )
  return { dispatch }
}

describe('postsFilters (context version)', () => {
  it('renders search input with current search value from context', () => {
    renderWithContext('react hooks')
    expect(screen.getByRole('searchbox')).toHaveValue('react hooks')
  })

  it('dispatches SET_SEARCH when input changes', async () => {
    const user = userEvent.setup()
    const { dispatch } = renderWithContext()
    await user.type(screen.getByRole('searchbox'), 'react')
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_SEARCH', payload: expect.stringContaining('r') })
  })

  it('dispatches SET_FILTER when select changes', async () => {
    const user = userEvent.setup()
    const { dispatch } = renderWithContext()
    await user.selectOptions(screen.getByRole('combobox'), 'published')
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_FILTER', payload: 'published' })
  })

  it('renders with no props (reads from context, not props)', () => {
    renderWithContext('hooks', 'published')
    expect(screen.getByRole('searchbox')).toHaveValue('hooks')
    expect(screen.getByRole('combobox')).toHaveValue('published')
  })
})
