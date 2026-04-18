import React from 'react'
import Paragraph from './Paragraph'
import ResponsiveImage from '../../shared/ResponsiveImage'

function buildUrl (src, params) {
  try {
    const url = new URL(src)
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)))
    return url.toString()
  } catch {
    return `${src}?${new URLSearchParams(params).toString()}`
  }
}

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
    const url320 = buildUrl(asset.url, { format: 'webp', quality: 90, width: 320 })
    const url768 = buildUrl(asset.url, { format: 'webp', quality: 90, width: 768 })
    const url1280 = buildUrl(asset.url, { format: 'webp', quality: 90, width: 1280 })

    const backgroundImageSet = `image-set(
      url("${url320}") 1x,
      url("${url768}") 1.5x,
      url("${url1280}") 2x
    )`

    return (
      <figure
        className="image image--parallax"
        style={{ '--parallax-height': heightValue === 'auto' ? '50vh' : heightValue }}
      >
        <div
          className="image__parallax-bg"
          style={{ backgroundImage: backgroundImageSet }}
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
