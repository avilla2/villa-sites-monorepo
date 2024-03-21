const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')

dotenv.config()

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
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
  externals: [{
    react: 'react',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
    '@apollo/client': '@apollo/client',
    'graphql-tag': 'graphql-tag',
    '@emotion/react': '@emotion/react',
    '@emotion/styled': '@emotion/styled',
    'react-markdown': 'react-markdown',
    'react-pdf': 'react-pdf',
    'react-parallax': 'react-parallax',
    'react-visibility-sensor': 'react-visibility-sensor'
  }, /@mui\/material/, /@mui\/material\/.*/, /@mui\/icons-material\/.*/],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    library: '@villa-components/system',
    libraryTarget: 'umd',
    clean: true
  },
  devServer: {
    static: path.resolve(__dirname, './dist')
  }
}
