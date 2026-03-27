import React from 'react'
import Intro from './components/Intro'

/**
 * Renders the correct page component for a given content block.
 * Add new cases here as components are implemented.
 *
 * @param {import('../../../../components/src/types').ContentComponent} component
 * @param {string} [siteName]
 * @returns {JSX.Element|null}
 */
export default function renderPageComponent (component, siteName) {
  switch (component.__typename) {
    case 'ComponentHomePageComponentsIntro':
      return <Intro content={component} siteName={siteName} />
    default:
      // Unimplemented component types are silently skipped for now
      return null
  }
}
