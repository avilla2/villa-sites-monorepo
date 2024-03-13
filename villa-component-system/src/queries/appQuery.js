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
        Name
        locale
        localizations {
          data {
            id
            attributes {
              locale
            }
          }
        }
        Navbar{
          data {
            id
            attributes {
              ...NavbarFragment
            }
          }
        }
        Footer {
          data {
            id
            attributes {
              ...FooterFragment
            }
          }
        }
        SiteSettings {
          data {
            id
            attributes {
              ...SiteSettingsFragment
            }
          }
        }
        Homepage {
          data {
            id
            attributes {
              PageName
              Content {
                ...Content
              }
            }
          }
        }
        ContentPages {
          data {
            attributes {
              Name
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
