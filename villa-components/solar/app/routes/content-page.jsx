import React, { useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router'

export function meta ({ params, data }) {
  const context = data || {}
  const website = context.website
  const pageLink = params.pageLink

  // Find the content page matching the route
  const contentPage = website?.content_pages?.find(
    page => page.Link === `/${pageLink}`
  )

  return [
    { title: contentPage?.Title || pageLink },
    { name: 'description', content: contentPage?.Name || '' }
  ]
}

export default function ContentPage () {
  const { website, setPage } = useOutletContext()
  const { pageLink } = useParams()

  if (!website) {
    return <div>Loading...</div>
  }

  // Find the content page matching the route
  const contentPage = website.content_pages?.find(
    page => page.Link === `/${pageLink}`
  )

  if (!contentPage) {
    throw new Response('Page not found', { status: 404 })
  }

  useEffect(() => {
    setPage(contentPage.Title)
  }, [contentPage.Title, setPage])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {contentPage.Title}
      </h1>

      {/* Render content page components */}
      {contentPage.Content && contentPage.Content.length > 0 && (
        <div className="space-y-8">
          {contentPage.Content.map((component, index) => (
            <div key={index} className="border p-4 rounded">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(component, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
