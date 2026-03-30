import React, { useState } from 'react'
import { Link } from 'react-router'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import isExternalLink from '../../../lib/isExternalLink'

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
          <img className="card__img" src={Image.url} alt={Image.alternativeText || ''} />
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
  if (!content?.Cards?.length) return null

  const { Title, fullWidth, Cards, Style } = content

  return (
    <div
      className="card-group"
      style={{
        textAlign: Style?.textAlign || undefined,
        color: Style?.TextColor || undefined
      }}
    >
      {Title && <h2 className="card-group__title">{Title}</h2>}
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
