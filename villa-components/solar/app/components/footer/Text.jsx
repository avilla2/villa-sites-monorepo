import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * Text – renders markdown-formatted footer text
 * @param {{ content: import('../../../types').FooterText }} props
 */
export default function Text ({ content }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="footer-text">
      {mounted
        ? <ReactMarkdown>{content.Text}</ReactMarkdown>
        : <p>{content.Text}</p>
      }
    </div>
  )
}
