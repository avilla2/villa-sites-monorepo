import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { ScrollToTop, Navbar as SiteNavbar, Footer as SiteFooter, LanguageModal } from '@villa-components/components'

/**
 * Layout component that wraps all routes with Navbar and Footer
 * @param {Object} props - Layout props
 * @param {Website} props.siteContent - Website content data
 * @param {string} props.page - Current page name
 * @param {number} props.navIndex - Current navigation index
 * @param {Function} props.setNavIndex - Function to set the navigation index
 * @param {Locales[]} props.locales - Array of available locales
 * @returns {JSX.Element} The Layout component
 */
export default function Layout ({ siteContent, page, navIndex, setNavIndex, locales }) {
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  const currentLocaleData = locales.find(localeObject => localeObject.code === siteContent.locale)
  const currentLanguage = currentLocaleData ? currentLocaleData.name : 'Language'

  const siteSettings = siteContent?.site_settings
  const homePageData = siteContent?.homepage

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
      <Outlet />
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
      )}
    </React.Fragment>
  )
}
