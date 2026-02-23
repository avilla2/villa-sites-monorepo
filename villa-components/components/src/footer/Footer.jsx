import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LanguageIcon from '@mui/icons-material/Language'
import Link from '@mui/material/Link'
import { Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import isExternal from '../utils/isExternalLink'
import GenerateFooterContent from './components/GenerateFooterContent'

const classes = {
  root: {
    padding: '50px 5vw 20px',
    zIndex: 10
  }
}

/**
 * Footer component - Main footer component displaying footer content, links, and language selector
 * @param {Object} props - Footer props
 * @param {FooterContent[]} props.Content - Array of footer content items (images, text, icons)
 * @param {string} props.FontColor - Font color for footer content
 * @param {boolean} props.enableLocalization - Whether to show language selector
 * @param {string} props.localeName - Current active language name (optional)
 * @param {string} props.localeCode - Current active locale/language code (optional)
 * @param {function} props.handleLocalize - Localization Handler (optional)
 * @param {FooterLink[]} props.links - Array of footer links
 * @returns {JSX.Element} The Footer component
 */
export default function Footer ({ Content, FontColor: fontColor, enableLocalization, localeName, localeCode, handleLocalize, links }) {
  return (
      <Box sx={classes.root} bgcolor="info.main" component="div" style={ fontColor ? { color: fontColor } : null }>
          <Grid
              container
              sx={{
                direction: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}
              spacing={2}
          >
              {Content?.map((item, key) => {
                return (
                  <Grid key={key} size={{ md: item.Space }}>
                      <GenerateFooterContent content={item} />
                  </Grid>
                )
              })}
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{
              pt: 2,
              mt: 5,
              borderTop: `1px solid ${fontColor}`,
              paddingX: '2vw',
              direction: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Grid>
              <Link
                component={RouterLink}
                underline="hover"
                to={`${localeCode === 'en' ? '' : '/' + localeCode}/sitemap`}
                sx={{ color: fontColor }}
              >
                Site Map
              </Link>
            </Grid>
            {links?.map((item, index) => (
              <Grid key={index}>
                <Link
                  component={isExternal(item.link) ? 'a' : RouterLink}
                  underline="hover"
                  to={item.link}
                  href={item.link}
                  sx={{ color: fontColor }}
                >
                  {item.text}
                </Link>
              </Grid>
            ))}
            {enableLocalization &&
              <Grid>
                <Link
                  onClick={handleLocalize}
                  underline="hover"
                  sx={{
                    color: fontColor,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <LanguageIcon />
                  <Typography sx={{ pl: 1 }}>{localeName}</Typography>
                </Link>
              </Grid>
            }
          </Grid>
      </Box>
  )
}
