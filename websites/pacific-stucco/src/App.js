import React from 'react'
import LoadingSVG from './loading'
import './app.css'
const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 13

  return (
    <div className="App">
      <VillaComponentSystem
        defaultSiteId={DEFAULT_SITE_ID}
        loadingComponent={<LoadingSVG />}
        fonts={['"Bevan"', '"Fira Sans"']}
      />
    </div>
  )
}
