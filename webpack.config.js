var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })
  ]
}
