import React, { useRef, useEffect, useState } from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

/**
 * Freestyle / Rich Text component — renders Strapi blocks content with optional scroll animations.
 *
 * @param {Object} props
 * @param {import('../../../../../components/src/types').RichTextComponent} props.content
 */
export default function Freestyle ({ content }) {
  if (!content?.RichText) return null

  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const animation = content?.Style?.Animation || 'None'

  useEffect(() => {
    if (animation === 'None' || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [animation])

  const animationClass = animation !== 'None'
    ? `freestyle--animate-${animation.toLowerCase()} ${isVisible ? 'freestyle--visible' : ''}`
    : ''

  return (
    <div ref={ref} className={`freestyle ${animationClass}`.trim()}>
      <div className="freestyle__body">
        <BlocksRenderer content={content.RichText} />
      </div>
    </div>
  )
}
