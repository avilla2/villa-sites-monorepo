/**
 * isExternalLink utility - Checks if a given link is external
 * @param {string} text - The link text to check
 * @returns {Boolean} True if the link is external, false if it's internal
 */
const isExternal = (text) => {
  if (text && text.charAt(0) === '/') {
    return false
  }
  return true
}

export default isExternal
