import React from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * Text – renders markdown-formatted footer text
 * @param {{ content: import('../../../types').FooterText }} props
 */
export default function Text ({ content }) {
  return (
    <div className="footer-text">
      <ReactMarkdown>{content.Text}</ReactMarkdown>
    </div>
  )
}
