import React from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from 'react-router'
import { ApolloProvider } from '@apollo/client/react'
import { ThemeProvider } from '@villa-components/components'
import { apolloClient } from './lib/apollo'
import { getWebsiteIdFromHostname } from './lib/websiteMapping'
import { APP_QUERY } from '@villa-components/graphql-queries'

import './app.css'
import '@villa-components/components/dist/bundle.css'

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

export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Racing+Sans+One&display=swap'
  }
]

export function Layout ({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="emotion-insertion-point" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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

  // Extract fonts from site settings
  const fonts = website?.site_settings?.Fonts || ['"Racing Sans One"', 'Poppins']
  const palette = website?.site_settings?.Palette || {}

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider palette={palette} fonts={fonts}>
        <Outlet context={{ website }} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export function ErrorBoundary ({ error }) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
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
