import React, { useState, useRef } from 'react'
import * as Menu from '@base-ui/react/menu'
import { Link } from 'react-router'
import isExternal from '../../lib/isExternalLink'

/**
 * Dropdown nav menu — hover on desktop, keyboard accessible.
 * Uses base-ui Menu for proper ARIA + keyboard navigation.
 */
export default function NavMenu ({ title, menuItem, active, shadow, fontColor }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)
  const isActive = menuItem.some(item => item.link === active)

  const openMenu = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger
        className={[
          'nav-menu__trigger',
          isActive ? 'nav-menu__trigger--active' : '',
          shadow ? 'nav-menu__trigger--shadow' : ''
        ].filter(Boolean).join(' ')}
        style={fontColor ? { color: fontColor } : undefined}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <span className="nav-menu__trigger-text">{title}</span>
        <svg className="nav-menu__chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner className="nav-menu__positioner" sideOffset={4} align="start">
          <Menu.Popup
            className="nav-menu__popup"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            {menuItem.map((item, i) => (
              <Menu.LinkItem
                key={i}
                className={`nav-menu__item${active === item.link ? ' nav-menu__item--active' : ''}`}
                href={item.link}
                target={isExternal(item.link) ? '_blank' : undefined}
                rel={isExternal(item.link) ? 'noopener noreferrer' : undefined}
                render={isExternal(item.link) ? undefined : <Link to={item.link} />}
                onClick={() => setOpen(false)}
              >
                {item.icon && (
                  <img
                    src={item.icon.url}
                    alt={item.icon.alternativeText || ''}
                    className="nav-menu__item-icon"
                  />
                )}
                <span>{item.text}</span>
              </Menu.LinkItem>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
