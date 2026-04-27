import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CommentsList } from '../comments-list'

const mockComments = [
  { id: 'c-1', body: 'First comment', postId: 'post-1', userId: 'user-2', createdAt: '2024-01-15T11:00:00.000Z' },
  { id: 'c-2', body: 'Second comment', postId: 'post-1', userId: 'user-3', createdAt: '2024-01-15T12:00:00.000Z' },
  { id: 'c-3', body: 'Third comment', postId: 'post-1', userId: 'user-4', createdAt: '2024-01-15T13:00:00.000Z' },
]

describe('CommentsList', () => {
  it('renders all comments', () => {
    render(<CommentsList comments={mockComments} />)
    expect(screen.getByText(/first comment/i)).toBeInTheDocument()
    expect(screen.getByText(/second comment/i)).toBeInTheDocument()
    expect(screen.getByText(/third comment/i)).toBeInTheDocument()
  })

  it('renders correct number of comment items', () => {
    render(<CommentsList comments={mockComments} />)
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('renders an empty state when no comments', () => {
    render(<CommentsList comments={[]} />)
    expect(screen.getByText(/no comments/i)).toBeInTheDocument()
  })
})
