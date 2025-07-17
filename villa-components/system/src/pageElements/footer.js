import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import GenerateFooterContent from '../components/utils/generateFooterContent'
import LanguageIcon from '@mui/icons-material/Language'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import LanguageModal from './languageModal'
import Query from '../utils/query'
import localesQuery from '../queries/localesQuery'
import Skeleton from '@mui/material/Skeleton'
import { Typography } from '@mui/material'
import isExternal from '../components/utils/isExternalLink'

const classes = {
  root: {
    padding: '50px 5vw 20px',
    zIndex: 10
  }
}

export default function Footer ({ Content, FontColor: fontColor, enableLocalization, locale, links }) {
  const [modalOpen, setModalOpen] = useState(false)

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
              {Content.map((item, key) => {
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
                to={`${locale === 'en' ? '' : '/' + locale}/sitemap`}
                sx={{ color: fontColor }}
              >
                Site Map
              </Link>
            </Grid>
            {links.map((item, index) => (
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
            <Query
              query={localesQuery}
              loadingComponent={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
            >
              {({ data }) => {
                const localeData = data.i18NLocales.data
                const currentLocaleData = localeData.find(localeObject => localeObject.attributes.code === locale)
                const currentLanguage = currentLocaleData ? currentLocaleData.attributes.name : 'Language'

                return (
                  <React.Fragment>
                    <LanguageModal
                      fontColor={fontColor}
                      open={modalOpen}
                      handleClose={() => setModalOpen(false)}
                      options={localeData}
                    />
                    <Grid>
                      <Link
                        onClick={() => setModalOpen(true)}
                        underline="hover"
                        sx={{
                          color: fontColor,
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <LanguageIcon />
                        <Typography sx={{ pl: 1 }}>{currentLanguage}</Typography>
                      </Link>
                    </Grid>
                  </React.Fragment>
                )
              }}
            </Query>
            }
          </Grid>
      </Box>
  )
}
