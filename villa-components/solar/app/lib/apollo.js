import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { possibleTypes } from '@villa-components/graphql-queries'

const backendUrl =
  (typeof process !== 'undefined' && process.env?.BACKEND_URL) ||
  import.meta.env.VITE_BACKEND_URL

/**
 * Fetch policy for loader queries.
 * Set APOLLO_FETCH_POLICY=network-only (or any valid policy) to override.
 * Defaults to 'cache-first'.
 */
export const loaderFetchPolicy =
  (typeof process !== 'undefined' && process.env?.APOLLO_FETCH_POLICY) ||
  'cache-first'

/**
 * Shared cache instance for server-side requests.
 * Persists across requests for better performance.
 */
const sharedCache = new InMemoryCache({ possibleTypes })

/**
 * Clears the Apollo cache completely.
 * Useful for invalidating stale data after CMS updates.
 */
export function clearApolloCache () {
  return sharedCache.reset()
}

/**
 * Creates a fresh ApolloClient instance with shared cache.
 * Cache persists across requests for performance.
 */
export function createApolloClient () {
  return new ApolloClient({
    link: new HttpLink({ uri: `${backendUrl}/graphql` }),
    cache: sharedCache,
    ssrMode: true
  })
}

/**
 * Shared singleton used only by <ApolloProvider> for client-side hooks.
 * Not used for SSR loader queries.
 */
export const apolloClient = createApolloClient()
