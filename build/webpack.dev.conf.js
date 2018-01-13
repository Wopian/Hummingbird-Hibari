const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const chalk = require('chalk')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BundleSizePlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: { rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }) },
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: utils.assetsPath('[name].js'),
    chunkFilename: utils.assetsPath('[name].js')
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  ' + chalk.green.bold(':percent') + ' :elapseds :msg',
      renderThrottle: 10
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.pug',
      inject: true,
      production: (process.env.NODE_ENV === 'production')
    }),
    new FriendlyErrorsPlugin(),
    new BundleSizePlugin('../.bundlesize.yml')
  ]
})
