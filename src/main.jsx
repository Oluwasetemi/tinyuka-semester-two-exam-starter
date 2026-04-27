import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// App component will be added in a later task (Task 10)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ padding: '2rem', color: '#f0efe8', fontFamily: 'sans-serif' }}>
      <h1>React Exam Starter</h1>
      <p>Configuration in progress...</p>
    </div>
  </StrictMode>,
)
