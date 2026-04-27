import { createContext } from 'react'

// TODO: Implement PostsContext and PostsProvider
//
// 1. Define initialState:
//    { search: '', filter: 'all' }
//    filter can be: 'all' | 'published' | 'draft'
//
// 2. Define postsReducer(state, action):
//    - 'SET_SEARCH': return { ...state, search: action.payload }
//    - 'SET_FILTER': return { ...state, filter: action.payload }
//    - default: return state
//
// 3. Create PostsContext with createContext(null)
//
// 4. PostsProvider wraps children with PostsContext.Provider
//    The value should be: { ...state, dispatch }
//
// Usage in components:
//   const { search, filter, dispatch } = useContext(PostsContext)
//   dispatch({ type: 'SET_SEARCH', payload: 'react' })
//
// Reference: src/pages in teaching notes — state-management.md

export const PostsContext = createContext(null)

export function PostsProvider({ children }) {
  throw new Error('TODO: implement PostsProvider in posts-context.jsx')
}
