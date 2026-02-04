# @villa-components/graphql-queries

Shared GraphQL queries and types for Strapi integration across Villa Components projects.

## Installation

In your project's package.json, add this as a dependency:

```json
{
  "dependencies": {
    "@villa-components/graphql-queries": "file:../graphql-queries"
  }
}
```

Then run:
```bash
npm install
```

## Usage

### Import Queries

```javascript
import { APP_QUERY, LOCALES_QUERY } from '@villa-components/graphql-queries'
```

### Import Fragments

```javascript
import { 
  FOOTER_FRAGMENT, 
  NAVBAR_FRAGMENT, 
  PAGE_CONTENT_FRAGMENT,
  SITE_SETTINGS_FRAGMENT 
} from '@villa-components/graphql-queries'
```

### Import possibleTypes for Apollo Client

```javascript
import { possibleTypes } from '@villa-components/graphql-queries'

const cache = new InMemoryCache({
  possibleTypes
})
```

## Generating Types

To regenerate the `possibleTypes.json` file from your Strapi GraphQL schema:

```bash
npm run generate-types
```

This requires a `.env.development` file at the monorepo root with `REACT_APP_BACKEND_URL` set.

## Available Exports

- **APP_QUERY**: Main query for fetching website data
- **LOCALES_QUERY**: Query for i18n locales
- **FOOTER_FRAGMENT**: Fragment for website footer
- **NAVBAR_FRAGMENT**: Fragment for website navbar
- **PAGE_CONTENT_FRAGMENT**: Fragment for page content components
- **SITE_SETTINGS_FRAGMENT**: Fragment for site settings
- **possibleTypes**: Apollo Client fragment matching configuration
