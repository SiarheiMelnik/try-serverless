
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: [
    'babel-polyfill',
  ],
  externals: [
    'aws-sdk',
  ],
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'stage-2',
          ],
          plugins: [
            ['transform-runtime', {
              helpers: false,
              polyfill: false,
              regenerator: false,
            }],
          ],
        },
      },
    ],
  },
};
