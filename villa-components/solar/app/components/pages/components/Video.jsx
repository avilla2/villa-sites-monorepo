import React from 'react'
import Paragraph from './Paragraph'

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').VideoComponent} props.content
 */
export default function Video ({ content }) {
  if (!content?.asset?.url) return null

  const { asset, caption, autoplay, loop, muted, controls, width = 100 } = content

  return (
    <div className="video" style={{ '--video-width': `${width}%` }}>
      <div className="video__player">
        <video
          autoPlay={autoplay}
          loop={loop}
          muted={autoplay || muted}
          controls={controls}
          playsInline={autoplay}
          aria-label={asset.alternativeText || undefined}
        >
          <source src={asset.url} type={asset.mime} />
        </video>
      </div>
      {caption && (
        <div className="video__caption">
          <Paragraph content={{ Body: caption }} />
        </div>
      )}
    </div>
  )
}
