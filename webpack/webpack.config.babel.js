/**
 * Webpack Config for Javascript Bundling
 *
 * @package  generator-kittn
 * @author   Lars Eichler <larseichler.le@gmail.com>
 */

import webpack from 'webpack'
import { getIfUtils, removeEmpty } from 'webpack-config-utils'
import path from 'path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import Webpack2Polyfill from 'webpack2-polyfill-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
const kittnConf = require('../config.json')

const nodeEnv = process.env.NODE_ENV || 'production'

const {
  ifProduction,
  ifDevelopment
} = getIfUtils(nodeEnv)

/*
 |--------------------------------------------------------------------------
 | Setting some paths for our Application
 |--------------------------------------------------------------------------
 */
const ROOT_PATH = path.resolve(__dirname, '..')
const PUBLIC_PATH = path.join(ROOT_PATH, kittnConf.dist.webpackpublic)
const ASSETS_PATH = kittnConf.dist.webpackjsassets
const LOADER_PATH = path.join(ROOT_PATH, kittnConf.src.js)

/*
 |--------------------------------------------------------------------------
 | Hot Middleware Client
 |--------------------------------------------------------------------------
 */

const hotClient =
'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&overlay=true'

/*
 |--------------------------------------------------------------------------
 | Defining Entry Points, could be used to manually split Parts of the Application, for example
 | Admin Javascript and FrontEnd JavaScript
 |--------------------------------------------------------------------------
 */

const entryPoints = kittnConf.src.jsEntryPoints

if (ifDevelopment()) {
  Object.keys(entryPoints).forEach((entry) => entryPoints[entry] = [hotClient].concat(entryPoints[entry]))
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function assetsPath (_path) {
  return path.posix.join('./', _path)
}

const CSS_LOADERS = [
  {
    loader: 'css-loader',
    options: {
      url: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      config: {
        ctx: {
          normalize: false
        }
      }
    }
  },
  {
    loader: 'sass-loader'
  }
]

/*
 |--------------------------------------------------------------------------
 | return webpack config object
 |--------------------------------------------------------------------------
 */
module.exports = {
  devtool: ifDevelopment('#cheap-module-eval-source-map'),
  context: path.join(ROOT_PATH, 'src'),
  entry: removeEmpty(entryPoints),
  output: {
    path: path.join(PUBLIC_PATH, ASSETS_PATH),
    publicPath: '/' + ASSETS_PATH,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  externals: {
    Modernizr: 'Modernizr'
  },
  resolve: {
    extensions: [
      '.vue',
      '.js'
    ],
    modules: [resolve(kittnConf.src.base), resolve('node_modules')],
    alias: {
      components: path.resolve(LOADER_PATH, 'components/'),
      src: resolve(kittnConf.src.base)
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        },
        exclude: /node_modules/,
        include: resolve(kittnConf.src.base)
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: resolve(kittnConf.src.base),
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ifProduction(
              ExtractTextPlugin.extract({
                use: [...CSS_LOADERS],
                fallback: 'vue-style-loader'
              }),
              [{ loader: 'vue-style-loader' }, ...CSS_LOADERS]
            )
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        query: process.env.NODE_ENV !== 'development' ? {
          outputPath: '/',
          name: 'assets/fonts/[name].[ext]'
        } : {}
      },
      {
        test: /\.(png|jpe?g|gif)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: 'img/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      }
    ]
  },
  plugins: removeEmpty([
    new Webpack2Polyfill(),
    ifProduction(
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsFilename: `${ROOT_PATH}/webpack/stats.json`,
        logLevel: 'info'
      })
    ),
    ifDevelopment(new webpack.HotModuleReplacementPlugin()),
    ifDevelopment(new webpack.NamedModulesPlugin()),
    ifDevelopment(new webpack.NoEmitOnErrorsPlugin()),
    ifDevelopment(new FriendlyErrorsWebpackPlugin()),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: LOADER_PATH,
        eslint: {
          failOnError: false,
          failOnWarning: false,
          configFile: ifProduction('./.eslintrc.js', './.eslintrc-dev.js'),
          formatter: require('eslint-formatter-pretty')
        }
      }
    }),
    // new StylelintPlugin({
    //   context: LOADER_PATH,
    //   syntax: 'scss'
    // }),
    ifProduction(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })),
    new ExtractTextPlugin({
      filename: assetsPath('[name].css'),
      allChunks: true
    }),
    ifProduction(
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),
    )
  ])
}
