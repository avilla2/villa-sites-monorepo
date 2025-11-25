import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Parallax } from 'react-parallax'
import Paragraph from './paragraph'
import Grid from '@mui/material/Grid'

const classes = {
  root: {
    color: 'inherit'
  }
}

/**
 * Image component - Renders an image with optional styles and caption
 * @param {Object} props - Image props
 * @param {ImageComponent} props.content - Image content object
 * @returns {JSX.Element} The Image component
 */
export default function Image ({ content }) {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))
  const height = content.height === 0 ? 'auto' : `${content.height}vh`
  const directionMapping = { left: 'row-reverse', right: 'row', bottom: 'column', top: 'column-reverse' }

  if (content.imageStyle === 'Parallax') {
    return (
      <Box sx={classes.root} pt={0}>
        <Parallax
          bgImage={`${process.env.REACT_APP_BACKEND_URL}${content.asset.url}`}
          bgImageAlt={content.asset.alternativeText}
          strength={200}
        >
          <div style={{ height }}></div>
        </Parallax>
        { content?.caption &&
          <Box pb={4}>
            <Paragraph content={{ Style: content.Style, Body: content.caption }} />
          </Box>
        }
      </Box>
    )
  } else {
    return (
      <Grid
        container
        direction={directionMapping[content?.captionLocation] || 'column'}
        justifyContent="center"
        alignItems="center"
        rowSpacing={3}
      >
        <Grid md={content?.caption ? 6 : 12} sm={12} xs={12} item>
          {
            content.imageStyle === 'Paper'
              ? (
              <Paper elevation={8} style={{ width: mobile ? '90%' : `${content.width}%`, height, margin: 'auto', borderRadius: 25, display: 'flex' }}>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${content.asset.url}`}
                alt={content.asset.alternativeText}
                style={{ width: '100%', borderRadius: 'inherit' }}
              />
            </Paper>
                )
              : (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${content.asset.url}`}
                alt={content.asset.alternativeText}
                style={{ width: mobile ? '100%' : `${content.width}%`, height, display: 'block', margin: 'auto' }}
              />
                )
          }
        </Grid>
        { content?.caption &&
          <Grid md={6} sm={12} xs={12} py={3} item>
            <Box>
              <Paragraph content={{ Style: content.Style, Body: content.caption }} />
            </Box>
          </Grid>
        }
      </Grid>
    )
  }
}
