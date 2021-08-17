/* eslint-disable */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');

module.exports ={
  stats: 'minimal',
  context: src,
  entry: './index.ts',
  output: {
    path: dist,
    library: {
      name: ['useTransContext', 'useTranslate', 'withTranslate', 'TransProvider'],
      type: 'commonjs2',
    },
    filename: 'bundle.js',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    // 'tiny-trans': {
    //   commonjs: 'tiny-trans',
    //   commonjs2: 'tiny-trans',
    //   amd: 'tiny-trans',
    //   root: 'Trans',
    // }
  },
  devtool: 'source-map',
  resolve: {
    modules: [src, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       parallel: true,
  //       terserOptions: {
  //         output: {
  //           comments: false,
  //         },
  //       },
  //       extractComments: false,
  //     }),
  //   ],
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        include: src,
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
        include: src,
      },
    ],
  },
};
