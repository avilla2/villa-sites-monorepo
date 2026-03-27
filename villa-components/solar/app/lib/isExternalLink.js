/**
 * Returns true if the link is an external URL (starts with http, https, or //)
 * @param {string} link
 * @returns {boolean}
 */
export default function isExternal (link) {
  if (!link) return false
  return link.startsWith('http://') || link.startsWith('https://') || link.startsWith('//')
}
