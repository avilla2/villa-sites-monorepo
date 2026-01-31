import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paragraph from './paragraph'

const classes = {
  root: {
    color: 'inherit'
  }
}

/**
 * Video component - Renders a video with given configurations
 * @param {Object} props - Video props
 * @param {VideoComponent} props.content - Video content object
 * @returns {JSX.Element} The Video component
 */
export default function Video ({ content }) {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))
  return (
    <Box style={classes.root}>
      { content.asset &&
          <video
            style={{ width: mobile ? '100%' : `${content.width}%` }}
            loop={content.loop}
            autoPlay={content.autoplay}
            controls={content.controls}
            muted={content.autoplay || content.muted}
        >
          <source
              src={content.asset.url}
              type={content.asset.mime}
          />
        </video>
      }
      { content?.caption &&
        <Paragraph content={{ Style: content.Style, Body: content.caption }} />
      }
    </Box>
  )
}
