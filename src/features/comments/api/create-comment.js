import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

// TODO: Implement useCreateComment
//
// useCreateComment({ postId }) should:
// 1. Call useMutation with:
//    mutationFn: (data) => apiClient.post(`/posts/${postId}/comments`, data)
// 2. On success, invalidate the comments query:
//    queryClient.invalidateQueries({ queryKey: ['comments', postId] })
// 3. Return the mutation result
//
// Reference: https://tanstack.com/query/latest/docs/framework/react/guides/mutations

export function useCreateComment({ postId }) {
  throw new Error('TODO: implement useCreateComment in create-comment.js')
}
