import React from 'react'
import Box from '@mui/material/Box'
import ReactMarkdown from 'react-markdown'
import Typography from '../pageFeatures/typography'
import AnimationProvider from '../utils/animationProvider'

const classes = {
  root: {
    margin: 'auto 5vw'
  },
  text: {
    '& p': {
      marginBottom: 0
    }
  }
}

export default function Paragraph ({ content }) {
  return (
    <Box sx={classes.root}>
      <Typography component="div" sx={classes.text}>
        <AnimationProvider animation={content?.Style?.Animation} direction="down">
          <Box>
            <ReactMarkdown style={classes.text}>{content.Body}</ReactMarkdown>
          </Box>
        </AnimationProvider>
      </Typography>
    </Box>
  )
}
