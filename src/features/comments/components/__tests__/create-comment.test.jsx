import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { CreateComment } from '../create-comment'

function Wrapper({ children }) {
  const qc = new QueryClient({ defaultOptions: { mutations: { retry: false } } })
  return (
    <QueryClientProvider client={qc}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  )
}

describe('createComment', () => {
  it('renders a textarea and submit button', () => {
    render(<CreateComment postId="post-1" />, { wrapper: Wrapper })
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add comment|submit/i })).toBeInTheDocument()
  })

  it('uses form action attribute (useActionState), not onSubmit', () => {
    render(<CreateComment postId="post-1" />, { wrapper: Wrapper })
    const form = screen.getByRole('form') ?? document.querySelector('form')
    expect(form).not.toBeNull()
  })

  it('clears textarea after successful submission', async () => {
    const user = userEvent.setup()
    render(<CreateComment postId="post-1" />, { wrapper: Wrapper })

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'My new comment')
    expect(textarea).toHaveValue('My new comment')

    const button = screen.getByRole('button', { name: /add comment|submit/i })
    await user.click(button)

    await waitFor(() => expect(textarea).toHaveValue(''))
  })

  it('shows an error message when submission fails', async () => {
    const user = userEvent.setup()
    const { server } = await import('@/testing/msw/server')
    const { http, HttpResponse } = await import('msw')
    server.use(
      http.post('https://api.oluwasetemi.dev/posts/:postId/comments', () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 })),
    )

    render(<CreateComment postId="post-1" />, { wrapper: Wrapper })
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Bad comment')
    await user.click(screen.getByRole('button', { name: /add comment|submit/i }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toBeInTheDocument(),
    )
  })
})
