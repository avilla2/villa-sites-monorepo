import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paragraph from './paragraph'

const classes = {
  root: {
    color: 'inherit'
  }
}

export default function Video ({ content }) {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))
  return (
    <Box style={classes.root}>
      { content.asset.data &&
          <video
            style={{ width: mobile ? '100%' : `${content.width}%` }}
            loop={content.loop}
            autoPlay={content.autoplay}
            controls={content.controls}
            muted={content.autoplay || content.muted}
        >
          <source
              src={`${process.env.REACT_APP_BACKEND_URL}${content.asset.data.attributes.url}`}
              type={content.asset.data.attributes.mime}
          />
        </video>
      }
      { content?.caption &&
        <Paragraph content={{ Style: content.Style, Body: content.caption }} />
      }
    </Box>
  )
}
