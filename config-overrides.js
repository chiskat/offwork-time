const { override, addWebpackModuleRule, addWebpackAlias } = require('customize-cra')
const path = require('path')

const noop = input => input

module.exports = {
  webpack: override(
    addWebpackAlias({ '@': path.resolve(__dirname, './src/') }),

    addWebpackModuleRule({
      test: /\.less$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: { lessOptions: { noIeCompat: true, javascriptEnabled: true } },
        },
      ],
    }),

    process.env.NODE_ENV === 'production' && process.env.REACT_APP_CDN_URL
      ? function setPublicPath(config) {
          config.output.publicPath =
            process.env.REACT_APP_CDN_URL + process.env.REACT_APP_CDN_SUBPATH

          return config
        }
      : noop
  ),
}
