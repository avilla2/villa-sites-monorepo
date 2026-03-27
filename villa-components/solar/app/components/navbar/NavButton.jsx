import React from 'react'
import { Link } from 'react-router'
import isExternal from '../../lib/isExternalLink'

/** Pill-shaped CTA button in the navbar. */
export default function NavButton ({ text, color, link, fontColor }) {
  const Tag = isExternal(link) ? 'a' : Link
  const linkProps = isExternal(link)
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : { to: link }

  return (
    <Tag
      {...linkProps}
      className="nav-button"
      style={{
        ...(color && { backgroundColor: color, borderColor: color }),
        ...(fontColor && { color: fontColor })
      }}
    >
      {text}
    </Tag>
  )
}
