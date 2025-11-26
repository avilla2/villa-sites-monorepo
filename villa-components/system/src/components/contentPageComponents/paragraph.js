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

/**
 * Paragraph component - Renders a paragraph of text with markdown support and optional animation
 * @param {Object} props - Paragraph props
 * @param {ParagraphComponent} props.content - Paragraph content object
 * @returns {JSX.Element} The Paragraph component
 */
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
