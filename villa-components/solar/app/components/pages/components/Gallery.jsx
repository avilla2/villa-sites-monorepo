import React from 'react'

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').GalleryComponent} props.content
 */
export default function Gallery ({ content }) {
  if (!content?.Pictures?.length) return null

  return (
    <div className="gallery">
      <div className="gallery__grid">
        {content.Pictures.map((picture, index) => (
          <div className="gallery__item" key={index}>
            <img
              className="gallery__img"
              src={picture.url}
              alt={picture.alternativeText || ''}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
