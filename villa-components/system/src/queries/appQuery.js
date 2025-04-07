import gql from 'graphql-tag'
import FOOTER_FRAGMENT from './footerFragment'
import NAVBAR_FRAGMENT from './navbarFragment'
import PAGE_CONTENT_FRAGMENT from './pageContentFragment'
import SITESETTINGS_FRAGMENT from './siteSettingsFragment'

const APP_QUERY = gql`
query Website($id: ID) {
  website(id: $id) {
    data {
      id
      attributes {
        name
        locale
        localizations {
          data {
            id
            attributes {
              locale
            }
          }
        }
        navbar{
          data {
            id
            attributes {
              ...NavbarFragment
            }
          }
        }
        footer {
          data {
            id
            attributes {
              ...FooterFragment
            }
          }
        }
        site_settings {
          data {
            id
            attributes {
              ...SiteSettingsFragment
            }
          }
        }
        homepage {
          data {
            id
            attributes {
              PageName
              Title
              Content {
                ...Content
              }
            }
          }
        }
        content_pages {
          data {
            attributes {
              Name
              Title
              Link
              Content {
                ...Content
              }
            }
          }
        }
      }
    }
  }
}

${NAVBAR_FRAGMENT}
${FOOTER_FRAGMENT}
${PAGE_CONTENT_FRAGMENT}
${SITESETTINGS_FRAGMENT}
`

export default APP_QUERY
