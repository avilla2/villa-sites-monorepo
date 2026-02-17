import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

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

  useEffect(() => {
    setPage('Home')
  }, [])

  if (!website) {
    return <div>Loading...</div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          {website.homepage?.Title || 'Welcome'}
        </h1>

        {/* Render homepage content components */}
        {website.homepage?.Content && website.homepage.Content.length > 0 && (
          <div className="space-y-8">
            {website.homepage.Content.map((component, index) => (
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
