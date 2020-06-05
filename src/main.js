import '@/config'
import '@/methods'
/*eslint-disable*/
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/i18n'
import '@/scss/index.scss'

import mixin from '@/methods/mixin.js'

import '@/plugins'

Vue.mixin(mixin)

Vue.config.productionTip = false

document.querySelector('html').setAttribute('lang', _config.locale)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
