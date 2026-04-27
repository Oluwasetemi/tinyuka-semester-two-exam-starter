import { http, HttpResponse } from 'msw'

const BASE = 'https://api.oluwasetemi.dev'

function makePosts(page) {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `post-${(page - 1) * 10 + i + 1}`,
    title: `Test Post ${(page - 1) * 10 + i + 1}`,
    body: 'Test post body content for automated testing.',
    userId: 'user-1',
    createdAt: '2024-01-15T10:00:00.000Z',
  }))
}

export const handlers = [
  http.get(`${BASE}/posts`, ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    return HttpResponse.json({
      data: makePosts(page),
      meta: { page, totalPages: 5, total: 50 },
    })
  }),

  http.get(`${BASE}/posts/:id`, ({ params }) =>
    HttpResponse.json({
      id: params.id,
      title: `Test Post ${params.id}`,
      body: 'Full test post body content.',
      userId: 'user-1',
      createdAt: '2024-01-15T10:00:00.000Z',
    })),

  http.get(`${BASE}/posts/:postId/comments`, ({ params }) =>
    HttpResponse.json({
      data: [
        {
          id: 'c-1',
          body: 'Great post!',
          postId: params.postId,
          userId: 'user-2',
          createdAt: '2024-01-15T11:00:00.000Z',
        },
        {
          id: 'c-2',
          body: 'Thanks for sharing.',
          postId: params.postId,
          userId: 'user-3',
          createdAt: '2024-01-15T12:00:00.000Z',
        },
      ],
      meta: { total: 2 },
    })),

  http.post(`${BASE}/posts/:postId/comments`, async ({ request, params }) => {
    const body = await request.json()
    return HttpResponse.json(
      {
        id: 'c-new',
        body: body.body,
        postId: params.postId,
        userId: 'anonymous',
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    )
  }),
]
