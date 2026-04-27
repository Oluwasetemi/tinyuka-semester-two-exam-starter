import { range } from '@setemiojo/utils'
import { Skeleton } from '@/components/ui/skeleton'

export function PostsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {range(10).map(i => (
        <div key={i} className="border border-white/10 rounded-lg p-5 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-3 w-24 mt-2" />
        </div>
      ))}
    </div>
  )
}
