const path = require('path')

const hasFlag = require('has-flag')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const postcssSVG = require('postcss-svg')
const postcssInlineSVG = require('postcss-inline-svg')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')

const LiveReloadPlugin = require('webpack-livereload-plugin')

const {shouldBabelize} = require('./testing/babelizer')

const DEV = !hasFlag('mode=production')

const plugins = [new MiniCssExtractPlugin(), new LiveReloadPlugin()]

module.exports = {
  devtool: DEV ? false : 'nosources-source-map',
  entry: {
    main: [path.resolve('./src/index.js'), './css/index.scss'],
  },
  mode: DEV ? 'development' : 'production',
  module: {
    rules: [
      {
        include: shouldBabelize,
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: false,
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postcssFlexbugsFixes(),
                postcssPresetEnv({stage: 2}),
                postcssSVG(),
                postcssInlineSVG(),
              ],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    devtoolModuleFilenameTemplate: i => `/${path.normalize(i.resourcePath)}`,
    filename: '[name].js',
    path: `${__dirname}/dist`,
    publicPath: '/assets/',
  },
  plugins,
  resolve: {
    alias: {
      App: path.resolve(__dirname, './src/App.js'),
      Components: path.resolve(__dirname, './src/Components/'),
      mdc: path.resolve(__dirname, './src/mdc/'),
    },
    extensions: ['.js'],
    mainFields: ['module', 'jsnext:main', 'browser', 'main'],
    modules: ['node_modules'],
    symlinks: false,
  },
}
