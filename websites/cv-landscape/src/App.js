import React, { useState, useEffect } from 'react'
import { VillaComponentSystem, appQuery, apolloClient } from 'villa-component-system'
import Query from './query'
import { ApolloProvider } from '@apollo/client'
import ThemeProvider from './themeProvider'

export default function App () {
  const DEFAULT_SITE_ID = 1
  const [page, setPage] = useState('Home')
  const [siteId, setSiteId] = useState(DEFAULT_SITE_ID)

  useEffect(() => {
    document.title = `${page} | PacWest Pressure Washing`
  }, [page])

  return (
    <div className="App">
      <ApolloProvider client={apolloClient}>
        <Query query={appQuery} variables={{ id: DEFAULT_SITE_ID }}>
          {({ data }) => {
            const websiteContent = data?.website?.data?.attributes
            return (
              <ThemeProvider palette={websiteContent.SiteSettings.data.attributes.Palette} fonts={['"Russo One"', '"Roboto Flex"']}>
                <VillaComponentSystem
                  page={page}
                  setPage={setPage}
                  siteId={siteId}
                  setSiteId={setSiteId}
                  defaultSiteId={DEFAULT_SITE_ID}
                  siteContent={websiteContent}
                >
                </VillaComponentSystem>
              </ThemeProvider>
            )
          }}
        </Query>
      </ApolloProvider>
    </div>
  )
}
