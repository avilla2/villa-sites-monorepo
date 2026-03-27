import React from 'react'
import Icons from './Icons'
import Text from './Text'
import Image from './Image'

/**
 * FooterContent – routes each footer content item to its matching component
 * @param {{ content: import('../../../types').FooterContent }} props
 */
export default function FooterContent ({ content }) {
  switch (content.__typename) {
    case 'ComponentFooterComponentsImage':
      return <Image content={content} />
    case 'ComponentFooterComponentsText':
      return <Text content={content} />
    case 'ComponentFooterComponentsIcons':
      return <Icons content={content} />
    default:
      return <p className="footer-error">Unknown footer content type: {content.__typename}</p>
  }
}
