import React from 'react'
import ResponsiveImage from '../../shared/ResponsiveImage'

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').GalleryComponent} props.content
 */
export default function Gallery ({ content }) {
  if (!content?.Pictures?.length) return null

  return (
    <div className="gallery">
      <div className="gallery__grid">
        {content.Pictures.map((picture, index) => {
          if (!picture?.url) return null
          return (
            <div className="gallery__item" key={index}>
              <ResponsiveImage
                className="gallery__img"
                src={picture.url}
                alt={picture.alternativeText || ''}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
