import React, { useState, useEffect } from 'react'
import LoadingSVG from './loading'
import { VillaComponentSystem } from '@villa-components/system'

export default function App () {
  const DEFAULT_SITE_ID = 5
  const [page, setPage] = useState('Home')

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
