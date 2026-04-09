import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * Paragraph component — renders markdown body text with an optional title.
 *
 * @param {Object} props
 * @param {import('../../../../../components/src/types').ParagraphComponent} props.content
 */
export default function Paragraph ({ content }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!content?.Body) return null

  return (
    <div className="paragraph">
      <div className="paragraph__body">
        {mounted
          ? <ReactMarkdown>{content.Body}</ReactMarkdown>
          : <p>{content.Body}</p>
        }
      </div>
    </div>
  )
}
