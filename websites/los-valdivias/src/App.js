import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import ComponentLoader from './componentLoader'

const VillaComponentSystem = React.lazy(() => import('villa_components/VillaComponentSystem'))
const IntakeForm = React.lazy(() => import('villa_components/LVLIntakeForm'))

export default function App () {
  const DEFAULT_SITE_ID = 'ulbqjd1omixehd4gjnitqgg7'

  return (
    <div className="App">
      <Suspense fallback={<ComponentLoader />}>
        <VillaComponentSystem
          defaultSiteId={DEFAULT_SITE_ID}
          loadingComponent={<ComponentLoader />}
          fonts={['"Alfa Slab One"', '"Dai Banna SIL"']}
        >
            <Route
              path="/project-request"
              element={
                <IntakeForm
                  fromEmail={process.env.REACT_APP_FROM_EMAIL}
                  toEmail={process.env.REACT_APP_TO_EMAIL}
                />
              }
            />
        </VillaComponentSystem>
      </Suspense>
    </div>
  )
}
