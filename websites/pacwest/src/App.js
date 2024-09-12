import React, { useState, useEffect } from 'react'
import LoadingSVG from './loading'
const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 1
  const [page, setPage] = useState('PacWest | Pressure Washing Medford, OR')

  useEffect(() => {
    document.title = `${page} | Pressure Washing Medford, OR`
  }, [page])

  return (
    <div className="App">
      <VillaComponentSystem
        page={page}
        setPage={setPage}
        defaultSiteId={DEFAULT_SITE_ID}
        loadingComponent={<LoadingSVG />}
        fonts={['"Russo One"', '"Roboto Flex"']}
      >
      </VillaComponentSystem>
    </div>
  )
}
