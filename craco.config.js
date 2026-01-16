const path = require('path')
const CracoAntDesignPlugin = require('craco-antd')

let publicPath = undefined

if (process.env.NODE_ENV === 'production') {
  publicPath = process.env.REACT_APP_CDN_URL + (process.env.REACT_APP_CDN_SUBPATH || '')
  if (!publicPath.endsWith('/')) {
    publicPath = publicPath + '/'
  }
}

/** @type {import('@craco/types').CracoConfig} */
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
    configure: { output: { publicPath } },
  },

  plugins: [{ plugin: CracoAntDesignPlugin }],
}
