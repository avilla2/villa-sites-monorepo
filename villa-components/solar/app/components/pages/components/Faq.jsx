import React, { useState } from 'react'

const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

function FaqItem ({ entry, isOpen, onToggle }) {
  return (
    <li className={`faq__item${isOpen ? ' faq__item--open' : ''}`}>
      <button
        className="faq__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="faq__question">{entry.Title}</span>
        <span className="faq__icon"><ChevronIcon /></span>
      </button>
      <div className="faq__panel" style={{ maxHeight: isOpen ? '600px' : '0' }}>
        <div className="faq__body">{entry.Body}</div>
      </div>
    </li>
  )
}

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').FaqComponent} props.content
 */
export default function Faq ({ content }) {
  const [openIndex, setOpenIndex] = useState(-1)

  if (!content?.Entry?.length) return null

  return (
    <div className="faq">
      <ul className="faq__list">
        {content.Entry.map((entry, index) => (
          <FaqItem
            key={index}
            entry={entry}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(prev => prev === index ? -1 : index)}
          />
        ))}
      </ul>
    </div>
  )
}
