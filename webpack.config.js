
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
      },
    }),
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
      {
        test: /\.json?$/,
        loader: 'json',
      },
    ],
  },
};
