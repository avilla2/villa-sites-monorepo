import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import isExternalLink from '../../../lib/isExternalLink'
import ResponsiveImage from '../../shared/ResponsiveImage'

function CardLink ({ href, className, style, children, stopPropagation }) {
  const handleClick = stopPropagation ? e => e.stopPropagation() : undefined
  if (isExternalLink(href)) {
    return (
      <a href={href} className={className} style={style} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        {children}
      </a>
    )
  }
  return <Link to={href} className={className} style={style} onClick={handleClick}>{children}</Link>
}

function SingleCard ({ Image, Title, Text, ButtonText, ButtonColor, CardColor, CardStyle, Color, active, onToggle, Link: cardLink }) {
  const btnStyle = ButtonColor ? { '--btn-color': ButtonColor } : undefined

  if (CardStyle === 'overlay') {
    return (
      <div
        className={`card card--overlay${active ? ' card--overlay-open' : ''}`}
        style={{
          backgroundImage: Image?.url ? `url(${Image.url})` : undefined,
          backgroundColor: CardColor || undefined,
          color: Color || undefined
        }}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={active}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onToggle() }}
      >
        <span className="card__overlay-title">{Title}</span>
        <div className="card__overlay-panel" aria-hidden={!active}>
          <div className="card__overlay-content">
            {Text && <div className="card__body"><BlocksRenderer content={Text} /></div>}
          </div>
          {cardLink && (
            <div className="card__actions">
              <CardLink href={cardLink} className="card__btn" style={btnStyle} stopPropagation>
                {ButtonText}
              </CardLink>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="card" style={{ backgroundColor: CardColor || undefined, color: Color || undefined }}>
      {Image?.url && (
        <div className="card__media">
          <ResponsiveImage className="card__img" src={Image.url} alt={Image.alternativeText || ''} sizes={{ sm: '100vw', md: '40vw', lg: '20vw' }}/>
        </div>
      )}
      <div className="card__content">
        <h3 className="card__title">{Title}</h3>
        {Text && <div className="card__body"><BlocksRenderer content={Text} /></div>}
      </div>
      {cardLink && (
        <div className="card__actions">
          <CardLink href={cardLink} className="card__btn" style={btnStyle}>{ButtonText}</CardLink>
        </div>
      )}
    </div>
  )
}

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').CardGroupComponent} props.content
 */
export default function CardGroup ({ content }) {
  const [activeCard, setActiveCard] = useState(-1)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  if (!content?.Cards?.length) return null

  const { fullWidth, Cards, Style, CardGroupStyle } = content
  const isSlideshow = CardGroupStyle === 'slideshow'

  // Auto-advance slideshow
  useEffect(() => {
    if (!isSlideshow || !autoPlay) return
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % Cards.length)
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [isSlideshow, autoPlay, Cards.length])

  const handlePrev = () => {
    setAutoPlay(false)
    setCurrentSlide(prev => (prev - 1 + Cards.length) % Cards.length)
  }

  const handleNext = () => {
    setAutoPlay(false)
    setCurrentSlide(prev => (prev + 1) % Cards.length)
  }

  const handleDotClick = (index) => {
    setAutoPlay(false)
    setCurrentSlide(index)
  }

  if (isSlideshow) {
    return (
      <div
        className="card-group card-group--slideshow"
        style={{
          textAlign: Style?.textAlign || undefined,
          color: Style?.TextColor || undefined
        }}
      >

        <div className="card-group__slideshow-container">
          <button
            className="card-group__arrow card-group__arrow--prev"
            onClick={handlePrev}
            aria-label="Previous card"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="card-group__slideshow-track">
            {Cards.map((card, index) => {
              let offset = index - currentSlide
              // Wrap around for circular navigation
              if (offset > Cards.length / 2) offset -= Cards.length
              if (offset < -Cards.length / 2) offset += Cards.length

              const isActive = offset === 0
              const isVisible = Math.abs(offset) <= 1
              // Add gap spacing: 110% accounts for 100% card width + 10% gap
              const translateX = offset * 110
              // Z-index: active card on top, visible cards in middle, others behind
              const zIndex = isActive ? 10 : (isVisible ? 5 : 1)

              return (
                <div
                  key={index}
                  className={`card-group__slide${isActive ? ' card-group__slide--active' : ''}${isVisible ? ' card-group__slide--visible' : ''}`}
                  style={{
                    transform: `translateX(${translateX}%)`,
                    opacity: isActive ? 1 : 0.4,
                    pointerEvents: isActive ? 'auto' : 'none',
                    zIndex
                  }}
                >
                  <SingleCard
                    {...card}
                    Color={Style?.TextColor}
                    active={activeCard === index}
                    onToggle={() => setActiveCard(prev => prev === index ? -1 : index)}
                  />
                </div>
              )
            })}
          </div>

          <button
            className="card-group__arrow card-group__arrow--next"
            onClick={handleNext}
            aria-label="Next card"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="card-group__dots">
          {Cards.map((_, index) => (
            <button
              key={index}
              className={`card-group__dot${currentSlide === index ? ' card-group__dot--active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="card-group"
      style={{
        textAlign: Style?.textAlign || undefined,
        color: Style?.TextColor || undefined
      }}
    >
      <div className={`card-group__grid${fullWidth ? ' card-group__grid--full-width' : ''}`}>
        {Cards.map((card, index) => (
          <div key={index} className="card-group__item">
            <SingleCard
              {...card}
              Color={Style?.TextColor}
              active={activeCard === index}
              onToggle={() => setActiveCard(prev => prev === index ? -1 : index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
