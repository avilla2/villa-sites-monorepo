import gql from 'graphql-tag'

const NAVBAR_FRAGMENT = gql`
fragment NavbarFragment on WebsiteNavbar {
  Style
  FontColor
  Appearance
  Items {
    __typename
    ... on ComponentNavbarComponentsTextLink {
      Title
      Link
      id
    }
    ... on ComponentNavbarComponentsNavButton {
      Text
      Link
      Color
    }
    ... on ComponentNavbarComponentsImageLink {
      id
      Image {
        data {
          attributes {
            url
            width
            name
          }
        }
      }
      Link
      Width
      showInMobile
    }
    ... on ComponentNavbarComponentsNavMenu {
      title
      menuItem {
        text
        link
        icon {
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
  MobileConfig {
    MobileIcon {
      data {
        attributes {
          url
          width
          name
        }
      }
    }
    DrawerText
    DrawerLink
    IconLink
  }
}
`

export default NAVBAR_FRAGMENT
