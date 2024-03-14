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

export default function Paragraph ({ content }) {
  return (
        <Box sx={classes.root}>
            <ReactMarkdown>{content.Text}</ReactMarkdown>
        </Box>
  )
}
