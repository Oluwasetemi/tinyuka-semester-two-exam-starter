import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { getCommentsQueryOptions, useComments } from '../get-comments'

function makeWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('useComments', () => {
  it('returns comments array for a given postId', async () => {
    const { result } = renderHook(() => useComments('post-1'), {
      wrapper: makeWrapper(),
    })
    await waitFor(() => expect(result.current.data).toBeDefined())
    expect(Array.isArray(result.current.data.data)).toBe(true)
    expect(result.current.data.data).toHaveLength(2)
    expect(result.current.data.data[0].body).toBe('Great post!')
  })

  it('getCommentsQueryOptions uses correct query key', () => {
    const opts = getCommentsQueryOptions('post-99')
    expect(opts.queryKey).toEqual(['comments', 'post-99'])
  })
})
