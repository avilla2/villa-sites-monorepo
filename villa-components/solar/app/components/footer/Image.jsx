import React from 'react'

/**
 * Image – renders a footer image
 * @param {{ content: import('../../../types').FooterImage }} props
 */
export default function Image ({ content }) {
  return (
    <div className="footer-image">
      <img
        src={content.Image.url}
        alt={content.Image.alternativeText || content.Image.name || ''}
        className="footer-image__img"
      />
    </div>
  )
}
