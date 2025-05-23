import React from 'react'
import LoadingSVG from './loading'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const VillaRenderingSystem = React.lazy(() => import('villa_components/VillaRenderingSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 9
  const ES_US_SITE_ID = 10

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/es-US/*'
            element={
              <VillaRenderingSystem
                defaultSiteId={DEFAULT_SITE_ID}
                loadingComponent={<LoadingSVG />}
                fonts={['"Cookie"', 'Poppins']}
              >
              </VillaRenderingSystem>
            }
          />
          <Route
            path="*"
            element={
              <VillaRenderingSystem
                defaultSiteId={ES_US_SITE_ID}
                loadingComponent={<LoadingSVG />}
                fonts={['"Cookie"', 'Poppins']}
              >
              </VillaRenderingSystem>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}
