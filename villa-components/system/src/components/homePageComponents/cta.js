import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '../pageFeatures/typography'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'

const alignmentMapping = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
}

const getJustifyContent = (justify, textAlign) => {
  if (justify === 'space_between') {
    return alignmentMapping[textAlign]
  }
  if (justify === 'center') {
    return 'center'
  }
  return 'flex-start'
}

/**
 * CTA - Renders a Call To Action component
 * @param {{content: ComponentHomePageComponentsCta}} props
 * @returns {JSX.Element}
 */
export default function Cta ({ content }) {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  if (!content) return null

  const { Title, content: body, media, buttons = [], Style = {}, justify, reversed } = content

  return (
    <Grid
      container
      spacing={5}
      direction={reversed ? 'row-reverse' : 'row'}
      sx={{
        backgroundColor: Style?.BackgroundColor || 'transparent',
        textAlign: Style?.textAlign || 'left',
        margin: '2px 5vw auto',
        paddingBottom: '24px',
        height: mobile ? 'unset' : '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}
    >
      <Grid item sx={{ height: '100%' }} size={{ xs: 12, md: media && media.url ? 8 : 12 }}>
        <Grid
          container
          direction={justify === 'space_between' ? 'row' : 'column'}
          spacing={2}
          sx={{
            height: '100%',
            textAlign: Style?.textAlign || 'left',
            justifyContent: getJustifyContent(justify, Style?.textAlign),
            alignItems: justify !== 'space_between' ? alignmentMapping[Style?.textAlign] : 'center'
          }}
        >
          <Grid item>
            {body && (
              <Typography>
                <BlocksRenderer content={body} />
              </Typography>
            )}
          </Grid>

          <Grid item>
            {buttons.length > 0 && (
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {buttons.map((b, idx) => (
                  <Button
                    key={idx}
                    variant="contained"
                    color="primary"
                    href={b.Link || '#'}
                    sx={{ backgroundColor: b.ButtonColor || undefined }}
                  >
                    {b.Text || 'Learn More'}
                  </Button>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>

      {media && media.url && (
        <Grid item size={{ xs: 12, md: 4 }} sx={{ alignSelf: 'center' }}>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${media.url}`}
            alt={media.alternativeText || Title || 'cta-media'}
            width="100%"
          />
        </Grid>
      )}
    </Grid>
  )
}
