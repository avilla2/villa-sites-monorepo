import React from 'react'
import { useOutletContext } from 'react-router'
import Page from '../components/pages/Page'
import { getWebsiteFromMatches, buildSiteMeta } from '../lib/siteMeta'

export function meta ({ matches }) {
  const website = getWebsiteFromMatches(matches)
  return buildSiteMeta(website, website?.homepage?.PageName)
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
