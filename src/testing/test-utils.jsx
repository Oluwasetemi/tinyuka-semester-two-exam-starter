import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

export function renderWithProviders(ui, { route = '/', ...options } = {}) {
  const queryClient = makeQueryClient()

  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    )
  }

  return {
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...options }),
  }
}

export * from '@testing-library/react'
