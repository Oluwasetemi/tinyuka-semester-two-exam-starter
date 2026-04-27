/**
 * This route intentionally throws an error.
 * Visit /error-test to see the ErrorBoundary in action.
 * https://react.oluwasetemi.dev/240?clicks=1
 */
export default function ErrorTestRoute() {
  throw new Error(
    'This error is intentional — the ErrorBoundary caught it! Check router.jsx to see how it is configured.',
  )
}
