const fetch = require('cross-fetch')
const fs = require('fs')
require('dotenv').config({ path: ['../../.env', '.env'] })
const { program } = require('commander')

const main = async (id, baseUrl) => {
  try {
    const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variables: {
          id
        },
        query: `
          query Website($id: ID) {
            website(id: $id) {
              data {
                id
                attributes {
                  name
                  locale
                  content_pages {
                    data {
                      attributes {
                        Name
                        Title
                        Link
                      }
                    }
                  }
                }
              }
            }
          }
        `
      })
    })
    const body = await result.json()
    const objects = body.data.website.content_pages
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`
    objects.forEach((page) => {
      xml = `${xml}
  <url>
    <loc>${baseUrl}${page.Link}</loc>
  </url>`
    })
    xml = `${xml}
</urlset>`
    fs.writeFile('public/sitemap.xml', xml, (err) => {
      if (err) {
        console.error(err)
      }
    })
    console.log('Sitemap generate successfully')
  } catch (err) {
    console.log(err)
  }
}

program
  .argument('<id>')
  .argument('<baseUrl>')

program.parse()
main(program.args[0], program.args[1])
