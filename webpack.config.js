const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopment = process.env.NODE_ENV === 'development';
const isProfiling = process.argv.includes('--profiling');

module.exports = {
    entry: ['./src/'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devtool: isDevelopment ? 'inline-cheap-source-map' : 'source-map',
    mode: isDevelopment ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: ['babel-loader','eslint-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist/'),
      historyApiFallback: true,
      port: 3000,
      host: '0.0.0.0',
      compress: true,
      hot: true,
      open:true
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "**/*",
          path.join(process.cwd(), 'build/**/*')
        ]
      }),
      new HtmlWebpackPlugin(
        Object.assign(
          {
            title: 'Title',
            template: path.resolve(__dirname, './public/index.html'),
            favicon: path.resolve(__dirname, './public/favicon.ico'),
          },
          !isDevelopment
            ? {
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
              }
            : undefined
        )
      ),
      process.argv.includes('--analyzer') ? new BundleAnalyzerPlugin() : undefined
    ].filter(Boolean)
}