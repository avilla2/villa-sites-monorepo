import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { possibleTypes } from '@villa-components/graphql-queries'

const backendUrl =
  (typeof process !== 'undefined' && process.env?.BACKEND_URL) ||
  import.meta.env.VITE_BACKEND_URL

/**
 * Creates a fresh ApolloClient instance.
 * Call once per server request to avoid cross-request cache contamination.
 */
export function createApolloClient () {
  return new ApolloClient({
    link: new HttpLink({ uri: `${backendUrl}/graphql` }),
    cache: new InMemoryCache({ possibleTypes }),
    ssrMode: true
  })
}

/**
 * Shared singleton used only by <ApolloProvider> for client-side hooks.
 * Not used for SSR loader queries.
 */
export const apolloClient = createApolloClient()
