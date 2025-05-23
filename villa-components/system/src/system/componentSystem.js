import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderingSystem from './renderingSystem'

export default function ComponentSystem ({ children, fonts, defaultSiteId, loadingComponent }) {
  return (
    <Router>
      <RenderingSystem
        fonts={fonts}
        defaultSiteId={defaultSiteId}
        loadingComponent={loadingComponent}
      >
        {children}
      </RenderingSystem>
    </Router>
  )
}
