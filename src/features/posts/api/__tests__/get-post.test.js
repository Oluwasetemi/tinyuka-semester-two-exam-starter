import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { usePost, getPostQueryOptions } from '../get-post'

function makeWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('usePost', () => {
  it('returns post data for a given id', async () => {
    const { result } = renderHook(() => usePost('post-1'), {
      wrapper: makeWrapper(),
    })
    await waitFor(() => expect(result.current.data).toBeDefined())
    expect(result.current.data.id).toBe('post-1')
    expect(result.current.data.title).toBe('Test Post post-1')
    expect(result.current.data.body).toBeDefined()
  })

  it('getPostQueryOptions uses correct query key', () => {
    const opts = getPostQueryOptions('post-42')
    expect(opts.queryKey).toEqual(['posts', 'post-42'])
  })
})
