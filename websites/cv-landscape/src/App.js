import React, { useState, useEffect } from 'react'
import LoadingSVG from './loading'
const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))

export default function App () {
  const DEFAULT_SITE_ID = 3
  const [page, setPage] = useState('CV Landscaping Medford, OR')

  useEffect(() => {
    document.title = `${page} | CV Landscaping Medford, OR`
  }, [page])

  return (
    <div className="App">
      <VillaComponentSystem
        page={page}
        setPage={setPage}
        defaultSiteId={DEFAULT_SITE_ID}
        loadingComponent={<LoadingSVG />}
        fonts={['"Francois One"', '"Jost"']}
      >
      </VillaComponentSystem>
    </div>
  )
}
