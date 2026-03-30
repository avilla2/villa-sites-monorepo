import React from 'react'
import { useOutletContext } from 'react-router'
import Page from '../components/pages/page'

export function meta ({ data }) {
  const context = data || {}
  const website = context.website

  return [
    { title: website?.homepage?.Title || 'Home' },
    { name: 'description', content: website?.site_settings?.SiteTitle || 'Welcome' }
  ]
}

export default function Home () {
  const { website, setPage } = useOutletContext()

  if (!website) return null

  return (
    <Page
      content={website.homepage?.Content}
      pageName={website.homepage?.PageName || 'Home'}
      path="/"
      setPage={setPage}
      siteName={website.name}
    />
  )
}
