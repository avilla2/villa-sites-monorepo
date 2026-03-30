import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import NotFound from '../components/pages/NotFound'

export function meta () {
  return [{ title: 'Page Not Found' }]
}

export default function NotFoundRoute () {
  const { setPage } = useOutletContext()

  useEffect(() => { setPage('Not Found') }, [])

  return <NotFound />
}
