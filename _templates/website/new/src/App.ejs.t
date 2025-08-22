---
to: websites/<%= name %>/src/App.js
---
import React from 'react'
import LoadingSVG from './loading'
const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 1

  return (
    <div className="App">
      <VillaComponentSystem
        defaultSiteId={DEFAULT_SITE_ID}
        loadingComponent={<LoadingSVG />}
        fonts={['"Alfa Slab One"', '"Dai Banna SIL"']}
      >
      </VillaComponentSystem>
    </div>
  )
}
