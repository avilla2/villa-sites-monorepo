import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router'
import TagManager from 'react-gtm-module'
import RenderingSystem from './renderingSystem'

/**
 * @typedef {Object} SystemParams - Component props
 * @property {React.ReactNode} children - Child components to be rendered within the system
 * @property {Array<string>} fonts - Array of font names to be used in the theme
 * @property {string} defaultSiteId - The default site ID to fetch website data
 * @property {React.ReactNode} loadingComponent - Component to display while loading data
 * @property {string} gtmId - Google Tag Manager ID for analytics tracking
*/

/**
 * ComponentSystem that wraps the RenderingSystem with a Router
 * @param {SystemParams} props - The component props
 * @returns {React.ReactElement} The ComponentSystem component
 */
export default function ComponentSystem ({ children, fonts, defaultSiteId, loadingComponent, gtmId }) {
  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({ gtmId })
    }
  }, [gtmId])

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
