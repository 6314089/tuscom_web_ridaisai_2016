const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: ['babel-polyfill', './js/main.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: true,
      comments: /^\**!|@preserve|@license|Version/,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
