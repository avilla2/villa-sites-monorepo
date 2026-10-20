// Map hostnames to Strapi website document IDs
const HOSTNAME_TO_WEBSITE_ID = {
  localhost: 'gphzmmnxs62yz5xy17mlnjpn', // Tovy's Roofing & More
  '127.0.0.1': 'gphzmmnxs62yz5xy17mlnjpn', // Tovy's Roofing & More
  'losvaldiviaslandscaping.com': 'ulbqjd1omixehd4gjnitqgg7',
  'www.losvaldiviaslandscaping.com': 'ulbqjd1omixehd4gjnitqgg7',
  'villawebsolutions.com': 'detjyq65tnfm7csk52vubz9f',
  'www.villawebsolutions.com': 'detjyq65tnfm7csk52vubz9f',
  'solar-vjhe7.ondigitalocean.app': 'wlg04f8gmfk2a0ed29w6p2iq',
  'alexandrovilla.com': 'detjyq65tnfm7csk52vubz9f',
  'cvlandscapemaintenance.com': 'dhj98a3qpodsav9ffj8s2jb1',
  'www.cvlandscapemaintenance.com': 'dhj98a3qpodsav9ffj8s2jb1',
  'mmtconstruction.net': 'td259ds3af0i437m3ljkgetf',
  'www.mmtconstruction.net': 'td259ds3af0i437m3ljkgetf',
  'premiumlawn.com': 'wlg04f8gmfk2a0ed29w6p2iq'
}

// Map hostnames to the CSS data-site attribute value
const HOSTNAME_TO_SITE_NAME = {
  localhost: 'tovys-roofing',
  '127.0.0.1': 'tovys-roofing',
  'losvaldiviaslandscaping.com': 'los-valdivias',
  'www.losvaldiviaslandscaping.com': 'los-valdivias',
  'villawebsolutions.com': 'villa-web-solutions',
  'www.villawebsolutions.com': 'villa-web-solutions',
  'solar-vjhe7.ondigitalocean.app': 'premium-lawn-landscaping', // temp
  'alexandrovilla.com': 'villa-web-solutions',
  'cvlandscapemaintenance.com': 'cv-landscape',
  'www.cvlandscapemaintenance.com': 'cv-landscape',
  'mmtconstruction.net': 'mmt-construction',
  'www.mmtconstruction.net': 'mmt-construction'
}

export function getWebsiteIdFromHostname(hostname) {
  const cleanHostname = hostname.split(':')[0]
  return HOSTNAME_TO_WEBSITE_ID[cleanHostname] || HOSTNAME_TO_WEBSITE_ID.localhost
}

export function getSiteNameFromHostname(hostname) {
  const cleanHostname = hostname.split(':')[0]
  return HOSTNAME_TO_SITE_NAME[cleanHostname] || HOSTNAME_TO_SITE_NAME.localhost
}
