import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useCreateComment } from '../create-comment'

function makeWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } })
  return { queryClient, wrapper: ({ children }) =>
    createElement(QueryClientProvider, { client: queryClient }, children) }
}

describe('useCreateComment', () => {
  it('posts a comment to the correct endpoint', async () => {
    const { wrapper } = makeWrapper()
    const { result } = renderHook(() => useCreateComment({ postId: 'post-1' }), { wrapper })

    act(() => {
      result.current.mutate({ body: 'My test comment' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data.body).toBe('My test comment')
    expect(result.current.data.postId).toBe('post-1')
  })

  it('invalidates comments query on success', async () => {
    const { queryClient, wrapper } = makeWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useCreateComment({ postId: 'post-5' }), { wrapper })

    act(() => result.current.mutate({ body: 'Test' }))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(invalidateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['comments', 'post-5'] }),
    )
  })
})
