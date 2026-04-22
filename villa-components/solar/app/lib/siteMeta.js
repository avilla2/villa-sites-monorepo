/**
 * Returns the root website data from React Router matches.
 * @param {Array} matches - matches array from the meta function argument
 */
export function getWebsiteFromMatches (matches) {
  return matches.find(match => match.id === 'root')?.data?.website
}

/**
 * Helper to extract media type from MIME string.
 * @param {string} mime - MIME type string
 * @returns {string|null} - media type ('image', 'video', etc.) or null
 */
const getMimeType = (mime) => mime?.split('/')[0]

/**
 * Extracts the first image URL from page content components.
 * @param {Array} content - page content array
 * @returns {string|null} - first image URL or null
 */
export function getFirstImageFromContent (content) {
  if (!content || !Array.isArray(content)) return null

  for (const component of content) {
    // Image component
    if (component.__typename === 'ComponentContentPageComponentsImage' && component.asset?.url) {
      return component.asset.url
    }
    // Intro component with media (only if it's an image, not video)
    if (component.__typename === 'ComponentHomePageComponentsIntro' && component.Media?.url) {
      if (getMimeType(component.Media.mime) === 'image') {
        return component.Media.url
      }
    }
    // CTA component with media
    if (component.__typename === 'ComponentHomePageComponentsCta' && component.media?.url) {
      return component.media.url
    }
    // Gallery - first picture
    if (component.__typename === 'ComponentContentPageComponentsGallery' && component.Pictures?.[0]?.url) {
      return component.Pictures[0].url
    }
  }

  return null
}

/**
 * Builds the standard site meta tags for a page including Open Graph and Twitter Cards.
 * @param {Object} website - website data from the root loader
 * @param {string} [pageTitle] - optional page-specific title (prepended before site title)
 * @param {Object} [options] - additional options
 * @param {string} [options.description] - page-specific description
 * @param {string} [options.image] - page-specific image URL
 * @param {string} [options.url] - canonical page URL
 * @param {string} [options.type] - Open Graph type (default: 'website')
 * @returns {Array} React Router meta array
 */
export function buildSiteMeta (website, pageTitle, options = {}) {
  const siteTitle = website?.site_settings?.SiteTitle
  const siteDescription = website?.site_settings?.SiteDescription
  const themeColor = website?.site_settings?.SiteMetadata?.ThemeColor || '#000000'
  const siteLogo = website?.site_settings?.SiteMetadata?.Logo?.url

  const title = pageTitle && siteTitle
    ? `${pageTitle} | ${siteTitle}`
    : siteTitle || pageTitle || 'Page Not Found'

  const description = options.description || siteDescription || 'Professional websites'
  const image = options.image || siteLogo || null
  const url = options.url || null
  const type = options.type || 'website'

  const metaTags = [
    { title },
    { name: 'description', content: description },
    { name: 'theme-color', content: themeColor }
  ]

  // Open Graph tags
  metaTags.push(
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type }
  )

  if (image) {
    metaTags.push({ property: 'og:image', content: image })
  }

  if (url) {
    metaTags.push(
      { property: 'og:url', content: url },
      { tagName: 'link', rel: 'canonical', href: url }
    )
  }

  // Twitter Card tags
  metaTags.push(
    { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description }
  )

  if (image) {
    metaTags.push({ name: 'twitter:image', content: image })
  }

  return metaTags
}
