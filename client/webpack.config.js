const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
// const dotenv = require('dotenv');
// const webpack = require('webpack');

module.exports = (env) => {
  const rootFolder = '../dist/public';

  return {
    entry: './src/index.ts',
    output: {
      chunkFilename: '[name].[contenthash].js',
      filename: '[name].[contenthash].js',
      assetModuleFilename: '[name].[contenthash][ext][query]',
      asyncChunks: true,
      path: path.resolve(__dirname, rootFolder),
      clean: true,
      publicPath: '/',
    },
    // watchOptions: {
    //   ignored: /node_modules/,
    // },
    devtool: 'source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, rootFolder),
      },
      historyApiFallback: {
        index: '/'
      },
      port: 8008,
    },
    plugins: [
      new DotenvWebpack({
        path: path.resolve(__dirname, '../.env.local'),
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, rootFolder, 'index.html'),
      }),
    ],
    module: {
      // exclude node_modules
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: ['babel-loader', 'source-map-loader'],
        },
      ],
    },
    resolve: {
      alias: {
        src: '/src',
      },
      modules: [path.resolve('./node_modules'), path.resolve('./src')],
      extensions: ['*', '.js', '.ts', '.tsx'],
    },
    stats: {
      children: true,
      errorDetails: true,
    },
    optimization: {
      usedExports: false,
      minimize: true,
      splitChunks: {
        chunks: 'async',
      },
    },
  };
};
