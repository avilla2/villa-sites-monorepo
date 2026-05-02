import React from 'react'
import { useOutletContext, useParams } from 'react-router'
import Page from '../components/pages/Page'
import NotFound from '../components/pages/NotFound'
import { getWebsiteFromMatches, buildSiteMeta, getFirstImageFromContent } from '../lib/siteMeta'

export function meta ({ params, matches, request }) {
  const website = getWebsiteFromMatches(matches)
  const contentPage = website?.content_pages?.find(
    page => page.Link === `/${params.pageLink}`
  )

  if (!contentPage) {
    return buildSiteMeta(website, 'Page Not Found')
  }

  // Build base meta tags
  const image = getFirstImageFromContent(contentPage.Content)
  const baseOptions = {
    image,
    description: contentPage.metaDescription
  }

  // Add URL and canonical only if request is available
  if (request) {
    const url = new URL(request.url)
    baseOptions.url = url.href
  }

  return buildSiteMeta(website, contentPage.Title, baseOptions)
}

export default function ContentPage () {
  const { website } = useOutletContext()
  const { pageLink } = useParams()

  if (!website) return null

  const contentPage = website.content_pages?.find(
    page => page.Link === `/${pageLink}`
  )

  if (!contentPage) {
    return <NotFound />
  }

  return (
    <Page
      content={contentPage.Content}
      pageName={contentPage.Title}
      path={`/${pageLink}`}
      siteName={website.name}
    />
  )
}
