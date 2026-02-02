---
to: websites/<%= name %>/moduleFederation.config.js
---
const { dependencies } = require('../../package.json')

module.exports = {
  name: 'villa_web_solutions',
  remotes: {
    villa_components: process.env.NODE_ENV === 'production'
      ? 'villa_components@https://dev.villawebsolutions.com/remoteEntry.js'
      : 'villa_components@http://localhost:3004/remoteEntry.js'
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      import: 'react',
      shareScope: 'default',
      requiredVersion: dependencies.react
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom']
    },
    'react-router': {
      singleton: true,
      requiredVersion: dependencies['react-router']
    },
    '@mui/material': {
      singleton: true,
      requiredVersion: dependencies['@mui/material']
    },
    '@mui/icons-material': {
      singleton: true,
      requiredVersion: dependencies['@mui/icons-material']
    }
  }
}
