import '@/config'
import '@/methods'
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/i18n'
import '@/scss/index.scss'

import mixin from '@/methods/mixin.js'

import '@/plugins'

import Navi from '@/components/navi/navi.vue'
import Footer from '@/components/footer/footer.vue'

Vue.mixin(mixin)

Vue.component('Navi', Navi)
Vue.component('Footer', Footer)
Vue.config.productionTip = false

document.querySelector('html').setAttribute('lang', window._config.locale)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
