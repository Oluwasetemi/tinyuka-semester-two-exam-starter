// TODO: Implement the /posts/:id route
//
// This route should:
// 1. Use useParams() to get { id } from the URL
// 2. Call useHead({ title: post.title }) for SEO (after fetching the post)
// 3. Render PostView with the fetched post
// 4. Wrap PostView in <Suspense fallback={<PostViewSkeleton />}>
// 5. Below the post, render a comments section:
//    - Heading: "Comments"
//    - Wrap CommentsList in <Suspense fallback={<CommentsListSkeleton />}>
//    - Wrap that Suspense in <ErrorBoundary FallbackComponent={ErrorFallback}>
//      so a comments failure doesn't break the whole page
//    - Render CreateComment below the list
// 6. Include a back button/link to /posts
//
// Imports you will need:
//   import { useParams } from 'react-router'
//   import { useHead } from '@unhead/react'
//   import { Suspense } from 'react'
//   import { ErrorBoundary } from 'react-error-boundary'
//   import { usePost } from '@/features/posts/api/get-post'
//   import { PostView } from '@/features/posts/components/post-view'
//   import { PostViewSkeleton } from '@/features/posts/components/post-view-skeleton'
//   import { CommentsList } from '@/features/comments/components/comments-list'
//   import { CommentsListSkeleton } from '@/features/comments/components/comments-list-skeleton'
//   import { CreateComment } from '@/features/comments/components/create-comment'
//   import { ErrorFallback } from '@/components/ui/error-boundary/error-fallback'
//   import { paths } from '@/config/paths'

export default function PostRoute() {
  throw new Error('TODO: implement PostRoute in src/app/routes/posts/post.jsx')
}
