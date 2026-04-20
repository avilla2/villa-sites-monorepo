import React from 'react'
import { Link } from 'react-router'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import isExternalLink from '../../../lib/isExternalLink'
import ResponsiveImage from '../../shared/ResponsiveImage'

function CtaButton ({ btn }) {
  const style = btn.ButtonColor ? { '--btn-color': btn.ButtonColor } : undefined
  if (isExternalLink(btn.Link)) {
    return (
      <a href={btn.Link} className="cta__btn" style={style} target="_blank" rel="noopener noreferrer">
        <span>{btn.Text}</span>
      </a>
    )
  }
  return <Link to={btn.Link} className="cta__btn" style={style}><span>{btn.Text}</span></Link>
}

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').ComponentHomePageComponentsCta} props.content
 */
export default function Cta ({ content }) {
  if (!content) return null

  const { content: body, media, buttons = [], Style = {}, justify, variant, reversed } = content

  const rootClass = [
    'cta',
    variant === 'card' && 'cta--card',
    variant === 'bordered' && 'cta--bordered'
  ].filter(Boolean).join(' ')

  const innerClass = [
    'cta__inner',
    reversed && 'cta__inner--reversed',
    justify === 'space_between' && 'cta__inner--justify-between'
  ].filter(Boolean).join(' ')

  return (
    <section
      className={rootClass}
      style={{
        ...(Style.TextColor ? { color: Style.TextColor } : {}),
        ...(Style.BackgroundColor ? { backgroundColor: Style.BackgroundColor } : {})
      }}
    >
      <div className={innerClass}>
        <div className="cta__content" style={Style.textAlign ? { textAlign: Style.textAlign } : undefined}>
          {body && (
            <div className="cta__body">
              <BlocksRenderer content={body} />
            </div>
          )}
          {buttons.length > 0 && (
            <div
              className="cta__buttons"
              style={{
                justifyContent: Style.textAlign === 'center'
                  ? 'center'
                  : Style.textAlign === 'right'
                    ? 'flex-end'
                    : 'flex-start'
              }}
            >
              {buttons.map((btn, i) => <CtaButton key={i} btn={btn} />)}
            </div>
          )}
        </div>

        {media?.url && (
          <div className={`cta__media${variant === 'rounded' ? ' cta__media--rounded' : ''}`}>
            <ResponsiveImage className="cta__img" src={media.url} alt={media.alternativeText || ''} sizes={{ sm: '100vw', md: '40vw', lg: '40vw' }}/>
          </div>
        )}
      </div>
    </section>
  )
}
