import { useState, useEffect } from 'react'

/**
 * Returns true once the page has scrolled past the given threshold (px).
 * SSR-safe: defaults to false until mounted.
 * @param {number} [threshold=65]
 */
export default function useScrollTrigger (threshold = 65) {
  const [triggered, setTriggered] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.scrollY > threshold
  })

  useEffect(() => {
    const handler = () => setTriggered(window.scrollY > threshold)
    // Initialise immediately so it's correct on first render
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return triggered
}
