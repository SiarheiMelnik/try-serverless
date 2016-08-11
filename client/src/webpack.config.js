
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const del = require('del');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const devtools = 'cheap-module-eval-source-map';
const isDevelopment = process.env.NODE_ENV === 'development';
const BUILD_DIR =  path.join(__dirname, '/../dist');

del.sync([path.resolve(BUILD_DIR + '/*')], { force: true });

module.exports = {
  cache: isDevelopment,
  debug: isDevelopment,
  devtool: isDevelopment ? devtools : '',
  entry: {
    app: "./app/js",
  },
  module: {
    loaders: [
      {
         loader: 'url-loader?limit=10000',
         test: /\.(gif|jpg|png|svg)$/,
      },
      {
         loader: 'url-loader?limit=100000',
         test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
      },
      {
        test: /\.scss$/,
        loader: isDevelopment ?
          'style!css!postcss!sass' :
          ExtractTextPlugin.extract('style', 'css!postcss!sass'),
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-1'],
          plugins: [
            ['transform-runtime', {
              helpers: false,
              polyfill: false,
              regenerator: false,
            }],
            'add-module-exports'
          ],
        }
      }
    ]
  },
  output: isDevelopment ? {
      path: BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
    } : {
      path: BUILD_DIR,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
  },
  plugins: (() => {
     const plugins = [
       new webpack.DefinePlugin({
         'process.env': {
           NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production')
         }
       }),
       new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './app/index.tpln',
       })
     ];
     if (isDevelopment) {
       plugins.push(
         new webpack.optimize.OccurrenceOrderPlugin(),
         new webpack.HotModuleReplacementPlugin(),
         new webpack.NoErrorsPlugin()
       );
    } else {
      plugins.push(
        new ExtractTextPlugin('app-[hash].css', {
          allChunks: true,
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true, // eslint-disable-line camelcase
            warnings: false, // Because uglify reports irrelevant warnings.
          },
        }),
        new webpack.SourceMapDevToolPlugin({
          filename: '[file].map',
        })
      );
    }
    return plugins;
  })(),
  postcss: () => [autoprefixer({ browsers: 'last 2 version' })],
  resolve: {
    extensions: ['', '.js']
  },
};
