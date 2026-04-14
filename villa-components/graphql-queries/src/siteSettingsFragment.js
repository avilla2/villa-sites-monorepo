import gql from 'graphql-tag'

const SITESETTINGS_FRAGMENT = gql`
fragment SiteSettingsFragment on WebsiteSetting {
  DesktopBreakpoint
  EnableLocalization
  SiteTitle
  gTag
  Palette {
    primary
    success
    secondary
    warning
    info
  }
  SiteDescription
  SiteMetadata {
    ThemeColor
    primaryFont {
      url
      name
    }
    headingFont {
      url
      name
    }
    Favicon {
      url
    }
    Manifest {
      url
    }
    AppleTouchIcon {
      url
    }
  }
}
`

export default SITESETTINGS_FRAGMENT
