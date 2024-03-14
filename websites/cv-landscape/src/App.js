import React, { useState, useEffect } from 'react'
import LoadingSVG from './loading'
import { VillaComponentSystem } from '@villa-components/system'

export default function App () {
  const DEFAULT_SITE_ID = 1
  const [page, setPage] = useState('Home')

  useEffect(() => {
    document.title = `${page} | PacWest Pressure Washing`
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
