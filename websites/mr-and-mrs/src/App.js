import React from 'react'
import LoadingSVG from './loading'
import './app.css'
const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 'b2wrl5f54jj017gxl34wz9ew'

  return (
    <div className="App">
      <VillaComponentSystem
        defaultSiteId={DEFAULT_SITE_ID}
        loadingComponent={<LoadingSVG />}
        fonts={['"Passion One"', '"Fredoka"']}
      />
    </div>
  )
}
