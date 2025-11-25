import React, { useEffect } from 'react'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const classes = {
  root: {
    margin: 'auto 5vw',
    textAlign: 'left'
  }
}

/**
 * SiteMap component - Renders a site map with links to all content pages
 * @param {Object} props - SiteMap props
 * @param {function} props.setPage - Function to set the current page name
 * @param {Page[]} props.contentPages - Array of content pages with their attributes
 * @param {string} props.locale - Current locale/language code
 * @returns {JSX.Element} The SiteMap component
 */
export default function SiteMap ({ setPage, contentPages, locale }) {
  useEffect(() => {
    setPage('Site Map')
  })
  return (
        <Box sx={classes.root}>
            <Typography component="h1" gutterBottom>Site Map</Typography>
            {contentPages.map(({ attributes }, index) => (
              <Link
                key={index}
                underline="always"
                component={RouterLink}
                to={`${locale === 'en' ? '' : '/' + locale}${attributes.Link}`}
                sx={{ pr: 2, py: 2, color: '#000000', textDecorationColor: '#000000' }}
              >
              {attributes.Title}
            </Link>
            ))}
        </Box>
  )
}
