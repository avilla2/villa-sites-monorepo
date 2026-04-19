import React, { useState } from 'react'
import { Drawer } from '@base-ui/react/drawer'
import { Collapsible } from '@base-ui/react/collapsible'
import { Link } from 'react-router'
import NavButton from './NavButton'
import NavButtonIcon from './NavButtonIcon'
import isExternal from '../../lib/isExternalLink'

// Hamburger icon
function HamburgerIcon () {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

// Chevron icon for accordion
function ChevronIcon () {
  return (
    <svg className="mobile-drawer__chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  )
}

/**
 * Mobile side-drawer with hamburger trigger.
 * - Text links and collapsible sub-menus in the main list
 * - NavButtons and (showInMobile) ImageLinks pinned to the bottom
 */
export default function MobileDrawer ({ links, drawerLink, drawerText, fontColor, active }) {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  // Collect CTA items to render at the bottom
  const ctaItems = links.filter(
    item =>
      item.__typename === 'ComponentNavbarComponentsNavButton' ||
      (item.__typename === 'ComponentNavbarComponentsImageLink' && item.showInMobile)
  )

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
      <Drawer.Trigger className="navbar__hamburger" aria-label="Open menu">
        <HamburgerIcon />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Backdrop className="mobile-drawer__backdrop" />
        <Drawer.Viewport className="mobile-drawer__viewport">
        <Drawer.Popup className="mobile-drawer">
          {/* Header */}
          <div className="mobile-drawer__header">
            <Drawer.Close
              className="mobile-drawer__header-link"
              render={<Link to={drawerLink} />}
              style={fontColor ? { color: fontColor } : undefined}
            >
              {drawerText}
            </Drawer.Close>
          </div>

          <hr className="mobile-drawer__divider" />

          {/* Main nav list */}
          <nav className="mobile-drawer__nav" aria-label="Mobile navigation">
            {links.map((item, i) => {
              // Skip CTA items — they render at the bottom
              if (
                item.__typename === 'ComponentNavbarComponentsNavButton' ||
                item.__typename === 'ComponentNavbarComponentsImageLink'
              ) return null

              if (item.__typename === 'ComponentNavbarComponentsNavMenu') {
                const hasActiveChild = item.menuItem.some(sub => sub.link === active)
                return (
                  <Collapsible.Root key={i} defaultOpen={hasActiveChild}>
                    <Collapsible.Trigger
                      className={`mobile-drawer__item mobile-drawer__item--menu${hasActiveChild ? ' mobile-drawer__item--active' : ''}`}
                      style={fontColor ? { color: fontColor } : undefined}
                    >
                      <span>{item.title}</span>
                      <ChevronIcon />
                    </Collapsible.Trigger>
                    <Collapsible.Panel className="mobile-drawer__submenu">
                      {item.menuItem.map((sub, si) => {
                        const isSubActive = active === sub.link
                        const Tag = isExternal(sub.link) ? 'a' : Link
                        const linkProps = isExternal(sub.link)
                          ? { href: sub.link, target: '_blank', rel: 'noopener noreferrer' }
                          : { to: sub.link }
                        return (
                          <Tag
                            key={si}
                            {...linkProps}
                            className={`mobile-drawer__subitem${isSubActive ? ' mobile-drawer__subitem--active' : ''}`}
                            style={!isSubActive && fontColor ? { color: fontColor } : undefined}
                            onClick={close}
                          >
                            {sub.icon && (
                              <img src={sub.icon.url} alt={sub.icon.alternativeText || ''} className="mobile-drawer__subitem-icon" />
                            )}
                            {sub.text}
                          </Tag>
                        )
                      })}
                    </Collapsible.Panel>
                  </Collapsible.Root>
                )
              }

              if (item.__typename === 'ComponentNavbarComponentsTextLink') {
                const isItemActive = active === item.Link
                const Tag = isExternal(item.Link) ? 'a' : Link
                const linkProps = isExternal(item.Link)
                  ? { href: item.Link, target: '_blank', rel: 'noopener noreferrer' }
                  : { to: item.Link }
                return (
                  <Tag
                    key={i}
                    {...linkProps}
                    className={`mobile-drawer__item${isItemActive ? ' mobile-drawer__item--active' : ''}`}
                    style={!isItemActive && fontColor ? { color: fontColor } : undefined}
                    onClick={close}
                  >
                    {item.Title}
                  </Tag>
                )
              }

              return null
            })}
          </nav>

          {/* CTA items pinned to the bottom */}
          {ctaItems.length > 0 && (
            <div className="mobile-drawer__cta-list">
              {ctaItems.map((item, i) =>
                item.__typename === 'ComponentNavbarComponentsImageLink'
                  ? (
                      item.Image?.url
                        ? (
                          <div key={i} className="mobile-drawer__cta-icon">
                            <NavButtonIcon
                              link={item.Link}
                              external={isExternal(item.Link)}
                              src={item.Image.url}
                              alt={item.Image.alternativeText || item.Image.name}
                            />
                          </div>
                          )
                        : null
                    )
                  : (
                    <NavButton
                      key={i}
                      link={item.Link}
                      color={item.Color}
                      text={item.Text}
                      fontColor={fontColor}
                    />
                    )
              )}
            </div>
          )}
        </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
