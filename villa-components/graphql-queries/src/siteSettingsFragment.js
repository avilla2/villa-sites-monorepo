import gql from 'graphql-tag'

const SITESETTINGS_FRAGMENT = gql`
fragment SiteSettingsFragment on WebsiteSetting {
  DesktopBreakpoint
  EnableLocalization
  SiteTitle
  Palette {
    primary
    success
    secondary
    warning
    info
  }
}
`

export default SITESETTINGS_FRAGMENT
