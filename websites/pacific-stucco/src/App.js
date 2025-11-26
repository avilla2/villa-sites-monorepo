import React from 'react'
import LoadingSVG from './loading'
import './app.css'
const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 'pf81m9a8ew4f7yn3jcfgx21g'

  return (
    <div className="App">
      <VillaComponentSystem
        defaultSiteId={DEFAULT_SITE_ID}
        loadingComponent={<LoadingSVG />}
        fonts={['"Varela"', '"Fira Sans"']}
      />
    </div>
  )
}
