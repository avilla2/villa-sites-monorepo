import React from 'react'
import Faq from '../contentPageComponents/faq'
import Paragraph from '../contentPageComponents/paragraph'
import Form from '../contentPageComponents/contact'
import Grid from '../contentPageComponents/grid'
import Buttons from '../contentPageComponents/buttonGroup'
import InstantQuoteCalculator from '../contentPageComponents/instantQuoteCalculator'
import Intro from '../homePageComponents/intro'
import Gallery from '../homePageComponents/gallery'
import TextGrid from '../homePageComponents/textGrid'
import Media from '../homePageComponents/media'
import Cards from '../homePageComponents/cards'
import Freestyle from '../homePageComponents/freestyle'
import Image from '../contentPageComponents/image'
import Video from '../contentPageComponents/video'
import CardGroup from '../contentPageComponents/cardGroup'
import List from '../contentPageComponents/list'
import Slideshow from '../homePageComponents/slideshow'

const renderComponent = (object) => {
  switch (object.__typename) {
    case 'ComponentContentPageComponentsParagraph':
      return <Paragraph content={object} />
    case 'ComponentContentPageComponentsFaq':
      return <Faq content={object} />
    case 'ComponentContentPageComponentsForm':
      return <Form content={object} />
    case 'ComponentContentPageComponentsGrid':
      return <Grid content={object} />
    case 'ComponentContentPageComponentsButtons':
      return <Buttons content={object} />
    case 'ComponentContentPageComponentsInstantQuote':
      return <InstantQuoteCalculator content={object} />
    case 'ComponentHomePageComponentsIntro':
      return <Intro content={object} />
    case 'ComponentHomePageComponentsGallery':
      return <Gallery content={object} />
    case 'ComponentHomePageComponentsTextGrid':
      return <TextGrid content={object} />
    case 'ComponentHomePageComponentsMedia':
      return <Media content={object} />
    case 'ComponentHomePageComponentsCards':
      return <Cards content={object} />
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
