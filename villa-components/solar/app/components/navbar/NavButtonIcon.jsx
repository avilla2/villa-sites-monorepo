import React from 'react'
import { Link } from 'react-router'

/** Image/logo link in the navbar. */
export default function NavButtonIcon ({ link, external, src, alt, width }) {
  const Tag = external ? 'a' : Link
  const linkProps = external
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : { to: link }

  return (
    <Tag {...linkProps} className="nav-button-icon">
      <img
        src={src}
        alt={alt || ''}
        {...(width ? { width } : {})}
        className="nav-button-icon__img"
      />
    </Tag>
  )
}
