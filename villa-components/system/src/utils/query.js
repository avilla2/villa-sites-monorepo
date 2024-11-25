import React from 'react'
import { useQuery } from '@apollo/client'

const Query = ({ children, query, variables, loadingComponent }) => {
  const { data, loading, error } = useQuery(query, {
    variables,
    fetchPolicy: 'cache-first'
  })
  if (loading) return loadingComponent
  if (error) return children({data: undefined})
  return children({ data })
}

export default Query
