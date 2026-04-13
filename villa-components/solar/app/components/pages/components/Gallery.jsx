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
          const isWide = picture.width > picture.height
          const size = isWide ? '800px' : '400px'
          const sizes = { sm: size, md: size, lg: size }

          return (
            <div className="gallery__item" key={index}>
              <ResponsiveImage
                className="gallery__img"
                src={picture.url}
                alt={picture.alternativeText || ''}
                sizes={sizes}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
