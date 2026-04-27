import { QueryClientProvider } from '@tanstack/react-query'
import { createHead, UnheadProvider } from '@unhead/react/client'
import { queryClient } from '@/lib/react-query'
import { AppRouter } from './router'

const head = createHead()

export function App() {
  return (
    <UnheadProvider head={head}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </UnheadProvider>
  )
}
