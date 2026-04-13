import React, { useState, useEffect, useCallback } from 'react'
import ResponsiveImage from '../../shared/ResponsiveImage'

// ── Arrow icons ───────────────────────────────────────────────────────────────
const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 6 15 12 9 18" />
  </svg>
)

/**
 * Slideshow component — crossfade auto-advancing image carousel.
 *
 * Two usage modes:
 *   1. **Page section** (`content` prop): renders with title, captions, prev/next arrows
 *      and dot indicators. Automatically picks `slidesDesktop` vs `slidesMobile`
 *      based on viewport width after hydration (SSR-safe: defaults to desktop).
 *   2. **Background embed** (`slides` + `background` props): fills the parent element
 *      with `position: absolute; inset: 0`. No UI chrome rendered.
 *
 * @param {Object} props
 * @param {import('../../../../../components/src/types').SlideshowComponent} [props.content] - Full CMS slideshow object
 * @param {import('../../../../../components/src/types').FileData[]} [props.slides] - Pre-resolved flat slide array (background mode)
 * @param {boolean} [props.background=false] - Use background-fill mode (no UI chrome)
 * @param {number}  [props.interval=5000] - Auto-advance interval in ms
 */
export default function Slideshow ({ content, slides: slidesProp, background = false, interval = 5000 }) {
  // SSR-safe mobile detection — default to desktop so server + first render match
  const [isMobile, setIsMobile] = useState(false)
  const [current, setCurrent] = useState(0)

  // Only needed when using content prop (desktop/mobile slide sets)
  useEffect(() => {
    if (!content) return
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [!!content])

  // Resolve the active slides array
  const slides = slidesProp ?? (
    content
      ? (isMobile && content.slidesMobile?.length ? content.slidesMobile : content.slidesDesktop)
      : []
  )

  // Reset current index when the slide set changes length
  useEffect(() => { setCurrent(0) }, [slides?.length])

  // Auto-advance
  useEffect(() => {
    if (!slides?.length || slides.length <= 1) return
    const id = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), interval)
    return () => clearInterval(id)
  }, [slides?.length, interval])

  const prev = useCallback(() => setCurrent(i => (i - 1 + slides.length) % slides.length), [slides?.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), [slides?.length])

  if (!slides?.length) return null

  const rootClass = ['slideshow', background ? 'slideshow--background' : ''].filter(Boolean).join(' ')
  const showControls = !background && slides.length > 1

  return (
    <div className={rootClass}>
      {/* Slide images — all rendered, opacity drives visibility */}
      <div className="slideshow__track">
        {slides.map((slide, i) => (
          <ResponsiveImage
            key={i}
            className={`slideshow__slide${i === current ? ' slideshow__slide--active' : ''}`}
            src={slide.url}
            alt={slide.alternativeText || ''}
            sizes={{ sm: '425px', md: '1024px', lg: '1440px' }}
          />
        ))}
      </div>

      {/* Prev / next arrows */}
      {showControls && (
        <>
          <button className="slideshow__arrow slideshow__arrow--prev" onClick={prev} aria-label="Previous slide">
            <PrevIcon />
          </button>
          <button className="slideshow__arrow slideshow__arrow--next" onClick={next} aria-label="Next slide">
            <NextIcon />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showControls && (
        <div className="slideshow__dots" role="tablist" aria-label="Slides">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={`slideshow__dot${i === current ? ' slideshow__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}

      {/* Caption — visible slide only, page mode only */}
      {!background && slides[current]?.caption && (
        <div className="slideshow__caption">{slides[current].caption}</div>
      )}
    </div>
  )
}
