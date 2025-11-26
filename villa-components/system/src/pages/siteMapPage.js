import React, { useEffect } from 'react'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const classes = {
  root: {
    width: '100%',
    textAlign: 'left',
    height: '100%'
  },
  content: {
    margin: 'auto 5vw'
  },
  main: (theme) => ({
    backgroundColor: theme.palette.warning.main,
    width: '100%',
    height: '15vh',
    marginBottom: '10vh',
    borderRadius: '0 0 20px 20px'
  })
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
            <Box sx={classes.main} />
            <Box sx={classes.content}>
              <Typography component="h1" gutterBottom>Site Map</Typography>
              {contentPages.map((page, index) => (
                <Link
                  key={index}
                  underline="always"
                  component={RouterLink}
                  to={`${locale === 'en' ? '' : '/' + locale}${page.Link}`}
                  sx={{ pr: 2, py: 2, color: '#000000', textDecorationColor: '#000000' }}
                >
                {page.Title}
              </Link>
              ))}
            </Box>
        </Box>
  )
}
