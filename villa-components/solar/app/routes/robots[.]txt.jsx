export async function loader ({ request }) {
  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.hostname}`

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
