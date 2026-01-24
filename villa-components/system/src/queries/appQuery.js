import gql from 'graphql-tag'
import FOOTER_FRAGMENT from './footerFragment'
import NAVBAR_FRAGMENT from './navbarFragment'
import PAGE_CONTENT_FRAGMENT from './pageContentFragment'
import SITESETTINGS_FRAGMENT from './siteSettingsFragment'

const APP_QUERY = gql`
query Website($id: ID!, $locale: I18NLocaleCode) {
  website(documentId: $id, locale: $locale, pagination: { limit: 50 }) {
    name
    locale
    localizations {
      locale
    }
    navbar {
      ...NavbarFragment
    }
    footer {
      ...FooterFragment
    }
    site_settings {
      ...SiteSettingsFragment
    }
    homepage {
      PageName
      Title
      Content {
        ...Content
      }
    }
    content_pages {
      Name
      Title
      Link
      Content {
        ...Content
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
