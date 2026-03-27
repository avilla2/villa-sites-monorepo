import React from 'react'
import { Link } from 'react-router'
import isExternal from '../../lib/isExternalLink'

/**
 * Text nav link with the slide-reveal accent animation.
 * Two copies of the title are stacked; on hover/active the container translates
 * up to reveal the accent-colored copy.
 */
export default function NavLink ({ title, link, id, active, shadow }) {
  const isActive = active === id
  const Tag = isExternal(link) ? 'a' : Link
  const linkProps = isExternal(link)
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : { to: link }

  return (
    <Tag
      {...linkProps}
      className={`nav-link${isActive ? ' nav-link--active' : ''}${shadow ? ' nav-link--shadow' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="nav-link__mask">
        <span className="nav-link__texts">
          <span className="nav-link__text">{title}</span>
          <span className="nav-link__text nav-link__text--accent" aria-hidden="true">{title}</span>
        </span>
      </span>
    </Tag>
  )
}
