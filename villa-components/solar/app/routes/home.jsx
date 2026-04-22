import React from 'react'
import { useOutletContext } from 'react-router'
import Page from '../components/pages/Page'
import { getWebsiteFromMatches, buildSiteMeta, getFirstImageFromContent } from '../lib/siteMeta'

export function meta ({ matches, request }) {
  const website = getWebsiteFromMatches(matches)

  // Build base meta tags
  const image = getFirstImageFromContent(website?.homepage?.Content)
  const baseOptions = { image }

  // Add URL and canonical only if request is available
  if (request) {
    const url = new URL(request.url)
    baseOptions.url = url.origin
  }

  return buildSiteMeta(website, website?.homepage?.PageName, baseOptions)
}

export default function Home () {
  const { website } = useOutletContext()

  if (!website) return null

  return (
    <Page
      content={website.homepage?.Content}
      pageName={website.homepage?.Title || ''}
      path="/"
      siteName={website.name}
    />
  )
}
