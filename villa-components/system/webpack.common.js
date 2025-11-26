const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container
const dependencies = require('../../package.json').dependencies

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  target: 'web',
  plugins: [
    new ModuleFederationPlugin({
      name: 'villa_components',
      filename: 'remoteEntry.js',
      exposes: {
        './VillaComponentSystem': './src/system/componentSystem.js',
        './VillaRenderingSystem': './src/system/renderingSystem.js'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom']
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: dependencies['react-router-dom']
        },
        '@mui/material': {
          singleton: true,
          requiredVersion: dependencies['@mui/material'],
          version: dependencies['@mui/material']
        },
        '@mui/icons-material': {
          singleton: true,
          requiredVersion: dependencies['@mui/icons-material']
        }
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  // externals: [{
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   // 'react-router-dom': 'react-router-dom',
  //   // '@apollo/client': '@apollo/client',
  //   // 'graphql-tag': 'graphql-tag',
  //   // '@emotion/react': '@emotion/react',
  //   // '@emotion/styled': '@emotion/styled',
  //   // 'react-markdown': 'react-markdown',
  //   // 'react-pdf': 'react-pdf',
  //   // 'react-parallax': 'react-parallax',
  //   // 'react-visibility-sensor': 'react-visibility-sensor'
  // },
  //   // /@mui\/material/, /@mui\/material\/.*/, /@mui\/icons-material\/.*/
  // ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    clean: true
  }
}
