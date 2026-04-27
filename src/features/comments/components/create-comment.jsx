// TODO: Implement CreateComment using useActionState + useFormStatus
//
// CreateComment receives: { postId }
//
// Implementation steps:
// 1. Use useActionState(async (prevState, formData) => { ... }, { error: null })
//    Inside the action:
//    - Read the body: formData.get('body')
//    - POST to the API using apiClient.post(`/posts/${postId}/comments`, { body })
//    - On success: return { error: null } (cleared state)
//    - On error: return { error: error.message }
//
// 2. Return a <form action={formAction}> (NOT onSubmit)
//    - A <textarea name="body" /> for the comment
//    - <SubmitButton label="Add Comment" pendingLabel="Adding..." />
//    - An error display: {state.error && <p role="alert">{state.error}</p>}
//
// Import apiClient from '@/lib/api-client'
// Import SubmitButton from './submit-button' (already provided above)
//
// Reference: https://react.dev/reference/react/useActionState

export function CreateComment({ postId }) {
  throw new Error('TODO: implement CreateComment in create-comment.jsx')
}
