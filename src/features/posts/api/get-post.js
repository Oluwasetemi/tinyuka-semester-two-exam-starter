// TODO: Implement getPostQueryOptions and usePost
//
// getPostQueryOptions(id) should return queryOptions({
//   queryKey: ['posts', id],
//   queryFn: () => apiClient.get(`/posts/${id}`),
// })
//
// usePost(id) should call useSuspenseQuery(getPostQueryOptions(id))
// and return the result.
//
// Reference: src/features/posts/api/get-posts.js

export function getPostQueryOptions(id) {
  throw new Error('TODO: implement getPostQueryOptions in get-post.js')
}

export function usePost(id) {
  throw new Error('TODO: implement usePost in get-post.js')
}
