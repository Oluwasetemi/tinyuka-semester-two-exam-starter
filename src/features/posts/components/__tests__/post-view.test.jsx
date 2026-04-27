import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PostView } from '../post-view'

const mockPost = {
  id: 'post-1',
  title: 'My Test Post Title',
  body: 'This is the full body content of the post.',
  userId: 'user-1',
  createdAt: '2024-01-15T10:00:00.000Z',
}

describe('postView', () => {
  it('renders the post title', () => {
    render(<PostView post={mockPost} />)
    expect(screen.getByRole('heading', { name: /my test post title/i })).toBeInTheDocument()
  })

  it('renders the post body', () => {
    render(<PostView post={mockPost} />)
    expect(screen.getByText(/full body content/i)).toBeInTheDocument()
  })

  it('renders the creation date', () => {
    render(<PostView post={mockPost} />)
    expect(screen.getByText(/jan.*2024|2024.*jan/i)).toBeInTheDocument()
  })
})
