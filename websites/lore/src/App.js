import React from 'react'
import LoadingSVG from './loading'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './app.css'

const RenderingSystem = React.lazy(() => import('villa_components/VillaRenderingSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 9 // 'gphzmmnxs62yz5xy17mlnjpn'
  const ES_US_SITE_ID = 10

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/es-US/*'
            element={
              <RenderingSystem
                defaultSiteId={ES_US_SITE_ID}
                loadingComponent={<LoadingSVG />}
                fonts={['"DM Serif Text"', 'Poppins']}
              >
              </RenderingSystem>
            }
          />
          <Route
            path="*"
            element={
              <RenderingSystem
                defaultSiteId={DEFAULT_SITE_ID}
                loadingComponent={<LoadingSVG />}
                fonts={['"DM Serif Text"', 'Poppins']}
              >
              </RenderingSystem>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}
