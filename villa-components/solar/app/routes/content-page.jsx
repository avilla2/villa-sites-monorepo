import React from 'react'
import { useOutletContext, useParams } from 'react-router'
import Page from '../components/pages/Page'
import NotFound from '../components/pages/NotFound'
import { getWebsiteFromMatches, buildSiteMeta } from '../lib/siteMeta'

export function meta ({ params, matches }) {
  const website = getWebsiteFromMatches(matches)
  const contentPage = website?.content_pages?.find(
    page => page.Link === `/${params.pageLink}`
  )
  return buildSiteMeta(website, contentPage?.Title)
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
