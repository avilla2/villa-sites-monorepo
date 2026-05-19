import { clearApolloCache } from '../lib/apollo'

/**
 * Secret token for cache clearing authentication.
 * Set CACHE_CLEAR_TOKEN env var. Requests must include this in Authorization header.
 */
const cacheToken =
  (typeof process !== 'undefined' && process.env?.CACHE_CLEAR_TOKEN) ||
  import.meta.env.VITE_CACHE_CLEAR_TOKEN ||
  null

/**
 * Allowed origins for CORS (optional, for browser-based requests).
 * Set ALLOWED_CLEAR_CACHE_ORIGINS env var as comma-separated list.
 */
const allowedOrigins = (
  (typeof process !== 'undefined' && process.env?.ALLOWED_CLEAR_CACHE_ORIGINS) ||
  import.meta.env.VITE_ALLOWED_CLEAR_CACHE_ORIGINS ||
  ''
).split(',').map(origin => origin.trim()).filter(Boolean)

/**
 * Hosts allowed to access this endpoint.
 * Only localhost and staging environment can clear cache.
 */
const allowedHosts = [
  'localhost',
  '127.0.0.1',
  'solar-vjhe7.ondigitalocean.app'
]

export async function loader ({ request }) {
  const url = new URL(request.url)
  const host = url.hostname

  // Check if request is to an allowed host
  if (!allowedHosts.includes(host)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Not Found'
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  // Only POST requests are allowed
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Method Not Allowed. Use POST to clear cache.'
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        Allow: 'POST, OPTIONS'
      }
    }
  )
}

// Handle POST requests and preflight OPTIONS
export async function action ({ request }) {
  const url = new URL(request.url)
  const host = url.hostname

  // Check if request is to an allowed host
  if (!allowedHosts.includes(host)) {
    return new Response(null, { status: 404 })
  }

  const origin = request.headers.get('Origin')

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    // Only check CORS if origin is present (cross-origin request)
    if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
      return new Response(null, { status: 403 })
    }

    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      }
    })
  }

  // Verify token authentication
  const authHeader = request.headers.get('Authorization')
  if (cacheToken) {
    const token = authHeader?.replace('Bearer ', '')
    if (token !== cacheToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Unauthorized: Invalid or missing token'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'WWW-Authenticate': 'Bearer'
          }
        }
      )
    }
  }

  // Check CORS for POST request only if it's a cross-origin request
  if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Forbidden: Origin not allowed'
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  try {
    await clearApolloCache()

    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }

    // Add CORS headers if origin is allowed
    if (origin && allowedOrigins.includes(origin)) {
      headers['Access-Control-Allow-Origin'] = origin
      headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'Content-Type'
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Apollo cache cleared successfully',
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
