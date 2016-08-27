var webpack = require('webpack');
var path = require('path');
var webpackNotifierPlugin = require('webpack-notifier');

var APP_DIR = path.join(__dirname, '..', 'src');
var OUT_DIR = path.join(__dirname, '..', 'dist');

module.exports = {
  devtool: 'source-map',

  entry: path.join(APP_DIR, 'index.tsx'),

  output: {
    path: OUT_DIR,
    filename: 'app.js',
    publicPath: '/dist/'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      // (use all children of the chunk)
      async: true,
      // (create an async commons chunk)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpackNotifierPlugin({
      title: 'Webpack build',
      excludeWarnings: true
    })
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
        loaders: ['babel', 'ts'],
        include: APP_DIR
      }
    ]
  },

  resolve: {
    root: [APP_DIR],
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  tslint: {
    emitErrors: true,
    failOnHint: true
  }
};
