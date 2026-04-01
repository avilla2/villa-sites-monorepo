// Map hostnames to Strapi website document IDs
const HOSTNAME_TO_WEBSITE_ID = {
  localhost: 'gphzmmnxs62yz5xy17mlnjpn', // demo-site
  '127.0.0.1': 'gphzmmnxs62yz5xy17mlnjpn', // demo-site
  'losvaldiviaslandscaping.com': 'ulbqjd1omixehd4gjnitqgg7' // Replace with actual website ID
}

export function getWebsiteIdFromHostname (hostname) {
  // Remove port if present
  const cleanHostname = hostname.split(':')[0]

  return HOSTNAME_TO_WEBSITE_ID[cleanHostname] || HOSTNAME_TO_WEBSITE_ID.localhost
}
