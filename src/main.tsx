import Providers from '@contexts/providers.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ReactRouterIndex from './router/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <ReactRouterIndex />
    </Providers>
  </React.StrictMode>,
)
