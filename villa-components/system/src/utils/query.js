import { useQuery } from '@apollo/client'

/**
 * Utility Query component to perform GraphQL queries using Apollo Client
 * @param {Object} params - Query parameters
 * @param {React.ReactNode} params.children - Render prop function that receives the query result
 * @param {Object} params.query - GraphQL query document
 * @param {Object} params.variables - Variables for the GraphQL query
 * @param {React.ReactNode} params.loadingComponent - Component to display while loading data
 * @returns {React.ReactElement} Returns the children render prop with query data
 */
const Query = ({ children, query, variables, loadingComponent }) => {
  const { data, loading, error } = useQuery(query, {
    variables,
    fetchPolicy: 'cache-first'
  })
  if (loading) return loadingComponent
  if (error) return children({ data: undefined })
  return children({ data })
}

export default Query
