import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

function makeWrapper(queryClient, route) {
  // eslint-disable-next-line react/component-hook-factories
  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    )
  }
}

export function renderWithProviders(ui, { route = '/', ...options } = {}) {
  const queryClient = makeQueryClient()
  return {
    queryClient,
    ...render(ui, { wrapper: makeWrapper(queryClient, route), ...options }),
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
