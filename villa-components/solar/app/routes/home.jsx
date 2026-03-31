import React from 'react'
import { useOutletContext } from 'react-router'
import Page from '../components/pages/page'

export function meta ({ matches }) {
  // Get parent loader data (from root.jsx)
  const rootData = matches.find(match => match.id === 'root')?.data
  const website = rootData?.website

  const siteTitle = website?.site_settings?.SiteTitle
  const homepageTitle = website?.homepage?.Title
  const siteDescription = website?.site_settings?.SiteDescription
  const metadata = website?.site_settings?.SiteMetadata

  return [
    { title: homepageTitle ? `${homepageTitle} ${siteTitle}` : siteTitle || 'Page Not Found' },
    { name: 'description', content: siteDescription || 'Site Description' },
    { name: 'theme-color', content: metadata?.ThemeColor || '#000000' }
  ]
}

export default function Home () {
  const { website } = useOutletContext()

  if (!website) return null

  return (
    <Page
      content={website.homepage?.Content}
      pageName={website.homepage?.PageName || ''}
      path="/"
      siteName={website.name}
    />
  )
}
