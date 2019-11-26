const HtmlPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const ejsPages = [
  'index',
  'second',
];
let htmlPlugins = ejsPages.map(function(entryName) {
  return new HtmlPlugin({
    filename: `${entryName}.html`,
    template: `./src/${entryName}.ejs`
  })
})

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          'html-loader',
          'ejs-html-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [/*
    new CopyPlugin([
      { from: './src/css', to: 'css' }
    ]),*/
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    })
  ].concat(htmlPlugins)
  .concat([
    new HtmlBeautifyPlugin({
      config: {
        html: {
          end_with_newline: true,
          indent_size: 2,
          indent_with_tabs: true,
          indent_inner_html: true,
          preserve_newlines: false,
          unformatted: ['p', 'i', 'b', 'span']
        }
      }
    })
  ]),
  watchOptions: {
    ignored: /node_modules/,
    poll: 100
  }
}