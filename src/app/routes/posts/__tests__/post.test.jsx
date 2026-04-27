import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createHead, UnheadProvider } from '@unhead/react/client'
import PostRoute from '../post'

function renderPostRoute(id = 'post-1') {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const head = createHead()
  const router = createMemoryRouter(
    [{ path: '/posts/:id', element: <PostRoute /> }],
    { initialEntries: [`/posts/${id}`] },
  )
  return render(
    <UnheadProvider head={head}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UnheadProvider>,
  )
}

describe('Post route /posts/:id', () => {
  it('renders the post title', async () => {
    renderPostRoute('post-1')
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /test post post-1/i })).toBeInTheDocument(),
    )
  })

  it('renders a back button that links to /posts', async () => {
    renderPostRoute('post-1')
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /back|posts/i })).toBeInTheDocument(),
    )
  })

  it('renders comments section', async () => {
    renderPostRoute('post-1')
    await waitFor(() =>
      expect(screen.getByText(/great post!/i)).toBeInTheDocument(),
    )
  })
})
