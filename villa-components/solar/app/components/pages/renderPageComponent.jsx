import React from 'react'
import Intro from './components/Intro'
import Slideshow from './components/Slideshow'
import Freestyle from './components/Freestyle'
import Paragraph from './components/Paragraph'
import Image from './components/Image'
import ButtonGroup from './components/ButtonGroup'
import Video from './components/Video'
import Faq from './components/Faq'
import Gallery from './components/Gallery'
import PictureGrid from './components/PictureGrid'
import List from './components/List'
import Cta from './components/Cta'
import CardGroup from './components/CardGroup'
import Contact from './components/Contact'
import Custom from './components/Custom'

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
    case 'ComponentHomePageComponentsSlideshow':
      return <Slideshow content={component} />
    case 'ComponentHomePageComponentsRichText':
      return <Freestyle content={component} />
    case 'ComponentContentPageComponentsParagraph':
      return <Paragraph content={component} />
    case 'ComponentContentPageComponentsImage':
      return <Image content={component} />
    case 'ComponentContentPageComponentsButtons':
      return <ButtonGroup content={component} />
    case 'ComponentContentPageComponentsVideo':
      return <Video content={component} />
    case 'ComponentContentPageComponentsFaq':
      return <Faq content={component} />
    case 'ComponentHomePageComponentsGallery':
      return <Gallery content={component} />
    case 'ComponentContentPageComponentsGrid':
      return <PictureGrid content={component} />
    case 'ComponentContentPageComponentsList':
      return <List content={component} />
    case 'ComponentHomePageComponentsCta':
      return <Cta content={component} />
    case 'ComponentContentPageComponentsCardGroup':
      return <CardGroup content={component} />
    case 'ComponentContentPageComponentsForm':
      return <Contact content={component} siteName={siteName} />
    case 'ComponentContentPageComponentsCustom':
      return <Custom content={component} />
    default:
      // Unimplemented component types are silently skipped for now
      return null
  }
}
