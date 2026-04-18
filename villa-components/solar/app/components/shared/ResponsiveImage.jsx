import React from 'react'

const DEFAULT_SIZES = { sm: '100vw', md: '50vw', lg: '33vw' }

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
 * Renders a responsive `<img>` with a WebP srcset generated via CDN query params.
 * Breakpoints are fixed at 600 px and 900 px; the rendered size at each tier is
 * configurable via the `sizes` prop.
 *
 * @param {Object}  props
 * @param {string}  props.src                  - Absolute Strapi asset URL (desktop)
 * @param {string}  [props.mobileSrc]          - Optional mobile-specific source (used ≤ 600px)
 * @param {string}  props.alt                  - Alt text
 * @param {string}  [props.className]
 * @param {{ sm?: string, md?: string, lg?: string }} [props.sizes]
 *   Rendered width hint per tier (CSS length).
 */
export default function ResponsiveImage ({ src, mobileSrc, alt, className, sizes: sizesProp }) {
  const sizes = { ...DEFAULT_SIZES, ...sizesProp }

  // Generate srcset - use mobileSrc for small sizes if provided
  const smallSrc = mobileSrc || src
  const srcSet = [
    `${buildUrl(smallSrc, { format: 'webp', quality: 90, width: 320 })} 320w`,
    `${buildUrl(smallSrc, { format: 'webp', quality: 90, width: 768 })} 768w`,
    `${buildUrl(src, { format: 'webp', quality: 90, width: 1280 })} 1280w`
  ].join(', ')

  const sizesAttr = `(max-width: 320px) ${sizes.sm}, (max-width: 768px) ${sizes.md}, ${sizes.lg}`

  return (
    <img
      src={buildUrl(src, { format: 'webp', quality: 90, width: 1280 })}
      srcSet={srcSet}
      sizes={sizesAttr}
      alt={alt}
      className={className}
      loading="lazy"
    />
  )
}
