import React from 'react'
import Intro from '../components/Intro'
import Gallery from '../components/Gallery'
import Cta from '../components/Cta'
import Media from '../components/Media'
import Freestyle from '../components/Freestyle'
import Slideshow from '../components/Slideshow'
import Faq from '../components/Faq'
import Paragraph from '../components/Paragraph'
import Contact from '../components/Contact'
import Grid from '../components/Grid'
import Buttons from '../components/ButtonGroup'
import InstantQuoteCalculator from '../components/InstantQuoteCalculator'
import Image from '../components/Image'
import Video from '../components/Video'
import CardGroup from '../components/CardGroup'
import List from '../components/List'

/**
 * renderComponent function - Renders the appropriate component based on its __typename
 * @param {ContentComponent} object - The content component object to render
 * @param {string} siteName - The name of the site, used in the email subject line for contact forms
 * @returns {JSX.Element} The appropriate content component or error message
 */
const renderComponent = (object, siteName) => {
  switch (object.__typename) {
    case 'ComponentContentPageComponentsParagraph':
      return <Paragraph content={object} />
    case 'ComponentContentPageComponentsFaq':
      return <Faq content={object} />
    case 'ComponentContentPageComponentsForm':
      return <Contact content={object} siteName={siteName} />
    case 'ComponentContentPageComponentsGrid':
      return <Grid content={object} />
    case 'ComponentContentPageComponentsButtons':
      return <Buttons content={object} />
    case 'ComponentContentPageComponentsInstantQuote':
      return <InstantQuoteCalculator content={object} siteName={siteName} />
    case 'ComponentHomePageComponentsIntro':
      return <Intro content={object} Buttons={Buttons} Contact={Contact} siteName={siteName} />
    case 'ComponentHomePageComponentsGallery':
      return <Gallery content={object} />
    case 'ComponentHomePageComponentsCta':
      return <Cta content={object} />
    case 'ComponentHomePageComponentsMedia':
      return <Media content={object} />
    case 'ComponentContentPageComponentsImage':
      return <Image content={object} />
    case 'ComponentContentPageComponentsVideo':
      return <Video content={object} />
    case 'ComponentContentPageComponentsCardGroup':
      return <CardGroup content={object} />
    case 'ComponentContentPageComponentsList':
      return <List content={object} />
    case 'ComponentHomePageComponentsSlideshow':
      return <Slideshow content={object} />
    case 'ComponentHomePageComponentsRichText':
      return <Freestyle content={object} />
    default:
      return <h2>Error: Page Content Not Found</h2>
  }
}

export default renderComponent
