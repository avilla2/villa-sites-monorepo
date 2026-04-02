/**
 * Returns the root website data from React Router matches.
 * @param {Array} matches - matches array from the meta function argument
 */
export function getWebsiteFromMatches (matches) {
  return matches.find(match => match.id === 'root')?.data?.website
}

/**
 * Builds the standard site meta tags for a page.
 * @param {Object} website - website data from the root loader
 * @param {string} [pageTitle] - optional page-specific title (prepended before site title)
 * @returns {Array} React Router meta array
 */
export function buildSiteMeta (website, pageTitle) {
  const siteTitle = website?.site_settings?.SiteTitle
  const siteDescription = website?.site_settings?.SiteDescription
  const themeColor = website?.site_settings?.SiteMetadata?.ThemeColor || '#000000'

  const title = pageTitle && siteTitle
    ? `${pageTitle} ${siteTitle}`
    : siteTitle || pageTitle || 'Page Not Found'

  return [
    { title },
    { name: 'description', content: siteDescription || 'Site Description' },
    { name: 'theme-color', content: themeColor }
  ]
}
