import React from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router'

/**
 * NavButtonIcon component - Renders a navigation button with an image icon
 * @param {Object} props - NavButtonIcon props
 * @param {string} props.link - Target URL for the button
 * @param {boolean} props.external - Whether the link is external
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for the image
 * @param {number} props.width - Width of the icon image
 * @returns {JSX.Element} The NavButtonIcon component
 */
export default function NavButtonIcon ({ link, external, src, alt, width }) {
  return (
    <Button
      component={external ? 'a' : Link}
      href={link}
      to={link}
      sx={{
        display: 'flex',
        fontSize: '16px',
        lineHeight: '16px'
      }}
    >
      <img width={width || 80} src={src} alt={alt} />
    </Button>
  )
}
