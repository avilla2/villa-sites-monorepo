import React from 'react'
import {
  Outlet,
  useOutletContext,
  useNavigate,
  useLocation,
  useRouteLoaderData
} from 'react-router'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import LoadingBar from '../components/shared/LoadingBar'
import WebsiteModal from '../components/shared/WebsiteModal'

export default function Layout() {
  const { website } = useOutletContext()
  const rootData = useRouteLoaderData('root')
  const navigate = useNavigate()
  const location = useLocation()
  const isHomepage = location.pathname === '/'

  // Derive page name from location and website data
  const getPageName = () => {
    if (location.pathname === '/') {
      return website?.homepage?.Title || 'Home'
    }
    if (location.pathname === '/sitemap') {
      return 'Site Map'
    }
    const contentPage = website?.content_pages?.find((page) => page.Link === location.pathname)
    return contentPage?.Title || 'Not Found'
  }

  const page = getPageName()

  if (!website) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* Global Loading Bar */}
      <LoadingBar color={website.site_settings?.Palette?.secondary || '#6c757d'} />

      {/* Navbar */}
      {website.navbar && (
        <Navbar
          page={page}
          navIndex={location.pathname}
          Items={website.navbar.Items}
          MobileConfig={website.navbar.MobileConfig}
          siteBanner={website.navbar.siteBanner}
          Style={website.navbar.Style}
          Appearance={website.navbar.Appearance}
          FontColor={website.navbar.FontColor}
          minSize={website.site_settings?.DesktopBreakpoint || 'md'}
          mobileTitle={website.homepage?.Title || website.site_settings?.SiteTitle || ''}
          onBackClick={() => navigate(-1)}
        />
      )}

      {/* Page Content */}
      <Outlet context={{ website }} />

      {isHomepage && website.modal && (
        <WebsiteModal
          modal={website.modal}
          websiteId={rootData?.websiteId}
          siteName={website.name}
        />
      )}

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
