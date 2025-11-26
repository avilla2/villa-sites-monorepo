import gql from 'graphql-tag'

const FOOTER_FRAGMENT = gql`
fragment FooterFragment on WebsiteFooter {
  FontColor
  links {
    text
    link
  }
  Content {
    __typename
    ... on ComponentFooterComponentsImage {
      Image {
        url
        name
        width

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
