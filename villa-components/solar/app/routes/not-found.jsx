import React from 'react'
import { useOutletContext } from 'react-router'
import { NotFoundPage } from '@villa-components/components'

export default function NotFound () {
  const { setPage } = useOutletContext()

  return <NotFoundPage setPage={setPage} />
}
