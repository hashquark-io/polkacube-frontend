const path = require('path')
// eslint-disable-next-line
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

//The '127.0.0.1' or 'localhost' direct to container host, you must change it when you run in docker.
let APP_POLKA_BASE_HOST = '"http://localhost:7001"'
let APP_BUILD_ENV = '"development"'

if (process.env.npm_lifecycle_event === 'build') {
  APP_BUILD_ENV = '"build"'
}

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
        APP_BUILD_ENV,
        APP_POLKA_BASE_HOST
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
  }
}
