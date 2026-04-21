import React, { useRef, useEffect, useState } from 'react'

/**
 * Paragraph component — renders markdown body text with optional scroll animations.
 *
 * @param {Object} props
 * @param {import('../../../../../components/src/types').ParagraphComponent} props.content
 */
export default function Paragraph ({ content }) {
  if (!content?.Body) return null

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
    ? `paragraph--animate-${animation.toLowerCase()} ${isVisible ? 'paragraph--visible' : ''}` 
    : ''

  return (
    <div ref={ref} className={`paragraph ${animationClass}`.trim()}>
      <div className="paragraph__body" dangerouslySetInnerHTML={{ __html: content.Body }} />
    </div>
  )
}
