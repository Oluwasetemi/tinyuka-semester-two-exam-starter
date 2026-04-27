import { Component } from 'react'

/**
 * Teaching reference: class component Error Boundary.
 * getDerivedStateFromError updates state when a child throws.
 * componentDidCatch receives error + info for logging.
 *
 * In this project, react-error-boundary is used in production code.
 * This file exists so students can study the underlying class pattern.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert" className="p-6 text-center">
          <h2 className="text-lg font-semibold text-red-400">Something went wrong</h2>
          <pre className="mt-2 text-sm text-white/50">{this.state.error?.message}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
