import gql from 'graphql-tag'

const FOOTER_FRAGMENT = gql`
fragment FooterFragment on WebsiteFooter {
  FontColor
  Content {
    __typename
    ... on ComponentFooterComponentsImage {
      Image {
        data {
          attributes {
            url
            name
            width
          }
        }
      }
      Space
    }
    ... on ComponentFooterComponentsText {
      Text
      Space
    }
    ... on ComponentFooterComponentsIcons {
      Entry {
        id
        Icon
        Link
        Color
      }
      Space
    }
  }
}
`

export default FOOTER_FRAGMENT
