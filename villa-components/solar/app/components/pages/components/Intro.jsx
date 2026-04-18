import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router'
import isExternal from '../../../lib/isExternalLink'
import Slideshow from './Slideshow'
import ResponsiveImage from '../../shared/ResponsiveImage'

// ── Helpers ───────────────────────────────────────────────────────────────────

const getMimeType = (mime) => mime?.split('/')[0]

const POSITION_CLASS = {
  Centered: 'intro__overlay--centered',
  Bottom_Right: 'intro__overlay--bottom-right'
}

// ── Single media element ──────────────────────────────────────────────────────
function IntroSingleMedia ({ file, mobileFile }) {
  const mime = getMimeType(file.mime)

  if (mime === 'video') {
    return (
      <video className="intro__video" loop autoPlay muted playsInline>
        <source src={file.url} type={file.mime} />
      </video>
    )
  }

  return (
    <ResponsiveImage
      className="intro__image"
      src={file.url}
      mobileSrc={mobileFile?.url}
      alt={file.alternativeText || ''}
      sizes={{ sm: '100vw', md: '100vw', lg: '100vw' }}
    />
  )
}

// ── Background media renderer ─────────────────────────────────────────────────
function IntroBg ({ files, mobileFiles }) {
  if (!files?.length) return null

  // If multiple files, use slideshow (slideshow handles its own responsive logic)
  if (files.length > 1) {
    return <Slideshow slides={files} background />
  }

  // Single file - use ResponsiveImage with optional mobile variant
  return <IntroSingleMedia file={files[0]} mobileFile={mobileFiles?.[0]} />
}

// ── CTA buttons ───────────────────────────────────────────────────────────────
function IntroButton ({ text, link, buttonColor }) {
  const style = buttonColor ? { '--btn-color': buttonColor } : undefined

  if (isExternal(link)) {
    return (
      <a
        href={link}
        className="intro__btn"
        style={style}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    )
  }

  return (
    <Link to={link} className="intro__btn" style={style}>
      {text}
    </Link>
  )
}

// ── Intro ─────────────────────────────────────────────────────────────────────
/**
 * Full-viewport hero section with media background, text overlay, and optional CTA buttons.
 *
 * @param {{ content: import('../../../../../components/src/types').IntroComponent }} props
 */
export default function Intro ({ content }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const styles = content?.Style || {}

  const overlayClass = [
    'intro__overlay',
    POSITION_CLASS[content.TextPosition] || 'intro__overlay--bottom-left'
  ].join(' ')

  // Animation class derived from Style.Animation ('Fade' | 'Slide' | 'None' | undefined)
  const animation = styles.Animation && styles.Animation !== 'None'
    ? styles.Animation.toLowerCase() // 'fade' | 'slide'
    : null

  const sectionStyle = {
    ...(styles.TextColor ? { color: styles.TextColor } : {}),
    ...(styles.BackgroundColor ? { '--intro-bg-color': styles.BackgroundColor } : {})
  }

  return (
    <section
      className="intro"
      style={Object.keys(sectionStyle).length ? sectionStyle : undefined}
    >
      {/* ── Background media ───────────────────────────────────────────── */}
      <div className="intro__bg">
        <IntroBg files={content.File} mobileFiles={content.MobileFile} />
      </div>

      {/* ── Text / button overlay ──────────────────────────────────────── */}
      <div className={overlayClass}>
        <div className={`intro__content${animation ? ` intro__content--${animation}` : ''}`}>
          {content.IntroText && (
            <div className="intro__text">
              {mounted
                ? <ReactMarkdown>{content.IntroText}</ReactMarkdown>
                : <p>{content.IntroText}</p>
              }
            </div>
          )}

          {content?.Buttons?.length > 0 && (
            <div className="intro__buttons">
              {content.Buttons.map((btn, i) => (
                <IntroButton
                  key={i}
                  text={btn.Text}
                  link={btn.Link}
                  buttonColor={btn.ButtonColor}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
