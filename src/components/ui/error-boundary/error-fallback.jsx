export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center"
    >
      <p className="text-4xl mb-4">⚠️</p>
      <h2 className="text-xl font-semibold text-red-400 mb-2">
        Something went wrong
      </h2>
      <pre className="text-sm text-white/50 mb-6 max-w-md overflow-auto">
        {error.message}
      </pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
