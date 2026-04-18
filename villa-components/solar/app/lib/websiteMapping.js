// Map hostnames to Strapi website document IDs
const HOSTNAME_TO_WEBSITE_ID = {
  localhost: 'gphzmmnxs62yz5xy17mlnjpn', // demo-site
  '127.0.0.1': 'gphzmmnxs62yz5xy17mlnjpn', // demo-site
  'losvaldiviaslandscaping.com': 'ulbqjd1omixehd4gjnitqgg7',
  'www.losvaldiviaslandscaping.com': 'ulbqjd1omixehd4gjnitqgg7',
  'villawebsolutions.com': 'detjyq65tnfm7csk52vubz9f',
  'www.villawebsolutions.com': 'detjyq65tnfm7csk52vubz9f',
  // 'solar-vjhe7.ondigitalocean.app': 'detjyq65tnfm7csk52vubz9f',
  'solar-vjhe7.ondigitalocean.app': 'dhj98a3qpodsav9ffj8s2jb1', // temp
  'alexandrovilla.com': 'detjyq65tnfm7csk52vubz9f',
  'cvlandscapemaintenance.com': 'dhj98a3qpodsav9ffj8s2jb1',
  'www.cvlandscapemaintenance.com': 'dhj98a3qpodsav9ffj8s2jb1'
}

// Map hostnames to the CSS data-site attribute value
const HOSTNAME_TO_SITE_NAME = {
  localhost: 'demo-site',
  '127.0.0.1': 'demo-site',
  'losvaldiviaslandscaping.com': 'los-valdivias',
  'www.losvaldiviaslandscaping.com': 'los-valdivias',
  'villawebsolutions.com': 'villa-web-solutions',
  'www.villawebsolutions.com': 'villa-web-solutions',
  // 'solar-vjhe7.ondigitalocean.app': 'villa-web-solutions',
  'solar-vjhe7.ondigitalocean.app': 'cv-landscape', // temp
  'alexandrovilla.com': 'villa-web-solutions',
  'cvlandscapemaintenance.com': 'cv-landscape',
  'www.cvlandscapemaintenance.com': 'cv-landscape'
}

export function getWebsiteIdFromHostname (hostname) {
  const cleanHostname = hostname.split(':')[0]
  return HOSTNAME_TO_WEBSITE_ID[cleanHostname] || HOSTNAME_TO_WEBSITE_ID.localhost
}

export function getSiteNameFromHostname (hostname) {
  const cleanHostname = hostname.split(':')[0]
  return HOSTNAME_TO_SITE_NAME[cleanHostname] || HOSTNAME_TO_SITE_NAME.localhost
}
