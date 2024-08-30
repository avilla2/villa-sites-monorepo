import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../components/utils/scrollToTop'
import ContentPage from '../pages/contentPage'
import HomePage from '../pages/homePage'
import NotFoundPage from '../pages/notFoundPage'
import SiteNavbar from '../pageElements/navbar'
import SiteFooter from '../pageElements/footer'
import '../index.css'

export default function VillaRoutes ({ children, siteContent, page, setPage, siteId, setSiteId, navIndex, setNavIndex }) {
  return (
      <Router>
        <ScrollToTop />
        <SiteNavbar
          siteId={siteId}
          setSiteId={setSiteId}
          page={page}
          navIndex={navIndex}
          minSize={siteContent.site_settings.data.attributes.DesktopBreakpoint}
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
            <Route path="*" element={<NotFoundPage setPage={setPage} />} />
          </Routes>
        <SiteFooter {...siteContent.footer.data.attributes} />
      </Router>
  )
}
