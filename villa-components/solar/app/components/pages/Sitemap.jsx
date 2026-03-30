import React from 'react'
import { Link } from 'react-router'

/**
 * @param {Object} props
 * @param {{ Title: string, Link: string }[]} props.contentPages
 */
export default function Sitemap ({ contentPages = [] }) {
  return (
    <div className="utility-page utility-page--full">
      <div className="utility-page__links">
        {contentPages.map((page, i) => (
          <Link key={i} to={page.Link} className="utility-page__link">
            {page.Title}
          </Link>
        ))}
      </div>
    </div>
  )
}
