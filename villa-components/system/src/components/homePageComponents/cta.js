import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { CustomTypography as Typography, CustomButton as Button } from '@villa-components/components'
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

  const { Title, content: body, media, buttons = [], Style = {}, justify, variant, reversed } = content

  const grid = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: reversed ? 'row-reverse' : 'row' },
        gap: (theme) => theme.spacing(5),
        backgroundColor: 'transparent',
        textAlign: Style?.textAlign || 'left',
        height: mobile ? 'unset' : '100%',
        alignItems: justify === 'start' ? 'flex-start' : 'center',
        justifyContent: 'center',
        px: variant === 'card' || variant === 'bordered' ? { xs: 0, md: 3 } : 0
      }}
    >
      <Box sx={{ flex: media && media.url ? '0 0 66.666%' : '1 1 100%', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: justify === 'space_between' ? 'row' : 'column',
            gap: 2,
            height: '100%',
            flexWrap: 'wrap',
            textAlign: Style?.textAlign || 'left',
            justifyContent: getJustifyContent(justify, Style?.textAlign),
            alignItems: justify !== 'space_between' ? alignmentMapping[Style?.textAlign] : 'center'
          }}
        >
          <Box>
            {body && (
              <Typography component="div" sx={{ '& h2': { m: 0 } }}>
                <BlocksRenderer content={body} />
              </Typography>
            )}
          </Box>

          <Box>
            {buttons.length > 0 && (
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {buttons.map((b, idx) => (
                  <Button
                    key={idx}
                    buttonStyle='outlined'
                    mobile={mobile}
                    link={b.Link}
                    color={b.ButtonColor}
                  >
                    {b.Text || 'Learn More'}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {media && media.url && (
        <Box sx={{ flex: '0 0 33.333%', display: 'flex', justifyContent: 'center' }}>
          {variant === 'rounded'
            ? (
            <Paper elevation={8} sx={{ borderRadius: 2, overflow: 'hidden', width: '100%' }}>
              <img
                src={media.url}
                alt={media.alternativeText || Title || 'cta-media'}
                style={{ display: 'block', width: '100%', objectFit: 'cover' }}
              />
            </Paper>
              )
            : (
            <img
              src={media.url}
              alt={media.alternativeText || Title || 'cta-media'}
              style={{ width: '100%', borderRadius: variant === 'rounded' ? '8px' : '0px', objectFit: 'cover' }}
            />
              )}
        </Box>
      )}
    </Box>
  )

  if (variant === 'card') {
    return (
        <Paper
          elevation={3}
          sx={{
            mx: '5vw',
            mt: 4,
            height: justify === 'space_between' ? { xs: 'auto', md: '35vw' } : 'fit-content',
            boxSizing: 'border-box',
            p: { xs: 2, md: 3 }
          }}
        >
          {grid}
        </Paper>
    )
  }

  if (variant === 'bordered') {
    return (
      <Box
        sx={{
          border: '1px solid rgba(0,0,0,0.12)',
          backgroundColor: 'white',
          borderRadius: 2,
          padding: { xs: 2, md: 3 },
          mx: '5vw',
          mt: 4,
          height: justify === 'space_between' ? { xs: 'auto', md: '35vw' } : 'fit-content',
          boxSizing: 'border-box'
        }}>
        {grid}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        margin: '2px 5vw auto',
        paddingBottom: '24px',
        height: justify === 'space_between' ? { xs: 'auto', md: '35vw' } : 'fit-content',
        boxSizing: 'border-box'
      }}
        >{grid}
    </Box>
  )
}
