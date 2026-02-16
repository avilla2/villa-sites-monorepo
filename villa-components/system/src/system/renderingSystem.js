import React, { useState } from 'react'
import { NoContentPage, ThemeProvider } from '@villa-components/components'
import Routes from '../routes/routes'
import Query from '../utils/query'
import apolloClient from '../utils/apolloClient'
import { APP_QUERY } from '@villa-components/graphql-queries'
import { ApolloProvider } from '@apollo/client/react'

import '../index.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '@villa-components/components/dist/bundle.css'

/**
 * Rendering System component that sets up the application with Apollo Client,
 * @param {Object} props - The component props
 * @param {string[]} props.fonts - Array of font family names to be used in the theme
 * @param {string} props.defaultSiteId - The default site ID to fetch website data
 * @param {string} props.locale - Optional: The locale to fetch website data for
 * @param {React.ReactNode} props.loadingComponent - Component to display while loading data
 * @returns {React.ReactElement} The RenderingSystem component
 */
export default function RenderingSystem ({
  children,
  fonts,
  defaultSiteId,
  locale,
  loadingComponent
}) {
  const [navIndex, setNavIndex] = useState(0)
  const [siteTitle, setSiteTitle] = useState('')
  const [pageName, setPageName] = useState('')

  /**
   * Sets the document title and updates the current page name
   * @param {string} text - The text to set as the page title
   */
  const setPage = (text) => {
    document.title = `${text} ${siteTitle}`
    setPageName(text)
  }

  /**
   * Renders the application content based on website data from GraphQL query
   * @param {Object} params - The render function parameters
   * @param {AppQueryData} params.data - Apollo Client data object containing website information
   * @returns {React.ReactElement} Either a NoContentPage component if no website content is available,
   *                               or a complete site layout with ThemeProvider, Routes, and children components
   */
  const render = ({ data }) => {
    const websiteContent = data?.website
    if (!websiteContent) return (<NoContentPage />)

    return (
      <ThemeProvider palette={websiteContent.site_settings.Palette} fonts={fonts}>
        <Routes
          navIndex={navIndex}
          setNavIndex={setNavIndex}
          page={pageName}
          setPage={setPage}
          siteContent={websiteContent}
          setSiteTitle={setSiteTitle}
          locales={data.i18NLocales}
        >
          {children}
        </Routes>
      </ThemeProvider>
    )
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Query
        query={APP_QUERY}
        variables={{ id: defaultSiteId, locale }}
        loadingComponent={loadingComponent}
      >
        {render}
      </Query>
    </ApolloProvider>
  )
}
