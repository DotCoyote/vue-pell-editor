import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import path from 'path'
const merge = require('webpack-merge')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.config.base.babel.js')

/*
 |--------------------------------------------------------------------------
 | Merge the configs
 |--------------------------------------------------------------------------
 */
const prodWebpackConfig = merge(baseWebpackConfig.default, {
  devtool: '',
  output: {
    filename: utils.assetsPath('[name].js'),
    chunkFilename: utils.assetsPath('chunks/[name].js'),
    publicPath: './',
    library: 'VuePellEditor',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin([utils.resolve(utils.kittnConf.dist.base)], {
      root: path.resolve(utils.paths.PUBLIC_PATH, '..'),
      beforeEmit: true
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsFilename: `${utils.paths.ROOT_PATH}/webpack/stats.json`,
      logLevel: 'info'
    })
  ]
})

module.exports = prodWebpackConfig
