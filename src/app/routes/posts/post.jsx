import { useHead } from '@unhead/react'
import { ContentLayout } from '@/components/layouts/content-layout'

export default function PostRoute() {
  useHead({ title: 'Post — Exam Starter' })

  return (
    <ContentLayout title="Post">
      <p className="text-white/50">Post detail coming in Task 19.</p>
    </ContentLayout>
  )
}
