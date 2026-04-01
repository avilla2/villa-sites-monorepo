import React from 'react'
import { useOutletContext, useParams } from 'react-router'
import Page from '../components/pages/Page'
import NotFound from '../components/pages/NotFound'

export function meta ({ params, matches }) {
  // Get parent loader data (from root.jsx)
  const rootData = matches.find(match => match.id === 'root')?.data
  const website = rootData?.website
  const pageLink = params.pageLink

  const contentPage = website?.content_pages?.find(
    page => page.Link === `/${pageLink}`
  )

  const siteTitle = website?.site_settings?.SiteTitle
  const pageTitle = contentPage?.Title
  const siteDescription = website?.site_settings?.SiteDescription
  const metadata = website?.site_settings?.SiteMetadata

  return [
    { title: pageTitle ? `${pageTitle} ${siteTitle}` : 'Page Not Found' },
    { name: 'description', content: siteDescription || 'Site Description' },
    { name: 'theme-color', content: metadata?.ThemeColor || '#000000' }
  ]
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
