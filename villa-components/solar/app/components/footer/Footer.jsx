import React from 'react'
import { Link } from 'react-router'
import FooterContent from './FooterContent'
import isExternal from '../../lib/isExternalLink'

// Globe icon for the locale selector (no icon library needed)
function GlobeIcon () {
  return (
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

/**
 * Footer – main headless footer component, styled entirely via SCSS.
 *
 * @param {Object}  props
 * @param {import('../../types').FooterContent[]} props.Content       - Dynamic content blocks (image / text / icons)
 * @param {string}  [props.FontColor]                                 - Inline font-color override
 * @param {import('../../types').FooterLink[]} [props.links]          - Bottom-bar links
 * @param {boolean} [props.enableLocalization]                        - Show locale switcher
 * @param {string}  [props.localeName]                                - Display name of current locale
 * @param {string}  [props.localeCode]                                - Code of current locale (e.g. 'en')
 * @param {Function} [props.handleLocalize]                           - Locale-switch callback
 */
export default function Footer ({
  Content,
  FontColor: fontColor,
  links,
  enableLocalization,
  localeName,
  localeCode = 'en',
  handleLocalize
}) {
  const colorStyle = fontColor ? { color: fontColor } : undefined
  const borderStyle = fontColor ? { borderTopColor: fontColor } : undefined

  return (
    <footer className="footer" style={colorStyle}>
      {/* ── Main content blocks (images / text / social icons) ── */}
      {Content && Content.length > 0 && (
        <div className="footer__content">
          {Content.map((item, i) => (
            <div key={i} className="footer__content-item">
              <FooterContent content={item} />
            </div>
          ))}
        </div>
      )}

      {/* ── Bottom bar: sitemap + page links + locale switcher ── */}
      <div className="footer__bottom" style={borderStyle}>
        <Link
          to={`${localeCode === 'en' ? '' : `/${localeCode}`}/sitemap`}
          className="footer__link"
        >
          Site Map
        </Link>

        {links?.map((item, i) =>
          isExternal(item.link)
            ? (
              <a
                key={i}
                href={item.link}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.text}
              </a>
              )
            : (
              <Link key={i} to={item.link} className="footer__link">
                {item.text}
              </Link>
              )
        )}

        {enableLocalization && (
          <button className="footer__locale-btn" onClick={handleLocalize} type="button">
            <GlobeIcon />
            <span>{localeName}</span>
          </button>
        )}
      </div>
    </footer>
  )
}
