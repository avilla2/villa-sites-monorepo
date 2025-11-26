import React from 'react'
import LoadingSVG from './loading'
const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 'kbu1sc42mjfei7i6ipwmjpoq'

  return (
    <div className="App">
      <VillaComponentSystem
        defaultSiteId={DEFAULT_SITE_ID}
        loadingComponent={<LoadingSVG />}
        fonts={['"Russo One"', '"Roboto Flex"']}
      >
      </VillaComponentSystem>
    </div>
  )
}
