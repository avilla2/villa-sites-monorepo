const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const common = require('./webpack.common.js')
const dotenv = require('dotenv')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3004,
    liveReload: true,
    historyApiFallback: true
  },
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config({ path: './.env.development' }).parsed)
    })
  ]
})
