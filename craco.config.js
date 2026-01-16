const path = require('path')
const CracoAntDesignPlugin = require('craco-antd')
const { whenProd } = require('@craco/craco')

/** @type {import('@craco/types').CracoConfig} */
module.exports = () => {
  return {
    webpack: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
      configure: {
        output: {
          publicPath: whenProd(() => process.env.CDN_PREFIX),
        },
      },
    },

    plugins: [{ plugin: CracoAntDesignPlugin }],
  }
}
