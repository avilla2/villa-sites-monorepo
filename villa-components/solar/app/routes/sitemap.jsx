import React from 'react'
import { useOutletContext } from 'react-router'
import Sitemap from '../components/pages/Sitemap'
import { getWebsiteFromMatches, buildSiteMeta } from '../lib/siteMeta'

export function meta ({ matches }) {
  const website = getWebsiteFromMatches(matches)
  return buildSiteMeta(website, 'Site Map')
}

export default function SitemapRoute () {
  const { website } = useOutletContext()

  return <Sitemap contentPages={website?.content_pages || []} />
}
