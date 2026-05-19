import React, { useEffect } from 'react'
import renderPageComponent from './renderPageComponent'
import buildUrl from '../../lib/buildUrl'

// Component __typenames that span full viewport height.
// These receive no top/bottom padding and their .Title is suppressed
// (the component itself owns the full visual space).
const FULL_HEIGHT = new Set([
  'ComponentHomePageComponentsIntro',
  'ComponentContentPageComponentsImage',
  'ComponentHomePageComponentsMedia',
  'ComponentContentPageComponentsButtons'
])

/**
 * Mirrors the villa-components CalculatePadding logic without MUI theme.spacing.
 * - Full-height components: no padding (unless last → 40px bottom)
 * - Regular components:      32px top + 32px bottom (last → 40px bottom)
 * Returns undefined when both values are 0 so the style prop is omitted.
 */
function getSectionPadding (typename, isLast) {
  const isFull = FULL_HEIGHT.has(typename)
  const top = isFull ? 0 : 32
  const bottom = isLast ? 40 : (isFull ? 0 : 32)
  if (top === 0 && bottom === 0) return undefined
  return `${top}px 0 ${bottom}px 0`
}

/**
 * HomePage — renders a list of CMS content components inside styled section wrappers.
 *
 * @param {Object}   props
 * @param {import('../../../../components/src/types').ContentComponent[]} props.content
 * @param {string}   props.pageName
 * @param {string}   props.path      - URL path for analytics page_view event
 * @param {string}   [props.siteName]
 */
export default function Page ({ content, pageName, path, siteName }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: pageName
      })
    }
  }, [pageName, path])

  if (!content?.length) return null

  return (
    <div className="page">
      <div className="page__grid">
        {content.map((component, index) => {
          const isLast = index === content.length - 1
          const isFull = FULL_HEIGHT.has(component.__typename)
          const styles = component?.Style || {}
          const bgImage = styles.backgroundImage
          const padding = getSectionPadding(component.__typename, isLast)
          // Grid column span: use styles.size or default to 12 (full-width)
          const gridColumnSpan = styles?.size || 12

          // Generate responsive background image URLs if backgroundImage exists
          let bgImageVars = {}
          if (bgImage?.url) {
            bgImageVars = {
              '--section-bg-md': `url("${buildUrl(bgImage.url, { format: 'webp', quality: 90, width: 768 })}")`,
              '--section-bg-lg': `url("${buildUrl(bgImage.url, { format: 'webp', quality: 90, width: 1280 })}")`
            }
          }

          const sectionStyle = {
            '--grid-column-span': gridColumnSpan,
            ...(padding ? { padding } : {}),
            // Per-component style overrides always win over calculated padding
            ...(styles.paddingTop != null && styles.paddingTop !== '' ? { paddingTop: styles.paddingTop } : {}),
            ...(styles.paddingBottom != null && styles.paddingBottom !== '' ? { paddingBottom: styles.paddingBottom } : {}),
            ...(styles.TextColor ? { color: styles.TextColor } : {}),
            ...(styles.BackgroundColor ? { backgroundColor: styles.BackgroundColor } : {}),
            ...(styles.textAlign ? { textAlign: styles.textAlign } : {}),
            ...bgImageVars
          }

          // Add className for sections with background images
          const sectionClasses = [
            'page__section',
            bgImage?.url ? 'page__section--with-bg-image' : ''
          ].filter(Boolean).join(' ')

          return (
            <section
              key={index}
              className={sectionClasses}
              style={Object.keys(sectionStyle).length ? sectionStyle : undefined}
            >
              {/* Section title — suppressed for full-height / visual-fill components */}
              {!isFull && component?.Title && (
                <h2 className="page__section-title">{component.Title}</h2>
              )}

              {renderPageComponent(component, siteName)}
            </section>
          )
        })}
      </div>
    </div>
  )
}
