/* eslint-disable */
const path = require('path');

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
      type: 'umd',
    },
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
  },
  devtool: 'source-map',
  resolve: {
    modules: [src, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
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
