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

/**
 * Rendering System component that sets up the application with Apollo Client,
 * @param {SystemParams} props - The component props
 * @returns {React.ReactElement} The RenderingSystem component
 */
export default function RenderingSystem ({ children, fonts, defaultSiteId, loadingComponent }) {
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
        >
          {children}
        </Routes>
      </ThemeProvider>
    )
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Query query={appQuery} variables={{ id: defaultSiteId }} loadingComponent={loadingComponent}>
        {render}
      </Query>
    </ApolloProvider>
  )
}
