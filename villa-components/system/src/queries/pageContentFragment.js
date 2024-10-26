import gql from 'graphql-tag'

const PAGE_CONTENT_FRAGMENT = gql`
fragment StyleFragment on ComponentContentPageComponentsStyle {
    BackgroundColor
    Animation
    TextColor
    textAlign
    size
}
fragment Content on ContentPageContentDynamicZone {
    __typename
    ... on ComponentHomePageComponentsIntro {
      id
      Style {
        ...StyleFragment
      }
      File {
          data {
              attributes {
                  mime
                  url
                  width
                  alternativeText
              }
          }
      }
      IntroText
      TextPosition
      MobileFile {
        data {
          attributes {
            mime
            url
            width
            alternativeText
          }
        }
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
        id
        Title
        Style {
        ...StyleFragment
        }
        Pictures {
            data {
                attributes {
                    url
                    width
                    alternativeText
                }
            }
        }
    }
    ... on ComponentHomePageComponentsMedia {
        id
        Title
        Style {
        ...StyleFragment
        }
        asset {
            data {
            attributes {
                Name
                Caption
                Content {
                __typename
                ... on ComponentAssetComponentsPdf {
                    File {
                    data {
                        attributes {
                        url
                        width
                        }
                    }
                    }
                }
                ... on ComponentAssetComponentsVideo {
                    Autoplay
                    Loop
                    Muted
                    Width
                    Controls
                    File {
                        data {
                            attributes {
                                url
                                width
                            }
                        }
                    }
                }
                ... on ComponentAssetComponentsImage {
                    Style
                    Width
                    Height
                    File {
                        data {
                            attributes {
                                url
                                width
                                alternativeText
                        }
                    }
                    }
                }
                }
            }
            }
        }
    }
    ... on ComponentContentPageComponentsParagraph {
        id
        Title
        Style {
            ...StyleFragment
        }
        Body
    }
    ... on ComponentContentPageComponentsFaq {
        id
        Title
        Style {
            ...StyleFragment
        }
        Entry {
            Title
            Body
            id
        }
    }
    ... on ComponentContentPageComponentsForm {
        id
        Title
        Style {
            BackgroundColor
            Animation
        }
        bodyTitle
        sendTo
        fields {
          name
          label
          validation
          includeInSubjectLine
          fullWidth
          type
        }
    }
    ... on ComponentContentPageComponentsGrid {
        id
        Title
        Style {
            ...StyleFragment
        }
        Entry {
            id
            Picture {
                data {
                    attributes {
                        url
                    }
                }
            }
        Caption
        }
    }
    ... on ComponentContentPageComponentsButtons {
        id
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
        id
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
          id
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
          data {
              attributes {
              url
              width
              alternativeText
              }
          }
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
          data {
              attributes {
              url
              width
              alternativeText
              }
          }
        }
    }
    ... on ComponentContentPageComponentsCardGroup {
    Title
    Cards {
      Image {
        data {
          attributes {
            url
            width
            alternativeText
          }
        }
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
      data {
        attributes {
          url
          width
          alternativeText
        }
      }
    }
    Caption
    Items {
      id
      Text
    }
    Style {
        ...StyleFragment
    }
  }
  ... on ComponentHomePageComponentsSlideshow {
    Title
		slidesDesktop {
      data {
        attributes {
          url
          alternativeText
          width
          caption
        }
      }
    }
    slidesMobile {
      data {
        attributes {
          url
          alternativeText
          width
          caption
        }
      }
    }
    Style {
        ...StyleFragment
    }
  }
}
`
export default PAGE_CONTENT_FRAGMENT
