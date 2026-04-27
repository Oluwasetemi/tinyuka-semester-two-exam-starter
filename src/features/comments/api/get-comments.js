import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

// TODO: Implement getCommentsQueryOptions and useComments
//
// getCommentsQueryOptions(postId) should return queryOptions({
//   queryKey: ['comments', postId],
//   queryFn: () => apiClient.get(`/posts/${postId}/comments`),
// })
//
// useComments(postId) should call useSuspenseQuery(getCommentsQueryOptions(postId))
//
// Reference: src/features/posts/api/get-posts.js

export const getCommentsQueryOptions = (postId) => {
  throw new Error('TODO: implement getCommentsQueryOptions in get-comments.js')
}

export function useComments(postId) {
  throw new Error('TODO: implement useComments in get-comments.js')
}
