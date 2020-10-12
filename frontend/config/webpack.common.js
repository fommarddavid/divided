const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv');
const paths = require('./paths');

const env = DotenvPlugin.config({ path: `.env.${process.env.NODE_ENV}` }).parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: [
    // SCSS
    `${paths.assets}/styles/index.css`,
    // JS
    `${paths.src}/index.js`,
  ],

  resolve: {
    alias: {
      src: paths.src,
      app: paths.src,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.static,
          to: '',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      favicon: `${paths.assets}/favicon.ico`,
      template: `${paths.assets}/index.html`,
    }),
    new webpack.DefinePlugin(envKeys),
  ],

  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },

      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
        },
      },

      // Images
      {
        test: /\.(ico|gif|png|jpe?g|webp|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'images/' },
          },
        ],
      },
    ],
  },
};
