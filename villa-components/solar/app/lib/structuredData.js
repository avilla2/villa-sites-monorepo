/**
 * Builds Schema.org WebPage structured data.
 * @param {Object} website - website data
 * @param {Object} page - page data
 * @param {string} url - full page URL
 * @returns {Object} WebPage schema
 */
export function buildWebPageSchema (website, page, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.Title || page.PageName,
    description: website?.site_settings?.SiteDescription,
    url,
    inLanguage: 'en-US'
  }
}

/**
 * Builds Schema.org Organization structured data.
 * @param {Object} website - website data
 * @returns {Object} Organization schema
 */
export function buildOrganizationSchema (website) {
  const footer = website?.footer
  const siteSettings = website?.site_settings

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSettings?.SiteTitle,
    url: siteSettings?.SiteURL,
    logo: siteSettings?.SiteMetadata?.Logo?.url
  }

  // Add contact point if phone number exists
  if (footer?.PhoneNumber) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      telephone: footer.PhoneNumber,
      contactType: 'customer service'
    }
  }

  return schema
}

/**
 * Builds Schema.org FAQPage structured data from FAQ component.
 * @param {Object} faqComponent - FAQ component data
 * @returns {Object|null} FAQPage schema or null
 */
export function buildFAQPageSchema (faqComponent) {
  if (faqComponent?.__typename !== 'ComponentContentPageComponentsFaq' || !faqComponent.FAQ?.length) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqComponent.FAQ.map(item => ({
      '@type': 'Question',
      name: item.Question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.Answer
      }
    }))
  }
}

/**
 * Builds Schema.org VideoObject structured data.
 * @param {Object} videoComponent - Video component data
 * @returns {Object|null} VideoObject schema or null
 */
export function buildVideoSchema (videoComponent) {
  if (videoComponent?.__typename !== 'ComponentContentPageComponentsVideo' || !videoComponent.VideoURL) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videoComponent.Title || 'Video',
    description: videoComponent.Caption || undefined,
    contentUrl: videoComponent.VideoURL,
    thumbnailUrl: videoComponent.Thumbnail?.url || undefined
  }
}

/**
 * Generates structured data JSON-LD script tag for React Router meta.
 * @param {Array} schemas - array of schema objects
 * @returns {Object|null} meta tag object or null
 */
export function injectStructuredData (schemas) {
  const validSchemas = schemas.filter(Boolean)
  if (!validSchemas.length) return null

  return {
    tagName: 'script',
    type: 'application/ld+json',
    children: JSON.stringify(validSchemas.length === 1 ? validSchemas[0] : validSchemas)
  }
}

/**
 * Extracts and builds all relevant structured data from page content.
 * @param {Object} website - website data
 * @param {Object} page - page data
 * @param {string} url - full page URL
 * @returns {Array} array of schema objects
 */
export function buildPageStructuredData (website, page, url) {
  const schemas = [
    buildWebPageSchema(website, page, url),
    buildOrganizationSchema(website)
  ]

  // Check for FAQ components
  const content = page.Content || []
  for (const component of content) {
    const faqSchema = buildFAQPageSchema(component)
    if (faqSchema) schemas.push(faqSchema)

    const videoSchema = buildVideoSchema(component)
    if (videoSchema) schemas.push(videoSchema)
  }

  return schemas
}
