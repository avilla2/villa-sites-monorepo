import React from 'react'
import ReactMarkdown from 'react-markdown'

// COMPONENT NOT USED
const classes = {
  root: {
    margin: '4% 3%'
  },
  body: {
    fontFamily: 'Inter, sans-serif',
    padding: '0 5%',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '24px'
  }
}

export default function Freestyle ({ content }) {
  return (
        <div style={classes.root}>
            <ReactMarkdown className={classes.body}>{content.Text}</ReactMarkdown>
        </div>
  )
}
