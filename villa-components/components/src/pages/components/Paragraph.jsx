import React from 'react'
import Box from '@mui/material/Box'
import ReactMarkdown from 'react-markdown'
import CustomTypography from '../../shared/Typography'

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
 * @param {Component} props.AnimationProvider - Animation provider component
 * @returns {JSX.Element} The Paragraph component
 */
export default function Paragraph ({ content, AnimationProvider }) {
  return (
    <Box sx={classes.root}>
      <CustomTypography component="div" sx={classes.text}>
        <AnimationProvider animation={content?.Style?.Animation} direction="down">
          <Box>
            <ReactMarkdown style={classes.text}>{content.Body}</ReactMarkdown>
          </Box>
        </AnimationProvider>
      </CustomTypography>
    </Box>
  )
}
