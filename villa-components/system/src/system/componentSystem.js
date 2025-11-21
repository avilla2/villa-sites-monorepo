import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderingSystem from './renderingSystem'

/**
 * @typedef {Object} SystemParams - Component props
 * @property {React.ReactNode} children - Child components to be rendered within the system
 * @property {Array<string>} fonts - Array of font names to be used in the theme
 * @property {string} defaultSiteId - The default site ID to fetch website data
 * @property {React.ReactNode} loadingComponent - Component to display while loading data
*/

/**
 * ComponentSystem that wraps the RenderingSystem with a Router
 * @param {SystemParams} props - The component props
 * @returns {React.ReactElement} The ComponentSystem component
 */
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
