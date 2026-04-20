import React from 'react'
import { Link } from 'react-router'
import isExternalLink from '../../../lib/isExternalLink'

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').ButtonsComponent} props.content
 */
export default function ButtonGroup ({ content }) {
  if (!content?.Entry?.length) return null

  const { Entry, GroupButtonStyle, ButtonArrangement, Style } = content

  const rowMod =
    ButtonArrangement === 'together'
      ? 'btn-group__row--together'
      : ButtonArrangement === 'spaced_evenly'
        ? 'btn-group__row--spaced'
        : null

  const alignMap = { left: 'flex-start', right: 'flex-end', center: 'center' }
  const justifyContent =
    ButtonArrangement !== 'spaced_evenly'
      ? (alignMap[Style?.textAlign] ?? 'center')
      : undefined

  const btnStyleMod =
    GroupButtonStyle === 'contained'
      ? 'btn-group__btn--contained'
      : 'btn-group__btn--outlined'

  const textColor = Style?.TextColor

  return (
    <div className="btn-group">
      <div
        className={['btn-group__row', rowMod].filter(Boolean).join(' ')}
        style={justifyContent ? { justifyContent } : undefined}
      >
        {Entry.map((entry, i) => {
          const btnClass = `btn-group__btn ${btnStyleMod}`
          const style = {
            ...(entry.ButtonColor ? { '--btn-color': entry.ButtonColor } : {}),
            ...(textColor ? { '--btn-text-color': textColor } : {})
          }
          const hasStyle = Object.keys(style).length > 0 ? style : undefined

          return isExternalLink(entry.Link)
            ? (
            <a
              key={i}
              href={entry.Link}
              className={btnClass}
              style={hasStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{entry.Text}</span>
            </a>
              )
            : (
            <Link key={i} to={entry.Link} className={btnClass} style={hasStyle}>
              <span>{entry.Text}</span>
            </Link>
              )
        })}
      </div>
    </div>
  )
}
