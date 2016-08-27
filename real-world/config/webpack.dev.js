var path = require('path')
var webpack = require('webpack')

var APP_DIR = path.join(__dirname, '..', 'src');
var OUT_DIR = path.join(__dirname, '..', 'dist');

module.exports = {
  debug: true,
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    path.join(APP_DIR, 'index.tsx')
  ],

  output: {
    path: OUT_DIR,
    filename: 'app.js',
    publicPath: '/dist/',
    pathinfo: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint',
        include: APP_DIR
      },
      {
        test: /\.js$/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts',
        include: APP_DIR
      }
    ]
  },

  resolve: {
    root: [APP_DIR],
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  }
}
