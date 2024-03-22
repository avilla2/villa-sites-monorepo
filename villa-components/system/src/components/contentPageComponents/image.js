import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Parallax } from 'react-parallax'
import Paragraph from './paragraph'

const classes = {
  root: {
    color: 'inherit'
  }
}

export default function Image ({ content }) {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))
  const height = content.height === 0 ? 'auto' : `${content.height}vh`
  return (
    <Box style={classes.root}>
        { content.imageStyle === 'Parallax'
          ? <Parallax
              bgImage={`${process.env.REACT_APP_BACKEND_URL}${content.asset.data.attributes.url}`}
              bgImageAlt={content.asset.data.attributes.alternativeText}
              strength={200}
            >
              <div style={{ height }}></div>
            </Parallax>
          : <img
                src={`${process.env.REACT_APP_BACKEND_URL}${content.asset.data.attributes.url}`}
                alt={content.asset.data.attributes.alternativeText}
                style={{ width: mobile ? '100%' : `${content.width}%`, height }}
            />
        }
        { content?.caption &&
          <Paragraph content={{ Style: content.Style, Body: content.caption }} />
        }
    </Box>
  )
}
