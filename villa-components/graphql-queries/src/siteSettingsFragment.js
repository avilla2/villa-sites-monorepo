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
    GoogleFontURL
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
