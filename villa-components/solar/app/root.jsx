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
import { apolloClient, createApolloClient, loaderFetchPolicy } from './lib/apollo'
import { getWebsiteIdFromHostname, getSiteNameFromHostname } from './lib/websiteMapping'
import { APP_QUERY } from '@villa-components/graphql-queries'
import { parseMarkdownInContent, parseMarkdownInFooter } from './utils/markdown'

import './app.scss'

const cdnDomain = 'https://static.villawebsolutions.com'

export async function loader ({ request }) {
  const url = new URL(request.url)
  const websiteId = getWebsiteIdFromHostname(url.hostname)
  const siteName = getSiteNameFromHostname(url.hostname)

  try {
    const client = createApolloClient()
    const { data } = await client.query({
      query: APP_QUERY,
      variables: {
        id: websiteId,
        locale: 'en'
      },
      fetchPolicy: loaderFetchPolicy
    })

    // Parse markdown in homepage content
    const homepageContent = data.website?.homepage?.Content
      ? await parseMarkdownInContent(data.website.homepage.Content)
      : null

    // Parse markdown in all content pages
    const contentPages = data.website?.content_pages
      ? await Promise.all(
        data.website.content_pages.map(async (page) => ({
          ...page,
          Content: page.Content ? await parseMarkdownInContent(page.Content) : null
        }))
      )
      : []

    // Parse markdown in footer content
    const footerContent = data.website?.footer?.Content
      ? await parseMarkdownInFooter(data.website.footer.Content)
      : null

    return {
      website: {
        ...data.website,
        homepage: data.website?.homepage
          ? { ...data.website.homepage, Content: homepageContent }
          : null,
        content_pages: contentPages,
        footer: data.website?.footer
          ? { ...data.website.footer, Content: footerContent }
          : null
      },
      websiteId,
      siteName
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

export function links () {
  return [
    { rel: 'preconnect', href: cdnDomain },
    { rel: 'dns-prefetch', href: cdnDomain }
  ]
}

export function Layout ({ children }) {
  const data = useRouteLoaderData('root')
  const website = data?.website
  const siteName = data?.siteName
  const metadata = website?.site_settings?.SiteMetadata
  const gTag = metadata?.gTag

  // Extract all font URLs for preloading
  const fontUrls = [
    ...(metadata?.primaryFont || []),
    ...(metadata?.headingFont || [])
  ].map(font => font.url).filter(Boolean)

  return (
    <html lang="en" data-site={siteName}>
      <head>
        <Links />
        <Meta />
        {/* Preload font files to prevent FOUT */}
        {fontUrls.map((url, index) => (
          <link
            key={index}
            rel="preload"
            href={url}
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
        ))}
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
        {/* Dynamic @font-face declarations for CDN fonts */}
        {(metadata?.primaryFont || metadata?.headingFont) && (
          <style dangerouslySetInnerHTML={{
            __html: `
              ${metadata?.primaryFont?.map(font => `
                @font-face {
                  font-family: 'PrimaryFont';
                  src: url('${font.url}') format('truetype');
                  font-display: block;
                }
              `).join('') || ''}
              ${metadata?.headingFont?.map(font => `
                @font-face {
                  font-family: 'HeadingFont';
                  src: url('${font.url}') format('truetype');
                  font-display: block;
                }
              `).join('') || ''}
              ${metadata?.primaryFont
                ? `
                body {
                  font-family: 'PrimaryFont', sans-serif;
                }
              `
                : ''}
              ${metadata?.headingFont
                ? `
                h1, h2, h3, h4, h5, h6 {
                  font-family: 'HeadingFont', sans-serif;
                }
              `
                : ''}
            `
          }} />
        )}
        {/* Dynamic metadata links */}
        {metadata?.Favicon?.url && <link rel="icon" href={metadata.Favicon.url} />}
        {metadata?.AppleTouchIcon?.url && <link rel="apple-touch-icon" href={metadata.AppleTouchIcon.url} />}
        {metadata?.Manifest?.url && <link rel="manifest" href={metadata.Manifest.url} />}
      </head>
      <body>
        <ApolloProvider client={apolloClient}>
          {children}
        </ApolloProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App () {
  const { website } = useLoaderData()

  return (
    <Outlet context={{ website }} />
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
