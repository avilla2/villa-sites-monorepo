import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const CheckIcon = () => (
  <svg
    className="list__check"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 10.5l2.5 2.5 5-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').ListComponent} props.content
 */
export default function List ({ content }) {
  if (!content?.Items?.length) return null

  const hasCaption = Boolean(content.Caption?.length)
  const justifyContent = content.Style?.textAlign === 'left' ? 'flex-start' : 'center'

  return (
    <div className="list">
      {content.Title && <h2 className="list__title">{content.Title}</h2>}
      <div className={`list__layout${hasCaption ? '' : ' list__layout--full'}`}>
        {hasCaption && (
          <div className="list__caption">
            <BlocksRenderer content={content.Caption} />
          </div>
        )}
        <ul className="list__items" style={{ justifyContent }}>
          {content.Items.map((item, index) => (
            <li key={index} className="list__item">
              <span className="list__icon">
                {content.Icon?.url
                  ? <img src={content.Icon.url} alt={content.Icon.alternativeText ?? ''} width={40} />
                  : <CheckIcon />}
              </span>
              <span className="list__text">{item.Text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
