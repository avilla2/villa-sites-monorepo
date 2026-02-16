import React from 'react'
import { useOutletContext, useParams, useNavigate } from 'react-router'
import { Footer, Navbar } from '@villa-components/components'

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
  const { website } = useOutletContext()
  const { pageLink } = useParams()
  const navigate = useNavigate()

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

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      {website.navbar && (
        <Navbar
          page={contentPage.Title}
          navIndex={contentPage.Link}
          Items={website.navbar.Items}
          MobileConfig={website.navbar.MobileConfig}
          Style={website.navbar.Style}
          Appearance={website.navbar.Appearance}
          FontColor={website.navbar.FontColor}
          minSize={website.site_settings?.DesktopBreakpoint || 'md'}
          mobileTitle={website.homepage?.Title || 'Home'}
          onBackClick={() => navigate(-1)}
        />
      )}

      {/* Content Page */}
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

      {/* Footer */}
      {website.footer && (
        <Footer
          Content={website.footer.Content}
          FontColor={website.footer.FontColor}
          links={website.footer.links}
          enableLocalization={website.site_settings?.enableLocalization}
          localeName="English"
          localeCode="en"
        />
      )}
    </div>
  )
}
