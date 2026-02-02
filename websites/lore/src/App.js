import React from 'react'
import LoadingSVG from './loading'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import './app.css'

const RenderingSystem = React.lazy(() => import('villa_components/VillaRenderingSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 'xuf4accmuxd77rw93z6adw0u'

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/es-US/*'
            element={
              <RenderingSystem
                defaultSiteId={DEFAULT_SITE_ID}
                locale='es-US'
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
