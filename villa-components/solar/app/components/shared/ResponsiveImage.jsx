import React from 'react'
import buildUrl from '../../lib/buildUrl'

const DEFAULT_SIZES = { sm: '100vw', md: '50vw', lg: '33vw' }

/**
 * Renders a responsive `<img>` with a WebP srcset generated via CDN query params.
 * Breakpoints are fixed at 600 px and 900 px; the rendered size at each tier is
 * configurable via the `sizes` prop.
 *
 * @param {Object}  props
 * @param {string}  props.src                  - Absolute Strapi asset URL (desktop)
 * @param {string}  [props.mobileSrc]          - Optional mobile-specific source (used ≤ 767px)
 * @param {string}  props.alt                  - Alt text
 * @param {string}  [props.className]
 * @param {{ sm?: string, md?: string, lg?: string }} [props.sizes]
 *   Rendered width hint per tier (CSS length).
 */
export default function ResponsiveImage({ src, mobileSrc, alt, className, sizes: sizesProp }) {
  const sizes = { ...DEFAULT_SIZES, ...sizesProp }

  // Keep each asset in its own source set: pixel density must not choose
  // the desktop composition on a mobile viewport.
  const makeSrcSet = (source) =>
    [320, 768, 1280]
      .map((width) => `${buildUrl(source, { format: 'webp', quality: 90, width })} ${width}w`)
      .join(', ')
  const srcSet = makeSrcSet(src)

  const sizesAttr = `(max-width: 320px) ${sizes.sm}, (max-width: 768px) ${sizes.md}, ${sizes.lg}`

  const image = (
    <img
      src={buildUrl(src, { format: 'webp', quality: 90, width: 1280 })}
      srcSet={srcSet}
      sizes={sizesAttr}
      alt={alt}
      className={className}
      loading="lazy"
    />
  )

  if (!mobileSrc) return image

  return (
    <picture style={{ display: 'contents' }}>
      <source media="(max-width: 767px)" srcSet={makeSrcSet(mobileSrc)} sizes={sizesAttr} />
      {image}
    </picture>
  )
}
