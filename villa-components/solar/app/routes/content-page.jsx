import React, { useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router'
import Page from '../components/pages/page'
import NotFound from '../components/pages/NotFound'

export function meta ({ params, data }) {
  const context = data || {}
  const website = context.website
  const pageLink = params.pageLink

  const contentPage = website?.content_pages?.find(
    page => page.Link === `/${pageLink}`
  )

  return [
    { title: contentPage?.Title || 'Page Not Found' },
    { name: 'description', content: contentPage?.Name || '' }
  ]
}

export default function ContentPage () {
  const { website, setPage } = useOutletContext()
  const { pageLink } = useParams()

  if (!website) return null

  const contentPage = website.content_pages?.find(
    page => page.Link === `/${pageLink}`
  )

  useEffect(() => {
    setPage(contentPage?.Title || 'Not Found')
  }, [contentPage?.Title, setPage])

  if (!contentPage) {
    return <NotFound />
  }

  return (
    <Page
      content={contentPage.Content}
      pageName={contentPage.Title}
      path={`/${pageLink}`}
      setPage={setPage}
      siteName={website.name}
    />
  )
}
