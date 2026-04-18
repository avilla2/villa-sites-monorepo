/**
 * Builds a URL with query parameters, filtering out null/undefined values.
 * @param {string} src - The base URL
 * @param {Object} params - Query parameters to append
 * @returns {string} The URL with query parameters
 */
export default function buildUrl (src, params) {
  try {
    const url = new URL(src)
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) {
        url.searchParams.set(key, String(value))
      }
    })
    return url.toString()
  } catch {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value != null)
    )
    return `${src}?${new URLSearchParams(filteredParams).toString()}`
  }
}
