import gql from 'graphql-tag'

const NAVBAR_FRAGMENT = gql`
fragment NavbarFragment on WebsiteNavbar {
  Style
  FontColor
  Appearance
  siteBanner {
    text
    cta
    timer
    countdownDate
    style {
      TextColor
      textAlign
      BackgroundColor
      paddingBottom
      paddingTop
    }
  }
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
      Image {
        url
        width
        name

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
          url
          width
          alternativeText
        }
      }
    }
  }
  MobileConfig {
    MobileIcon {
      url
      width
      name
    }
    DrawerText
    DrawerLink
    IconLink
  }
}
`

export default NAVBAR_FRAGMENT
