import React from 'react'
import LoadingSVG from './loading'
const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 'gphzmmnxs62yz5xy17mlnjpn'

  return (
    <div className="App">
      <VillaComponentSystem
        defaultSiteId={DEFAULT_SITE_ID}
        loadingComponent={<LoadingSVG />}
        fonts={['"Racing Sans One"', 'Poppins']}
      >
      </VillaComponentSystem>
    </div>
  )
}
