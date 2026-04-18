import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import useScrollTrigger from './useScrollTrigger'
import SiteBanner from './SiteBanner'
import NavLink from './NavLink'
import NavButton from './NavButton'
import NavButtonIcon from './NavButtonIcon'
import NavMenu from './NavMenu'
import MobileDrawer from './MobileDrawer'
import isExternal from '../../lib/isExternalLink'

// ─── helpers ─────────────────────────────────────────────────────────────────
const isNavText = (item) =>
  item.__typename === 'ComponentNavbarComponentsTextLink' ||
  item.__typename === 'ComponentNavbarComponentsNavMenu'

// Maps MUI-style breakpoint names to px values
const BP = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 }

// Arrow back icon
function ArrowBackIcon () {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

// Renders the right desktop item component for each data type
function DesktopItem ({ item, active, fontColor, shadow }) {
  switch (item.__typename) {
    case 'ComponentNavbarComponentsTextLink':
      return <NavLink id={item.Link} title={item.Title} link={item.Link} active={active} shadow={shadow} />
    case 'ComponentNavbarComponentsImageLink':
      return <NavButtonIcon id={item.Link} external={isExternal(item.Link)} width={item.Width} link={item.Link} src={item.Image.url} alt={item.Image.alternativeText || item.Image.name} />
    case 'ComponentNavbarComponentsNavButton':
      return <NavButton id={item.Link} link={item.Link} color={item.Color} text={item.Text} fontColor={fontColor} />
    case 'ComponentNavbarComponentsNavMenu':
      return <NavMenu id={item.title} title={item.title} active={active} menuItem={item.menuItem} shadow={shadow} fontColor={fontColor} />
    default:
      return null
  }
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
/**
 * @param {Object} props
 * @param {string} props.page - Current page name
 * @param {string} props.navIndex - Active nav link path
 * @param {import('../../../../villa-components/components/src/types').NavbarItem[]} props.Items
 * @param {import('../../../../villa-components/components/src/types').MobileConfig} props.MobileConfig
 * @param {import('../../../../villa-components/components/src/types').SiteBanner} [props.siteBanner]
 * @param {string} [props.Style] - 'Spaced' | 'Left_Aligned' | 'Split' | default (center)
 * @param {string} [props.Appearance] - 'fade_in' makes nav transparent until scrolled
 * @param {string} [props.FontColor]
 * @param {string} [props.minSize] - 'xs'|'sm'|'md'|'lg' breakpoint where desktop shows
 * @param {string} [props.mobileTitle]
 * @param {Function} [props.onBackClick]
 */
export default function Navbar ({
  page,
  navIndex,
  Items: content,
  MobileConfig: mobileData,
  siteBanner,
  Style: style,
  Appearance: appearance,
  FontColor: fontColor,
  minSize = 'md',
  mobileTitle,
  onBackClick
}) {
  const [mounted, setMounted] = useState(typeof window !== 'undefined')
  const scrolled = useScrollTrigger(65)
  const [active, setActive] = useState(navIndex)
  const desktopBarRef = useRef(null)
  const [desktopBarHeight, setDesktopBarHeight] = useState(0)
  const mobileBarRef = useRef(null)
  const [mobileBarHeight, setMobileBarHeight] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (navIndex) setActive(navIndex)
  }, [navIndex])

  useEffect(() => {
    const measure = () => {
      if (desktopBarRef.current) {
        setDesktopBarHeight(desktopBarRef.current.offsetHeight)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [siteBanner])

  useEffect(() => {
    const measure = () => {
      if (mobileBarRef.current) {
        setMobileBarHeight(Math.min(150, mobileBarRef.current.offsetHeight))
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [siteBanner])

  if (!content || !mobileData) return null

  // Elevation + transparency logic (mirrors original)
  const UTILITY_PAGES = new Set(['Site Map', 'Not Found'])
  const isFadeIn = appearance === 'fade_in' && !UTILITY_PAGES.has(page)

  // On SSR or before scroll is known, fade_in navbars start transparent
  const showElevation = mounted ? scrolled : !isFadeIn
  const isTransparent = mounted ? (!scrolled && isFadeIn) : isFadeIn
  const showBackButton = navIndex !== '/'

  // Toolbar layout variant class
  const toolbarVariant = {
    Spaced: 'navbar__toolbar--spaced',
    Left_Aligned: 'navbar__toolbar--left',
    Split: 'navbar__toolbar--split' // handled separately
  }[style] || 'navbar__toolbar--center'

  // Bar modifier classes
  const barClasses = [
    'navbar__bar',
    showElevation ? 'navbar__bar--elevated' : '',
    isTransparent ? 'navbar__bar--transparent' : ''
  ].filter(Boolean).join(' ')

  // For Split, separate text from non-text items
  const splitImages = content.filter(item => !isNavText(item))
  const splitText = content.filter(item => isNavText(item))

  const bpPx = BP[minSize] || 900

  return (
    <div
      className={`navbar navbar--bp-${minSize}`}
      style={{
        '--navbar-desktop-bp': `${bpPx}px`,
        ...(fontColor ? { color: fontColor } : {})
      }}
    >
      {/* ── Desktop ──────────────────────────────────────────────────────── */}
      <div className="navbar__desktop">
        <header className={barClasses} ref={desktopBarRef} role="banner">
          {siteBanner && <SiteBanner siteBanner={siteBanner} />}

          {style === 'Split'
            ? (
              <>
                <div className="navbar__toolbar navbar__toolbar--split-top">
                  {splitImages.map((item, i) => (
                    <DesktopItem key={i} item={item} active={active} fontColor={fontColor} shadow={isTransparent} />
                  ))}
                </div>
                <div className="navbar__toolbar navbar__toolbar--split-bottom">
                  {splitText.map((item, i) => (
                    <DesktopItem key={i} item={item} active={active} fontColor={fontColor} shadow={isTransparent} />
                  ))}
                </div>
              </>
              )
            : (
              <div className={`navbar__toolbar ${toolbarVariant}`}>
                {content.map((item, i) => (
                  <DesktopItem key={i} item={item} active={active} fontColor={fontColor} shadow={isTransparent} />
                ))}
              </div>
              )}
        </header>
        {/* Spacer so page content starts below the fixed bar - height is 0 when transparent */}
        <div style={{ height: isTransparent ? 0 : desktopBarHeight }} aria-hidden="true" />
      </div>

      {/* ── Mobile ───────────────────────────────────────────────────────── */}
      <div className="navbar__mobile">
        <header className={barClasses} ref={mobileBarRef} role="banner">
          {siteBanner && <SiteBanner siteBanner={siteBanner} />}
          <div className="navbar__toolbar navbar__toolbar--mobile">
            {/* Left: back button or home icon */}
            {showBackButton
              ? (
                <button
                  className="navbar__back-btn"
                  onClick={onBackClick}
                  aria-label="Go back"
                  style={fontColor ? { color: fontColor } : undefined}
                >
                  <ArrowBackIcon />
                </button>
                )
              : (
                <Link
                  to={mobileData.IconLink || '/'}
                  className="navbar__mobile-icon-link"
                >
                  <img
                    src={mobileData.MobileIcon?.url}
                    alt="Logo"
                    className="navbar__mobile-icon"
                  />
                </Link>
                )}

            {/* Center: site title */}
            <span className="navbar__mobile-title">
              {mobileTitle}
            </span>

            {/* Right: hamburger → drawer */}
            <MobileDrawer
              links={content}
              drawerLink={mobileData.DrawerLink || '/'}
              drawerText={mobileData.DrawerText || 'Menu'}
              fontColor={fontColor}
              active={active}
            />
          </div>
        </header>
        {/* Dynamic spacer matching measured bar height - height is 0 when transparent */}
        <div style={{ height: isTransparent ? 0 : mobileBarHeight }} aria-hidden="true" />
      </div>
    </div>
  )
}
