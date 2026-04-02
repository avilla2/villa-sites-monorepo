import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { possibleTypes } from '@villa-components/graphql-queries'

const backendUrl =
  (typeof process !== 'undefined' && process.env?.BACKEND_URL) ||
  import.meta.env.VITE_BACKEND_URL

const httpLink = new HttpLink({
  uri: `${backendUrl}/graphql`
})

const cache = new InMemoryCache({
  possibleTypes
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  ssrMode: true
})
