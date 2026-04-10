import React from 'react'
import LosValdiviasIntakeForm from '../custom/LosValdiviasIntakeForm'

/**
 * Dispatcher for custom zero-config page components.
 * To add a new custom component, import it above and add an entry to COMPONENTS.
 *
 * @param {Object} props
 * @param {{ componentName: string }} props.content
 */
const COMPONENTS = {
  LosValdiviasIntakeForm
}

export default function Custom ({ content }) {
  const Component = COMPONENTS[content?.componentName]
  if (!Component) return null
  return <Component />
}
