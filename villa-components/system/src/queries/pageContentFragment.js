import gql from 'graphql-tag'

const PAGE_CONTENT_FRAGMENT = gql`
fragment StyleFragment on ComponentContentPageComponentsStyle {
    BackgroundColor
    Animation
    TextColor
    textAlign
    size
    paddingTop
    paddingBottom
}
fragment Content on ContentPageContentDynamicZone {
  __typename
  ... on ComponentHomePageComponentsIntro {
    Style {
      ...StyleFragment
    }
    File {
      mime
      url
      width
      alternativeText
    }
    IntroText
    TextPosition
    MobileFile {
      mime
      url
      width
      alternativeText
    }
    Buttons {
      Text
      Link
      ButtonColor
    }
    FormData {
      SendTo
      SendFrom
      BodyTitle
    }
    FormFields {
      name
      validation
      label
      type
      includeInSubjectLine
      fullWidth
    }
  }
  ... on ComponentHomePageComponentsGallery {
      Title
      Style {
      ...StyleFragment
      }
      Pictures {
        url
        width
        alternativeText
      
      }
  }
  ... on ComponentHomePageComponentsMedia {
    Title
    Style {
      ...StyleFragment
    }
    asset {
      Name
      Caption
      Content {
        __typename
        ... on ComponentAssetComponentsPdf {
          File {
            url
            width
          }
        }
        ... on ComponentAssetComponentsVideo {
          Autoplay
          Loop
          Muted
          Width
          Controls
          File {
            url
            width
          }
        }
        ... on ComponentAssetComponentsImage {
          Style
          Width
          Height
          File {
            url
            width
            alternativeText
          }
        }
      }
    }
  }
  ... on ComponentContentPageComponentsParagraph {
      Title
      Style {
        ...StyleFragment
      }
      Body
  }
  ... on ComponentContentPageComponentsFaq {
      Title
      Style {
        ...StyleFragment
      }
      Entry {
        Title
        Body
      }
  }
  ... on ComponentContentPageComponentsForm {
      Title
      Style {
        BackgroundColor
        Animation
      }
      bodyTitle
      sendTo
      sendFrom
      formFields {
        name
        label
        validation
        includeInSubjectLine
        fullWidth
        type
      }
  }
  ... on ComponentContentPageComponentsGrid {
    Title
    Style {
      ...StyleFragment
    }
    Entry {
      Picture {
        url
        alternativeText
      }
      Caption
    }
  }
  ... on ComponentContentPageComponentsButtons {
    Style {
      ...StyleFragment
    }
    Entry {
      Link
      Text
      ButtonColor
    }
    GroupButtonStyle: ButtonStyle
    ButtonArrangement
  }
  ... on ComponentContentPageComponentsInstantQuote {
    Title
    SendTo
    SendFrom
    FormButtonStyle: ButtonStyle
    ButtonColor
    ButtonText
    Style {
      ...StyleFragment
    }
    Entry {
      PricePer
      JobType
      PriceMinimum
    }
  }
  ... on ComponentContentPageComponentsVideo {
    caption
    autoplay
    loop
    muted
    width
    controls
    Style {
      ...StyleFragment
    }
    asset {
      url
      width
      alternativeText
    }
  }
... on ComponentContentPageComponentsImage {
    caption
    imageStyle
    width
    height
    captionLocation
    Style {
      ...StyleFragment
    }
    asset {
      url
      width
      alternativeText
    }
  }
  ... on ComponentContentPageComponentsCardGroup {
  Title
  fullWidth
  Cards {
    Image {
      url
      width
      alternativeText
    }
    Title
    Text
    ButtonText
    ButtonColor
    CardColor
    CardStyle
    Link
  }
  Style {
      ...StyleFragment
  }
}
... on ComponentContentPageComponentsList {
  Title
  Icon {
    url
    width
    alternativeText
  }
  Caption
  Items {
    Text
  }
  Style {
    ...StyleFragment
  }
}
... on ComponentHomePageComponentsSlideshow {
  Title
  slidesDesktop {
    url
    alternativeText
    width
    caption
  }
  slidesMobile {
    url
    alternativeText
    width
    caption
  }
  Style {
    ...StyleFragment
  }
}
... on ComponentHomePageComponentsRichText {
  Title
  Style {
    ...StyleFragment
  }
  RichText
}
}
`
export default PAGE_CONTENT_FRAGMENT
