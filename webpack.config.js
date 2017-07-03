const path              = require('path');
const webpack           = require('webpack');
const webpackMerge      = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackDevServer  = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const nib               = require('nib');

const config = {
  base: {
    entry: './src/scripts/app.js',
    output: {
      path: path.resolve(__dirname, 'build/assets'),
      publicPath: 'assets/',
      filename: 'app.js'
    },
    module: {
      rules: [{
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            query: {
              useRelativePath: true
            }
          }
        }
      // }, {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   use: {
      //     loader: 'url-loader',
      //     options: { limit: 100000 }
      //   }
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.json$/,
        use: 'json-loader'
      }]
    },
    plugins: [
      new ExtractTextPlugin('./build/assets/app.css'),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src', 'index.html'),
        alwaysWriteToDisk: true
      }),
      new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, 'build')
      })
    ]
  },





  /**
   *
   * dev config
   *
   */
  dev: {
    module: {
      rules: [{
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, {
            loader: 'stylus-loader',
            options: {
              use: [nib()],
              import: ['~nib/lib/nib/index.styl'],
              sourceMap: true
            }
          }]
        })
      }]
    },
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9000
    }
  },





  /**
   *
   * prod config
   *
   */
  prod: {
    module: {
      rules: [{
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true
            }
          }, {
            loader: 'stylus-loader',
            options: {
              use: [nib()],
              import: ['~nib/lib/nib/index.styl']
            }
          }]
        })
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true
        }
      })
    ]
  }
};

module.exports = function buildConfig(env) {
  return webpackMerge(config.base, config[env]);
};
