import { createApolloClient, loaderFetchPolicy } from '../lib/apollo'
import { getWebsiteIdFromHostname } from '../lib/websiteMapping'
import { APP_QUERY } from '@villa-components/graphql-queries'

export async function loader ({ request }) {
  const url = new URL(request.url)
  const hostname = url.hostname
  const websiteId = getWebsiteIdFromHostname(hostname)

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

    const baseUrl = `${url.protocol}//${hostname}`
    const pages = [
      {
        loc: baseUrl,
        changefreq: 'weekly',
        priority: '1.0',
        lastmod: new Date().toISOString().split('T')[0]
      },
      ...data.website.content_pages.map(page => ({
        loc: `${baseUrl}${page.Link}`,
        changefreq: 'monthly',
        priority: '0.8',
        lastmod: page.updatedAt ? new Date(page.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      }))
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}
