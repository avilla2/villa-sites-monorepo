const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const common = require('./webpack.common.js')
const dotenv = require('dotenv')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config({ path: './.env' }).parsed)
    })
  ]
})
