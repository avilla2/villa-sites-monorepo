import React, { useState } from 'react'
import { Outlet, useOutletContext, useNavigate, useLocation } from 'react-router'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

export default function Layout () {
  const { website } = useOutletContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [page, setPage] = useState('Home')
  const isContentPage = location.pathname !== '/'

  if (!website) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* Navbar */}
      {website.navbar && (
        <Navbar
          page={page}
          navIndex="/"
          Items={website.navbar.Items}
          MobileConfig={website.navbar.MobileConfig}
          siteBanner={website.navbar.siteBanner}
          Style={website.navbar.Style}
          Appearance={website.navbar.Appearance}
          FontColor={website.navbar.FontColor}
          minSize={website.site_settings?.DesktopBreakpoint || 'md'}
          mobileTitle={page}
          pageTitle={isContentPage ? page : undefined}
          onBackClick={() => navigate(-1)}
        />
      )}

      {/* Page Content */}
      <Outlet context={{ website, page, setPage }} />

      {/* Footer */}
      {website.footer && (
        <Footer
          Content={website.footer.Content}
          FontColor={website.footer.FontColor}
          links={website.footer.links}
          enableLocalization={website.site_settings?.enableLocalization}
          localeName="English"
          localeCode="en"
        />
      )}
    </>
  )
}
