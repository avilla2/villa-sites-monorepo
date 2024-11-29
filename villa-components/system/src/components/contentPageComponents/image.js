import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Parallax } from 'react-parallax'
import Paragraph from './paragraph'
import Grid from '@mui/material/Grid'

const classes = {
  root: {
    color: 'inherit'
  }
}

export default function Image ({ content }) {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))
  const height = content.height === 0 ? 'auto' : `${content.height}vh`
  const directionMapping = { left: 'row-reverse', right: 'row', bottom: 'column', top: 'column-reverse' }

  if (content.imageStyle === 'Parallax') {
    return (
      <Box sx={classes.root} pt={0}>
        <Parallax
          bgImage={`${process.env.REACT_APP_BACKEND_URL}${content.asset.data.attributes.url}`}
          bgImageAlt={content.asset.data.attributes.alternativeText}
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
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${content.asset.data.attributes.url}`}
            alt={content.asset.data.attributes.alternativeText}
            style={{ width: mobile ? '100%' : `${content.width}%`, height, display: 'block', margin: 'auto' }}
          />
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
