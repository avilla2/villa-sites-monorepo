import React from 'react'
import Box from '@mui/material/Box'
// import Container from '@mui/material/Container'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router'
import isExternal from '../../utils/isExternalLink'

/**
 * NavLink component - Renders a text-based navigation link with hover animation
 * @param {Object} props - NavLink props
 * @param {string} props.title - Link display text
 * @param {string} props.link - Target URL for the link
 * @param {string} props.id - Unique identifier for the link
 * @param {string} props.active - Currently active link ID for highlighting
 * @param {boolean} props.shadow - Whether to apply text shadow effect
 * @returns {JSX.Element} The NavLink component
 */
export default function NavLink ({ title, link, id, active, shadow, ...props }) {
  return (
    <ButtonBase
      className="link"
      color="inherit"
      {...(link && {
        href: link,
        to: link,
        component: isExternal(link) ? 'a' : Link
      })}
      {...props}
    >
      <Box sx={{ px: 2 }} className={`mask ${active === id ? 'active' : ''}`}>
        <Box className={`link-container link-transition ${active === id ? 'active' : ''}`}>
          <Typography
            variant='subtitle1'
            sx={{
              display: 'block',
              fontSize: '16px',
              lineHeight: '16px',
              ...(shadow && { textShadow: '1px 1px 3px #2f2f2f' })
            }}
            className={`link-title1 link-transition ${active === id ? 'active' : ''}`}
          >
            {title}
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: 'secondary.main',
              display: 'block',
              fontSize: '16px',
              lineHeight: '16px',
              ...(shadow && { textShadow: '1px 1px 3px #2f2f2f' })
            }}
            className={`link-title2 ${active === id ? 'active' : ''}`}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </ButtonBase>
  )
}
