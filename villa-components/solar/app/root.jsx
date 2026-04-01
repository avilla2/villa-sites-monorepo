import React from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData
} from 'react-router'
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from './lib/apollo'
import { getWebsiteIdFromHostname } from './lib/websiteMapping'
import { APP_QUERY } from '@villa-components/graphql-queries'

import './app.scss'

export async function loader ({ request }) {
  const url = new URL(request.url)
  const websiteId = getWebsiteIdFromHostname(url.hostname)

  try {
    const { data } = await apolloClient.query({
      query: APP_QUERY,
      variables: {
        id: websiteId,
        locale: 'en'
      }
    })

    return {
      website: data.website,
      websiteId
    }
  } catch (error) {
    console.error('Error loading website data:', error)
    throw new Response('Failed to load website data', { status: 500 })
  }
}

export function meta ({ data } = {}) {
  const website = data?.website
  const metadata = website?.site_settings?.SiteMetadata

  return [
    { title: website?.site_settings?.SiteTitle || 'Website' },
    {
      name: 'description',
      content: website?.site_settings?.SiteDescription || 'Professional websites'
    },
    { name: 'theme-color', content: metadata?.ThemeColor || '#000000' }
  ]
}

export function links ({ data } = {}) {
  // Static font preconnects only
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    }
  ]
}

export function Layout ({ children }) {
  const data = useRouteLoaderData('root')
  const website = data?.website
  const metadata = website?.site_settings?.SiteMetadata
  const googleFontURL = metadata?.GoogleFontURL || 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Racing+Sans+One&display=swap'
  const gTag = metadata?.gTag

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        {gTag && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gTag}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gTag}');
                `
              }}
            />
          </>
        )}
        <meta name="emotion-insertion-point" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Dynamic metadata links */}
        <link rel="stylesheet" href={googleFontURL} />
        {metadata?.Favicon?.url && <link rel="icon" href={metadata.Favicon.url} />}
        {metadata?.AppleTouchIcon?.url && <link rel="apple-touch-icon" href={metadata.AppleTouchIcon.url} />}
        {metadata?.Manifest?.url && <link rel="manifest" href={metadata.Manifest.url} />}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App () {
  const { website } = useLoaderData()

  return (
    <ApolloProvider client={apolloClient}>
      <Outlet context={{ website }} />
    </ApolloProvider>
  )
}

export function ErrorBoundary ({ error }) {
  // Show error details
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack

  if (isRouteErrorResponse(error)) {
    message = `Error ${error.status}`
    details = error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
