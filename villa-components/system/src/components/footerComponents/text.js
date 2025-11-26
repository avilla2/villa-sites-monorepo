import React from 'react'
import Box from '@mui/material/Box'
import ReactMarkdown from 'react-markdown'

const classes = {
  root: (theme) => ({
    margin: '0px',
    padding: '0 5%',
    fontSize: '.95rem',
    fontWeight: '500',
    lineHeight: '24px',
    textAlign: 'center',
    color: 'inherit',
    fontFamily: theme.typography.fontFamily
  })
}

/**
 * Text component - Renders footer text content with markdown support
 * @param {Object} props - Text component props
 * @param {FooterText} props.content - Footer text content object
 * @property {string} props.content.Text - Markdown-formatted text content
 * @property {string} props.content.Space - Space/width allocation
 * @returns {JSX.Element} The Text component with rendered markdown
 */
export default function Paragraph ({ content }) {
  return (
        <Box sx={classes.root}>
            <ReactMarkdown>{content.Text}</ReactMarkdown>
        </Box>
  )
}
