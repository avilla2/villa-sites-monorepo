import React from 'react'
import Box from '@mui/material/Box'
import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography'
import AnimationProvider from '../utils/animationProvider'
const classes = {
  root: {
    margin: 'auto 6%'
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
            <AnimationProvider animation={content?.Style?.Animation} direction="down">
                <Typography component="div" sx={classes.text}>
                    <ReactMarkdown style={classes.text}>{content.Body}</ReactMarkdown>
                </Typography>
            </AnimationProvider>
        </Box>
  )
}
