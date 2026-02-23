import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import { ScrollToTop, ContentPage, HomePage, NotFoundPage, SiteMapPage as Sitemap, Navbar as SiteNavbar, Footer as SiteFooter, LanguageModal } from '@villa-components/components'

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
 * @param {Locales[]} props.locales - Array of available locales
 * @returns {JSX.Element} The SiteRoutes component
 */

export default function SiteRoutes ({ children, siteContent, page, setPage, navIndex, setNavIndex, setSiteTitle, locales }) {
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  const currentLocaleData = locales.find(localeObject => localeObject.code === siteContent.locale)
  const currentLanguage = currentLocaleData ? currentLocaleData.name : 'Language'

  const showTitle = siteContent?.navbar?.Style !== 'Split'
  const siteSettings = siteContent?.site_settings
  const homePageData = siteContent?.homepage

  useEffect(() => {
    setSiteTitle(siteSettings.SiteTitle)
  }, [siteContent.site_settings])

  return (
    <React.Fragment>
      <ScrollToTop />
        <SiteNavbar
          page={page}
          navIndex={navIndex}
          minSize={siteSettings.DesktopBreakpoint}
          mobileTitle={homePageData.Title}
          onBackClick={() => navigate(-1)}
          {...siteContent.navbar}
        />
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
            {children
              ? React.Children.toArray(children).filter(child =>
                React.isValidElement(child) &&
              (child.type === Route || child.type === React.Fragment)
              )
              : null}
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
                  contentPages={siteContent.content_pages || []}
                  locale={siteContent.locale}
                />
              }
            />
            <Route path="*" element={<NotFoundPage setPage={setPage} />} />
          </Routes>
        <SiteFooter
          enableLocalization={siteSettings.EnableLocalization}
          localeCode={siteContent.locale}
          localeName={currentLanguage}
          handleLocalize={() => setModalOpen(true)}
          {...siteContent.footer}
        />
        {siteSettings.EnableLocalization && (
            <LanguageModal
              fontColor={siteContent.footer.FontColor}
              open={modalOpen}
              handleClose={() => setModalOpen(false)}
              options={locales}
            />
        )
        }
    </React.Fragment>
  )
}
