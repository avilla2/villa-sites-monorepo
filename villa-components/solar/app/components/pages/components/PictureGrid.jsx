import React from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').GridComponent} props.content
 */
export default function PictureGrid ({ content }) {
  if (!content?.Entry?.length) return null

  return (
    <div className="picture-grid">
      <div className="picture-grid__grid">
        {content.Entry.map((entry, index) => (
          <div key={index} className="picture-grid__item">
            {entry.Picture?.url && (
              <img
                className="picture-grid__img"
                src={entry.Picture.url}
                alt={entry.Picture.alternativeText ?? ''}
              />
            )}
            {entry.Caption && (
              <div className="picture-grid__caption">
                <ReactMarkdown>{entry.Caption}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
