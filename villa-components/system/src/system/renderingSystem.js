import React, { useState } from 'react'
import NoContentPage from '../pages/noContentPage'
import ThemeProvider from '../utils/themeProvider'
import Routes from '../routes/routes'
import Query from '../utils/query'
import apolloClient from '../utils/apolloClient'
import appQuery from '../queries/appQuery'
import { ApolloProvider } from '@apollo/client'

import '../index.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function RenderingSystem ({ children, fonts, defaultSiteId, loadingComponent }) {
  const [navIndex, setNavIndex] = useState(0)
  const [siteTitle, setSiteTitle] = useState('')
  const [pageName, setPageName] = useState('')

  const setPage = (text) => {
    document.title = `${text} ${siteTitle}`
    setPageName(text)
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Query query={appQuery} variables={{ id: defaultSiteId }} loadingComponent={loadingComponent}>
        {({ data }) => {
          const websiteContent = data?.website?.data?.attributes
          if (!websiteContent) return (<NoContentPage />)

          return (
            <ThemeProvider palette={websiteContent.site_settings.data.attributes.Palette} fonts={fonts}>
              <Routes
                navIndex={navIndex}
                setNavIndex={setNavIndex}
                page={pageName}
                setPage={setPage}
                siteContent={websiteContent}
                setSiteTitle={setSiteTitle}
              >
                {children}
              </Routes>
            </ThemeProvider>
          )
        }}
      </Query>
    </ApolloProvider>
  )
}
