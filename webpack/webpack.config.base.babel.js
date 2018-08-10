/**
 * Webpack Config for Javascript Bundling
 *
 * @package  generator-kittn
 * @author   Lars Eichler <larseichler.le@gmail.com>
 */
import path from 'path'
import webpack from 'webpack'
import WebpackBar from 'webpackbar'
import Stylish from 'webpack-stylish'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'

const utils = require('./utils')
const nodeEnv = process.env.NODE_ENV || 'production'

const { ifProduction, ifDevelopment } = utils.getIfUtils(nodeEnv)

const CSS_LOADERS = [
  {
    loader: 'css-loader',
    options: {
      autoprefixer: false,
      sourceMap: ifProduction(false, true),
      url: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: ifProduction(false, true),
      config: {
        ctx: {
          normalize: true
        }
      }
    }
  },
  {
    loader: 'sass-loader',
    options: {
      includePaths: [utils.resolve(utils.kittnConf.src.style)],
      sourceMap: ifProduction(false, true)
    }
  }
]

/*
 |--------------------------------------------------------------------------
 | Let the config begin
 |--------------------------------------------------------------------------
 */
export default {
  entry: utils.removeEmpty(utils.entryPoints),
  output: {
    pathinfo: ifDevelopment(true, false),
    path: utils.paths.PUBLIC_PATH
  },
  stats: 'none',
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.tsx'],
    modules: [utils.resolve(utils.kittnConf.src.base), utils.resolve('node_modules')],
    alias: {
      components: path.resolve(utils.paths.LOADER_PATH, 'components/'),
      src: utils.resolve(utils.kittnConf.src.base)
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        options: {
          configFile: './.eslintrc.js',
          formatter: require('eslint-friendly-formatter')
        },
        exclude: /node_modules/,
        include: utils.resolve(utils.kittnConf.src.base)
      },
      {
        test: /\.js$/,
        include: utils.resolve(utils.kittnConf.src.base),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        include: [utils.resolve(utils.kittnConf.src.style), utils.resolve(utils.kittnConf.src.js)],
        exclude: [utils.resolve('node_modules'), utils.resolve(utils.kittnConf.dist.base)],
        use: ['vue-style-loader', ...CSS_LOADERS]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        exclude: [
          path.resolve(utils.paths.SRC_ROOT, 'images/vectors/'),
          path.resolve(utils.paths.SRC_ROOT, 'images/vectorsSingle/')
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              outputPath: utils.assetsPath('img/'),
              publicPath: utils.assetsPath('img/'),
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              outputPath: utils.assetsPath('fonts/'),
              publicPath: 'fonts/',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(utils.paths.SRC_ROOT, 'images/vectors/'),
          path.resolve(utils.paths.SRC_ROOT, 'images/vectorsSingle/')
        ],
        use: [
          {
            loader: 'svg-sprite-loader'
          },
          'svg-transform-loader',
          'svgo-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ]
      }
    ]
  },
  plugins: utils.removeEmpty([
    new VueLoaderPlugin(),
    new WebpackBar(),
    new Stylish(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('[name].css'),
    //   allChunks: true
    // }),
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: {
    //     safe: true
    //   }
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: utils.kittnConf.src.structure + 'index.html',
      inject: false,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    })
  ])
}
