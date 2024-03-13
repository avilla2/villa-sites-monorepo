const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
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
    'react-dom': 'react-dom'
  }, /@mui\/material/, /@mui\/material\/.*/],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    library: 'villa-component-system',
    libraryTarget: 'umd',
    clean: true
  },
  devServer: {
    static: path.resolve(__dirname, './dist')
  }
}
