import React from 'react'
import LoadingSVG from './loading'
const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 'ulbqjd1omixehd4gjnitqgg7'

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
