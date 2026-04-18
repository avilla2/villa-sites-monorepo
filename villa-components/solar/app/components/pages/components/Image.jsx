import React from 'react'
import Paragraph from './Paragraph'
import ResponsiveImage from '../../shared/ResponsiveImage'
import buildUrl from '../../../lib/buildUrl'

/**
 * Image component — renders an image with optional parallax (CSS-only), paper
 * card style, and a caption that can be positioned on any side.
 *
 * @param {Object} props
 * @param {import('../../../../../components/src/types').ImageComponent} props.content
 */
export default function Image ({ content }) {
  if (!content?.asset?.url) return null

  const { asset, caption, imageStyle, width, height: heightVh, captionLocation } = content
  const heightValue = !heightVh || heightVh === 0 ? 'auto' : `${heightVh}vh`

  // ── Parallax variant ──────────────────────────────────────────────────────
  if (imageStyle === 'Parallax') {
    // Generate URLs for different resolutions (matching ResponsiveImage breakpoints)
    const url768 = buildUrl(asset.url, { format: 'webp', quality: 90, width: 768 })
    const url1280 = buildUrl(asset.url, { format: 'webp', quality: 90, width: 1280 })

    return (
      <figure
        className="image image--parallax"
        style={{
          '--parallax-height': heightValue === 'auto' ? '50vh' : heightValue,
          '--parallax-bg-md': `url("${url768}")`,
          '--parallax-bg-lg': `url("${url1280}")`
        }}
      >
        <div
          className="image__parallax-bg"
          role="img"
          aria-label={asset.alternativeText}
        />
        {caption && (
          <figcaption className="image__caption">
            <Paragraph content={{ Body: caption }} />
          </figcaption>
        )}
      </figure>
    )
  }

  // ── Standard / Paper variant ──────────────────────────────────────────────
  const captionDir = captionLocation || 'bottom'
  const isPaper = imageStyle === 'Paper'

  return (
    <figure className={`image image--${isPaper ? 'paper' : 'standard'} image--caption-${captionDir}`}>
      <div
        className="image__media"
        style={{
          '--image-width': `${width ?? 100}%`,
          '--image-height': heightValue
        }}
      >
        <ResponsiveImage
          src={asset.url}
          alt={asset.alternativeText}
          className="image__img"
        />
      </div>
      {caption && (
        <figcaption className="image__caption">
          <Paragraph content={{ Body: caption }} />
        </figcaption>
      )}
    </figure>
  )
}
