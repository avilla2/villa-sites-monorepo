import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router'

export default function LoadingBar ({ color = '#6c757d' }) {
  const navigation = useNavigation()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (navigation.state === 'loading') {
      // Start progress
      setProgress(30)

      // Simulate progress
      const timer = setTimeout(() => {
        setProgress(70)
      }, 200)

      return () => clearTimeout(timer)
    } else if (navigation.state === 'idle') {
      // Complete progress
      setProgress(100)

      // Reset after animation
      const timer = setTimeout(() => {
        setProgress(0)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [navigation.state])

  if (progress === 0) return null

  return (
    <div className="loading-bar-container">
      <div
        className="loading-bar"
        style={{
          width: `${progress}%`,
          backgroundColor: color
        }}
      />
    </div>
  )
}
