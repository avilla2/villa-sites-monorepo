import React from 'react'
import { Routes, Route } from 'react-router'
import { ContentPage, HomePage, NotFoundPage, SiteMapPage as Sitemap } from '@villa-components/components'

/**
 * Renders the site route definitions
 * @param {Object} props - SiteRoutes props
 * @param {JSX.Element} props.children - Child components to be rendered within the routes
 * @param {Website} props.siteContent - Website content data
 * @param {Function} props.setPage - Function to set the current page name
 * @param {Function} props.setNavIndex - Function to set the navigation index
 * @returns {JSX.Element} The SiteRoutes component
 */
export default function SiteRoutes ({ children, siteContent, setPage: preSetPage, setNavIndex }) {
  const showTitle = siteContent?.navbar?.Style !== 'Split'
  const siteSettings = siteContent?.site_settings
  const homePageData = siteContent?.homepage

  const setPage = (text) => {
    preSetPage(text, siteSettings?.SiteTitle)
  }

  return (
    <Routes>
      {siteContent.content_pages?.map((page, key) => (
        <Route
          key={key}
          path={page.Link}
          element={
            <ContentPage
              siteName={siteContent.name}
              minSize={siteSettings.DesktopBreakpoint}
              setNavIndex={setNavIndex}
              path={page.Link}
              setPage={setPage}
              name={page.Title}
              content={page.Content}
              showTitle={showTitle}
              titleColor={siteContent.navbar.FontColor ?? 'white'}
            />
          }
        />
      ))}
      {children}
      <Route
        path="/"
        element={
          <HomePage
            siteName={siteContent.name}
            setNavIndex={setNavIndex}
            setPage={setPage}
            path="/"
            pageName={homePageData.PageName}
            content={homePageData.Content}
          />
        }
      />
      <Route
        path="/sitemap"
        element={
          <Sitemap
            setPage={setPage}
            contentPages={siteContent.content_pages}
            locale={siteContent.locale}
          />
        }
      />
      <Route path="*" element={<NotFoundPage setPage={setPage} />} />
    </Routes>
  )
}
