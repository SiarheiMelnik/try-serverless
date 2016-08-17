
module.exports = {
  target: 'node',
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/],
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-2'],
          plugins: [
            ['transform-runtime', {
              helpers: false,
              polyfill: false,
              regenerator: false,
            }],
            'add-module-exports',
          ],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
