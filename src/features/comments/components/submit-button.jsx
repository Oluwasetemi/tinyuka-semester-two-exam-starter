import { useFormStatus } from 'react-dom'

export function SubmitButton({ label = 'Submit', pendingLabel = 'Submitting...' }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-md text-sm transition-colors"
    >
      {pending ? pendingLabel : label}
    </button>
  )
}
