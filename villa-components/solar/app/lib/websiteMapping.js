// Map hostnames to Strapi website document IDs
const HOSTNAME_TO_WEBSITE_ID = {
  localhost: 'gphzmmnxs62yz5xy17mlnjpn', // demo-site
  '127.0.0.1': 'gphzmmnxs62yz5xy17mlnjpn' // demo-site
  // Add more mappings as needed:
  // 'pacwest.com': 'pacwest-site-id',
  // 'buildpro.com': 'buildpro-site-id',
}

export function getWebsiteIdFromHostname (hostname) {
  // Remove port if present
  const cleanHostname = hostname.split(':')[0]

  return HOSTNAME_TO_WEBSITE_ID[cleanHostname] || HOSTNAME_TO_WEBSITE_ID.localhost
}
