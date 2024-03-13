import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import possibleTypes from './possibleTypes.json'

const cache = new InMemoryCache({ possibleTypes })
const link = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`
})
const client = new ApolloClient({
  cache,
  link
})

export default client
