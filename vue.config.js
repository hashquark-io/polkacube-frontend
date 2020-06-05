const path = require('path')
// eslint-disable-next-line
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

//The '127.0.0.1' or 'localhost' direct to container host, you must change it when you run in docker.
let POLKACUBE_SERVER = process.env.POLKACUBE_SERVER
let POLKACUBE_SOCKET_SERVER = process.env.POLKACUBE_SOCKET_SERVER
let POLKACUBE_SOCKET_PATH = process.env.POLKACUBE_SOCKET_PATH

let POLKADOT_SERVER = process.env.POLKADOT_SERVER
let POLKADOT_SOCKET_SERVER = process.env.POLKADOT_SOCKET_SERVER
let POLKADOT_SOCKET_PATH = process.env.POLKADOT_SOCKET_PATH

let BUILD_ENV = process.env.BUILD_ENV

module.exports = {
  lintOnSave: false,
  publicPath: './',
  productionSourceMap: false,

  chainWebpack: config => {
    config.resolve.alias.set('@img', resolve('src/assets/img'))

    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
  },

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        BUILD_ENV,
        POLKACUBE_SERVER,
        POLKACUBE_SOCKET_SERVER,
        POLKACUBE_SOCKET_PATH,
        POLKADOT_SERVER,
        POLKADOT_SOCKET_SERVER,
        POLKADOT_SOCKET_PATH
      })
    ]
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/variables.scss";'
      }
    }
  },

  pluginOptions: {
    i18n: {
      enableInSFC: true,
      locale: 'zh-TW',
      fallbackLocale: 'en-US',
      localeDir: 'i18n'
    }
  },
  devServer: {
    disableHostCheck: true
  }
}
