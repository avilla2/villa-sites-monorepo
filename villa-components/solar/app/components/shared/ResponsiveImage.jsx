import React from 'react'

const CDN_WIDTHS = [300, 600, 900]
const DEFAULT_SIZES = { sm: '300px', md: '600px', lg: '900px' }

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
 * Breakpoints are fixed at 425 px and 1024 px; the rendered size at each tier is
 * configurable via the `sizes` prop.
 *
 * @param {Object}  props
 * @param {string}  props.src                  - Absolute Strapi asset URL
 * @param {string}  props.alt                  - Alt text
 * @param {string}  [props.className]
 * @param {{ sm?: string, md?: string, lg?: string }} [props.sizes]
 *   Rendered width hint per tier (CSS length).
 *   Defaults: sm = '300px' (≤ 425 px), md = '600px' (≤ 1024 px), lg = '900px'
 */
export default function ResponsiveImage ({ src, alt, className, sizes: sizesProp }) {
  const sizes = { ...DEFAULT_SIZES, ...sizesProp }

  const srcSet = CDN_WIDTHS
    .map(w => `${buildUrl(src, { format: 'webp', quality: 90, width: w })} ${w}w`)
    .join(', ')

  const sizesAttr = `(max-width: 425px) ${sizes.sm}, (max-width: 1024px) ${sizes.md}, ${sizes.lg}`

  return (
    <img
      src={buildUrl(src, { format: 'webp', quality: 90, width: 900 })}
      srcSet={srcSet}
      sizes={sizesAttr}
      alt={alt}
      className={className}
      loading="lazy"
    />
  )
}
