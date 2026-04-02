import React from 'react'
import NotFound from '../components/pages/NotFound'
import { getWebsiteFromMatches, buildSiteMeta } from '../lib/siteMeta'

export function meta ({ matches }) {
  const website = getWebsiteFromMatches(matches)
  return buildSiteMeta(website, 'Page Not Found')
}

export default function NotFoundRoute () {
  return <NotFound />
}
