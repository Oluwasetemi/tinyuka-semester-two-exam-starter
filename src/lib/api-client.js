import { env } from '@/config/env'

async function fetchJSON(path, options = {}) {
  const response = await fetch(`${env.API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText)
    throw new Error(`API Error ${response.status}: ${message}`)
  }
  return response.json()
}

export const apiClient = {
  get: (path) => fetchJSON(path),
  post: (path, data) =>
    fetchJSON(path, { method: 'POST', body: JSON.stringify(data) }),
  patch: (path, data) =>
    fetchJSON(path, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (path) => fetchJSON(path, { method: 'DELETE' }),
}
