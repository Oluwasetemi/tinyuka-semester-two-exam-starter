export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  posts: {
    path: '/posts',
    getHref: () => '/posts',
  },
  post: {
    path: '/posts/:id',
    getHref: id => `/posts/${id}`,
  },
  errorTest: {
    path: '/error-test',
    getHref: () => '/error-test',
  },
}
