import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CommentCard } from '../comment-card'

const mockComment = {
  id: 'c-1',
  body: 'This is a great comment.',
  postId: 'post-1',
  userId: 'user-2',
  createdAt: '2024-01-15T11:00:00.000Z',
}

describe('commentCard', () => {
  it('renders the comment body', () => {
    render(<CommentCard comment={mockComment} />)
    expect(screen.getByText(/this is a great comment/i)).toBeInTheDocument()
  })

  it('renders the author userId', () => {
    render(<CommentCard comment={mockComment} />)
    expect(screen.getByText(/user-2/i)).toBeInTheDocument()
  })
})
