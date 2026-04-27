import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

export const getPostsQueryOptions = ({ page = 1 } = {}) =>
  queryOptions({
    queryKey: ['posts', { page }],
    queryFn: () => apiClient.get(`/posts?page=${page}&limit=10`),
  })

export function usePosts({ page = 1 } = {}) {
  return useSuspenseQuery(getPostsQueryOptions({ page }))
}
