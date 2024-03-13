import gql from 'graphql-tag'

const PAGE_CONTENT_FRAGMENT = gql`
fragment StyleFragment on ComponentContentPageComponentsStyle {
    BackgroundColor
    Animation
    TextColor
}
fragment Content on ContentPageContentDynamicZone {
    __typename
    ... on ComponentHomePageComponentsIntro {
        id
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
        Style {
            ...StyleFragment
        }
        IntroText
        TextPosition
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
            ...StyleFragment
        }
        bodyTitle
        sendTo
        sendFrom
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
        }
    }
}
`
export default PAGE_CONTENT_FRAGMENT
