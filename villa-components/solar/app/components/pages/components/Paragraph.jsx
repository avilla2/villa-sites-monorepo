import React from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * Paragraph component — renders markdown body text with an optional title.
 *
 * @param {Object} props
 * @param {import('../../../../../components/src/types').ParagraphComponent} props.content
 */
export default function Paragraph ({ content }) {
  if (!content?.Body) return null

  return (
    <div className="paragraph">
      <div className="paragraph__body">
        <ReactMarkdown>{content.Body}</ReactMarkdown>
      </div>
    </div>
  )
}
