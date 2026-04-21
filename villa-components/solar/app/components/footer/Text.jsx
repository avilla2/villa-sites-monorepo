import React from 'react'

/**
 * Text – renders markdown-formatted footer text
 * @param {{ content: import('../../../types').FooterText }} props
 */
export default function Text ({ content }) {
  return (
    <div className="footer-text" dangerouslySetInnerHTML={{ __html: content.Text }} />
  )
}
