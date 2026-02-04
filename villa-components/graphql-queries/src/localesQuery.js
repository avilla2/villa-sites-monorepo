import gql from 'graphql-tag'

const LOCALES_QUERY = gql`
    query I18NLocales {
    i18NLocales {
        code
        name
    }
    }
`

export default LOCALES_QUERY
