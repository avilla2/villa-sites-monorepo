import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ScrollToTop from '../components/utils/scrollToTop'
import ContentPage from '../pages/contentPage'
import HomePage from '../pages/homePage'
import NotFoundPage from '../pages/notFoundPage'
import Sitemap from '../pages/siteMapPage'
import SiteNavbar from '../pageElements/navbar'
import SiteFooter from '../pageElements/footer'
import '../index.css'

export default function SiteRoutes ({ children, siteContent, page, setPage, navIndex, setNavIndex, setSiteTitle }) {
  const showTitle = siteContent?.navbar?.data?.attributes?.Style !== 'Split'

  useEffect(() => {
    setSiteTitle(siteContent.site_settings.data.attributes.SiteTitle)
    localStorage.setItem('siteName', siteContent.name)
  }, [siteContent.site_settings])

  return (
    <React.Fragment>
      <ScrollToTop />
        <SiteNavbar
          page={page}
          navIndex={navIndex}
          minSize={siteContent.site_settings.data.attributes.DesktopBreakpoint}
          mobileTitle={siteContent.homepage.data.attributes.Title}
          {...siteContent.navbar.data.attributes}
        />
          <Routes>
            {siteContent.content_pages.data.map((item, key) => (
              <Route
                key={key}
                path={item.attributes.Link}
                element={
                  <ContentPage
                    minSize={siteContent.site_settings.data.attributes.DesktopBreakpoint}
                    setNavIndex={setNavIndex}
                    path={item.attributes.Link}
                    setPage={setPage}
                    name={item.attributes.Title}
                    content={item.attributes.Content}
                    showTitle={showTitle}
                    titleColor={siteContent.navbar.data.attributes.FontColor ?? 'white'}
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
                  pageName={siteContent.homepage.data.attributes.PageName}
                  content={siteContent.homepage.data.attributes.Content}
                />
              }
            />
            <Route
              path="/sitemap"
              element={
                <Sitemap
                  setPage={setPage}
                  contentPages={siteContent.content_pages.data}
                  locale={siteContent.locale}
                />
              }
            />
            <Route path="*" element={<NotFoundPage setPage={setPage} />} />
          </Routes>
        <SiteFooter
          enableLocalization={siteContent.site_settings.data.attributes.EnableLocalization}
          locale={siteContent.locale}
          {...siteContent.footer.data.attributes}
        />
    </React.Fragment>
  )
}
