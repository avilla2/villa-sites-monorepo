import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { possibleTypes } from '@villa-components/graphql-queries'

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`
})

const cache = new InMemoryCache({
  possibleTypes
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  ssrMode: true
})
