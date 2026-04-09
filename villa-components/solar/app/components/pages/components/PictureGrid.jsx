import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').GridComponent} props.content
 */
export default function PictureGrid ({ content }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

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
                {mounted
                  ? <ReactMarkdown>{entry.Caption}</ReactMarkdown>
                  : <p>{entry.Caption}</p>
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
