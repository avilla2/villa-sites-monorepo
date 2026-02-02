import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import ScrollToTop from '../components/utils/scrollToTop'
import ContentPage from '../pages/contentPage'
import HomePage from '../pages/homePage'
import NotFoundPage from '../pages/notFoundPage'
import Sitemap from '../pages/siteMapPage'
import SiteNavbar from '../pageElements/navbar'
import SiteFooter from '../pageElements/footer'
import '../index.css'

/**
 * Renders the site routes, navbar and footer
 * @param {Object} props - SiteRoutes props
 * @param {JSX.Element} props.children - Child components to be rendered within the routes
 * @param {Website} props.siteContent - Website content data
 * @param {string} props.page - Current page name
 * @param {Function} props.setPage - Function to set the current page name
 * @param {number} props.navIndex - Current navigation index
 * @param {Function} props.setNavIndex - Function to set the navigation index
 * @param {Function} props.setSiteTitle - Function to set the site title
 * @returns {JSX.Element} The SiteRoutes component
 */
export default function SiteRoutes ({ children, siteContent, page, setPage, navIndex, setNavIndex, setSiteTitle }) {
  const showTitle = siteContent?.navbar?.Style !== 'Split'
  const siteSettings = siteContent?.site_settings
  const homePageData = siteContent?.homepage

  useEffect(() => {
    setSiteTitle(siteSettings.SiteTitle)
    localStorage.setItem('siteName', siteContent.name)
  }, [siteContent.site_settings])

  return (
    <React.Fragment>
      <ScrollToTop />
        <SiteNavbar
          page={page}
          navIndex={navIndex}
          minSize={siteSettings.DesktopBreakpoint}
          mobileTitle={homePageData.Title}
          {...siteContent.navbar}
        />
          <Routes>
            {siteContent.content_pages.map((page, key) => (
              <Route
                key={key}
                path={page.Link}
                element={
                  <ContentPage
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
        <SiteFooter
          enableLocalization={siteSettings.EnableLocalization}
          locale={siteContent.locale}
          {...siteContent.footer}
        />
    </React.Fragment>
  )
}
