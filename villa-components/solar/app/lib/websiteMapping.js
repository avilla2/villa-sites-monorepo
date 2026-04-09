// Map hostnames to Strapi website document IDs
const HOSTNAME_TO_WEBSITE_ID = {
  localhost: 'gphzmmnxs62yz5xy17mlnjpn', // demo-site
  '127.0.0.1': 'gphzmmnxs62yz5xy17mlnjpn', // demo-site
  'losvaldiviaslandscaping.com': 'ulbqjd1omixehd4gjnitqgg7',
  'www.losvaldiviaslandscaping.com': 'ulbqjd1omixehd4gjnitqgg7',
  'villawebsolutions.com': 'detjyq65tnfm7csk52vubz9f',
  'www.villawebsolutions.com': 'detjyq65tnfm7csk52vubz9f',
  'solar-vjhe7.ondigitalocean.app': 'detjyq65tnfm7csk52vubz9f',
  'alexandrovilla.com': 'detjyq65tnfm7csk52vubz9f',
  'cvlandscapemaintenance.com': 'dhj98a3qpodsav9ffj8s2jb1',
  'www.cvlandscapemaintenance.com': 'dhj98a3qpodsav9ffj8s2jb1'
}

export function getWebsiteIdFromHostname (hostname) {
  // Remove port if present
  const cleanHostname = hostname.split(':')[0]

  return HOSTNAME_TO_WEBSITE_ID[cleanHostname] || HOSTNAME_TO_WEBSITE_ID.localhost
}
