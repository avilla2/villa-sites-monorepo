import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../components/utils/scrollToTop'
import ContentPage from '../pages/contentPage'
import HomePage from '../pages/homePage'
import NotFoundPage from '../pages/notFoundPage'
import NoContentPage from '../pages/noContentPage'
import SiteNavbar from '../pageElements/navbar'
import SiteFooter from '../pageElements/footer'
import '../index.css'

export default function ComponentSystem ({ children, siteContent, page, setPage, siteId, setSiteId }) {
  const [navIndex, setNavIndex] = useState(0)

  if (!siteContent) return (<NoContentPage setPage={setPage} />)

  return (
    <Router>
      <ScrollToTop />
      <SiteNavbar
        siteId={siteId}
        setSiteId={setSiteId}
        page={page}
        navIndex={navIndex}
        minSize={siteContent.SiteSettings.data.attributes.DesktopBreakpoint}
        {...siteContent.Navbar.data.attributes}
      />
        <Routes>
          {siteContent.ContentPages.data.map((item, key) => (
            <Route
              key={key}
              path={item.attributes.Link}
              element={
                <ContentPage
                  minSize={siteContent.SiteSettings.data.attributes.DesktopBreakpoint}
                  setNavIndex={setNavIndex}
                  path={item.attributes.Link}
                  setPage={setPage}
                  name={item.attributes.Name}
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
                pageName={siteContent.Homepage.data.attributes.PageName}
                content={siteContent.Homepage.data.attributes.Content}
              />
            }
          />
          <Route path="*" element={<NotFoundPage setPage={setPage} />} />
        </Routes>
      <SiteFooter {...siteContent.Footer.data.attributes} />
    </Router>
  )
}
