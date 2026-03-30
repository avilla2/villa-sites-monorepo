import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import Sitemap from '../components/pages/Sitemap'

export function meta () {
  return [{ title: 'Site Map' }]
}

export default function SitemapRoute () {
  const { website, setPage } = useOutletContext()

  useEffect(() => { setPage('Site Map') }, [])

  return <Sitemap contentPages={website?.content_pages || []} />
}
