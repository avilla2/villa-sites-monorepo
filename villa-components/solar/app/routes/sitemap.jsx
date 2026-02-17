import React from 'react'
import { useOutletContext } from 'react-router'
import { SiteMapPage } from '@villa-components/components'

export default function Sitemap () {
  const { website, setPage } = useOutletContext()

  // Extract content pages from website
  const contentPages = website?.content_pages || []

  return (
    <SiteMapPage
      setPage={setPage}
      contentPages={contentPages}
      locale="en"
    />
  )
}
