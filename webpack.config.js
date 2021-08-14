/* eslint-disable */
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const port = 8080;
const getHost = (options) => {
  if (options.network) {
    return options.network === true ? '192.168.1.83' : options.network;
  }
  return 'localhost';
};

const getIsDevMode = (options) => options.mode === 'development';
const url = 'https://';

const getPublicPath = (options) => {
  const isDevMode = getIsDevMode(options);
  const host = getHost(options);
  if (isDevMode) return `http://${host}:${port}/`;
  if (options.forHeroku) return url;
  return url;
};

module.exports = (_, options) => {
  const isDevMode = getIsDevMode(options);
  const dist = path.join(__dirname, 'dist');
  const src = path.join(__dirname, 'src');
  const host = getHost(options);

  return {
    stats: 'minimal',
    context: src,
    entry: './index.tsx',
    output: {
      path: dist,
      publicPath: getPublicPath(options),
      filename: `js/[name]${isDevMode ? '' : '.[contenthash]'}.js`,
      chunkFilename: `js/[name]${isDevMode ? '' : '.[contenthash]'}.js`,
    },
    devtool: isDevMode && 'source-map',
    devServer: {
      host,
      port,
      hot: true,
      historyApiFallback: true,
      overlay: true,
    },
    resolve: {
      modules: [src, 'node_modules'],
      extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
    plugins: [
      new HtmlPlugin({
        template: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        inject: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['cache-loader', 'ts-loader'],
          include: src,
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['cache-loader', 'babel-loader'],
          include: src,
        },
      ],
    },
  };
};
