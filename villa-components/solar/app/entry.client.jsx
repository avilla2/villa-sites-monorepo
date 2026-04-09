import React, { startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { HydratedRouter } from 'react-router/dom'

startTransition(() => {
  hydrateRoot(
    document,
    <React.StrictMode>
      <HydratedRouter />
    </React.StrictMode>,
    {
      onRecoverableError (error, errorInfo) {
        console.error('Hydration error:', error)
        console.error('Error component stack:', errorInfo?.componentStack)
      }
    }
  )
})
