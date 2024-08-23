const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    popup: path.resolve(__dirname, 'packages/popup/index.tsx'),
    content: path.resolve(__dirname, 'packages/content/index.tsx'),
    // options: './src/options.js',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@popup': path.resolve(__dirname, 'packages/popup'),
      '@content': path.resolve(__dirname, 'packages/content'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'packages/popup/index.html'),
      chunks: ['popup'],
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'options.html',
    //   template: './packages/view/options.html',
    //   chunks: ['options'],
    // }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
};
