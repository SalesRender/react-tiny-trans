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
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    // Every non-relative module is external
    // abc -> require("abc")
    /^[a-z\-0-9]+$/,
  ],
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
