import React, { useState, useEffect } from 'react'
import LoadingSVG from './loading'
const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 5
  const [page, setPage] = useState('Los Valdivias Portland, OR')

  useEffect(() => {
    document.title = `${page} | Los Valdivias Portland, OR`
  }, [page])

  return (
    <div className="App">
      <VillaComponentSystem
        page={page}
        setPage={setPage}
        defaultSiteId={DEFAULT_SITE_ID}
        loadingComponent={<LoadingSVG />}
        fonts={['"Alfa Slab One"', '"Dai Banna SIL"']}
      >
      </VillaComponentSystem>
    </div>
  )
}
